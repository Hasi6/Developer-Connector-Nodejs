const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userRegister = async (req, res)=>{
    const { username, password, email } = req.body;

    const anyUser = await User.findOne({ email: email });

    if(anyUser){
        return res.send('Email is Already Taken');
    }

    const user = new User({
        username,
        password,
        email
    });

    // encrypt password before save to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const saveUser = await user.save();

    if(!saveUser){
        return res.send('Some Thing went Wrong Please Try Again Later');
    }
    res.send(req.body);
}

module.exports = userRegister;