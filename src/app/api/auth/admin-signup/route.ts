import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";

dbConfig();

export async function POST(req: NextRequest) {
  const { formData } = await req.json();
  try {
    const exisitingAdmin = await Admin.findOne({ email: formData.email });
    if (exisitingAdmin) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(formData.password, 12);
    const newAdmin = new Admin({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: hashedPassword,
      role: formData.role,
      profileImage: formData.profileImage,
    });
    await newAdmin.save();
    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
