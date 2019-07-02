const express = require('express');
const router = express.Router();

// Get all auth
router.get('/', (req, res)=>{
    res.send('Auth route');
});

module.exports = router;