import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: String,
    fileAttached: String,
    comments: [
      {
        commenter: String,
        email: String,
        content: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { collection: "posts" }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
