const Profile = require("../models/Profile");

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
    const profile = await Profile.findOne({ user: id });

    console.log(id);

    if (!profile) {
      return res.send("No User Found");
    }

    await profile.education.unshift(newEdu);
    await profile.save();
    console.log(profile.education);

    return res.send(newEdu);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addEducation;
