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
  IconUsers,
  IconBuildingBank,
  IconClipboardList,
} from "@tabler/icons-react";

const AdminDashboard = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  const projectsData = data.projectsByMonth || [];

  return (
    <>
      <h1 className="text-3xl font-semibold text-center uppercase">
        Admin Dashboard
      </h1>

      <div className="stats shadow w-full bg-base-300 mt-6">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconBuildingBank className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Organizations</div>
          <div className="stat-value text-primary">
            {data.totalOrganizations || 0}
          </div>
          <div className="stat-desc">All registered organizations</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconUsers className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Managers</div>
          <div className="stat-value text-secondary">
            {data.totalManagers || 0}
          </div>
          <div className="stat-desc">Across all organizations</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <IconClipboardList className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Projects</div>
          <div className="stat-value text-accent">
            {data.totalProjects || 0}
          </div>
          <div className="stat-desc">Managed projects count</div>
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

export default AdminDashboard;
