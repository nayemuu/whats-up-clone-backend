import createHttpError from "http-errors";
import { MessageModel } from "../models/index.js";

export const createMessage = async (data) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return newMessage;
};

export const populateMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender", // target field name
      select: "name picture",
      model: "User", // target field is form which model
    })
    .populate({
      path: "conversation", // target field name
      select: "name picture isGroup users",
      model: "Conversation", // target field is form which model
      populate: {
        path: "users", // target field name
        select: "name email picture status",
        model: "User", // target field is form which model
      },
    });
  if (!msg) throw createHttpError.BadRequest("Oops...Something went wrong !");
  return msg;
};
