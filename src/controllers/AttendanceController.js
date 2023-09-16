const {
  Attendance: AttendanceModel,
  Attendanceconfig: AttendanceconfigModel,
} = require("../../models");
const joi = require("joi");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.getAttendanceByUser = async (req, res) => {
  try {
    const userDecode = req.user;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // GetAttendanceByUserId
    const attendanceByUserid = await AttendanceModel.findAll({
      where: {
        userId: userDecode.id,
        dateAttendance: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    // End GetAttendanceByUserId

    return res.send({
      status: "success",
      message: `Get user Success`,
      data: attendanceByUserid,
      startDate,
      endDate,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};

exports.getAttendanceUserByEmail = async (req, res) => {
  try {
    const userDecode = req.user;
    const userId = req.params.userId;
    // const startDate = req.body.startDate;
    // const endDate = req.body.endDate;

    // GetAttendanceByUserId
    const attendanceByUserById = await AttendanceModel.findAll({
      where: {
        userId: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!attendanceByUserById) {
      return res.status(400).send({
        status: "fail",
        message: `Get Summary Absen User Not Found`,
      });
    }
    // End GetAttendanceByUserId

    return res.send({
      status: "success",
      message: `Get user Success`,
      data: attendanceByUserById,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};

exports.getAttendanceConfig = async (req, res) => {
  try {
    const dataAttendanceConfig = await AttendanceconfigModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.send({
      status: "success",
      message: `Get attendance config Success`,
      data: dataAttendanceConfig,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};

exports.takeAttendanceIn = async (req, res) => {
  try {
    const userDecode = req.user;

    const dateNow = new Date();
    const tanggalSekarang = `${dateNow.getFullYear()}-${
      dateNow.getMonth() + 1
    }-${dateNow.getDate()}`;
    const jamSekarang = `${dateNow.getHours()}.${dateNow.getMinutes()}.${dateNow.getSeconds()}`;

    // CheckSudahAbsenMasuk
    const attendanceInAlreadyExist = await AttendanceModel.findOne({
      where: {
        userId: userDecode.id,
        dateAttendance: tanggalSekarang,
        status: "masuk",
      },
    });
    if (attendanceInAlreadyExist) {
      return res.status(400).send({
        status: "fail",
        message: `Absen Masuk SUDAH DIAMBIL`,
      });
    }
    // End CheckSudahAbsenMasuk

    // InsertToDatabase
    const insertToDatabase = await AttendanceModel.create({
      id: uuidv4(),
      userId: userDecode.id,
      dateAttendance: tanggalSekarang,
      timeAttendance: jamSekarang,
      status: "masuk",
    });
    if (!insertToDatabase) {
      return res.status(400).send({
        status: "fail",
        message: `Ambil Absen Masuk GAGAL`,
      });
    }
    // End InsertToDatabase

    return res.send({
      status: "success",
      message: `Ambil Absen Masuk Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};

exports.takeAttendanceOut = async (req, res) => {
  try {
    const userDecode = req.user;

    const dateNow = new Date();
    const tanggalSekarang = `${dateNow.getFullYear()}-${
      dateNow.getMonth() + 1
    }-${dateNow.getDate()}`;
    const jamSekarang = `${dateNow.getHours()}.${dateNow.getMinutes()}.${dateNow.getSeconds()}`;

    // CheckSudahAbsenMasuk
    const attendanceInAlreadyExist = await AttendanceModel.findOne({
      where: {
        userId: userDecode.id,
        dateAttendance: tanggalSekarang,
        status: "pulang",
      },
    });
    if (attendanceInAlreadyExist) {
      return res.status(400).send({
        status: "fail",
        message: `Absen Pulang SUDAH DIAMBIL`,
      });
    }
    // End CheckSudahAbsenMasuk

    // InsertToDatabase
    const insertToDatabase = await AttendanceModel.create({
      id: uuidv4(),
      userId: userDecode.id,
      dateAttendance: tanggalSekarang,
      timeAttendance: jamSekarang,
      status: "pulang",
    });
    if (!insertToDatabase) {
      return res.status(400).send({
        status: "fail",
        message: `Ambil Absen Pulang GAGAL`,
      });
    }
    // End InsertToDatabase

    return res.send({
      status: "success",
      message: `Ambil Absen Pulang Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};
