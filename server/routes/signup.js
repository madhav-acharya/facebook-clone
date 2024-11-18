import { Router } from "express";
import handleSignup from "../controllers/signup.js";

const router = Router();

router.post('/signup', handleSignup);


export default router;