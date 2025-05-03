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
import {
  IconClipboardList,
  IconUsersGroup,
  IconUserCog,
} from "@tabler/icons-react";

const ManagerDashboard = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/managers/dashboard");
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  const projectsData = data.projectsByMonth || [];

  return (
    <>
      <h1 className="text-3xl font-semibold text-center uppercase">
        Manager Dashboard
      </h1>

      <div className="stats shadow w-full bg-base-300 mt-6">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconClipboardList className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Projects</div>
          <div className="stat-value text-primary">
            {data.totalProjects || 0}
          </div>
          <div className="stat-desc">Handled by you</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconUsersGroup className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Teams</div>
          <div className="stat-value text-secondary">
            {data.totalTeams || 0}
          </div>
          <div className="stat-desc">Across all projects</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <IconUserCog className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Team Members</div>
          <div className="stat-value text-accent">{data.totalMembers || 0}</div>
          <div className="stat-desc">In all your teams</div>
        </div>
      </div>

      <div className="bg-base-200 p-4 rounded-xl shadow-md mt-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Projects Created Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectsData}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ManagerDashboard;
