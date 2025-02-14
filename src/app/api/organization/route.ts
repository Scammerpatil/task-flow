import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";
import Organization from "@/models/Organisation";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
      email: string;
    };
    if (!data) {
      return NextResponse.redirect("/login");
    }
    const admin = await Admin.findOne({ email: data.email });
    if (!admin) {
      return NextResponse.redirect("/login");
    }
    const organization = await Organization.findOne({ admin: admin._id })
      .populate("admin")
      .populate("manager");
    return NextResponse.json({ organization }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
