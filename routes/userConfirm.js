const User = require('../models/User');
const nodemailer = require("nodemailer");


const userConfirm = async (req, res)=>{

    try{
    const userId = req.body.id;
    console.log(userId);

    const token = req.body.userToken;
    console.log(token);

    const user = await User.findById(userId);
    console.log(user.userToken);

    const output = `
      <ul>
        <li>User Token${user.userToken}</li>
      </ul>
    `;
    // let testAccount = await nodemailer.createTestAccount();

    var nodeoutlook = require("nodejs-nodemailer-outlook");
    nodeoutlook.sendEmail({
      auth: {
        user: "udhmovies@outlook.com",
        pass: "moviesUdh"
      },
      from: "udhmovies@outlook.com",
      to: user.email,
      subject: "Successfully Subscribe to udhmovies.com",
      html: output,

      onError: e => console.log(e),
      onSuccess: i => console.log(i)
    });

    if(!user){
        return res.send("Invalid Id");
    }

    if(user.userToken == token ){
        req.session.userId = user._id;
        // console.log(req.session.userId);
        return res.send('Logged in');
    }
    return res.send('Invalid Token');
}catch(err){
    console.error(err.message);
}
}

module.exports = userConfirm;