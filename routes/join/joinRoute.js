import { Router } from "express";
import joinController from "../../controllers/joinController.js";
import isAuth from "../../libs/authMiddleware.js";

const joinRoute = Router();

joinRoute.get("/", isAuth, joinController.get)
joinRoute.post("/:id", isAuth, joinController.post)

export default joinRoute;
