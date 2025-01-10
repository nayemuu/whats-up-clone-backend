import express from "express";
import trimRequest from "trim-request";
import {
  login,
  register,
  refreshToken,
} from "../controllers/auth.controller.js";
const route = express.Router();

route.post("/register", trimRequest.all, register);
route.post("/login", trimRequest.all, login);
route.post("/refresh-token", trimRequest.all, refreshToken);

export default route;
