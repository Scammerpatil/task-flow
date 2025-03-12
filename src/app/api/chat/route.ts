import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import Team from "@/models/Team";
import Chat from "@/models/Chat";
dbConfig();
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  const team = await Team.findOne({ members: data.id });
  try {
    const chat = await Chat.findOne({ team: team._id })
      .populate("team")
      .populate("messages.sender");
    if (chat) {
      return NextResponse.json(
        { message: "Chat Found", chat },
        { status: 200 }
      );
    }
    const newChat = new Chat({
      team,
    });
    await newChat.save();
    return NextResponse.json({ message: "Chat Found", chat }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
