const authorizeRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };

const authorizeId =
  (...bypassRoles) =>
  (req, res, next) => {
    if (bypassRoles.length !== 0 && bypassRoles.includes(req.user?.role)) {
      return next(); // privileged role, skip ID check
    }

    const index = parseInt(req.params.index, 10);

    if (isNaN(index)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (index !== req.user?.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };

module.exports = {
  authorizeRole,
  authorizeId,
};
