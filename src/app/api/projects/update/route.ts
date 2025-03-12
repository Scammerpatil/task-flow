import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const projectId = searchParams.get("id");
  const status = searchParams.get("status");
  if (!projectId || !status) {
    return NextResponse.json(
      { message: "Project ID and status are required" },
      { status: 400 }
    );
  }
  try {
    await Project.findByIdAndUpdate(projectId, { status }, { new: true });
    return NextResponse.json(
      { message: "Project status updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
