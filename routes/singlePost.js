const Post = require('../models/Post');
const User = require('../models/User');

const singlePost = async(req, res) => {
    postId = req.params.id;
    const userId = req.session.userId;

    try{
    const post = await Post.findById(postId);
    const user = await User.findById(post.user);
    const loggedUser = await User.findById(userId);

    if(!loggedUser){
        return req.render('signup', {msg: 'Unauthorized Action', type: 'danger'})
    }

    backURL=req.header('Referer') || '/';
    
    if(!post){
        return res.redirect(backURL);
    }
    // const commentUserIds = post.comments.map((user)=> { return user.userId});
    // const commentUsers = post.comments.map((user)=> { return user});
    // const commentedUser = commentUserIds.includes(userId);

    // let users = post.comments.map((id)=> id.userId);
    // var u;
    // users.forEach(async (data)=>{
    //     var u = await User.findById(data);
    //     let index = commentUserIds.indexOf(u.id)
    //     console.log(index)
    //     if(commentUserIds.includes(u.id)){
    //         commentUsers[index].userImage === '/images/profile.png';
    //         await post.save();
    //         console.log(commentUsers[index].userImage);
    //     }
    // })
    return res.render('singlePost', {
        post: post,
        user: user,
        loggedUser: loggedUser,
        comments: post.comments,
        likesCount: post.likes,
        unlikesCount: post.unlikes,
        // commentedUser : commentedUser,
        // u: u
    })
}catch(err){
    console.error(err.message);
}
}

module.exports = singlePost;