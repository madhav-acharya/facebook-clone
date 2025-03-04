import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, required: true, maxlength: 1000 },
    image: { type: String, default: "/uploads/blank-profile.webp" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, default: 0, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, default:0, ref: "Comment" }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, default:0, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
