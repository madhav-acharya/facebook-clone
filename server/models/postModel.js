import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    id: {type:Number},
    caption: {type:String},
    image: {type:String},
    time:{type:Date, default:Date.now}
})

const postModel = mongoose.model('post', postSchema)

export default postModel;