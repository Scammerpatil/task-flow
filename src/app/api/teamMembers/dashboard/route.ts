import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import Task from "@/models/Task";

// totalAssignedTasks: assignedTasks.length,
//     completedTasks: completedTasks.length,
//     pendingTasks: pendingTasks.length,
//     tasksByMonth: formattedTasksByMonth,

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  try {
    const totalAssignedTasks = await Task.countDocuments({
      assignedTo: decoded.id,
    });
    const completedTasks = await Task.countDocuments({
      assignedTo: decoded.id,
      status: "completed",
    });
    const pendingTasks = await Task.countDocuments({
      assignedTo: decoded.id,
      status: "pending",
    });
    const assignedTasks = await Task.find({ assignedTo: decoded.id })
      .sort({ createdAt: -1 })
      .select("createdAt");
    const tasksByMonth: Record<string, number> = {};
    assignedTasks.forEach((task) => {
      const date = new Date(task.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      tasksByMonth[key] = (tasksByMonth[key] || 0) + 1;
    });

    const formattedTasksByMonth = Object.entries(tasksByMonth).map(
      ([key, count]) => {
        const [year, month] = key.split("-");
        return {
          month: `${getMonthName(+month)} ${year}`,
          count,
        };
      }
    );
    return NextResponse.json({
      totalAssignedTasks,
      completedTasks,
      pendingTasks,
      tasksByMonth: formattedTasksByMonth,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const getMonthName = (monthNumber: number) => {
  return new Date(2000, monthNumber - 1).toLocaleString("default", {
    month: "short",
  });
};
