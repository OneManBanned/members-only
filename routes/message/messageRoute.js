import { Router } from "express"
import messageController from "../../controllers/messageController.js";
import { isAuth } from "../../libs/authMiddleware.js";

const messageRoute = Router();

messageRoute.get("/", isAuth,  messageController.get)
messageRoute.post("/", isAuth,  messageController.post)

export default messageRoute;
