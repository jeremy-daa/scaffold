import Post from "@/models/Post";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const uri = process.env.MONGODB_URI || "";

export async function POST(request: Request) {
  const body = await request.json();
  const { postId, commenter, email, content } = body;
  if (!postId || !content) {
    return NextResponse.json(
      { message: "Post ID and content are required" },
      { status: 400 }
    );
  }
  try {
    await mongoose.connect(uri);
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    const newComment = {
      commenter: commenter || "Anonymous",
      email: email || "",
      content: content || "",
      createdAt: new Date(),
    };
    existingPost.comments.push(newComment);

    await existingPost.save();

    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { message: `Internal Server Error: ${e.message}` },
      { status: 500 }
    );
  }
}
