const User = require('../models/User');

const profileSettings = async(req, res) => {

    const userId = req.params.userId;
    const loggedUserId = req.session.userId;
    try{
    const user = await User.findById(userId);
    const loggedUser = await User.findById(loggedUserId);
    backURL=req.header('Referer') || '/';

    if(!user || !loggedUser){
        return res.redirect(backURL);
    }

    let social = user.social

    return res.render('profileSettings',{
        loggedUser: loggedUser,
        social: social
    })
}catch(err){
    console.error(err.message);
}
}

module.exports = profileSettings;