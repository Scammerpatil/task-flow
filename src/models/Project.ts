import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
export default Project;
