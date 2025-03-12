import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const taskId = searchParams.get("taskId");
  const status = searchParams.get("status");
  if (!taskId || !status) {
    return NextResponse.json(
      { message: "taskId and status are required" },
      { status: 400 }
    );
  }
  try {
    await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    return NextResponse.json(
      { message: "Task status updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
