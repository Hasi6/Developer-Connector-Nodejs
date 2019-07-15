const User = require("../models/User");

const getAllProfiles = async (req, res) => {
  const page = req.params.page;
  const id = req.session.userId;
  let perPage = 2;

  let allProfilesCount = await User.countDocuments();

  let lastPage = allProfilesCount / perPage;

  try {
      const allProfiles = await User.find()
      .skip(Math.abs(perPage * page - perPage))
      .sort({ createdDate: -1 })
      .limit(perPage);
      const loggedUser = await User.findById(id);
      return res.render('profiles', {
        allProfiles: allProfiles,
        allProfilesCount: allProfilesCount,
        pages: Math.ceil(lastPage),
        page: page,
        loggedUser: loggedUser
      });

    }
   catch (err) {
    console.error(err.message);
  }
}
module.exports = getAllProfiles;
