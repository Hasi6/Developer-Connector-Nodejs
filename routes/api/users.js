const User = require('../../models/User');
const express = require('express');
const app = express.Router();
const { check, validationResult } = require('express-validator')

// Register User
module.exports = app.post([
    check('name', 'Name is Required')
    .not()
    .isEmpty(),
    check('email','Please Include a valid Email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({min:6})
], (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    res.send(req.errors);
});

