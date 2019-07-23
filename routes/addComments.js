const Post = require("../models/Post");
const User = require("../models/User");

const addComment = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;

  try {
    const text = req.body.text;

    backURL=req.header('Referer') || '/';

    const post = await Post.findById(postId);

    if (!post) {
      return res.send("No Post found");
    }

    const user = await User.findById(userId);

    let comment = {
      user: user.username,
      userId: userId,
      postId: postId,
      userImage: user.profilePic,
      text
    };
    console.log(post)
    post.comments.unshift(comment);
    const success = await post.save();

    if (!success) {
      return res.send("Server Error");
    }

    return res.redirect(backURL);
    
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addComment;