const Post = require('../models/Post');
const User = require('../models/User');

const singlePost = async(req, res) => {
    postId = req.params.id;
    const userId = req.session.userId;

    try{
    const post = await Post.findById(postId);
    const user = await User.findById(post.user);
    const loggedUser = await User.findById(userId);

    backURL=req.header('Referer') || '/';

    if(!post){
        return res.redirect(backURL);
    }
    const commentUserIds = post.comments.map((user)=> { return user.userId});

    const commentedUser = commentUserIds.includes(userId);

    return res.render('singlePost', {
        post: post,
        user: user,
        loggedUser: loggedUser,
        comments: post.comments,
        likesCount: post.likes,
        unlikesCount: post.unlikes,
        commentedUser : commentedUser
    })
}catch(err){
    console.error(err.message);
}
}

module.exports = singlePost;