import { Router } from "express";
import manageMemberController from "../../controllers/manageMemberController.js";
import { isAuth } from "../../libs/authMiddleware.js";

const manageMemberRoute = Router();

manageMemberRoute.get("/", isAuth, manageMemberController.get)
manageMemberRoute.post("/:id", isAuth, manageMemberController.post)

export default manageMemberRoute;
