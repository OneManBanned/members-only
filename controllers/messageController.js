import asyncHandler from "express-async-handler";
import db from "../config/db/queries.js";
import timestampFormatter from "../utils/timestampFormatter.js";
import { body, validationResult } from "express-validator";

const validateMessage = [body("title").exists(), body("message").exists()];

const messageController = {
    get: (req, res) => {
        res.render("message.html");
    },
    post: [
        validateMessage,
        asyncHandler(async (req, res) => {

            const valid = validationResult(req);

            if (!valid.isEmpty()) {
            }

            const { title, message } = req.body;
            const { user_id: author } = req.user;
            const timestamp = timestampFormatter()

            await db.createMessage(title, message, author, timestamp);

            res.redirect("/")
        }),
    ],
};


export default messageController;
