const User = require("../models/User");

const addEducation = async (req, res) => {
  const id = req.session.userId;

  if(!id){
    return res.render('signup', {msg: "Unauthorized Action", type: "danger"});
  }

  const { school, degree, fieldofstudy, from, to, description } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description
  };

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.render("signup", {msg: 'Unauthorized Action', type: 'danger'});
    }

    await user.education.unshift(newEdu);
    await user.save();

    return res.render("profileSettings", {msg: "Update Successfully", type: 'success'});
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addEducation;
