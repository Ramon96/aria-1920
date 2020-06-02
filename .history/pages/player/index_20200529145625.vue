
<template>
  <div class="container d-flex justify-content-center ">
    <div class="align-self-center">
      <h1>Player</h1>
      <!-- <a href="/login"><font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY</a> -->
      <nuxt-link to="/">
        <font-awesome-icon :icon="['fab', 'spotify']" /> Terug
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {

  asyncData (context) {
    const params = getHashParams()
    const trackListSource = document.getElementById('track-list-template').innerHTML
    const trackListTemplate = Handlebars.compile(trackListSource)
    const trackListPlaceholder = document.getElementById('track-list')

    function getHashParams () {
      const hashParams = {}
      let e; const r = /([^&;=]+)=?([^&;]*)/g
      const q = window.location.hash.substring(1)
      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2])
      }
      return hashParams
    }

    let access_token = params.access_token
    const refresh_token = params.refresh_token
    const error = params.error;

    (function () {
    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */

      const userProfileSource = document.getElementById('user-profile-template').innerHTML
      const userProfileTemplate = Handlebars.compile(userProfileSource)
      const userProfilePlaceholder = document.getElementById('user-profile')

      const oauthSource = document.getElementById('oauth-template').innerHTML
      const oauthTemplate = Handlebars.compile(oauthSource)
      const oauthPlaceholder = document.getElementById('oauth')

      // console.log(trackListSource, trackListTemplate, trackListPlaceholder)

      // console.log(access_token)

      let tracks

      if (error) {
        alert('There was an error during the authentication')
      } else {
        if (access_token) {
          // render oauth info
          oauthPlaceholder.innerHTML = oauthTemplate({
            access_token,
            refresh_token
          })

          // TODO remove any jQuery, remove what's unnecessary, refactor to vanilla what's useful
          fetch('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: 'Bearer ' + access_token
            }
          })
            .then(res => res.json())
            .then((response) => {
              console.log(response)
              userProfilePlaceholder.innerHTML = userProfileTemplate(response)

              fetch('https://api.spotify.com/v1/playlists/7rQWuA6G9Q1IJ1houKNKj5/tracks?limit=50', {
                headers: {
                  Authorization: 'Bearer ' + access_token
                }
              })
                .then(data => data.json())
                .then((data) => {
                  // console.table(data.items.map(song => song.track))
                  console.log(data)

                  const tracks = data.items.map((song) => {
                    return {
                      name: song.track.name,
                      duration: msToMinAndSec(song.track.duration_ms),
                      artists: song.track.artists,
                      uri: song.track.uri
                    }
                  })
                  trackListPlaceholder.innerHTML = trackListTemplate({
                    tracks
                  })

                  return data
                })

              fetch('https://api.spotify.com/v1/search?q=battery&type=track&limit=50', {
                headers: {
                  Authorization: 'Bearer ' + access_token
                }
              })
                .then(data => data.json())
                .then((data) => {
                  console.log(data.tracks.items[0].artists)
                  console.log(data.tracks.items.filter(song => song.artists[0].name == 'Metallica'))
                })
            })
        } else {
          // render initial screen
          // $('#login').show();
          // $('#loggedin').hide();

          // TODO Redirect to login? Can we handle this better?
        }

        document.getElementById('obtain-new-token').addEventListener('click', function () {
          fetch(`/refresh_token?refresh_token=${refresh_token}`)
            .then((res) => {
              return res.json()
            })
            .then((json) => {
              console.log(json.access_token)
              access_token = json.access_token
              oauthPlaceholder.innerHTML = oauthTemplate({
                access_token,
                refresh_token
              })
            })
        }, false)
      }
    })()

    const token = window.location.hash.substr(1).split('=')[1]
    const playBarSource = document.getElementById('play-bar-template').innerHTML
    const playBarTemplate = Handlebars.compile(playBarSource)
    const playBarPlaceholder = document.getElementById('play-bar')
    const songDetailOverlaySource = document.getElementById('song-detail-overlay-template').innerHTML
    const songDetailOverlayTemplate = Handlebars.compile(songDetailOverlaySource)
    const songDetailOverlayPlaceholder = document.getElementById('song-detail')

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('token', token)

      // Create a new player, listening to the playtrack
      const player = new Spotify.Player({
        name: 'ARIA',
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 1
      })

      // Error logging
      player.on('initialization_error', e => console.error(e))
      player.on('authentication_error', e => console.error(e))
      player.on('account_error', e => console.error(e))
      player.on('playback_error', e => console.error(e))

      // Current to check later if the song has changed, to rerender
      let currentTrack = null

      // Playback status updates
      player.on('player_state_changed', (state) => {
        // If currentTrack is not set, set it with the current_track
        if (currentTrack == null) {
          currentTrack = state.track_window.current_track

          setupTrack(state, player)
        }

        // state.context.uri = "spotify:user:upthepunx666:collection"

        console.log(state)

        // Duration from miliseconds to minutest an
        // const albumCover = album['images'][1]['url']

        // console.table([artists, name])

        // Get the playbackstate every second to update the progress bar
        const getPlaybackState = setInterval(function () {
          // Get progress bar
          const progressBar = document.querySelector('#play-bar progress')

          // Get the state of the playtrack
          getState(player)
            .then((state) => {
              if (!state) {
                console.error('User is not playing music through the Web Playback SDK')
                return
              }

              // Object destruct
              const {
                current_track,
                next_tracks: [next_track],
                position
              } = state.track_window

              if (state.paused && state.position == 0) {
                // player.nextTrack().then(() => {
                //     console.log('Skipped to next track!');
                //   });
                clearInterval(getPlaybackState)
                getNextSong()
              }

              document.querySelector('.track-progress').oninput = function () {
                this.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + this.value + '%, #535353 ' + this.value + '%, #535353 100%)'
              }

              // TODO remove this because it should happen once.
              progressBar.setAttribute('max', current_track.duration_ms)

              progressBar.setAttribute('value', state.position)

              console.log(state.paused)
              if (state.paused) {
                clearInterval(getPlaybackState)
              }

              // console.log('Currently Playing', current_track);
              // console.log('Playing Next', next_track);
              // console.log('Track window', state);
              console.log(position)
            })
        }, 1000)

        if (state.track_window.current_track.id != currentTrack.id) {
          currentTrack = state.track_window.current_track
          // Render current song in playbar
          setupTrack(state, player)
        }
        songDetailOverlayPlaceholder.querySelector('button').addEventListener('click', function (event) {
          document.body.classList.remove('overflow-hidden')
          songDetailOverlayPlaceholder.dataset.overlay = 'disabled'
        })

        // // When clicked on the playbar, trigger overlay with details and content
        playBarPlaceholder.querySelector('.track-name').addEventListener('click', function (event) {
          document.body.classList.add('overflow-hidden')
          songDetailOverlayPlaceholder.dataset.overlay = 'enabled'
        })
      })

      // Ready
      player.on('ready', (data) => {
        console.log('Ready with Device ID', data.device_id)
        setupTrackList(data)
      })

      // Connect to the player!
      player.connect()
    }

    // Play a specified track on the Web Playback SDK's device ID
    function play (device_id, token, trackUri) {
      const playBar = document.querySelector('.play-bar')

      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({

          context_uri: 'spotify:user:upthepunx666:playlist:7rQWuA6G9Q1IJ1houKNKj5',
          offset: { uri: trackUri }
        })
      })

        .then((json) => {
          console.log('res', json)

          if (!playBar.classList.contains('playing')) {
            playBar.classList.add('playing')
          }

          document.querySelector(`li[data-track-uri="${trackUri}"] div.track-name`)
            .classList.add('playing')

          // fetch('https://api.spotify.com/v1/me/player', {
          //             headers: {
          //                 'Authorization': 'Bearer ' + access_token
          //             }
          //         })
          //         .then(data => {
          //             return data.json()
          //         })
          //         .then(json => console.log('currently playing', json))
        })
    }

    function setupTrack (state, player) {
      console.log(state)
      const {
        artists,
        name,
        album,
        duration_ms
      } = state.track_window.current_track

      const formatedDuration = msToMinAndSec(duration_ms)
      const albumCoverIcon = album.images[1].url
      const albumCover = album.images[2].url

      playBarPlaceholder.innerHTML = playBarTemplate({
        name,
        duration: formatedDuration,
        artists,
        albumCover: albumCoverIcon
      })
      // TODO: turn this into a function
      const pauseBtn = document.querySelector('button.playButton')

      pauseBtn.addEventListener('click', function (event) {
        console.log('Pause btn click')
        const target = event.target
        if (target.dataset.control === 'pause') {
          player.togglePlay().then(() => {
            target.setAttribute('data-control', 'play')
          })
        } else if (target.dataset.control === 'play') {
          player.togglePlay().then(() => {
            target.setAttribute('data-control', 'pause')
          })
        }
      })

      // Render current song and artist data in hidden overlay
      // To be enabled when the user clicks on it.
      songDetailOverlayPlaceholder.innerHTML = songDetailOverlayTemplate({
        name,
        duration: formatedDuration,
        artists,
        albumCover
      })
    }

    function getState (player) {
      console.log('getting state')
      return player.getCurrentState()
    }

    function setupTrackList (data) {
      document.querySelector('#track-list').addEventListener('click', function (event) {
        const target = event.target

        // Check wether the event bubbling path contains the list item element
        const LI = event.path.find(el => el.tagName == 'LI')

        if (typeof LI !== 'undefined') {
          // Get track uri from li data attribute
          const trackUri = LI.getAttribute('data-track_uri')

          // play(data.device_id, token, trackUri);
          play(data.device_id, token, trackUri)
        } else {
          console.error("Can't find list-item along event path")
        }
      }, false)
    }

    function loadMore (offset, limit) {
      fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`, {
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      })
        .then(data => data.json())
        .then((data) => {
          // console.table(data.items.map(song => song.track))

          const tracks = data.items.map((song) => {
            return {
              name: song.track.name,
              duration: msToMinAndSec(song.track.duration_ms),
              artists: song.track.artists,
              uri: song.track.uri
            }
          })
          trackListPlaceholder.innerHTML += trackListTemplate({
            tracks
          })

          return data
        })
    }

    function isBottom () {
      let offset = 0
      window.addEventListener('scroll', throttle(function (e) {
        // console.table(window.innerHeight, window.scrollY, document.body.scrollHeight)
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          // console.log("you're at the bottom of the page")

          offset += 50

          loadMore(offset, 50)
        }
      }, 50))
    }

    isBottom()

    function getNextSong (player) {
      fetch('https://api.spotify.com/v1/me/player/next', {
        headers: {
          Authorization: 'Bearer ' + access_token
        },
        method: 'POST'
      })
      // .then(data => {
      //     console.log(data)
      //     return data.json()
      // })
        .then((json) => {
          console.log(json)
        // playNextSong()
        })
    }

    // function playNextSong(songID){

    // }

    // https://stackoverflow.com/questions/27078285/simple-throttle-in-js
    function throttle (func, timeFrame) {
      let lastTime = 0
      return function () {
        const now = new Date()
        if (now - lastTime >= timeFrame) {
          func()
          lastTime = now
        }
      }
    }

    // https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript/21294619
    function msToMinAndSec (millis) {
      const minutes = Math.floor(millis / 60000)
      const seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
}

</script>

<style lang="scss">
#track-list {
    ul {
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            list-style-type: none;
            height: 4.5em;
            transition: background-color .2s;
            &:hover {
                background-color: hsla(0, 0%, 100%, .1);
                transition: background-color .2s;
            }
            .track-name {
                font-size: 16px;
                line-height: 22px;
                letter-spacing: .015em;
                color: color(Primary);
            }
            .track-artist {
                color: color(Secondairy);
                font-size: 0.875rem;
            }
        }
    }
}
.play-bar {
    position: fixed;
    bottom: 0;
    background: #282828;
    width: 100%;
    transform: translate(0, 100%);
    transition: transform .5s;
    &.playing {
        transform: translate(0, 0);
        transition: transform .5s;
    }
}
#play-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1rem;
    font-family: spotify-book;
    progress {
        // for some reason, the styling of the progress bar gets lost if you remove the border-radius, I dont know why..
        border-radius: 1px;
        height: 2px;
        position: fixed;
        top: -1px;
        width: 100%;
    }
    progress::-webkit-progress-bar {
        background-color: #535353;
    }
    progress::-webkit-progress-value {
        background: color(Primary);
    }
    progress::-moz-progress-bar {
        /* style rules */
    }
    img {
        padding-right: 10px;
    }
    .track-name {
        color: color(Primary);
        &::after {
            content: "•";
            padding: 0 5px;
        }
    }
    .track-artist {
        color: color(Secondairy);
    }
    button {
        font-family: icons;
        background: none;
        border: none;
        color: color(White);
        margin-left: auto;
        &[data-control="play"] {
            &::before {
                content: "\f132";
                font-size: 16px;
            }
        }
        &[data-control="pause"] {
            &::before {
                content: "\f130";
                font-size: 16px;
            }
        }
    }
}
#song-detail {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    height: 100vh;
    top: 0;
    transition: opacity 3s;
    padding: 1.5rem;
    // TODO The color has to be determined by the album color, Tomas found a node library for this
    // https://cssgradient.io/
    background: rgb(25, 20, 20);
    background: linear-gradient(360deg, rgba(25, 20, 20, 1) 0%, rgba(88, 15, 57, 1) 33%, rgba(97, 14, 62, 1) 48%, rgba(255, 0, 155, 1) 100%);
    // background-color: #292929db;
    // overflow-y: scroll;
    // Wat doet deze before?
    &::before {
        content: '';
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        background-color: #000;
    }
    &[data-overlay="disabled"] {
        transform: translate(0, 100%);
        transition: transform .3s;
        &::before {
            opacity: 1;
            transition: opacity .3s .3s;
        }
    }
    &[data-overlay="enabled"] {
        transform: translate(0, 0);
        transition: transform .3s;
        &::before {
            opacity: 0;
            transition: opacity .3s .3s;
            display: none;
        }
    }
    button {
        background: none;
        border: none;
    }
    .songDetail-navigation {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .folddown {
            transform: rotate(90deg);
            fill: color(White);
        }
        .horizontal-dots {
            &::before {
                content: "\f12d";
                font-size: 32px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
        }
    }
    .cover-img {
        width: 95%;
        display: block;
        margin: auto;
    }
    .track-information {
        display: grid;
        grid-template-areas:
            'track-name like-button'
            'track-artist like-button';
        padding: 1.5rem 0;
        .track-name {
            grid-area: track-name;
            margin: 0;
        }
        .track-artist {
            grid-area: track-artist;
            color: color(White);
            font-family: spotify-light;
        }
        .like-button {
            grid-area: like-button;
            justify-self: flex-end;
            // padding-top half the font-size to center the heart
            padding-top: 14px;
            &::before {
                content: "\f320";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
            &.active {
                &::before {
                    content: "\f322";
                    font-size: 16px;
                    font-family: icons;
                    font-style: normal;
                    font-weight: 400;
                    display: inline-block;
                    color: color(Green);
                }
            }
        }
    }
    /*Chrome*/
    .track-progress {
        background: linear-gradient(to right, color(White) 0%, color(White) 1%, #535353 1%, #535353 100%);
        border-radius: 8px;
        height: 3px;
        width: 100%;
        outline: none;
        transition: background 450ms ease-in;
        -webkit-appearance: none;
    }
    .track-progress::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: color(White);
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
    .track-duration {
        display: flex;
        justify-content: space-between;
        color: color(White);
        font-family: spotify-light;
    }
    .track-controls {
        display: flex;
        justify-content: space-between;
        .shuffle {
            position: relative;
            &::before {
                content: "\f144";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
            &.active {
                &::before {
                    color: color(Green);
                }
                &::after {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    display: block;
                    width: 4px;
                    height: 4px;
                    content: "";
                    border-radius: 50%;
                    background-color: #1db954;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                }
            }
        }
        .repeat {
            position: relative;
            &::before {
                content: "\f13e";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
            &.active {
                &::before {
                    color: color(Green);
                }
                &::after {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    display: block;
                    width: 4px;
                    height: 4px;
                    content: "";
                    border-radius: 50%;
                    background-color: #1db954;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                }
            }
        }
        .prevSong {
            &::before {
                content: "\f146";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
        }
        .nextSong {
            &::before {
                content: "\f148";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
        }
        .playPause {
            position: relative;
            width: 32px;
            min-width: 32px;
            height: 32px;
            line-height: 30px;
            border-radius: 500px;
            background: white;
            &::before {
                content: "\f130";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: black;
            }
        }
    }
    .track-location{
        display: flex;
        justify-content: space-between;
        .devices {
            position: relative;
            &::before {
                content: "\f213";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
        }
        .queue {
            position: relative;
            &::before {
                content: "\f13a";
                font-size: 16px;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(White);
            }
        }
    }
}
</style>
