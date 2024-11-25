import { Router } from "express";
import indexController from "../controllers/indexController.js";

const indexRoute = Router();

indexRoute.get("/", indexController.get)

export default indexRoute;
