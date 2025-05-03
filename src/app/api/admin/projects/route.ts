import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Organization from "@/models/Organisation";
dbConfig();
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const organisation = await Organization.findOne({
      admin: decoded.id,
    }).populate("projects");
    return NextResponse.json(
      {
        projects: organisation?.projects || [],
        message: "Projects fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
