const express = require('express');

const app = new express();


app.get('/', (req, res)=>{
    res.send("Hello CVS")
});

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
})