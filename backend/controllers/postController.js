import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { user, caption } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ""; 

    const imageFilePath = req.file.path;
    const result = await cloudinary.uploader.upload(imageFilePath, {
      folder: "fb-clone/users",
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ],
    });

    const post = new Post({
      user,
      caption,
      image: result.secure_url,
    });

    await post.save();
    await User.findByIdAndUpdate(user, { $push: { posts: post._id } });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user comments").sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const update = post.likes.includes(userId)
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedPost = await Post.findByIdAndUpdate(postId, update, { new: true });

    res.status(200).json({
      message: update.$pull ? "Like removed" : "Post liked",
      likes: updatedPost.likes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
