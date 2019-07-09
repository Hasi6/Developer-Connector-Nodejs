const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

try{
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.send("No Users Found to that Email");
  }
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.send("Password is Incorrect");
  }
  if (user.confirmed === false) {
    return res.send("You Need To confirm Your Account First");
  }
  return res.send('Logged in');
}catch(err){
    console.error(err.message);
}
};

module.exports = userLogin;
