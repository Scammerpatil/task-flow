import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "TeamMember",
    },
  ],
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Manager",
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);
export default Team;
