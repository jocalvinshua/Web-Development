import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!token){
        return res.status(401).json({success: false, message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; 
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
}

export default userAuth;