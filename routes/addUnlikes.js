const Post = require("../models/Post");

const addUnlikes = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.userId;

  backURL=req.header('Referer') || '/';

  if(userId == undefined || userId == null){
      return res.render('signup',{ msg: 'You Need to logged in first', type: 'danger'});
  }

  try{
        
    const post = await Post.findById(postId);

    if(!post){
        return res.render(`${backURL}`);
    }

    if(post.unlikes.filter(unlike => unlike.user.toString() === userId).length > 0 ){
        return res.render(`${backURL}`);
    }

    post.unlikes.unshift({ user: userId });

    // get remove Index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(userId);
    post.likes.splice(removeIndex, 1);

    await post.save();

    return res.redirect(`${backURL}`)

  }catch(err){
      console.error(err.message);
  }
};
module.exports = addUnlikes;
