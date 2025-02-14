import dbConfig from "@/middlewares/db.config";
import Manager from "@/models/Manager";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Organization from "@/models/Organisation";

dbConfig();
export async function POST(req: NextRequest) {
  const { formData } = await req.json();

  try {
    const exisitingManager = await Manager.findOne({ email: formData.email });
    if (exisitingManager) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const encryptedPassword = await bcrypt.hash(formData.password, 12);
    const newManager = new Manager({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: encryptedPassword,
      role: formData.role,
      profileImage: formData.profileImage,
      organization: formData.oraganization,
    });
    await newManager.save();
    const organisation = await Organization.findById(formData.oraganization);
    organisation.manager = newManager._id;
    await organisation.save();
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
