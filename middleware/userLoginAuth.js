const User = require('../models/User');
const bcrypt = require('bcryptjs');

const loginAuth = async(req, res, next) => {
    
    const { email, password } = req.body;

try{
    const user = await User.findOne({ email: email });

  if (!user) {
    return res.render('signup', {msg: 'Email is Incorrect', type: 'danger'});
  }
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.render('signup', {msg: 'Password is Incorrect', type: 'danger'});
  }
  if (user.confirmed === false) {
    // if user not confirmed his account send a verification code to the user
    const output = `
      <ul>
        <li>User Token = ${user.userToken}</li>
      </ul>
    `;
    // let testAccount = await nodemailer.createTestAccount();

    var nodeoutlook = require("nodejs-nodemailer-outlook");
    nodeoutlook.sendEmail({
      auth: {
        user: "udhmovies@outlook.com",
        pass: "Hasitha6"
      },
      from: "udhmovies@outlook.com",
      to: user.email,
      subject: "User Token",
      html: output,

      onError: e => console.log(e),
      onSuccess: i => console.log(i)
    });
    return res.render('confirm', {msg: 'Please Confirm Your Account, We Send a token to your Email Please Enter here to Register, This is just a One time', type: 'info'});
  }

  next();

}catch(err){
    console.error(err.message);
}
}

module.exports = loginAuth;