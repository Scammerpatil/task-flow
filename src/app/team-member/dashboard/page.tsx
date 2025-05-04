"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IconCheck, IconListCheck, IconListDetails } from "@tabler/icons-react";

const TeamMemberDashboard = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/teamMembers/dashboard");
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  const tasksData = data.tasksByMonth || [];

  return (
    <>
      <h1 className="text-3xl font-semibold text-center uppercase">
        Team Member Dashboard
      </h1>

      <div className="stats shadow w-full bg-base-300 mt-6">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconListDetails className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Assigned Tasks</div>
          <div className="stat-value text-primary">
            {data.totalAssignedTasks || 0}
          </div>
          <div className="stat-desc">All tasks assigned to you</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <IconCheck className="h-8 w-8" />
          </div>
          <div className="stat-title">Completed Tasks</div>
          <div className="stat-value text-success">
            {data.completedTasks || 0}
          </div>
          <div className="stat-desc">Tasks you’ve finished</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <IconListCheck className="h-8 w-8" />
          </div>
          <div className="stat-title">Pending Tasks</div>
          <div className="stat-value text-warning">
            {data.pendingTasks || 0}
          </div>
          <div className="stat-desc">Work still in progress</div>
        </div>
      </div>

      <div className="bg-base-200 p-4 rounded-xl shadow-md mt-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Tasks Completed Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tasksData}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default TeamMemberDashboard;
