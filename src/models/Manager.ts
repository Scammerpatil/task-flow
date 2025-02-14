import mongoose, { Schema } from "mongoose";

const ManagerSchema = new Schema({
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
    default: "manager",
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamMember",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
const Manager =
  mongoose.models.Manager || mongoose.model("Manager", ManagerSchema);
export default Manager;
