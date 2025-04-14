import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./database/connect.js";
dotenv.config({path: './config/.env'});
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import friendRequestRoutes from "./routes/friendRequestRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({ origin: "*", credentials: true }));
app.use(express.static('./public'))
app.use(errorHandler);
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/friend-requests", friendRequestRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stories", storyRoutes);


app.listen(process.env.PORT, ()=>console.log(`server running on the port ${process.env.PORT}`))
