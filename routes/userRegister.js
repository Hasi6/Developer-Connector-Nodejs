const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userRegister = async (req, res)=>{

    const { username, password, email, birthDay } = req.body;

    const user = new User({
        username,
        password,
        email,
        birthDay
    });

    try{
    // encrypt password before save to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const saveUser = await user.save();

    if(!saveUser){
        return res.send('Some Thing went Wrong Please Try Again Later');
    }
    return res.render('signup', {msg: 'Registerd Successfully Now you can Log to the system', type: 'success'});
}catch(err){
    return res.send(err.message);
}
}

module.exports = userRegister;