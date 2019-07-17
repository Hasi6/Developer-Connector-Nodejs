const User = require('../models/User');
const Post = require('../models/Post');

const getMyProfile = async(req, res)=>{

    const userId = req.params.userId;
    const id = req.session.userId;

    if(userId != id){
        return res.render('signup', {msg: "Unauthorized Action", type: "danger"});
    }

    if(!id){
        return res.render("signup", {msg: 'Unauthorized Action', type: 'danger'});
    }

    try{
        const user = await User.findById(userId);
        const loggedUser = await User.findById(id);
        const posts = await Post.find({user: userId});
        const userEdu = user.education;
        const userEduSize = userEdu.length;

        console.log(userEdu.length);
        if(user){
            return res.render('myProfile',{
                user: user,
                posts: posts,
                id: id,
                loggedUser: loggedUser,
                userEdu: userEdu
            });
        }
        return res.send('No User Found');
        
    }catch(err){
        console.error(err.message);
    }
}

module.exports = getMyProfile;