import express from "express";
import trimRequest from "trim-request";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const route = express.Router();

route.post("/", trimRequest.all, authMiddleware, sendMessage);
route.get("/:convo_id", trimRequest.all, authMiddleware, getMessages);

export default route;
