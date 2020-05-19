require('dotenv').config();
const querystring = require('querystring');

const express = require('express');
const router = express.Router();

const request = require('request');

router.get('/profile', function (req, res) {
    const stateKey = 'spotify_auth_state';
    const redirectUri = 'http://localhost:3000/profile';
    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
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

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                const accessToken = body.access_token,
                    refreshToken = body.refresh_token;

                const options = {
                    url: 'https://api.spotify.com/v1/me/tracks',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                    console.log(body['items'][0]['track']);

                    res.render('spotify/profile', {body:body})
                });

                // we can also pass the token to the browser to make requests from there
                // res.redirect('/#' +
                //     querystring.stringify({
                //         access_token: accessToken,
                //         refresh_token: refreshToken
                //     }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

router.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});


module.exports = router;