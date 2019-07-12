const Profile = require('../models/Profile');

const DeleteEducation = async (req, res)=>{
    const id = req.session.userId;
    const eduId = req.params.id;

    try{
        const profile = await Profile.findOne({user: id});

        if (!profile) {
            return res.send("No User Found");
          }

        // get remove exprience
        const edu_index = await profile.education.map(item => item.id).indexOf(eduId);

        await profile.education.splice(edu_index, 1);

        await profile.save();

        return res.send(profile);

    }catch(err){
        console.error(err.message);
    }
}

module.exports = DeleteEducation;