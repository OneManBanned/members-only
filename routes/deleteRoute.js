import { Router } from "express";
import deleteController from "../controllers/deleteController.js"

const deleteRoute = Router();

deleteRoute.post("/:id", deleteController.post)

export default deleteRoute;
