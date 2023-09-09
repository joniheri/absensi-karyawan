const { User: UserModel } = require("../../models");
const joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const dataUsers = await UserModel.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    if (!dataUsers) {
      return res.status(400).send({
        status: "fail",
        message: `Get user Fail`,
      });
    }

    return res.send({
      status: "success",
      message: `Get user Success`,
      data: dataUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    const validationInput = joi.object({
      email: joi.string().required().min(5).email(),
      username: joi.string().required().min(3),
      password: joi.string().required().min(5),
      fullname: joi.string().required().min(3),
      jabatan: joi.string().required().min(3),
      noHp: joi.string().required().min(11),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }
    // End ValidationInput

    // CheckEmailAlreadyExist
    const dataUserByEmail = await UserModel.findOne({
      where: {
        email: dataInput.email,
      },
    });
    if (dataUserByEmail) {
      return res.status(400).send({
        status: "fail",
        message: `User with email: ${dataInput.email} Already Exist`,
      });
    }
    // End CheckEmailAlreadyExist

    // CheckUsernameAlreadyExist
    const dataUserByUsername = await UserModel.findOne({
      where: {
        username: dataInput.username,
      },
    });
    if (dataUserByUsername) {
      return res.status(400).send({
        status: "fail",
        message: `User with username: ${dataInput.username} Already Exist`,
      });
    }
    // End CheckUsernameAlreadyExist

    const insertToDatabase = await UserModel.create({
      id: uuidv4(),
      email: dataInput.email,
      username: dataInput.username,
      password: await bcrypt.hash(dataInput.password, 10),
      fullname: dataInput.fullname,
      jabatan: dataInput.jabatan,
      noHp: dataInput.noHp,
      level: "karyawan",
    });

    if (!insertToDatabase) {
      return res.status(400).send({
        status: "fail",
        message: `Add User Fail`,
      });
    }

    return res.send({
      status: "success",
      message: `Add user Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const dataInput = req.body;
    const userDecode = req.user;

    // GetUserById
    const userById = await UserModel.findOne({
      where: {
        id: userDecode.id,
      },
    });
    if (!userById) {
      return res.status(400).send({
        status: "fail",
        message: `User tidak ditemukan`,
      });
    }
    // End GetUserById

    // ValidationInput
    const validationInput = joi.object({
      email: joi.string().required().min(5).email(),
      username: joi.string().required().min(3),
      password: joi.string().required().min(5),
      fullname: joi.string().required().min(3),
      jabatan: joi.string().required().min(3),
      noHp: joi.string().required().min(11),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }
    // End ValidationInput

    return res.send({
      status: "success",
      message: `Edit profile Success`,
      user: userById,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};
