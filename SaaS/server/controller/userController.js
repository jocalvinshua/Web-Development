import User from '../model/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async(req,res)=>{
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { 
            httpOnly: true, secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success:false, message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { 
            httpOnly: true, secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({success:true, message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
    
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false,message: "Internal server error" });
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
    });
    return res.json({success: true, message: "User logged out successfully"})
}

export const isAuthenticated = async (req,res) =>{
    try {
        // Get the user ID from the `req.user` object, which was set by your middleware
        const userId = req.user; 

        if(!userId){
            // This check is mostly a safeguard. The userAuth middleware should catch this first.
            return res.status(401).json({success:false,message:"Unauthorized Access. Login Again"})
        }

        const user = await User.findById(userId).select('-password')
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }

        res.status(200).json({
      success:true,
      userData:{
        id:user._id,
        name:user.name,
        isVerified: user.isVerified,
        email: user.email
      }})
    } catch (error) {
        // Log the actual error for better debugging
        console.error("Internal server error in isAuthenticated:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}