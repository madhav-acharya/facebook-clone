import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "/uploads/blank-profile.webp" }, 
    coverPhoto: { type: String, default: "/uploads/blank-profile.webp" },
    bio: { type: String, maxlength: 200 }, 
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], 
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }], 
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }],
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
