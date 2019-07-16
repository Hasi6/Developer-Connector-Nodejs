const User = require('../models/User');

const DeleteEducation = async (req, res)=>{
    const id = req.session.userId;
    const eduId = req.params.id;

    try{
        const user = await User.findOne({user: id});

        if (!user) {
            return res.send("No User Found");
          }

        // get remove exprience
        const edu_index = await user.education.map(item => item.id).indexOf(eduId);

        await user.education.splice(edu_index, 1);

        await user.save();

        return res.send(user);

    }catch(err){
        console.error(err.message);
    }
}

module.exports = DeleteEducation;