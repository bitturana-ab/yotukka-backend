export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error in admin middleware.",
    });
  }
};
