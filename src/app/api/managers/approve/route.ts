import dbConfig from "@/middlewares/db.config";
import Manager from "@/models/Manager";
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
    const manager = await Manager.findById(id);
    if (!manager) {
      return NextResponse.json(
        { message: "Manager not found" },
        { status: 404 }
      );
    }
    manager.isApproved = isApproved;
    await manager.save();
    return NextResponse.json({ message: "Manager approved" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to approve manager" },
      { status: 500 }
    );
  }
}
