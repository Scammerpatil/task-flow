import mongoose from "mongoose";

export interface Organization {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  domain: string;
  admin: Admin;
  manager: Manager;
  teamMembers: TeamMember[];
}

export interface Admin {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: "admin";
  profileImage: string;
}

export interface Manager {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  role: "manager";
  organization: Organization;
  team: TeamMember[];
}

export interface TeamMember {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "team-member";
  manager: Manager;
  organization: Organization;
  assignedTasks: Task[];
}

export interface Task {
  _id?: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo: TeamMember;
  createdAt: Date;
}
