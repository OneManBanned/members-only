import { Router } from "express";
import passport from "passport";
import loginController from "../../controllers/loginController.js";

const loginRoute = Router();

loginRoute.get("/", loginController.get)
loginRoute.get("/failure", (req, res) => res.send("login failed"))
loginRoute.post("/", loginController.post, passport.authenticate('local', { failureRedirect: '/login/failure', successRedirect: '/'}))

export default loginRoute;
