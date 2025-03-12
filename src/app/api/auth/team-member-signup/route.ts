import dbConfig from "@/middlewares/db.config";
import Manager from "@/models/Manager";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Organization from "@/models/Organisation";
import TeamMember from "@/models/TeamMember";
import Team from "@/models/Team";

dbConfig();
export async function POST(req: NextRequest) {
  const { formData } = await req.json();

  try {
    const exisitingTeamMember = await TeamMember.findOne({
      email: formData.email,
    });
    if (exisitingTeamMember) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const encryptedPassword = await bcrypt.hash(formData.password, 12);
    const newTeamMember = new TeamMember({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: encryptedPassword,
      role: formData.role,
      profileImage: formData.profileImage,
    });
    const team = await Team.findById(formData.team);
    if (!team) {
      return NextResponse.json(
        { message: "Team does not exist" },
        { status: 400 }
      );
    }
    await newTeamMember.save();
    team.members.push(newTeamMember._id);
    await team.save();

    return NextResponse.json(
      { message: "Manager created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
