import Story from "../models/Story.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// Create a new story
export const createStory = async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const { user, mediaType, caption } = req.body;

    const imageFilePath = req.file.path;
    const result = await cloudinary.uploader.upload(imageFilePath, {
      folder: "fb-clone/users",
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ],
    });
    const newStory = new Story({ user, mediaType, image: result.secure_url, caption });
    await newStory.save();
    await User.findByIdAndUpdate(user, { $push: { stories: newStory._id } });
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active stories
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("user").sort({_id: -1});
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStoriesById = async (req, res) => {
  try {
    const { _id } = req.body;
    const stories = await Story.find({ _id }).populate("user").sort({_id: -1});
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Mark story as viewed
export const viewStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (!story.viewers.includes(req.user._id)) {
      story.viewers.push(req.user._id);
      await story.save();
    }

    res.json({ message: "Story viewed", viewers: story.viewers.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a story
export const deleteStory = async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id, user: req.user._id });
    if (!story) return res.status(404).json({ message: "Story not found" });

    await story.deleteOne();
    res.json({ message: "Story deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
