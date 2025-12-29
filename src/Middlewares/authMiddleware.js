import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
// Middleware to authenticate and differentiate roles
export default (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role }; // Attach user info to request
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
