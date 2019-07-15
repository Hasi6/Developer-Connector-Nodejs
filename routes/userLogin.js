const User = require('../models/User');

const userLogin = async (req, res) => {
  const { email } = req.body;

try{
  const user = await User.findOne({ email: email });
  req.session.userId = user._id;
  return res.redirect(`/api/profile/${req.session.userId}`);
}catch(err){
  console.error(err.message);
}
}
module.exports = userLogin;
