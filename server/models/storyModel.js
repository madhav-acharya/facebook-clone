import mongoose from "mongoose";

const storySchema = mongoose.Schema({
    id: {type:Number},
    caption: {type:String},
    image: {type:String},
    time:{type:Date, default:Date.now}
})

const storyModel = mongoose.model('story', storySchema)

export default storyModel;