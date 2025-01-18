import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "Conversation",
    },
    files: [],
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.MessageModel ?? mongoose.model("Message", messageSchema);

export default MessageModel;
