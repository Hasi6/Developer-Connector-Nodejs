const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

const getOneProfile = async(req, res)=>{

    const userId = req.params.userId;
    const id = req.session.userId;

    if(!req.session.userId){
        return res.render("signup", {msg: 'Unauthorized Action', type: 'danger'});
    }

    

    try{
        const user = await User.findById(userId);
        const posts = await Post.find({user: userId});

        console.log(user.coverPic);

        if(user){
            const profile = await Profile.findOne({user:userId});
            return res.render('profile',{
                user: user,
                profile: profile,
                posts: posts,
                id: id
            });
        }
        return res.send('No User Found');
        
    }catch(err){
        console.error(err.message);
    }
}

module.exports = getOneProfile;