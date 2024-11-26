import { validationResult } from "express-validator";
import { signUpValidation } from "../libs/serverValidation.js";
import { genPassword } from "../libs/passportUtils.js";
import asyncHandler from "express-async-handler";
import db from "../config/db/queries.js";
import { createErrorsMap } from "../utils/createErrorMap.js";

const signUpController = {
    get: (req, res) => {
        res.render("signUp.html", { errors: {}, values: {} });
    },

    post: [
        signUpValidation,
        asyncHandler(async (req, res) => {

            console.log(req.body)

            const valid = validationResult(req);

            if (!valid.isEmpty()) {
                const errorsMap = createErrorsMap(valid.errors);
                res.render("signUp.html", { errors: errorsMap, values: req.body });
            } else {

            const { firstname, lastname, email, password, isAdmin } = req.body;

            const saltHash = genPassword(password)

            const salt = saltHash.salt;
            const hash = saltHash.hash;
            const admin = isAdmin ? isAdmin : false

            await db.insertUser(firstname, lastname, email, hash, salt, admin )

            res.redirect("/login");
            }
        }),
    ],
};


export default signUpController;
