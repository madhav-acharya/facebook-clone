import model from "../models/model.js";

const handleSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Required fields are missing");
    }
    const newUser = await model.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default handleSignup;
