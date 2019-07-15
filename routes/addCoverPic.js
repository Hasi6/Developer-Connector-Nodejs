const User = require("../models/User");
const path = require('path');

const addCoverPic = async (req, res) => {
  const id = req.session.userId;

  if(!id){
      return res.render('signup', {msg: 'Unauthorized Action', type: 'danger'});
  }

  let backURL=req.header('Referer') || '/';

  const { coverPic } = req.files;

  try {
    await coverPic.mv(path.resolve(__dirname, '../public/images/Cover_Images', coverPic.name));
 
    const user = await User.findById(id);

    if (!user) {
      return res.send("No User Found");
    }

    user.coverPic = '/images/Cover_Images/'+coverPic.name;
    await user.save();

    return res.redirect(backURL);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addCoverPic;
