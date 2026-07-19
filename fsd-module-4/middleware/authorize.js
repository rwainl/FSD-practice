/**
 *  FILE INI PERLU DILENGKAPI
 *
 * Authorization Middleware (RBAC)
 * Check user roles dan permissions
 */

function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if(!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }
    if(!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden",
      })
    }
    next();
  }
};

function authorizePermission(permission) {
  return (req, res, next) => {
    if(!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const userPermissions = ROLES[req.user.role] || [];

    if(userPermissions.includes("*")) {
      return next();
    }

    if(!userPermissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Permission denied: ${permission} required`,
      })
    }
  }
}

module.exports = { authorizeRole };
