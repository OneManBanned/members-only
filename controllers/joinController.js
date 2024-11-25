import db from "../config/db/queries.js";
import asyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";

const validateMembershipStatus = [
    body("membership_status").trim().exists().custom(value => (value === 'true' || value === 'false')),
    param("id").exists().toInt(),
];

const joinController = {
    get: (req, res) => res.render("join.html", { userId: req.user.user_id }),
    post: [
        validateMembershipStatus,
        asyncHandler(async (req, res, next) => {

            const valid = validationResult(req);

            if (!valid.isEmpty()) {
                console.log("HIT: ", valid)
            }

            await db.updateUserMembership(req.body.membership_status, req.params.id);

            res.redirect("/");
        }),
    ],
};

export default joinController;
