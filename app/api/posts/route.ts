import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAuthSession } from "@/lib/authOptions";
import Post from "@/models/Post";

const defaultImage = "https://ibb.co/CtvqSNh";
const uri = process.env.MONGODB_URI || "";
export async function POST(request: Request) {
  const session = await getAuthSession();
  const body = await request.json();
  if (!session) {
    return NextResponse.redirect("/api/auth/signin");
  } else if (session.user.id === null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    const { title, content, image, fileAttached } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    try {
      await mongoose.connect(uri, {
        dbName: "main",
      });
      const userID = session.user.id;
      const newPost = new Post({
        title: title,
        content: content,
        author: userID,
        image: image || defaultImage,
        fileAttached: fileAttached || "",
      });
      const res = await newPost.save();
      if (res) {
        return NextResponse.json(
          { message: "Post added successfully" },
          { status: 200 }
        );
      }
    } catch (e: any) {
      console.log(e);
      NextResponse.json(
        { message: `Internal Server Err ${e.message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
}
export async function GET(request: Request) {
  try {
    await mongoose.connect(uri);
    const posts = await Post.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: `Internal Server Err ${e.message}` },
      { status: 500 }
    );
  }
}
