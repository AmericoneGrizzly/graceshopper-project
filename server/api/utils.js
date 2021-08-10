const {
  models: { User },
} = require("../db");
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //console.log(req);
    const user = await User.findByToken(token);
    req.user = user;
    console.log(req.user);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requireToken,
};
