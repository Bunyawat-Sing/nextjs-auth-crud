import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", postSchema);

export default Post;
