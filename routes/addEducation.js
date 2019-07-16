const User = require("../models/User");

const addEducation = async (req, res) => {
  const id = req.session.userId;

  const { school, degree, fieldofstudy, from, to, current, description } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  try {
    const user = await User.findOne({ user: id });

    if (!user) {
      return res.send("No User Found");
    }

    await user.education.unshift(newEdu);
    await user.save();

    return res.send(newEdu);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addEducation;
