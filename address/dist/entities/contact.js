"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ContactSchema = exports.ContactSchema = new _mongoose.Schema({
  name: String,
  phone: Number,
  email: String
}, { collection: "contacts" });

exports.default = _mongoose2.default.model("Contact", ContactSchema);