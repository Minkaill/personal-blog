import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    // required - обязательно
    title: {
      type: String,
      required: true,
    },
    // unique - уникальная почта
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Article", ArticleSchema);
