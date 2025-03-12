import Organization from "@/models/Organisation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const organizationId = searchParams.get("organizationId");
  if (!organizationId) {
    return NextResponse.json(
      { message: "Organization ID is required" },
      { status: 400 }
    );
  }
  try {
    const organizations = await Organization.findById(organizationId).populate(
      "teams"
    );
    const teams = organizations.teams;
    return NextResponse.json({ teams });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
