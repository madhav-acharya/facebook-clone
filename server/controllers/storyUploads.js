import storyModel from "../models/storyModel.js";

const handleStoryUploads = (req, res)=>
{
    const image = `/uploads/${req.file.filename}`;
    storyModel.create({
        id:req.body.id,
        caption:req.body.caption,
        image: image
    })
    .then((response)=>{
        res.json({sucess:true, message:"sucessfully uploaded"})
    })
    .catch((err)=>{
        res.json({sucess:false, message:`some error ocurred ${err.message}`})
    })
}

export const getStoryUploads = async (req, res)=>{
    const storyData = await storyModel.find();
    res.json(storyData)
}
export default handleStoryUploads;