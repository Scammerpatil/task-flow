import Admin from "@/models/Admin";
import Manager from "@/models/Manager";
import Task from "@/models/Task";
import Team from "@/models/Team";
import TeamMember from "@/models/TeamMember";
import mongoose from "mongoose";

// Database Connection

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      // Load All Models
      Admin;
      Manager;
      TeamMember;
      Task;
      Team;
      console.log("Connected to the Database");
    });
    connection.on("error", (error) => {
      console.log("Error: ", error);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default dbConfig;
