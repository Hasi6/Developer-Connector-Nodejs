const User = require("../models/User");

const addExperiance = async (req, res) => {
  const id = req.session.userId;

  const { title, company, country, from, to, description } = req.body;

  console.log(title);
  
  if(title == '' || company== '' || country == '' || from == '' || to == '' || description == ''){
    return res.render('profileSettings', {msg: 'Please fill all Fields', type: 'danger'});
  }
  const newExp = {
    title,
    company,
    country,
    from,
    to,
    description
  };

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.send("No User Found");
    }

    await user.exprience.unshift(newExp);
    await user.save();
    console.log(user.exprience);

    return res.redirect('/api/myProfile/'+id);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addExperiance;
