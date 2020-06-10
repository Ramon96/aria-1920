// https://www.smashingmagazine.com/2019/03/spotify-app-vue-nuxt-javascript/
require('dotenv').config()
import express from 'express'


const spotify = require('./spotify/spotify.js')
const instagram = require('./instagram/instagram.js')
const youtube = require('./youtube/youtube.js')
const musicBrainz = require('./musicbrainz/musicbrainz.js')
const newsApi = require('./NewsApi/NewsApi.js')
// const twitter = require('./twitter/twitter.js')

const app = express()
app.use(express.json())


app.use(spotify)
app.use(youtube)
app.use(musicBrainz)
app.use(newsApi)
app.use(instagram)

module.exports = {
  path: '/api/',
  handler: app
}