const querystring = require('querystring');
const express = require('express');
const router = express.Router();
const clientId = String(process.env.clientId); // Your client id

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

    // TODO redirect is now dynamic, but for production we have to check if we want to reduce this to local and live links
    // https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
    const port = `:${ req.app.settings.port}` || '';
    const redirectUri = `${ req.protocol }://${ req.hostname }${ port }/callback/`; // Your redirect uri

    console.log(redirectUri);

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email streaming user-library-read';
    /* eslint-disable */
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        }));
    /* eslint-enable */
});

module.exports = router;