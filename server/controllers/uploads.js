import postModel from "../models/postModel.js";

const handleUploads = (req, res)=>
{
    const image = `/uploads/${req.file.filename}`;
    postModel.create({
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

export const getUploads = async (req, res)=>{
    const data = await postModel.find();
    res.json(data)
}
export default handleUploads;