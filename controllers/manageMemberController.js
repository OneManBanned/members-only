import db from "../config/db/queries.js";
import asyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { CustomBadRequestError } from "../utils/errors.js";

const validateMembershipStatus = [
    body("membership_status")
        .trim()
        .exists()
        .custom((value) => value === "true" || value === "false"),
    param("id").exists().toInt(),
];

const manageMemberController = {
    get: (req, res) => {
        const { membership_status } = req.user;
        res.render("manageMember.html", {
            userId: req.user.user_id,
            memberStatus: membership_status,
            value: !membership_status,
        });
    },
    post: [
        validateMembershipStatus,
        asyncHandler(async (req, res) => {
            const valid = validationResult(req);

            if (!valid.isEmpty()) {
                throw new CustomBadRequestError()
            }

            const { membership_status } = req.body
            await db.updateUserMembership(membership_status, req.params.id);

            res.redirect("/")
        }),
    ],
};

export default manageMemberController;
