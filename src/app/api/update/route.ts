import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";
import Manager from "@/models/Manager";
import TeamMember from "@/models/TeamMember";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const formData = await req.json();
  const { name, phone, email } = formData;
  if (!name || !phone || !email) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }
  if (phone.length !== 10) {
    return NextResponse.json(
      { message: "Phone number must be at least 10 digits" },
      { status: 400 }
    );
  }
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (user.role === "admin") {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        user.id,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          profileImage: formData.profileImage,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedAdmin) {
        return NextResponse.json(
          { message: "Admin not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Admin updated successfully" },
        { status: 200 }
      );
    } else if (user.role === "manager") {
      const updatedManager = await Manager.findByIdAndUpdate(
        user.id,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          profileImage: formData.profileImage,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedManager) {
        return NextResponse.json(
          { message: "Manager not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Manager updated successfully" },
        { status: 200 }
      );
    } else if (user.role === "team-member") {
      const updatedTeamMember = await TeamMember.findByIdAndUpdate(
        user.id,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          profileImage: formData.profileImage,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedTeamMember) {
        return NextResponse.json(
          { message: "Team member not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Team member updated successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "User role not recognized" },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
