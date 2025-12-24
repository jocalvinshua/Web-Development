import jwt from 'jsonwebtoken'

const userAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access. Login Again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded && decoded.id) {
            // Correctly attach the user's ID to the req object
            req.user = decoded.id; 
        } else {
            return res.status(401).json({ message: "Unauthorized Access. Login Again" });
        }
        
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default userAuth;