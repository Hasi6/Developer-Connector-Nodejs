const User = require('../models/User');
const Post = require('../models/Post');

const addPost = async (req, res)=>{
    const id = req.session.userId;

    const { title, body } = req.body;

    backURL=req.header('Referer') || '/';

    if(!id == null){
        return res.render('signup',{msg: 'You Need To log First', type: 'danger'});
    }
    try{

    const user = await User.findById(id);

    if(!user){
        return res.render('signup',{msg: 'You Need To log First', type: 'danger'});
    }

    const post = new Post({
        user: id,
        title,
        body
    });

    const save = await post.save();
    if(!save){
        return res.send('Server Error')
    }
    return res.redirect(backURL);
}catch(err){
    console.error(err.message);
}

}

module.exports = addPost;