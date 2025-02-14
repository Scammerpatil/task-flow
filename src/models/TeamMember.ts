import mongoose, { Schema } from "mongoose";

const TeamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "team-member",
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  assignedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
const TeamMember =
  mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
export default TeamMember;
