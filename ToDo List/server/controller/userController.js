import User from "../models/user.js";
import bycypt from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

// Add New User
export const register = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg:"Email already exists"})
        }

        const hashedPassword = await bycypt.hash(password, 10)

        const newUser = new User({name,email,password:hashedPassword})
        await newUser.save()
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
        res.cookie('token', token, { 
            httpOnly: true, secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        })

        // Send Mailer
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false, // or 'STARTTLS'
            auth: {
                
            to:email,
            subject: 'Welcome to Our Service',
            text: `Hello ${name},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nThe Team`
        })
        try {
            await transporter.sendMail(mailOptions);
            console.log("Welcome email sent successfully");
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
        }

        res.status(201).json({success:true,msg:`User ${name} with email ${email} Registered Succesfully`})
        
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,msg:"Invalid Email or Password"})
        }
        const isMatch = await bycypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false,msg:"Invalid Email or Password"})
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
            res.status(500).json({ success: false, message: "Internal server error" });
        }
}