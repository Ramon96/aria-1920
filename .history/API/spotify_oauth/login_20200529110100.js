const querystring = require('querystring')
const express = require('express')
const router = express.Router()
const clientId = String(process.env.clientId)

module.exports = function (req, res, next) {
  const port = process.env.PORT === '3000' ? ':3000' : ''

  const redirectUri = `${req.protocol}://${req.hostname}${port}/callback/` // Your redirect uri
  console.log(redirectUri)

  const state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization
  const scope = 'user-read-private user-read-email streaming user-library-read user-read-playback-state user-modify-playback-state'
  /* eslint-disable */
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        }));
}