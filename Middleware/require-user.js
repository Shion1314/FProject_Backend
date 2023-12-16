const Users = require("../Database/Model/User");

module.exports = () => async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "You are not logged in.",
    });
  }

  const user = await Users.findByPk(req.session.user.id);

  if (!user) {
    throw new Error(`User with ID ${req.session.user.id} not found.`);
  }

  req.user = user;

  next();
};
