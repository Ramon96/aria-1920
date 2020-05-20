require('dotenv').config();
const querystring = require('querystring');

const express = require('express');
const router = express.Router();

const clientId = String(process.env.clientId); // Your client id
const clientSecret = String(process.env.clientSecret); // Your client secret
const redirectUri = 'http://localhost:3000/callback/'; // Your redirect uri


const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

router.get('/login', function (req, res) {



    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email streaming user-library-read';
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