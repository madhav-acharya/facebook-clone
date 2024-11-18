import handleLogin from "../controllers/login.js";
import { Router } from "express";

const router = Router();

router.post('/login', handleLogin);

export default router;