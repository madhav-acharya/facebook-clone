import express from "express";
import { sendFriendRequest, respondToRequest } from "../controllers/friendRequestController.js";

const router = express.Router();

router.post("/", sendFriendRequest);
router.post("/respond", respondToRequest);

export default router;
