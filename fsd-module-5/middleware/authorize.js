/**
 * Authorization Middleware (RBAC)
 *
 * TODO untuk Peserta:
 * 1. Buat middleware authorizeRole
 * 2. Check user role dari req.user
 * 3. Allow access jika role sesuai
 * 4. Deny access jika role tidak sesuai
 */

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    // TODO: Implement role-based access control
    // if (!req.user || !roles.includes(req.user.role)) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Access denied. Insufficient permissions.'
    //   });
    // }

    // next();

    // Temporary: allow all for development
    console.log(`  TODO: Implement RBAC for roles: ${roles.join(", ")}`);
    next();
  };
};

module.exports = { authorizeRole };
