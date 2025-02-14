import dbConfig from "@/middlewares/db.config";
import Admin from "@/models/Admin";
import Manager from "@/models/Manager";
import TeamMember from "@/models/TeamMember";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export interface Data {
  id: String;
  email: String;
  role: String;
}

export async function GET(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value || req.headers.get("authorization");
  if (!token) {
    return NextResponse.json({ error: "No token found" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as Data;
    if (!data) {
      return NextResponse.json({ error: "Invalid token" });
    }
    if (data.role === "admin") {
      const admin = await Admin.findById({ _id: data.id });
      return NextResponse.json({ data: admin }, { status: 200 });
    } else if (data.role === "manager") {
      const manager = await Manager.findById({ _id: data.id });
      return NextResponse.json({ data: manager }, { status: 200 });
    } else if (data.role === "team-member") {
      const teamMember = await TeamMember.findById({ _id: data.id });
      return NextResponse.json({ data: teamMember }, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 401 });
  }
}
