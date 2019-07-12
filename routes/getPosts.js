const Post = require('../models/Post');

const getPosts = async (req, res)=>{

    try{

        const allPostsCount = await Post.find().countDocuments();
        const allPosts = await Post.find();

        if(allPostsCount < 0 ){
            return res.send('No Posts Found');
        }
        return res.send(allPosts);

    }catch(err){
        console.error(err.message);
    }
}

module.exports = getPosts;