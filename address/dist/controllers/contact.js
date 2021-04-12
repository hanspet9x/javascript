"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.all = undefined;

var _auth = require("./auth");

var _contact = require("./../entities/contact");

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**

 * A simple CRUD controller for contacts
 * Create the necessary controller methods
 */

const all = exports.all = (req, res) => {
  isAuthorized(req, res, () => {
    _contact2.default.find({}, (err, contacts) => {
      if (err) return res.status(400).json({ err: err.message });

      res.status(200).json(contacts);
    });
  });
};

const get = exports.get = (req, res) => {
  isAuthorized(req, res, () => {
    const { id } = req.params;

    if (id) {
      _contact2.default.findOne({ _id: id }, (err, data) => {
        if (err) return res.status(400).json({ err: err.message });
        res.status(200).json(data);
      });
    } else {
      res.status(400).json({ err: "An identity is required." });
    }
  });
};

const create = (req, res) => {
  isAuthorized(req, res, () => {
    const { email, name, phone } = req.body;
    if (email || name && phone) {
      _contact2.default.create({ email: email, name: name, phone: phone }, (err, contact) => {
        if (err) return res.status(400).json({ err: err.message });
        res.status(200).json(contact);
      });
    } else {
      res.status(400).json({ err: "Email, name or phone invalid." });
    }
  });
};

const update = (req, res) => {
  isAuthorized(req, res, () => {
    const { id } = req.body;

    if (id) {
      let data = {};
      for (const key in req.body) {
        if (id != req.body[key]) {
          data[key] = req.body[key];
        }
      }

      _contact2.default.findByIdAndUpdate(id, data, { new: true }, (err, resp) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(200).json(resp);
      });
    } else {
      res.status(400).json({ err: "Id is required." });
    }
  });
};

const remove = (req, res) => {
  isAuthorized(req, res, () => {
    const { id } = req.body;
    if (id) {
      _contact2.default.findByIdAndDelete(id, err => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(200).json({ status: `Records with id ${id} was deleted.` });
      });
    } else {
      res.status(400).json({ err: "Id is required." });
    }
  });
};

const isAuthorized = (req, res, success) => {
  (0, _auth.authorize)(req, (e, count) => {
    if (e) return res.status(401).json({ err: e.message });
    success(count);
  });
};

/* 
authorize(req, (e, id) => {
    if (e) return res.status(401).json({ err: e.message });
  
    Contact.find({}, (err, contacts) => {
      if (err) return res.status(400).json({ err: err.message });
  
      res.status(200).json(contacts);
    });
  });
*/

exports.default = {
  // get all contacts for a user
  all,
  // get a single contact
  get,
  // create a single contact
  create,
  // update a single contact
  update,
  // remove a single contact
  remove
};