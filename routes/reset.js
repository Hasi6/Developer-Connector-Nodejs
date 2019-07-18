const User = require("../models/User");
const bcrypt = require('bcryptjs');

const reset = async (req, res) => {
    const userId = req.params.userId;

    const { password, cpassword } = req.body;

    if(password != cpassword){
        return res.render('reset', {msg: 'Passwords are don\'t match', type: 'danger'});
    }
    try{
    const user = await User.findById(userId);

    if(!user){
        return res.render('signup', {msg: 'Anuthorized Action', type: 'danger'})
    }
    // encrypt password before save to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.save();

    return res.render('signup', {msg: 'password changed Successfully', type: 'success'});


}catch(err){
    console.error(err.message);
}


};

module.exports = reset;
