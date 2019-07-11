const User = require('../models/User');

const Delete = async(req, res)=>{

    const id = req.params.id;
    
    try{
    const user = await User.findById(id);

    if(!user){
        return res.send('No Account Found');
    }
    
    const deleteUser = await User.findByIdAndDelete(id);

    if(!deleteUser){
        return res.send('Server Error');
    }
    return res.send('Deleted Successfully');
         
    }catch(err){
        console.error(err.message);
    }
}

module.exports = Delete;