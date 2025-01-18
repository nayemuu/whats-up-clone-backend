import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Conversations name is required."],
      trim: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },

    users: [
      {
        type: ObjectId,
        ref: "User", // This User is reffering your User model name which you passed in mongoose.model() method
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "Message",
    },
    admin: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ConversationModel =
  mongoose.models.Conversation ??
  mongoose.model("Conversation", conversationSchema);

export default ConversationModel;
