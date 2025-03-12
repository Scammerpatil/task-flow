import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Manager from "@/models/Manager";
import Project from "@/models/Project";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  if (!user) {
    return NextResponse.redirect("/login");
  }
  try {
    const manager = await Manager.findById(user.id).populate("organization");
    if (!manager) {
      return NextResponse.redirect("/login");
    }
    const projects = await Project.find({
      organization: manager.organization,
    }).populate("tasks");
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
