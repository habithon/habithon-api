const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];

  if (header) {
    const token = header.split(" ")[1];

    jwt.verify(token, process.env["SECRET_PASSWORD"], (err, data) => {
      if (err) {
        res.status(401).json({ success: false, message: "Invalid token" });
      } else {
        req.body.token = token;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "This route requires authorization" });
  }
}

module.exports = verifyToken;
