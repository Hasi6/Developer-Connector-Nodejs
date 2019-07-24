const User = require("../models/User");
const Post = require("../models/Post");
const path = require('path');

const addProfilePic = async (req, res) => {
  const id = req.session.userId;

  if(!id){
      return res.render('signup', {msg: 'Unauthorized Action', type: 'danger'});
  }

  let backURL=req.header('Referer') || '/';

  

  const { profilePic } = req.files;

  try {
    await profilePic.mv(path.resolve(__dirname, '../public/images/Profile_Images', profilePic.name));
 
    const user = await User.findById(id);

    if (!user) {
      return res.send("No User Found");
    }

    user.profilePic = '/images/Profile_Images/'+profilePic.name;
    await user.save();

    return res.redirect(backURL);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addProfilePic;
