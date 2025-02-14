"use client";
import React from "react";
import { SIDENAV_ITEMS } from "../constant";
import { useAuth } from "@/context/AuthProvider";

const UserDashboardPage = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Welcome, {user?.name}!
      </h1>
      <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
        {SIDENAV_ITEMS.map((item) => {
          return (
            <DashboardCard
              title={item.title}
              icon={item.icon}
              path={item.path}
              key={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  icon,
  path,
}: {
  title: string;
  path: string;
  icon: React.ReactNode;
}) => {
  return (
    <a
      href={path}
      key={title}
      className="card bg-base-300 w-1/3 shadow-lg p-4 flex items-center space-x-4 hover:bg-primary hover:text-primary-content transition"
    >
      <span className="text-3xl">{icon}</span>
      <h2 className="text-lg font-semibold">{title}</h2>
    </a>
  );
};

export default UserDashboardPage;
