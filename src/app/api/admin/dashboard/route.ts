import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Manager from "@/models/Manager";
import Project from "@/models/Project";
import dbConfig from "@/middlewares/db.config";
import Organization from "@/models/Organisation";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const organisation = await Organization.findOne({ admin: decoded.id });
    const totalManagers = await Manager.countDocuments({
      organization: organisation?._id,
    });

    const totalProjects = await Project.countDocuments({
      organization: organisation?._id,
    });

    // Aggregate projects grouped by month
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
      totalOrganizations: organisation ? 1 : 0,
      totalManagers,
      totalProjects,
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
