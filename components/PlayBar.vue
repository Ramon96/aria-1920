<template>
 <transition name="fade">

      <div v-if="playingTrack" id="play-bar" :class="playingTrack ? 'playing' : ''">
         
          <progress value="0" max="100"></progress>
          <nuxt-link to="/player">
          <!-- {{ playingTrack.album.images }} -->
          <img :src="playingTrack.album.images[2]['url']" :alt="playingTrack.title">
          <marquee behavior="scroll" direction="left">
          <span class="track-name">{{ playingTrack.name }}</span>
          <span v-for="artist in playingTrack.artists" v-bind:key="artist.id" class="track-artist">
            {{artist.name}}
          </span>
          </marquee>
         </nuxt-link>
        <button :data-control="paused ? 'pause' : 'play'" @click="checkPaused" class="playButton"></button>
      </div>

    </transition>
</template>
<script>

export default {
  head() {
    return {
      title: this.playingTrack ? `Playing - ${this.playingTrack.name}` : 'Search',
      script: [{
        src: 'https://sdk.scdn.co/spotify-player.js',
        async: true,
        body: true
      }],
    }
  },
  name: 'PlayBar',
  components: {},
  props: ['playingTrack'],
  data() {
    return {
      accessToken: '',
      data: {},
      paused: true,
      player: {},
      initialised: false
    }
  },
  watch: {
    playingTrack: function (newVal, oldVal) {
      console.log(newVal, oldVal)

      if(this.initialised == true){
        // this.$store.dispatch('currentlyPlaying', newVal)
        this.play(newVal.uri, this.data)
      }else{
        setTimeout(
          this.play(newVal.uri, this.data)
        , 1000)
      }
    
    }
  },
  computed: {

  },
  beforeMount() {
    this.init();
  },
  methods: {

    async getAccesToken() {
      console.log('Getting acces token')
      // if(this)
      const accesToken = await this.$axios.get('/api/spotify/get-accestoken')
      console.log(accesToken)

      const {
        data: token
      } = accesToken
      this.accessToken = token
      console.log('token', this.accessToken)
      return this.accessToken
      // this.$store.commit('updateAccessToken', tpl)
    },
    async getUserInfo() {
      // TODO remove this, this is for testing which user is logged in
      const userData = await this.$axios({
        url: `/api/spotify/ramon`,
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      })
      console.log(userData)
    },
    // TODO This will turn into initSdk or whatever
    async init() {

      (async () => {
        const {
          Player
        } = await this.waitForSpotifyWebPlaybackSDKToLoad();
        console.log("The Web Playback SDK has loaded.");

        const token = await this.getAccesToken()
        console.log('token', this.accessToken)

        // Create a new player, listening to the playtrack
        const player = new Player({
          name: 'ARIA',
          getOAuthToken: cb => {
            cb(token);
          },
          volume: .9
        });

        console.log('Player',  player)

        // Error logging
        player.on('initialization_error', e => console.error(e));
        player.on('authentication_error', e => console.error(e));
        player.on('account_error', e => console.error(e));
        player.on('playback_error', e => console.error(e));

        player.on('player_state_changed', state => {
          console.log(state)
          const { 
            track_window: {
              current_track
            }
          } = state

          // this.playingTrack = current_track

          // this.$emit('updateTrack', current_track)
        })

        // Ready
        player.on('ready', data => {
          console.log('Ready with Device ID', data.device_id);
          this.initialised = true
          this.data = data
          this.player = player
        });

        // Connect to the player!
        player.connect();

      })();

    },

    play(uri, data) {
      this.$axios({
        url: `https://api.spotify.com/v1/me/player/play?device_id=${data.device_id}`,
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        data: JSON.stringify({
          uris: [uri]
        })
      })
    },
    checkPaused (){

        this.player.togglePlay().then(() => {
          console.log('Toggled playback!');
          this.paused = !this.paused
        });
      
    },
    async waitForSpotifyWebPlaybackSDKToLoad() {
      return new Promise(resolve => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify);
          };
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter {
  transform: translate(0, 100%);
}

.fade-enter-active {
  transition: all .3s ease-in-out;
}

.fade-enter-to {
  transform: translate(0, 0);
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  transition: all .3s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
}
// .play-bar {

// }

#play-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
  font-family: spotify-book;
  // was class wrapper
  position: fixed;
  bottom: 0;
  background: #282828;
  width: 100%;

  a{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
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
</style>
