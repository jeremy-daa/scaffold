import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAuthSession } from "@/lib/authOptions";
import Post from "@/models/Post";

const uri = process.env.MONGODB_URI || "";

export async function GET(request: NextRequest) {
  const id = request.url.split("api/posts/")[1];
  try {
    await mongoose.connect(uri, {
      dbName: "main",
    });
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: `Internal Server Err ${e.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.url.split("api/posts/")[1];
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    await mongoose.connect(uri, {
      dbName: "main",
    });
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: `Internal Server Err ${e.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const id = request.url.split("api/posts/")[1];
  const session = await getAuthSession();
  const body = await request.json();
  if (!session?.user) {
    return NextResponse.json(
      { message: "User not authenticated!" },
      { status: 401 }
    );
  } else {
    const { title, content, image, fileAttached } = body;
    try {
      await mongoose.connect(uri);
      const existingPost = await Post.findById(id);

      if (!existingPost) {
        return NextResponse.json(
          { message: "Post not found" },
          { status: 404 }
        );
      }

      const updateObj: any = {};
      if (typeof title !== "undefined" && title !== null && title !== "") {
        updateObj["title"] = title;
      }
      if (
        typeof content !== "undefined" &&
        content !== null &&
        content !== ""
      ) {
        updateObj["content"] = content;
      }
      if (typeof image !== "undefined" && image !== null && image !== "") {
        updateObj["image"] = image;
      }
      if (
        typeof fileAttached !== "undefined" &&
        fileAttached !== null &&
        fileAttached !== ""
      ) {
        updateObj["fileAttached"] = fileAttached;
      }

      await Post.findByIdAndUpdate(id, updateObj);

      return NextResponse.json(
        { message: "Post updated successfully" },
        { status: 200 }
      );
    } catch (e: any) {
      console.log(e);
      return NextResponse.json(
        { message: `Internal Server Err ${e.message}` },
        { status: 500 }
      );
    }
  }
}
