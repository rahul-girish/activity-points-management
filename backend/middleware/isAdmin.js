export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found." });
    }

    // Add 'counselor' to the allowed roles
    const allowedRoles = ['admin', 'service', 'counselor'];

    if (allowedRoles.includes(req.user.role)) {
        return next();
    }

    return res.status(403).json({ success: false, message: "Access denied. Requires Admin, Service, or Counselor role." });
};