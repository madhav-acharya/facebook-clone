import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config({path: './config/.env'})

const connectDB = () => 
    {
        mongoose.connect(process.env.DATABASE_URI, {dbName: process.env.DATABASE_NAME})
        .then(()=>console.log(`Database connected sucessfully`))
        .catch((err)=>{
        console.log(`Cannot connected to the databasses, due to ${err}`)
    })}

export default connectDB;