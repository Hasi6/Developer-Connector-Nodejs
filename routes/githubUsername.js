const Profile = require('../models/Profile');
const request = require('request');
const config = require('config');

const Github = async (req, res)=>{

    const id = req.params.id;
    const userId = req.session.userId;

    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=$
            {config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (err, response, body)=>{
            if(err){
                console.error(err.message);
            }
            if(response.statusCode !== 200 ){
                return res.send('No Users found');
            }
            return res.json(JSON.parse(body));
        });
    }catch(err){
        console.error(err.message);
        res.send('Server Error');
    }

}


module.exports = Github;