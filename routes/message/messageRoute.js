import { Router } from "express"
import messageController from "../../controllers/messageController.js";
import { isAuth, isMember } from "../../libs/authMiddleware.js";

const messageRoute = Router();

messageRoute.get("/", isAuth, isMember, messageController.get)
messageRoute.post("/", isAuth, isMember, messageController.post)

export default messageRoute;
