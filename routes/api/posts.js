const express = require('express');
const router = express.Router();

// Get all Post
router.get('/', (req, res)=>{
    res.send('Post route');
});

module.exports = router;