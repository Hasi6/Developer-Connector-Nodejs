const User = require('../models/User');

const forgetPasswords =  async (req, res) => {
    const { email } = req.body;

    console.log(email);

    if(email === null){
        return res.render('signup', {msg: 'Unauthorized Action', type: 'warning'});
    }

    try{
        const user = await User.findOne({email: email});

        if(!user){
            return res.render('signup', {msg: `No users found in ${email} this email`, type: 'warning'});
        }

        const output = `<ul>
                            <li>User Token = ${user.userToken}</li>
                        </ul>`;
        // let testAccount = await nodemailer.createTestAccount();

        var nodeoutlook = require("nodejs-nodemailer-outlook");
        nodeoutlook.sendEmail({
        auth: {
            user: "udhmovies@outlook.com",
            pass: "Hasitha6"
        },
        from: "udhmovies@outlook.com",
        to: user.email,
        subject: "User Token",
        html: output,

        onError: e => console.log(e),
        onSuccess: i => console.log(i)
        });

        return res.redirect(`/api/resetPassword/${user.id}`);
    }catch(err){
        console.error(err.message);
    }
}

module.exports = forgetPasswords;