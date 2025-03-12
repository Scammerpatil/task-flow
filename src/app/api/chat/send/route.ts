import Chat from "@/models/Chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chat, content, user } = await req.json();
  if (!chat || !content || !user) {
    return NextResponse.json(
      { message: "All Fields are required" },
      { status: 500 }
    );
  }
  try {
    const existingChat = await Chat.findOne({ _id: chat._id });
    const message = {
      sender: user,
      content: content,
    };
    existingChat.messages.push(message);
    await existingChat.save();
    return NextResponse.json({ message: "Message Posted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Oopps!! Something went wrong!!!" },
      { status: 500 }
    );
  }
}
