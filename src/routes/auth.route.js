import express from "express";
import trimRequest from "trim-request";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
const route = express.Router();

route.post("/register", trimRequest.all, register);
route.post("/login", trimRequest.all, login);
route.post("/logout", trimRequest.all, logout);
route.post("/refreshtoken", trimRequest.all, refreshToken);

export default route;
