import express from "express";
import trimRequest from "trim-request";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { create_open_conversation } from "../controllers/conversation.controller.js";
const route = express.Router();

route.post("/", trimRequest.all, authMiddleware, create_open_conversation);

export default route;
