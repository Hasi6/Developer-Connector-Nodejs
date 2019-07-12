const Post = require("../models/Post");

const addUnlikes = async (req, res) => {
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

    if(post.unlikes.filter(unlike => unlike.user.toString() === userId).length > 0 ){
        return res.send('Already Unliked this Post');
    }

    post.unlikes.unshift({ user: userId });

    // get remove Index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(userId);
    post.likes.splice(removeIndex, 1);

    await post.save();

    return res.send(post.unlikes);

  }catch(err){
      console.error(err.message);
  }
};
module.exports = addUnlikes;
