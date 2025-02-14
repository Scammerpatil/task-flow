"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import SideNav from "./SideNav";
import { useEffect } from "react";
import axios from "axios";
import { AuthProvider, useAuth } from "@/context/AuthProvider";

const Component = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/auth/verifytoken");
      if (response.data) {
        setUser(response.data.data);
      }
    };
    fetchUser();
  }, []);
  return (
    <html lang="en">
      <head>
        <title>TaskFlow | Saas Based Project Management System</title>
        <meta
          name="description"
          content="TaskFlow is a SaaS-based project management platform designed to help teams plan, execute, and track projects efficiently. It provides a centralized workspace where users can manage tasks, set deadlines, assign priorities, and collaborate in real time. The platform offers role-based access control (RBAC), ensuring different users have appropriate permissions based on their roles. TaskFlow also provides a range of features, including task lists, kanban boards, Gantt charts, and time tracking, to help teams stay organized and productive."
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <SideNav>{children}</SideNav>
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
