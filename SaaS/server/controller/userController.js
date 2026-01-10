import User from '../model/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from '../model/Resume.js';

const generateToken = (userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token
}
export const userRegister = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password){
            return res.status(400).json({message: "Missing required fields"})
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        
        // Create token
        const token = generateToken()
        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully",
            token,
            user: newUser
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
        
        if (!user.comparePassword(password)) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        
        // Create token
        const token = generateToken(user._id)
        user.password = undefined
        res.status(200).json({
            success: true,
            message: "Login successful", 
            token, 
            user: user 
        });
    
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false,message: "Internal server error" });
    }
}

export const getUserId = async (req, res) => {
    try {
        const userId = req.userId; 

        // Check if user exists
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return user
        user.password = undefined
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserResume = async(req,res)=>{
    try {
        const userId = req.userId;

        // return user resumes
        const resume = await Resume.find({ userId }); 
        return res.status(200).json({success: true, data: resume})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}