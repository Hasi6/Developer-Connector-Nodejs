const User = require('../models/User');
const Post = require('../models/Post');

const path = require('path');

const addPost = async (req, res)=>{
    const id = req.session.userId;

    const { title, body } = req.body;
    const { image } = req.files;

    backURL=req.header('Referer') || '/';

    if(!id == null){
        return res.render('signup',{msg: 'You Need To log First', type: 'danger'});
    }
    try{
    if(image){
        await image.mv(path.resolve(__dirname, '../public/images/Post_Images', image.name));
    }
    const user = await User.findById(id);

    if(!user){
        return res.render('signup',{msg: 'You Need To log First', type: 'danger'});
    }

    const post = new Post({
        user: id,
        title,
        body,
        image: '/images/Post_Images/'+image.name
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