const User = require('../models/User');

const addSocialMedia = async (req, res) => {

    const userId = req.session.userId;
    const { youtube, twitter, facebook, linkedin, instagram } = req.body;

    if(!userId){
        return res.render('signup', {msg: 'Unauthorized Action', type: 'danger'});
    }

    backURL=req.header('Referer') || '/';

    try{

        const user = await User.findById(userId);

        if(!user){
            return res.redirect(backURL);
        }

        const newSocial = {
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram
        }

         user.social = newSocial;

         await user.save();

         return res.redirect(backURL);


    }catch(err){
        console.error(err.message);
    }

}

module.exports = addSocialMedia;