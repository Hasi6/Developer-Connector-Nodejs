const Profile = require('../models/Profile');

const Delete = async(req, res)=>{

    const id = req.params.id;
    
    try{
    const profile = await Profile.findById(id);

    if(!profile){
        return res.send('No Account Found');
    }
    
    const deleteProfile = await Profile.findByIdAndDelete(id);

    if(!deleteProfile){
        return res.send('Server Error');
    }
    return res.send('Deleted Successfully');
         
    }catch(err){
        console.error(err.message);
    }
}

module.exports = Delete;