import { Router } from "express";
import signUpController from "../../controllers/signUpController.js";

const signUpRoute = Router();

signUpRoute.get("/", signUpController.get);
signUpRoute.post("/", signUpController.post);

export default signUpRoute;
