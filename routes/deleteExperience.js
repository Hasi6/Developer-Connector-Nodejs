const Profile = require('../models/Profile');

const DeleteExperiance = async (req, res)=>{
    const id = req.session.userId;
    const expId = req.params.id;

    try{
        const profile = await Profile.findOne({user: id});

        if(!profile){
            return res.send('No Profiles Found');
        }

        // get remove exprience
        const exp_index = await profile.exprience.map(item => item.id).indexOf(expId);

        await profile.exprience.splice(exp_index, 1);

        await profile.save();

        return res.send(profile);

    }catch(err){
        console.error(err.message);
    }
}

module.exports = DeleteExperiance;