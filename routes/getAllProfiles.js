const Profile = require("../models/Profile");

const getAllProfiles = async (req, res) => {
  try {
      const allProfiles = await Profile.find().populate('users',['username','email']);
      return res.json(allProfiles);
    }
   catch (err) {
    console.error(err.message);
  }
}
module.exports = getAllProfiles;
