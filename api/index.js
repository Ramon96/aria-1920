// https://www.smashingmagazine.com/2019/03/spotify-app-vue-nuxt-javascript/
require('dotenv').config()
import express from 'express'


const spotify = require('./spotify/spotify.js')

const app = express()
app.use(express.json())


app.use(spotify)


module.exports = {
  path: '/api/',
  handler: app
}