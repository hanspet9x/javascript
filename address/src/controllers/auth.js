import User from "./../entities/user";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const secret = process.env["SECRET"];

/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */

export const login = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    User.findOne({ username: username }, (e, user) => {
      if (e) return errorResponse(res, 400, e.message);

      let validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword)
        return errorResponse(res, 400, "Invalid username or password.");

      successResponse(res, {
        user: { username: user.username },
        token: getToken(user),
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
export const signup = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    console.log(username, password);
    User.create({ username: username, password: password }, (e, user) => {
      if (e) {
        return errorResponse(res, 500, e.message);
      }

      successResponse(res, {
        user: { username: user.username },
        token: getToken(user),
      });
    });
    return;
  }

  errorResponse(res, 400, "Invalid Username or Password.");
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {};

export const authorize = (req, callback) => {
  verifyTokenId(req, callback);
};

const verifyTokenId = (req, callback) => {
  const { token } = req.body;

  if (token) {
    logger.info("token is valid.");

    jwt.verify(token, secret, (e, code) => {
      if (e) {
        logger.error("Invalid token.");
        callback(new Error("Invalid token."), null);
      } else {
        User.countDocuments({ _id: code.id }, (e, count) => {
          if (e) {
            callback(e, null);
          } else {
            logger.info("Count of user");
            logger.info(count);
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
    logger.error("Token is required.");
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
  return jwt.sign({ id: _id }, secret);
};

export default {
  login,
  signup,
  forgotPassword,
};
