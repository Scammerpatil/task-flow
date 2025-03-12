import dbConfig from "@/middlewares/db.config";
import Organization from "@/models/Organisation";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  try {
    const organisations = await Organization.find();
    return NextResponse.json({ organisations }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
