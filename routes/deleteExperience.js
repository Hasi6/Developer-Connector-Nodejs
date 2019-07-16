const User = require('../models/User');

const DeleteExperiance = async (req, res)=>{
    const id = req.session.userId;
    const expId = req.params.id;

    try{
        const user = await User.findOne({user: id});

        if(!user){
            return res.send('No users Found');
        }

        // get remove exprience
        const exp_index = await user.exprience.map(item => item.id).indexOf(expId);

        await user.exprience.splice(exp_index, 1);

        await user.save();

        return res.send(user);

    }catch(err){
        console.error(err.message);
    }
}

module.exports = DeleteExperiance;