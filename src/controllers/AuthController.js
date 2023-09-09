const { User: UserModel } = require("../../models");
const joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    const validationInput = joi.object({
      email: joi.string().required().min(5).email(),
      password: joi.string().required().min(5),
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
    if (!dataUserByEmail) {
      return res.status(400).send({
        status: "fail",
        message: `User with email: ${dataInput.email} Not Found`,
      });
    }
    // End CheckEmailAlreadyExist

    // ComparePassword
    const comparePassword = await bcrypt.compare(
      dataInput.password,
      dataUserByEmail.password
    );
    if (!comparePassword) {
      return res.status(400).send({
        status: "fail",
        message: `Wrong Password`,
      });
    }
    // End ComparePassword

    // MakeToken
    const token = jwt.sign(
      {
        id: dataUserByEmail.id,
      },
      process.env.ACCESS_SECRET_KEY
    );
    // End MakeToken

    return res.send({
      status: "success",
      message: `Login Success`,
      user: {
        id: dataUserByEmail.id,
        email: dataUserByEmail.email,
        username: dataUserByEmail.username,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};

exports.checkToken = async (req, res) => {
  try {
    const userDecode = req.user;

    // CheckUserById
    const dataUserById = await UserModel.findOne({
      where: {
        id: userDecode.id,
      },
    });
    if (!dataUserById) {
      return res.status(400).send({
        status: "fail",
        message: `User Not Found`,
      });
    }
    // End CheckUserById

    return res.send({
      status: "success",
      message: `Authorization Success`,
      userDecode,
      user: {
        id: dataUserById.id,
        email: dataUserById.email,
        username: dataUserById.username,
        fullname: dataUserById.fullname,
        jabatan: dataUserById.jabatan,
        noHp: dataUserById.noHp,
        photo: dataUserById.photo,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};
