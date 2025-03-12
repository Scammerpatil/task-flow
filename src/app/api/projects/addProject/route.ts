import Organization from "@/models/Organisation";
import Project from "@/models/Project";
import Team from "@/models/Team";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, status, organization, manager } =
    await req.json();
  const team = await Team.findOne({ manager: manager._id });
  try {
    const project = new Project({
      title,
      description,
      status,
      organization,
      team,
    });
    const existingOrganization = await Organization.findById(organization);
    existingOrganization.projects.push(project._id);
    await existingOrganization.save();
    await project.save();
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add project" },
      { status: 500 }
    );
  }
}
