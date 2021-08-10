const {
  models: { User },
} = require("../db");
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(req.headers);
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requireToken,
};
