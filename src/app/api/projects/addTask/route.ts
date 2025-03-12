import Project from "@/models/Project";
import Task from "@/models/Task";
import TeamMember from "@/models/TeamMember";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, status, project, assignedTo } = await req.json();
  try {
    const newTask = new Task({
      title,
      description,
      status,
      project,
      assignedTo,
    });
    const teamMember = await TeamMember.findById(assignedTo);
    const existingProject = await Project.findById(project);
    existingProject?.tasks.push(newTask._id);
    await existingProject?.save();
    teamMember?.assignedTasks.push(newTask._id);
    await teamMember?.save();
    await newTask.save();
    return NextResponse.json(
      { message: "Task Added Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
