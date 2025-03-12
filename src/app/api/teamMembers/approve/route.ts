import dbConfig from "@/middlewares/db.config";
import TeamMember from "@/models/TeamMember";
import { NextRequest, NextResponse } from "next/server";
dbConfig();
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const isApproved = searchParams.get("isApproved");
  if (!id || !isApproved) {
    return NextResponse.json(
      { message: "Missing id or isApproved" },
      { status: 400 }
    );
  }
  try {
    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return NextResponse.json(
        { message: "Team Member not found" },
        { status: 404 }
      );
    }
    teamMember.isApproved = isApproved;
    await teamMember.save();
    return NextResponse.json(
      { message: "Team Member approved" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to approve Team Member" },
      { status: 500 }
    );
  }
}
