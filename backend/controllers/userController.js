import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

export const getCurrentUser = async(req, res) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No userId" });
    }

    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("GetCurrentUser error:", error);
    return res.status(500).json({ message: `GetCurrentUser error: ${error.message}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, description } = req.body;
    let updateData = { name, description };

    if (req.file) {
      // Upload new photo to Cloudinary if selected
      const photoUrl = await uploadOnCloudinary(req.file.path);
      updateData.photoUrl = photoUrl;
    }

    // Update user
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.error("updateProfile error:", error);
    return res.status(500).json({ message: error.message });
  }
};
