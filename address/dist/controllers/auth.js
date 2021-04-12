"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.forgotPassword = exports.signup = exports.login = exports.secret = undefined;

var _user = require("./../entities/user");

var _user2 = _interopRequireDefault(_user);

var _logger = require("../utils/logger");

var _logger2 = _interopRequireDefault(_logger);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const secret = exports.secret = process.env["SECRET"];

/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */

const login = exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    _user2.default.findOne({ username: username }, (e, user) => {
      if (e) return errorResponse(res, 400, e.message);

      let validPassword = _bcryptjs2.default.compareSync(password, user.password);

      if (!validPassword) return errorResponse(res, 400, "Invalid username or password.");

      successResponse(res, {
        user: { username: user.username },
        token: getToken(user)
      });
    });
  } else {
    errorResponse(res, 400, "Invalid username or password");
  }
};
/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
const signup = exports.signup = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    console.log(username, password);
    _user2.default.create({ username: username, password: password }, (e, user) => {
      if (e) {
        return errorResponse(res, 500, e.message);
      }

      successResponse(res, {
        user: { username: user.username },
        token: getToken(user)
      });
    });
    return;
  }

  errorResponse(res, 400, "Invalid Username or Password.");
};
/**
 * Implement a way to recover user accounts
 */
const forgotPassword = exports.forgotPassword = (req, res) => {};

const authorize = exports.authorize = (req, callback) => {
  verifyTokenId(req, callback);
};

const verifyTokenId = (req, callback) => {
  const { token } = req.body;

  if (token) {
    _logger2.default.info("token is valid.");

    _jsonwebtoken2.default.verify(token, secret, (e, code) => {
      if (e) {
        _logger2.default.error("Invalid token.");
        callback(new Error("Invalid token."), null);
      } else {
        _user2.default.countDocuments({ _id: code.id }, (e, count) => {
          if (e) {
            callback(e, null);
          } else {
            _logger2.default.info("Count of user");
            _logger2.default.info(count);
            if (count >= 1) {
              callback(false, count);
            } else {
              callback(new Error("An error occured."), count);
            }
          }
        });
      }
    });
  } else {
    _logger2.default.error("Token is required.");
    callback(new Error("Token is required."), null);
  }
};

const errorResponse = (res, errCode, msg) => {
  // logger.error(msg);
  res.status(errCode).json({ err: msg });
};

const successResponse = (res, data) => {
  // logger.error(msg);
  res.status(200).json(data);
};

const getToken = ({ _id }) => {
  return _jsonwebtoken2.default.sign({ id: _id }, secret);
};

exports.default = {
  login,
  signup,
  forgotPassword
};