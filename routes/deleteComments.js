const Post = require('../models/Post');

const deletePost = async (req, res)=>{

    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userId = req.session.userId;

    try{

        const post = await Post.findById(postId);

        if(!post){
            return res.send('No Post Found');
        }

        const comment = post.comments.find(comment => comment.id === commentId);
        backURL=req.header('Referer') || '/';

        if(!comment){
            return res.send('No Comments Found');
        }
        
       if(comment.userId.toString() === userId || post.user.toString() === userId){

            // get remove index
            const removeIndex = post.comments.map(comment => comment.userId.toString()).indexOf(userId);

            post.comments.splice(removeIndex, 1);

            await post.save();

           return res.redirect(backURL);
       }

       return res.send('You can\'t Delete this comment');


    }catch(err){
        console.error(err.message);
    }

}

module.exports = deletePost;