const Profile = require('../models/Profile');
const User = require('../models/User');

const getOneProfile = async(req, res)=>{

    const userId = req.session.userId;

    if(!userId){
        return res.render('signup', {msg: 'Unautherize user you Need to login First'});
    }

    try{
        const user = await User.findById(userId);
        if(user){
            const profile = await Profile.findOne({user:userId});
            return res.send(profile + user);
        }
        return res.send('No User Found');
        
    }catch(err){
        console.error(err.message);
    }
}

module.exports = getOneProfile;