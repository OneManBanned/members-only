import { body } from "express-validator";

export const signUpValidation = [
  body(["firstname", "lastname"])
    .trim()
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({ max: 255 })
    .withMessage("must contain fewer than 255 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({ max: 255 })
    .withMessage("must contain fewer than 255 characters")
    .isEmail()
    .withMessage("must be a valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({ max: 255, min: 8 })
    .withMessage("must contain fewer than 255 characters"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({ max: 255, min: 8 })
    .withMessage("must contain fewer than 255 characters")
    .custom((pw, {req}) => pw === req.body.password)
    .withMessage("passwords must match"),
];
