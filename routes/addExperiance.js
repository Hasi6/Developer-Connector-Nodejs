const Profile = require('../models/Profile');
const User = require('../models/User');

const addExperiance = async(req, res)=>{

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
    }

    try{
        const profile = await Profile.findOne({user: id});

        if(!profile){
            return res.send('No User Found');
        }

        await profile.exprience.unshift(newExp);

        return res.send(newExp)
        

    }catch(err){
        console.error(err.message);
    }
}

module.exports = addExperiance;