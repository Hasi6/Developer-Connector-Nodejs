const Post = require("../models/Post");

const addComment = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;

  try {
    const text = req.body.text;

    const post = await Post.findById(postId);

    if (!post) {
      return res.send("No Post found");
    }

    const newComment = {
      user: userId,
      text
    };

    await post.comments.unshift(newComment);
    const success = await post.save();

    if (!success) {
      return res.send("Server Error");
    }

    return res.send(newComment);
    
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addComment;