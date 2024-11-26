import asyncHandler from "express-async-handler";
import db from "../config/db/queries.js";
import timestampFormatter from "../utils/timestampFormatter.js";
import { body, validationResult } from "express-validator";
import { createErrorsMap } from "../utils/createErrorMap.js";

const validateMessage = [
    body("title").isLength({min: 1}).withMessage("required"),
    body("message").isLength({min: 1}).withMessage("required"),
];

const messageController = {
    get: (req, res) => {
        res.render("message.html", { errors: {}, values: {} });
    },
    post: [
        validateMessage,
        asyncHandler(async (req, res, next) => {
            const valid = validationResult(req);

            if (!valid.isEmpty()) {
                const errorsMap = createErrorsMap(valid.errors);
                res.render("message.html", { errors: errorsMap, values: req.body });
            } else {
                const { title, message } = req.body;
                const { user_id: author } = req.user;
                const timestamp = timestampFormatter();

                await db.createMessage(title, message, author, timestamp);

                res.redirect("/");
            }
        }),
    ],
};

export default messageController;
