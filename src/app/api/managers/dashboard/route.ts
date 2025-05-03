import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Project from "@/models/Project";
import Team from "@/models/Team";
import TeamMember from "@/models/TeamMember";
import dbConfig from "@/middlewares/db.config";
import Manager from "@/models/Manager";
import Organization from "@/models/Organisation";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    if (decoded.role !== "manager") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const manager = await Manager.findById(decoded.id);
    const organisation = await Organization.findById(manager.organization);

    const totalProjects = organisation.projects.length;

    const teams = await Team.find({ manager: decoded.id });
    const teamIds = teams.map((t) => t._id);

    const totalTeams = teams.length;
    var totalMembers = 0;
    for (const team of teams) {
      totalMembers += team.members.length;
    }

    const projectsByMonth = await Project.aggregate([
      {
        $match: {
          organization: organisation?._id,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedProjectsByMonth = projectsByMonth.map((entry) => ({
      month: entry._id,
      count: entry.count,
    }));

    return NextResponse.json({
      totalProjects,
      totalTeams,
      totalMembers,
      projectsByMonth: formattedProjectsByMonth,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
