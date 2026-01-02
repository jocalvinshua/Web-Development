import User from '../model/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async(req, res) => {
    const { name, email, password } = req.body;
    try {
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
        
        // Generate Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // ✅ PERBAIKAN: Kirim token di dalam JSON, jangan di cookie
        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully",
            token, // Dikirim agar frontend bisa simpan di localStorage
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        
        // Generate Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // ✅ PERBAIKAN: Kirim token di dalam JSON
        res.status(200).json({
            success: true, 
            message: "Login successful", 
            token, // Token ini yang akan ditangkap Frontend
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const logoutUser = (req, res) => {
    // ✅ Karena pakai LocalStorage, backend cukup beri respon sukses.
    // Frontend yang akan menghapus localStorage.removeItem('token')
    return res.json({ success: true, message: "Logged out successfully" });
}

export const isAuthenticated = async (req, res) => {
    try {
        const userId = req.user; // Diambil dari middleware userAuth (decoded.id)
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: { // Menggunakan key 'user' agar konsisten dengan login
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}