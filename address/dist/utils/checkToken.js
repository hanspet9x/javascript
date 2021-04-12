"use strict";

var _auth = require("./../controllers/auth");

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  console.log("Enter");
  const { token } = req.body;

  if (token) {
    _logger2.default.info("token is valid.");

    jwt.verify(token, _auth.secret, (e, code) => {
      if (e) return res.status(500).json({ err: e.message });

      req.userId = code.id;

      next();
    });
  } else {
    _logger2.default.error("Token is required.");

    res.status(400).json({ err: "Token is required." });
  }
};