const Post = require("../models/Post");
const Comments = require("../models/Comments");
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

    const username = await User.findById(userId);

    const comment = new Comments({
      user: username.username,
      post: postId,
      text
    });

    const success = await comment.save();

    if (!success) {
      return res.send("Server Error");
    }

    return res.redirect(backURL);
    
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addComment;