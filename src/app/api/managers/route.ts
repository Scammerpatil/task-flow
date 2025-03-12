import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import Organization from "@/models/Organisation";
import Manager from "@/models/Manager";

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
    const organization = await Organization.findOne({ admin: data.id });
    if (!organization) {
      return NextResponse.json(
        { message: "No organization found" },
        { status: 404 }
      );
    }
    const managers = await Manager.find({ organization: organization.id });
    return NextResponse.json({ managers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
