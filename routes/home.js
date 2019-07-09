const express = require('express');

const Home =  async(req,res)=>{
    return res.send('Home Works')
};

module.exports = Home;
