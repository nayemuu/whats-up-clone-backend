import createHttpError from "http-errors";
import { logger } from "../configs/logger.config.js";
import {
  createConversation,
  doesConversationExist,
} from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

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
      throw createHttpError.BadRequest("please provide the receiver_id");
    }

    //check if chat exists
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id,
      false
    );

    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let receiver_user = await findUser(receiver_id);
      let convoData = {
        name: receiver_user.name,
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversation(convoData);

      res.json(newConvo);
    }
  } catch (error) {
    next(error);
  }
};
