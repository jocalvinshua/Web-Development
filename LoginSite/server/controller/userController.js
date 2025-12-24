import User from "../models/userSchema.js";

// Get User Details
const getUserDetails = async (req,res) =>{
    const userId = req.user; 
    
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID not available" });
    }

    const user = await User.findById(userId).select('-password');
    try {
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    res.status(200).json({
          success: true,
          userData: {
              id: user._id,
              name: user.name,
              isVerified: user.isVerified
          }
    });
    } catch (error) { 
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export default getUserDetails;