const Profile = require("../models/Profile");
const User = require("../models/User");

const getAllProfiles = async (req, res) => {
  try {
    const allProfilesCount = await Profile.find().countDocuments();
      const allProfiles = await Profile.find().populate('users',['username','email']);
      console.log(allProfiles);
      return res.json(allProfiles);
    }
   catch (err) {
    console.error(err.message);
  }
}
module.exports = getAllProfiles;
