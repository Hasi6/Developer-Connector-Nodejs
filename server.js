const express = require('express');
const connectDb = require('./config/db');
const { check, validationResult } = require('express-validator/check')

// route variables
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// connect to the database
connectDb();

// init Middleware
app.use(express.json({ extended: false }));


app.get('/', profile);

// Create User POST Request
app.post('/users',[
    check('name', 'Name is Required')
    .not().
    isEmpty(),
    check('email','Please Include a valid Email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({min:6})
], (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    res.send(req.body);
});
app.get('/api/auth', (req, res)=>{
    res.send('Auth route');
});
app.get('/api/profile', (req, res)=>{
    res.send('Profile route');
});
app.get('/api/posts', posts);



const port = process.env.PORT || 5500;

app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
})