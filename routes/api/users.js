const express = require('express');
const router = express.Router();

// Register User
router.post('/', (req, res)=>{
    console.log(req.body);
    res.render('User route');
});

module.exports = router;