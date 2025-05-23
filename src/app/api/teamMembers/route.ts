import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Manager from "@/models/Manager";
import Team from "@/models/Team";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const team = await Team.findOne({ manager: data.id }).populate("members");
    const teamMembers = team?.members;
    return NextResponse.json({ teamMembers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
