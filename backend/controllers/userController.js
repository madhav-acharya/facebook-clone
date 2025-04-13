import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from '../config/cloudinary.js';

dotenv.config({path: "../config/.env"});

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
  
      if (user)
      {
        const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch)
          {
              console.log(`Sucessfully logged in as ${user.firstName}`)
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
              res.json({"status":"Login sucessful", token, "firstName":user.firstName, "lastName":user.lastName})
          }
          else
          {
              console.log("The password doesnot match")
              res.json("Invalid password")
          }
      }
      else
      {
          console.log(`No any user exist with that email and password`)
          res.json("No any user exist with that email")
      }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("friends posts");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("friends stories posts"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProfilePhoto = async (req, res) => {
  const userId = req.params.id;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    if (!profilePicture) {
      return res.status(400).json({ message: "No profile picture uploaded" });
    }

    const imageFilePath = req.file.path;
    const result = await cloudinary.uploader.upload(imageFilePath, {
      folder: "fb-clone/users",
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ],
    });
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating profile picture:", err);
    res.status(500).json({ message: "Error updating profile picture" });
  }
};

// Controller to update the cover photo
export const updateCoverPhoto = async (req, res) => {
  const userId = req.params.id;
  const coverPhoto = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    if (!coverPhoto) {
      return res.status(400).json({ message: "No cover photo uploaded" });
    }

    const imageFilePath = req.file.path;
    const result = await cloudinary.uploader.upload(imageFilePath, {
      folder: "fb-clone/users",
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ],
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { coverPhoto: result.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating cover photo:", err);
    res.status(500).json({ message: "Error updating cover photo" });
  }
};
