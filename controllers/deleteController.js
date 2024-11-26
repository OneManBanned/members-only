import db from "../config/db/queries.js";
import asyncHandler from "express-async-handler";
import { param, validationResult } from "express-validator";
import { CustomBadRequestError } from "../utils/errors.js";

const validateDelete = [param("id").exists().isInt()];

const deleteController = {
  post: [
    validateDelete,
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;

      const valid = validationResult(req);

      if (!valid.isEmpty()) {
          throw new CustomBadRequestError()
      }

      await db.deleteMessage(id);

      res.redirect("/");
    }),
  ],
};

export default deleteController;
