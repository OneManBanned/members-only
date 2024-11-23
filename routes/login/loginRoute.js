import { Router } from "express";
import passport from "passport";
import loginController from "../../controllers/loginController.js";

const loginRoute = Router();

loginRoute.get("/", loginController.get)
loginRoute.post("/", passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success'}))

export default loginRoute;
