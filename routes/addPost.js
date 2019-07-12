const User = require('../models/User');
const Post = require('../models/Post');

const addPost = async (req, res)=>{
    const id = req.session.userId;

    const { name, text } = req.body;

    if(!id == null){
        return res.send('You Need To log First');
    }

    const post = new Post({
        user: id,
        name,
        text
    });

    const save = await post.save();
    if(!save){
        return res.send('Server Error')
    }
    return res.send(post);

}

module.exports = addPost;