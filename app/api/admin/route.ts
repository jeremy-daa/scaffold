import Admin from "@/models/Admin";
import {
  compareHash,
  createRandomString,
  hashPassword,
} from "@/utils/functions";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI || "";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password, email, fullName, key } = body;
  const hashKey = hashPassword(
    process.env.NEXTAUTH_SECRET || createRandomString(30)
  );
  if (await compareHash(key, hashKey)) {
    if (!username || !password || !email || !fullName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    } else {
      try {
        await mongoose.connect(uri);
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
          return NextResponse.json(
            { error: "Username already exists" },
            { status: 400 }
          );
        }
        const admin = new Admin({
          username,
          password: await hashPassword(password),
          email: email,
          fullName: fullName,
        });
        await admin.save();
      } catch (e: any) {
        return NextResponse.json(
          { message: `Internal Server Err ${e.message}` },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ message: "Admin Created" }, { status: 201 });
  } else {
    return NextResponse.json({ error: "Invalid Key" }, { status: 400 });
  }
}
export async function PUT(request: Request) {
  const body = await request.json();
  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  } else {
    try {
      await mongoose.connect(uri);
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 404 });
      } else {
        if (await compareHash(password, admin.password)) {
          return NextResponse.json({ status: true, admin }, { status: 200 });
        } else {
          return NextResponse.json(
            { error: "Invalid Password" },
            { status: 400 }
          );
        }
      }
    } catch (e: any) {
      return NextResponse.json(
        { message: `Internal Server Err ${e.message}` },
        { status: 500 }
      );
    }
  }
}
