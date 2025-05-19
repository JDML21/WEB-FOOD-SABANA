const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user?.role !== requiredRole) {
      return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
  };
};

module.exports = checkRole;
