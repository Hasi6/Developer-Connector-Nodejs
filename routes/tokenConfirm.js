const User = require('../models/User');

const tokenConfirm = async (req, res) =>{
    const userId = req.params.userId;
    const { email, token } = req.body;

    try{
    const user = await User.findOne({email: email});

    if(!user){
        return res.render('forgetPassword', {msg: 'Invalid Email Please Enter a Valid Email and Token', type: 'danger'});
    }

    if(user.userToken == token){
        return res.render('resetPassword', {
            msg: 'Reset Your Password',
            type: 'info',
            user: user.id
            });
    }

    return res.render('forgetPassword', {msg: 'Invalid Token Please Enter the Token we sent to Your Email', type: 'danger'});
}catch(err){
    console.error(err.message);
}
}

module.exports = tokenConfirm;