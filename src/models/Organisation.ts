import mongoose, { Schema } from "mongoose";

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    unique: true,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
const Organization =
  mongoose.models.Organization ||
  mongoose.model("Organization", OrganizationSchema);
export default Organization;
