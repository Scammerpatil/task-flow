import Organization from "@/models/Organisation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newOrganization, user } = await req.json();
  if (!newOrganization || !user) {
    return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
  }
  try {
    const organization = new Organization({
      name: newOrganization.name,
      domain: newOrganization.domain,
      admin: user._id,
    });
    await organization.save();
    return NextResponse.json(
      { message: "Organization Created" },
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
