const Post = require('../models/Post');
const User = require('../models/User');
const Comments = require('../models/Comments');
const Likes = require('../models/Likes');
const Unlikes = require('../models/Unlikes');

const singlePost = async(req, res) => {
    postId = req.params.id;

    try{
    const post = await Post.findById(postId);
    const comments = await Comments.find({post: postId});
    const commentsCount = await Comments.find({post: postId}).countDocuments();
    const likesCount = await Likes.find({post:postId}).countDocuments();
    const unlikesCount = await Unlikes.find({post:postId}).countDocuments();
    const user = await User.findById(post.user);

    backURL=req.header('Referer') || '/';

    if(!post){
        return res.redirect(backURL);
    }

    return res.render('singlePost', {
        post: post,
        user: user,
        comments: comments,
        commentsCount: commentsCount,
        likesCount: likesCount,
        unlikesCount: unlikesCount
    })
}catch(err){
    console.error(err.message);
}
}

module.exports = singlePost;