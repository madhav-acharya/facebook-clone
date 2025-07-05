import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const request = new FriendRequest({ sender: senderId, receiver: receiverId });
    await request.save();
    res.status(201).json({ message: "Friend request sent", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllFriendRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const requests = await FriendRequest.find({ receiver: id });
    res.json({ data: requests });
  }
  catch(error) {
    res.status(500).json({message: "error while fetching request"})
  }
}

export const respondToRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: "Friend request not found" });

    if (status === "accepted") {
      await User.findByIdAndUpdate(request.sender, { $push: { friends: request.receiver } });
      await User.findByIdAndUpdate(request.receiver, { $push: { friends: request.sender } });
    }
    
    await request.deleteOne();
    res.status(200).json({ message: `Friend request ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
