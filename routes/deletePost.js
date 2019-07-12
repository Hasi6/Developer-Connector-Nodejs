const Post = require('../models/Post');

const DeletePost = async (req, res)=>{
    const id = req.session.userId;
    const postId = req.params.id;

    try{
        const post = await Post.findById(postId);

        if(!post){
            return res.send('No Posts Found');
        }

        if(post.user != id ){
            return res.send('You can\'t others Posts');
        }

        const successDelete = await Post.findByIdAndDelete(postId);

        if(!successDelete){
            return res.send('Server Error');
        }

        return res.send('Delete Success');

    }catch(err){
        console.error(err.message);
    }
}

module.exports = DeletePost;