const Post = require("../models/Post");

const addLikes = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.userId;

  if(userId == undefined || userId == null){
      return res.send('You Need to logged in first');
  }

  try{
        
    const post = await Post.findById(postId);

    if(!post){
        return res.send('No Post Found');
    }

    // const liked = await Post.findOne({likes: {user: userId}});
    // console.log(liked);

    // if(liked){
    //     return res.send('Already Liked to this Post');
    // }

    if(post.likes.filter(like => like.user.toString() === userId).length > 0 ){
        return res.send('Already Liked to this Post');
    }

    post.likes.unshift({ user: userId });

    await post.save();

    return res.send(post.likes);

  }catch(err){
      console.error(err.message);
  }
};
module.exports = addLikes;
