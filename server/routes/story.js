import upload from "../middlewares/multer.js";
import handleStoryUploads from "../controllers/storyUploads.js";
import { getStoryUploads } from "../controllers/storyUploads.js";
import { Router } from "express";

const router = Router();

export const storyUploadsRouter = router.post('/story-uploads', upload.single('image'), handleStoryUploads)

export const getStoryUploadsRouter = router.get('/get-story', getStoryUploads)
