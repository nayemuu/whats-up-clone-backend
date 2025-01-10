import createHttpError from "http-errors";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { getNewTokens } from "../utils/getNewTokens.js";

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  //   check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }

  //check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 30,
    })
  ) {
    throw createHttpError.BadRequest(
      "Plase make sure your name is between 2 and 30 characters."
    );
  }

  //check if email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email address."
    );
  }

  //check if user already exist
  const isUserExists = await UserModel.findOne({ email });
  if (isUserExists) {
    throw createHttpError.Conflict(
      "Please try again with a different email address, this email already exist."
    );
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // console.log("newUser = ", newUser);
  const newObj = newUser._doc;
  delete newObj.password;

  // console.log("newObj = ", newObj);
  return newObj;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email }).lean();

  //check if user exist
  if (!user) throw createHttpError.NotFound("Invalid credentials.");

  //compare passwords
  let passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) throw createHttpError.NotFound("Invalid credentials.");

  const newObj = { ...user };
  delete newObj.password;

  return newObj;
};

export const getRefreshToken = async (refreshToken) => {
  // check if refresh token valid
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  if (!decoded) {
    throw createHttpError.BadRequest("Invalid refresh token");
  }

  if (decoded.type !== "refresh") {
    throw createHttpError.BadRequest("Invalid token type");
  }

  // check if user exists
  const user = await UserModel.findById(decoded.id);

  if (!user) {
    throw createHttpError.BadRequest("User not found");
  }

  const token = getNewTokens(user);

  return token;
};
