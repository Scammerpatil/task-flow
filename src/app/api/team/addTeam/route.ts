import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Team from "@/models/Team";
import Manager from "@/models/Manager";
import Organization from "@/models/Organisation";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  const manager = await Manager.findById(data.id);
  const { name, domain } = await req.json();
  if (!name || !domain) {
    return NextResponse.json(
      { error: "Please provide all fields" },
      { status: 400 }
    );
  }
  try {
    const team = new Team({
      name,
      domain,
      manager: data.id,
    });
    await team.save();
    const organization = await Organization.findById(manager.organization);
    organization.teams.push(team._id);
    await organization.save();
    return NextResponse.json(
      { message: "Team Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
