import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const { Schema } = mongoose;

const userSchema = new Schema(
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
        ref: "UserModel",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

const ConversationModel =
  mongoose.models.Conversation ?? mongoose.model("Conversation", userSchema);

export default ConversationModel;
