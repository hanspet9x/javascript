import Contact from "../controllers/contact";
/**
 *
 *
 */
module.exports = (app) => {
  app.route("/contact/all").get(Contact.all);
  app.route("/contact/get/:id").get(Contact.get);
  app.route("/contact/create").post(Contact.create);
  app.route("/contact/update").post(Contact.update);
  app.route("/contact/remove").delete(Contact.remove);
};
