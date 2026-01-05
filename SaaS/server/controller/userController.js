import User from '../model/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from '../model/Resume.js';

export const userRegister = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name || email || password){
            return res.status(400).json({message: "Missing required fields"})
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        
        // Generate Token
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
        newUser.password = undefined;

        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully",
            token,
            user: { name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success:false, message: "Invalid email or password" });
        }
        // Check Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // res.cookie('token', token, { 
        //     httpOnly: true, secure: process.env.NODE_ENV === 'production', 
        //     sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
        //     maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        // });
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
        newUser.password = undefined;
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
    return res.json({ success: true, message: "Logged out successfully" });
}

export const getUserId = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.password = undefined;
        res.status(200).json({
            success: true,
            user: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserResume = async(req,res)=>{
    try {
        const userId = req.userId
        const resume = await Resume.find({userId})
        return res.status(200).json({success: true, message: resume})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}