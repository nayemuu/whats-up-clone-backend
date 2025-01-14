import createHttpError from "http-errors";
import { logger } from "../configs/logger.config.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.user.id;
    const { receiver_id } = req.body;

    console.log("sender_id = ", sender_id);
    console.log("receiver_id = ", receiver_id);

    //check if receiver_id is provided
    if (!receiver_id) {
      logger.error(
        "please provide the user id you wanna start a conversation with !"
      );
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    }

    //check if chat exists
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id,
      false
    );

    res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
