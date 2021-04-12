/**

 * A simple CRUD controller for contacts
 * Create the necessary controller methods
 */

import { authorize } from "./auth";
import Contact from "./../entities/contact";

export const all = (req, res) => {
  isAuthorized(req, res, () => {
    Contact.find({}, (err, contacts) => {
      if (err) return res.status(400).json({ err: err.message });

      res.status(200).json(contacts);
    });
  });
};

export const get = (req, res) => {
  isAuthorized(req, res, () => {
    const { id } = req.params;

    if (id) {
      Contact.findOne({ _id: id }, (err, data) => {
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
    if (email || (name && phone)) {
      Contact.create(
        { email: email, name: name, phone: phone },
        (err, contact) => {
          if (err) return res.status(400).json({ err: err.message });
          res.status(200).json(contact);
        }
      );
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

      Contact.findByIdAndUpdate(id, data, { new: true }, (err, resp) => {
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
      Contact.findByIdAndDelete(id, (err) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(200).json({ status: `Records with id ${id} was deleted.` });
      });
    } else {
      res.status(400).json({ err: "Id is required." });
    }
  });
};

const isAuthorized = (req, res, success) => {
  authorize(req, (e, count) => {
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

export default {
  // get all contacts for a user
  all,
  // get a single contact
  get,
  // create a single contact
  create,
  // update a single contact
  update,
  // remove a single contact
  remove,
};
