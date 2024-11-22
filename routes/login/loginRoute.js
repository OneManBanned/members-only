import { Router } from "express";

const loginRoute = Router();

loginRoute.get("/", (req, res) => res.render("login.html"))

export default loginRoute;
