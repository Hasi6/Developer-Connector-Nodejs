const User = require("../models/User");
const Profile = require("../models/Profile");

const userProfile = async (req, res) => {
  try {
    const {
      name,
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkdin
    } = req.body;

    // profileObject
    const profileObject = {};
    profileObject.user = req.session.userId;
    if (name) profileObject.name = name;
    if (company) profileObject.company = company;
    if (website) profileObject.website = website;
    if (location) profileObject.location = location;
    if (bio) profileObject.bio = bio;
    if (status) profileObject.status = status;
    if (githubusername) profileObject.githubusername = githubusername;

    // add skills to an array
    if (skills) {
      profileObject.skills = skills.split(",").map(skill => skill.trim());
    }

    // social links
    profileObject.social = {};
    if (youtube) profileObject.social.youtube = youtube;
    if (facebook) profileObject.social.facebook = facebook;
    if (twitter) profileObject.social.twitter = twitter;
    if (instagram) profileObject.social.instagram = instagram;
    if (linkdin) profileObject.social.linkdin = linkdin;

    const user = await User.findById(req.session.userId);

    let profile = await Profile.findOne({ user: user });

    // if profile found update the details
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: user },
        { $set: profileObject },
        { new: true }
      );
    return res.json(profile);
    }

    // create new profile
    profile = new Profile(profileObject);

    await profile.save();
    return res.json(profile);

    // const profile = new Profile({
    //   user,
    //   status,
    //   skills
    // });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = userProfile;
