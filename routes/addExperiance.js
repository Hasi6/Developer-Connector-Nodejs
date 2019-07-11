const Profile = require("../models/Profile");

const addExperiance = async (req, res) => {
  const id = req.session.userId;

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
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

    await profile.exprience.unshift(newExp);
    await profile.save();
    console.log(profile.exprience);

    return res.send(newExp);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addExperiance;
