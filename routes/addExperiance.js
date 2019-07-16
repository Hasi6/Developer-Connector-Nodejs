const User = require("../models/User");

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
    const user = await User.findOne({ user: id });

    if (!user) {
      return res.send("No User Found");
    }

    await user.exprience.unshift(newExp);
    await user.save();
    console.log(user.exprience);

    return res.send(newExp);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addExperiance;
