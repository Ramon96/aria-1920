const querystring = require('querystring')
const express = require('express')
const router = express.Router()
const clientId = String(process.env.clientId)

const generateRandomString = function (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

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

    console.log('still in this route')
}
