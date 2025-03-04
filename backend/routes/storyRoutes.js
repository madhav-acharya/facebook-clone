import express from "express";
import { createStory, getStories, viewStory, deleteStory } from "../controllers/storyController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../controllers/uploadController.js";

const router = express.Router();

router.post("/uploads", upload.single("image"), createStory);     
router.get("/", getStories);       
router.put("/:id/view", viewStory);
router.delete("/:id/delete", deleteStory);

export default router;
