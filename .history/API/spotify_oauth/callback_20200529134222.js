const querystring = require('querystring')
const url = require('url')
const request = require('request')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

module.exports = function (req, res, next) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const requestUrl = `${req.protocol}://${req.hostname}${req.originalUrl}`


  const query = new URL(requestUrl)
  const searchParams = query.searchParams

  const code = searchParams.get('code') || null
  const state = searchParams.get('state') || null
  const stateKey = 'spotify_auth_state'
  const storedState = req.headers.cookie ? req.headers.cookie[stateKey] : null
  const clientId = String(process.env.clientId)
  const clientSecret = String(process.env.clientSecret)

//   console.log('Cookies', req)
  const port = process.env.PORT === '3000' ? ':3000' : ''
  console.log('dit is de poort' + port)
  const redirectUri = `${req.protocol}://${req.hostname}${port}/callback/` // Your redirect uri

//   TODO fix getting and setting cookies
//   if (state === null || state !== storedState) {
  if (state === null) {
    console.log('if state is null', state)
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    /* eslint-disable */

    console.log('if state is not null')

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
        const accessToken = body.access_token
        const refreshToken = body.refresh_token

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            Authorization: 'Bearer ' + accessToken
          },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body)
        })

        // we can also pass the token to the browser to make requests from there
        /* eslint-disable */

        // req.session.accessToken = accessToken;
        // // req.session.refreshToken = refreshToken;
        // console.log(accessToken);
        // console.log('Testing acces token', req.session.accessToken)

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
          }))
      }
    })
  }
}
