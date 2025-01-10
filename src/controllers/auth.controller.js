import { token } from "morgan";
import createHttpError from "http-errors";
import {
  createUser,
  getRefreshToken,
  signUser,
} from "../services/auth.service.js";
import { getNewTokens } from "../utils/getNewTokens.js";
import { replaceMongoIdInObject } from "../utils/mongoDB.utils.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, password } = req.body || {};
    const newUser = await createUser({
      name,
      email,
      picture,
      password,
    });

    const { accessToken, refreshToken } = getNewTokens(
      replaceMongoIdInObject(newUser)
    );

    return res.status(201).json({
      user: replaceMongoIdInObject(newUser),
      token: { accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const user = await signUser(email, password);

    const { accessToken, refreshToken } = getNewTokens(
      replaceMongoIdInObject(user)
    );

    return res.status(200).json({
      user: replaceMongoIdInObject(user),
      token: { accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      throw createHttpError.BadRequest("Please provide refreshToken");
    }

    const result = await getRefreshToken(refreshToken);

    // console.log("result = ", result);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
