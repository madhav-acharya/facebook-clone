import express from "express";
import { registerUser, loginUser, getUserProfile, getUsers, updateCoverPhoto, updateProfilePhoto } from "../controllers/userController.js";
import upload from "../controllers/uploadController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);
router.get("/", getUsers);
router.put("/profile/update/:id", upload.single("image"), updateProfilePhoto);
router.put("/cover/update/:id", upload.single("image"), updateCoverPhoto);

export default router;
