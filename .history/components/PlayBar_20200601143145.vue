<template>
  <transition name="fade">
            <div>
              <!-- <progress value="0" max="100" ></progress> -->
              <!-- <img :src="track.albumCover" :alt="track.title">
            <div class="track-name">{{track.title}}</div>
            <div v-for="artist in track.artists" v-bind:key="artist.id" class="track-artist">
              {{playingTrack}}
            </div> -->
              {{playingTrack}}
              <button data-control="pause" class="playButton"> </button>
            </div>
  </transition>
</template>
 <script src="https://sdk.scdn.co/spotify-player.js"></script>
<script>


if(process.client){
  window.onSpotifyWebPlaybackSDKReady = () => {
  console.log(window)
     
    console.log('token', token)

    // Create a new player, listening to the playtrack
    const player = new Spotify.Player({
        name: 'ARIA',
        getOAuthToken: cb => {
            cb(token);
        },
        volume: 1
    });

    // Error logging
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));
      }
      
}

export default {
  name: 'PlayBar',
  components: {},
  props: ['playingTrack'],
  data () {
    return {}
  },
  watch: {
    playingTrack: function(newVal, oldVal){
      console.log(newVal, oldVal)



    }
  },
  computed: {
   
  },
  methods: {
    async play (uri) {

      if(process.client){
        window.onSpotifyWebPlaybackSDKReady = () => {

    console.log('token', token)

    // Create a new player, listening to the playtrack
    const player = new Spotify.Player({
        name: 'ARIA',
        getOAuthToken: cb => {
            cb(token);
        },
        volume: 1
    });

    // Error logging
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));
      }
      


          // const track = await this.$axios.$get(
          //   '/api/spotify/play/'
          //   , {
          //     params: {
          //       track: this.trackTerm
          //     }
          //   })
        }
  }
  },
}
</script>

<style scoped>
   
</style>
