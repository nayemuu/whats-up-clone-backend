import createHttpError from "http-errors";
import validator from "validator";
import { userModel } from "../models/userModel.js";

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
  const isUserExists = await userModel.findOne({ email });
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

  const newUser = await userModel.create({
    name,
    email,
    password: password,
  });

  //   console.log("newUser = ", newUser);
  return newUser;
};
