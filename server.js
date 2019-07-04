const express = require('express');
const connectDb = require('./config/db');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

// Get Models
const User = require('./models/User');


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
app.post('/api/users',[
    check('name', 'Name is Required')
    .not()
    .isEmpty(),
    check('email','Please Include a valid Email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({min:6})
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // destructring
    const { name, email, password } = req.body;

    try{

    // See if the user already registerd
    let user = await User.findOne({ email: email });

    if(user){
       return res.status(400).json({errors: [{msg: 'This Email is Already Registered'}]});
    }

    // Get users gravatar (when user sign in set defalults values like profile picture)
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    user = new User({
        name,
        email,
        avatar,
        password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return json webtoken

    res.send('User Regitered');
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/auth', auth);

app.get('/api/profile', profile);

app.get('/api/posts', posts);



const port = process.env.PORT || 5500;

app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
})