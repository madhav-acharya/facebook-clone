import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment);
router.delete("/:commentId", deleteComment);

export default router;
