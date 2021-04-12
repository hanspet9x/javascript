"use strict";

exports.errorResponse = (res, errCode, msg) => {
  // logger.error(msg);
  res.status(errCode).json({ err: msg });
};

exports.successResponse = (res, data) => {
  // logger.error(msg);
  res.status(200).json(data);
};