const isAdmin = (req, res, next) => {
  const { username, rolId } = req.user;
  // 1 -> member
  // 2 -> modedator
  // 3 -> admin
  // el usuario no es un admin
  if (rolId !== 3) {
    return next({
      status: 401,
      name: "No admin",
      message: `Sorry ${username} only admins can access here`,
    });
  }
  next();
};

// hasRoles --> va a dejar pasar los siguientes roles...
// recibe un arreglo... de roles
// hasRoles(3)
//
const hasRoles = (...roles) => {
  // devolver una función de middleware
  return (req, res, next) => {
    const { rolId } = req.user;
    if (!roles.includes(rolId)) {
      next({
        status: 401,
        name: "Role required",
        message: `User have not required role`,
      });
    }
    next();
  };
};

module.exports = {
  isAdmin,
  hasRoles,
};
