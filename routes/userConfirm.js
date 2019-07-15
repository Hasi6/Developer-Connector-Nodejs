const User = require('../models/User');

const userConfirm = async (req, res)=>{

    try{
    const { email, userToken } = req.body;


    const user = await User.findOne({email: email});

    

    if(!user){
      return res.render('confirm', {msg: 'No User Found in this Email', type: 'danger'});
    }

    if(user.userToken == userToken ){
        req.session.userId = user._id;
        await User.findOneAndUpdate({email: email}, { $set: {confirmed : true}});
        return res.redirect(`/api/profile/${req.session.userId}`);
    }
    return res.render('confirm', {msg: 'Invalid Token', type: 'danger'});
}catch(err){
    console.error(err.message);
}
}

module.exports = userConfirm;