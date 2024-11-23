import { validationResult } from "express-validator";
import { signUpValidation } from "../libs/serverValidation.js";
import { genPassword } from "../libs/passportUtils.js";
import asyncHandler from "express-async-handler";
import db from "../config/db/queries.js";

const signUpController = {
    get: (req, res) => {
        res.render("signUp.html", { errors: {}, values: {} });
    },

    post: [
        signUpValidation,
        asyncHandler(async (req, res) => {

            const valid = validationResult(req);

            if (!valid.isEmpty()) {
                const errorsMap = createErrorsMap(valid.errors);
                res.render("signUp.html", { errors: errorsMap, values: req.body });
            }

            const { firstname, lastname, email, password } = req.body;

            const saltHash = genPassword(password)

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            await db.insertUser(firstname, lastname, email, hash, salt)

            res.redirect("/login");
        }),
    ],
};

function createErrorsMap(errors) {
    const errorsObj = {};
    for (let error of errors) {
        errorsObj[error.path] = error.msg;
    }
    return errorsObj;
}

export default signUpController;
