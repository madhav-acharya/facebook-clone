import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const comment = new Comment({ post: postId, user: userId, content });
    await comment.save();
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchComments = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await Comment.find({ user: userId });
    if (!comments) return res.status(404).json({ error: "Comment not found" });

    res.status(200).json({ message: "Comment fetch successfully", data: comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
