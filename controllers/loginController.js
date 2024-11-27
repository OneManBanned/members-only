import { body, validationResult } from "express-validator";
import { createErrorsMap } from "../utils/createErrorMap.js";

const validateLogin = [
  body("email").notEmpty().withMessage("required"),
  body("password").notEmpty().withMessage("required").isLength({ min: 8 }),
];

const loginController = {
  get: (req, res) => res.render("login.html", { errors: {}, values: {} }),
  post: [
    validateLogin,
    (req, res, next) => {
      const valid = validationResult(req);

      if (!valid.isEmpty()) {
        const errorsMap = createErrorsMap(valid.errors);
        res.render("login.html", { errors: errorsMap, values: req.body });
      } else {
        next();
      }
    },
  ],
};

export default loginController;
