require('dotenv').config();
const querystring = require('querystring');

const express = require('express');
const router = express.Router();


router.get('/login', function (req, res) {
    console.log('Logging in')
    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
    const stateKey = 'spotify_auth_state';
    const scope = 'user-read-private user-read-email user-library-read streaming';
    const redirectUri = 'http://localhost:3000/profile';
    

    // TODO This function is part of the oath Spotify flow example, used for testing, might be removed later


    const generateRandomString = function (length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    // res.render('spotify/login', { title: 'Login' });

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        }));
});


module.exports = router;