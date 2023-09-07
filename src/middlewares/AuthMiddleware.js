const { User: UserModel } = require("../../models");
const jwt = require("jsonwebtoken");

exports.middleware = async (req, res, next) => {
  try {
    // CheckAuthorizationOnHeader
    const header = req.header("Authorization");
    if (!header) {
      return res.status(400).send({
        status: "fail",
        message: `Access Denied. Authorization required`,
      });
    }
    // End CheckAuthorizationOnHeader

    // CheckToken
    const token = header.replace("Bearer ", "");
    if (!token) {
      return res.status(400).send({
        status: "fail",
        message: `Access Denied. Token required`,
      });
    }
    // End CheckToken

    // VerifiedToken
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(403).send({
          status: "fail",
          message: `Access Denied. Verify Token Fail`,
        });
      }
      console.log("token decode: ", decode);
      req.user = decode;
      return next();
    });
    // End VerifiedToken
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "fail",
      message: `Error catch`,
    });
  }
};
