import upload from "../middlewares/multer.js";
import handleUploads from "../controllers/uploads.js";
import { getUploads } from "../controllers/uploads.js";
import { Router } from "express";

const router = Router();

export const uploadsRouter = router.post('/uploads', upload.single('image'), handleUploads)

export const getUploadsRouter = router.get('/get', getUploads)
