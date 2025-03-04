import express from "express";
import upload from "../controllers/uploadController.js";
import { createPost, getPosts, likePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/uploads", upload.single("image"), createPost);
router.get("/get", getPosts);
router.put("/like", likePost);

export default router;
