const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

const getOneProfile = async(req, res)=>{

    const userId = req.params.userId;
    const id = req.session.userId;

    if(!id){
        return res.render("signup", {msg: 'Unauthorized Action', type: 'danger'});
    }

    

    try{
        const user = await User.findById(userId);
        const loggedUser = await User.findById(id);
        const posts = await Post.find({user: userId});


        if(user){
            const profile = await Profile.findOne({user:userId});
            return res.render('profile',{
                user: user,
                profile: profile,
                posts: posts,
                id: id,
                loggedUser: loggedUser
            });
        }
        return res.send('No User Found');
        
    }catch(err){
        console.error(err.message);
    }
}

module.exports = getOneProfile;