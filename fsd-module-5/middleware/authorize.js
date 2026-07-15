const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if(!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      })
    }

    next();

    // Temporary: allow all for development
    // console.log(`  TODO: Implement RBAC for roles: ${roles.join(", ")}`);
    // next();
  };
};

module.exports = { authorizeRole };
