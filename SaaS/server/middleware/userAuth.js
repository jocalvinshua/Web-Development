import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const { token } = req.cookies; 

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized Access. Login Again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded && decoded.id) {
            req.user = decoded.id; 
            next();
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized Access. Login Again" });
        }
        
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

export default userAuth;