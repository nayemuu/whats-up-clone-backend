import { token } from "morgan";
import { createUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      picture,
      password,
    });

    const accessToken = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refreshToken = await generateToken(
      { userId: newUser._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    return res
      .status(201)
      .json({ user: newUser, token: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    return res.status(200).json({ data: req.body });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "welcome to logout route" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "welcome to refreshToken route" });
  } catch (error) {
    next(error);
  }
};
