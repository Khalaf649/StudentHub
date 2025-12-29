export default function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user?.role === role && req.user?.id) {
            next();
        }
        else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
}
