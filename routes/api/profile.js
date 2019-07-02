const express = require('express');
const router = express.Router();

// Get Profile
module.exports = router.get('/', (req, res)=>{
    res.send('Profile route');
});

