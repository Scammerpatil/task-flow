"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toast } from "react-hot-toast";

export default function TeamMemberDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    assignedTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    organizationName: "",
    projectName: "",
  });

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/api/teamMembers/dashboard");
      setStats(res.data);
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const data = [
    { name: "Assigned", value: stats.assignedTasks },
    { name: "Completed", value: stats.completedTasks },
    { name: "Pending", value: stats.pendingTasks },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold uppercase text-center">
        Team Member Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Assigned Tasks</div>
            <div className="stat-value">{stats.assignedTasks}</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Completed Tasks</div>
            <div className="stat-value text-success">
              {stats.completedTasks}
            </div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Pending Tasks</div>
            <div className="stat-value text-warning">{stats.pendingTasks}</div>
          </div>
        </div>
      </div>

      <div className="card shadow bg-base-100 p-4">
        <h2 className="text-lg font-semibold mb-2">Task Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card shadow bg-base-100 p-4">
        <h2 className="text-lg font-semibold mb-2">Organization & Project</h2>
        <p>
          <strong>Organization:</strong> {stats.organizationName || "N/A"}
        </p>
        <p>
          <strong>Project:</strong> {stats.projectName || "N/A"}
        </p>
      </div>
    </>
  );
}
