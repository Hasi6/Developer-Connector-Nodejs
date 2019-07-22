const Post = require("../models/Post");

const addLikes = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.userId;

  if(!userId){
      return res.render('signup', {msg: 'Unauthorized Action', type: 'danger'});
  }

  backURL=req.header('Referer') || '/';

  try{
    const post = await Post.findById(postId);

    if(!post){
        return res.redirect(`${backURL}`);
    }

    if(post.likes.filter(like => like.user.toString() === userId).length > 0 ){
        return res.redirect(`${backURL}`);
    }

    post.likes.unshift({ user: userId });

    // get remove Index
    const removeIndex = post.unlikes.map(unlike => unlike.user.toString()).indexOf(userId);
    post.unlikes.splice(removeIndex, 1);

    await post.save();

    return res.redirect(backURL);

  }catch(err){
      console.error(err.message);
  }
};
module.exports = addLikes;
