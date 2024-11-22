import { Router } from "express";
import controller from "../../controllers/signUpController.js";

const signUpRoute = Router();

signUpRoute.get("/", controller.getSignUp);
signUpRoute.post("/", controller.postSignUp);

export default signUpRoute;
