import createHttpError from "http-errors";
import { logger } from "../configs/logger.config.js";
import { createMessage, populateMessage } from "../services/message.service.js";
import { updateLatestMessage } from "../services/conversation.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const sender_id = req.user.id;
    const { message, convo_id, files } = req.body;
    if (!convo_id || (!message && !files)) {
      logger.error("Please provider a conversation id and a message body");
      throw createHttpError.BadRequest(
        "Please provider a conversation id and a message body"
      );
    }
    const msgData = {
      sender: sender_id,
      message,
      conversation: convo_id,
      files: files || [],
    };
    let newMessage = await createMessage(msgData);
    let populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(convo_id, newMessage);
    res.status(200).json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
