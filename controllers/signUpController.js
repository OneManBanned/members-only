import { validationResult } from "express-validator";
import { signUpValidation } from "../libs/serverValidation.js";


const controller = {
  getSignUp: (req, res) => {
    res.render("signUp.html", { errors: {}, values: {} });
  },

  postSignUp: [
    signUpValidation,
    (req, res) => {
      const { firstname, lastname, email, password, confirmPassword } = req.body;

      const valid = validationResult(req);

      if (!valid.isEmpty()) {

        const errorsMap = createErrorsMap(valid.errors);
        res.render("signUp.html", { errors: errorsMap, values: req.body});

      } else {
        console.log(valid.errors);
        try {
          // put user into database
        } catch (err) {
          // show error page
        }

        res.redirect("/login");
      }
    },
  ],
};


function createErrorsMap(errors) {
  const errorsObj = {};
  for (let error of errors) {
    errorsObj[error.path] = error.msg;
  }
  return errorsObj;
}

export default controller;
