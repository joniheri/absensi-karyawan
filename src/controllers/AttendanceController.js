const {
  Attendance: AttendanceModel,
  Attendanceconfig: AttendanceconfigModel,
} = require("../../models");
const joi = require("joi");
const { v4: uuidv4 } = require("uuid");

exports.getAttendanceByUser = async (req, res) => {
  try {
    const userDecode = req.user;

    // GetAttendanceByUserId
    const attendanceByUserid = await AttendanceModel.findAll({
      where: {
        userId: userDecode.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    // End GetAttendanceByUserId

    return res.send({
      status: "success",
      message: `Get user Success`,
      attendanceByUserid,
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
    const dataInput = req.body;

    const dateNow = new Date();
    const tanggalSekarang = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`;
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
    const dataInput = req.body;

    const dateNow = new Date();
    const tanggalSekarang = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`;
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
