import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./database/connect.js";
dotenv.config({path: './config/.env'});
import signupRouter from "./routes/signup.js";
import loginRouter from './routes/login.js';
import {uploadsRouter, getUploadsRouter} from './routes/uploads.js';
import { storyUploadsRouter, getStoryUploadsRouter } from "./routes/story.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('./public'))
connectDB();

app.use('/', signupRouter)
app.use('/', loginRouter)
app.use('/', uploadsRouter)
app.use('/', getUploadsRouter);
app.use('/', storyUploadsRouter)
app.use('/', getStoryUploadsRouter)

app.listen(process.env.PORT, ()=>console.log(`server running on the port ${process.env.PORT}`))
