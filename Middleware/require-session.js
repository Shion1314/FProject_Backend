module.exports = (isRequired = true) => {
  return (req, res, next) => {
    if (isRequired && !req.session.user) {
      return res.status(401).json({
        message: "You are not logged in.",
      });
    }

    if (!isRequired && req.session.user) {
      return res.status(403).json({
        message: "You are already logged in.",
      });
    }

    next();
  };
};
