import mongoose from "mongoose";

const schema = mongoose.Schema({
    firstName: 
    {
        type: String,
        required: true
    },
    lastName: 
    {
        type: String,
    },
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true
    },
})

const model = mongoose.model("users", schema);

export default model;