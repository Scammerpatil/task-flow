import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Team from "@/models/Team";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  if (!data) {
    return NextResponse.redirect("/login");
  }
  try {
    const team = await Team.findOne({ manager: data.id }).populate("members");
    const members = team?.members;
    return NextResponse.json({ team, members }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
