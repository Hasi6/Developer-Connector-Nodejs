const User = require('../models/User');

const registrationAuth = async (req, res, next) => {

    const { username, password, email, birthDay } = req.body;
    try{
    const anyUser = await User.findOne({ email: email });

    if(anyUser){
        return res.render('signup', {msg: 'Email Already Taken', type: 'danger'});
    }

    if(!username){
        return res.render('signup', {msg: 'Username is required', type: 'danger'});
    }

    if(!email){
        return res.render('signup', {msg: 'Email is Required', type: 'danger'});
    }

    if(!password){
        return res.render('signup', {msg: 'Password is required', type: 'danger'});
    }

    if(!birthDay){
        return res.render('signup', {msg: 'Birthday is required', type: 'danger'});
    }

    next();
}catch(err){
    console.error(err.message);
}
}

module.exports = registrationAuth;