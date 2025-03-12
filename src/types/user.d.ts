import mongoose from "mongoose";

export interface Organization {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  domain: string;
  teams: Team[];
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
  isApproved: boolean;
  team: TeamMember[];
}

export interface TeamMember {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  profileImage: string;
  isApproved: boolean;
  phone: string;
  role: "team-member";
  manager: Manager;
  organization: Organization;
  assignedTasks: Task[];
}

export interface Task {
  _id?: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  project: Project;
  status?: "pending" | "in-progress" | "completed";
  assignedTo: TeamMember;
  createdAt?: Date;
}

export interface Team {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  domain: string;
  members: TeamMember[];
  manager: Manager;
  createdAt?: Date;
}

export interface Project {
  _id?: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  organization: Organization;
  team?: Team;
  createdAt?: Date;
  tasks?: Task[];
}
