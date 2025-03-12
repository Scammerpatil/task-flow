import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
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
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: { type: Date, default: Date.now },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
