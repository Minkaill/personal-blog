import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
      // required - обязательно
    fullName: {
      type: String,
      required: true,
    },
    // unique - уникальная почта
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  // Дата создания юзера и обновления
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
