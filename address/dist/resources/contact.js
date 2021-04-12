"use strict";

var _contact = require("../controllers/contact");

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 */
module.exports = app => {
  app.route("/contact/all").get(_contact2.default.all);
  app.route("/contact/get/:id").get(_contact2.default.get);
  app.route("/contact/create").post(_contact2.default.create);
  app.route("/contact/update").post(_contact2.default.update);
  app.route("/contact/remove").delete(_contact2.default.remove);
};