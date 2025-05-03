import Admin from "@/models/Admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import Manager from "@/models/Manager";
import TeamMember from "@/models/TeamMember";

dbConfig();

export async function POST(req: NextRequest) {
  const { formData } = await req.json();
  if (formData.role === "admin") {
    // Find Admin
    const admin = await Admin.findOne({ email: formData.email });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }
    const isMatch = bcrypt.compareSync(formData.password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }
    const data = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      profileImage: admin.profileImage,
      isApproved: true,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET!);
    const response = NextResponse.json({
      message: "Login Successful",
      token,
      route: "/admin/dashboard",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } else if (formData.role === "manager") {
    // Find Manager
    const manager = await Manager.findOne({ email: formData.email });
    if (!manager) {
      return NextResponse.json(
        { message: "Manager not found" },
        { status: 404 }
      );
    }
    const isMatch = bcrypt.compareSync(formData.password, manager.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }
    const data = {
      id: manager._id,
      name: manager.name,
      email: manager.email,
      role: manager.role,
      isApproved: manager.isApproved,
      profileImage: manager.profileImage,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET!);
    const response = NextResponse.json({
      message: "Login Successful",
      token,
      route: "/manager/dashboard",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } else if (formData.role === "team_member") {
    // Find Manager
    const teamMember = await TeamMember.findOne({ email: formData.email });
    if (!teamMember) {
      return NextResponse.json(
        { message: "Team Member not found" },
        { status: 404 }
      );
    }
    // Compare Password
    const isMatch = bcrypt.compareSync(formData.password, teamMember.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }
    const data = {
      id: teamMember._id,
      name: teamMember.name,
      email: teamMember.email,
      role: teamMember.role,
      isApproved: teamMember.isApproved,
      profileImage: teamMember.profileImage,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET!);
    const response = NextResponse.json({
      message: "Login Successful",
      token,
      route: "/team-member/dashboard",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }
}
