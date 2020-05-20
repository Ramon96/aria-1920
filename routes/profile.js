// TODO onnodige comments opruimen
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
const express = require('express'); // Express web server framework
const router = express.Router();

const request = require('request'); // "Request" library
// const cors = require('cors');
const querystring = require('querystring');

const clientId = String(process.env.clientId); // Your client id
const clientSecret = String(process.env.clientSecret); // Your client secret

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

const stateKey = 'spotify_auth_state';
router.get('/callback', function (req, res) {
    // console.log('testing');
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;


    const port = `:${ req.app.settings.port}` || '';
    const redirectUri = `${ req.protocol }://${ req.hostname }${ port }/callback/`; // Your redirect uri

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        /* eslint-disable */
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
            },
            json: true
        };
        /* eslint-enable */
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                const accessToken = body.access_token,
                    refreshToken = body.refresh_token;

                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                /* eslint-disable */
                res.redirect('/profile/#' +
                    querystring.stringify({
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }));
                /* eslint-enable */
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

router.get('/profile', function (req, res) {

    res.render('spotify/profile');
});

router.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    const refreshToken = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
        },
        /* eslint-disable */
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        },
        /* eslint-enable */
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const accessToken = body.access_token;
            res.send({
                'access_token': accessToken
            });
        }
    });
});


module.exports = router;