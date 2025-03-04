import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mediaType: { type: String, enum: ["image", "video"] },
  image: { type: String, default: "/uploads/blank-profile.webp" },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now }, 
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] 
});

const Story = mongoose.model("Story", storySchema);
export default Story;
