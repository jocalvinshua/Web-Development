import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
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
        
        // Send Welcome Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Our Service',
            text: `Hello ${username},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nThe Team`
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log("Welcome email sent successfully");
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
        }
        
        res.status(201).json({success: true, message: "User registered successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });


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

// Send Verification OTP to User's email
export const sendVerificationOtp = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if a user was found before proceeding
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (user.isVerified === true) { 
            return res.status(400).json({ success: false, message: "User account is already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000).toString());
        user.verifyOtp = otp;
        user.verifyOtpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        // Your email sending logic here...
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Verification OTP',
            text: `Your verification OTP is ${otp}. It is valid for 10 minutes.`
        };
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ success: true, message: "Verification OTP sent successfully" });

    } catch (error) {
        console.error("Error sending verification OTP:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        if (user.verifyOtp !== otp || user.verifyOtpExpires < Date.now()) {
            return res.status(400).json({ success:false, message: "Invalid or expired OTP" });
        }
        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpires = 0;
        await user.save();
        res.status(200).json({ success: true, message: "User verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
// Check if user is authenticated
// export const isAuthenticated = async (req, res) => {
//     try {
//         const userId = req.body.user;
//         if (!userId) {
//             return res.status(401).json({ success: false, message: "Unauthorized Access. Login Again" });
//         }
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         res.status(200).json({ success: true, userData: { id: user._id, name: user.name, email: user.email, isAccountVerified: user.isVerified } });
//     } catch (error) {
//         console.error("Error checking authentication:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// }

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


// Send Password reset OTP
export const sendResetOTP = async (req,res) =>{
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000).toString());
        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // Send Reset Password OTP to User's email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Reset Password OTP',
            text: `Your Reset password OTP is ${otp}. It is valid for 10 minutes.`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Reset password OTP sent successfully" });
    } catch (error) {
        console.error("Error sending reset password OTP:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Reset Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        if (user.resetOtp !== otp || user.resetOtpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpires = 0;
        await user.save();
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}