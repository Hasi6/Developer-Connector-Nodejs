const User = require('../models/User');

const resetPassword = async(req, res) => {
    const userId = req.params.userId;

    try{
    const user = await User.findById(userId);

    if(!user){
        return res.render('signup', {msg: 'UnAuthorized Action', type: 'danger'});
    }
    console.log(user.id);
    return res.render('forgetPassword', {
        user: user.id
    })
}catch(err){
    console.error(err.message);
}
}

module.exports = resetPassword;