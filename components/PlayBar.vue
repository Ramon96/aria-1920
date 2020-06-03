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
              <button data-control="pause" class="playButton">Pause</button>
              <button @click="getUserInfo">Get User</button>
            </div>
  </transition>
</template>
<script>




export default {
  head(){
    return {
      title: 'playbar',
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
  data () {
    return {
      accessToken: ''
    }
  },
  watch: {
    playingTrack: function(newVal, oldVal){
      console.log(newVal, oldVal)

      this.play()

    }
  },
  computed: {
   
  },
  mounted(){
    this.init();
  },
  methods: {

    async getAccesToken () {
      console.log('Getting acces token')
      // if(this)
      const accesToken = await this.$axios.get('/api/spotify/get-accestoken')
      console.log(accesToken)
    
      const { data: token } = accesToken
      this.accessToken = token
      console.log('token' , this.accessToken)
      return this.accessToken
      // this.$store.commit('updateAccessToken', tpl)
    },
      async getUserInfo () {
      // TODO remove this, this is for testing which user is logged in
       const userData =  await this.$axios(
        {
          url: `https://api.spotify.com/v1/me/`,
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )
      console.log(userData)
    },
    // TODO This will turn into initSdk or whatever
    async init () {



      (async () => {
        const {
          Player
        } = await this.waitForSpotifyWebPlaybackSDKToLoad();
        console.log("The Web Playback SDK has loaded.");

            // if(process.client){

        
        // window.onSpotifyWebPlaybackSDKReady = () => {

        

        const token = await this.getAccesToken ()
        console.log('token', this.accessToken)
        
        // Create a new player, listening to the playtrack
        const player = new Player({
            name: 'ARIA',
            getOAuthToken: cb => {
                cb(token);
            },
            volume: .9
        });

      console.log(player)

    // Error logging
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));

    player.on('player_state_changed', state => {
      console.log(state)



     
       
    })

       // Ready
    player.on('ready', data => {
        console.log('Ready with Device ID', data.device_id);
        //   this.$axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${data.device_id}`, {
            
        //     headers: {
        //         'Authorization': `Bearer ${this.accessToken}`,
        //     },
        //     body: {
            
        //         uris: ['spotify:track:6UB9mShVLbMm0W4e6vud4C']
        //     }
        // })


    this.$axios(
      {
        url: `https://api.spotify.com/v1/me/player/play?device_id=${data.device_id}`,
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        data: JSON.stringify({
                uris: ['spotify:track:6UB9mShVLbMm0W4e6vud4C']
            })
      }
    )
        
    // fetch(`https://api.spotify.com/v1/me/player/play?device_id=${data.device_id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + this.accessToken,
    //         },
    //         body: JSON.stringify({
    //             uris: ['spotify:track:6UB9mShVLbMm0W4e6vud4C']
    //         })
    //     })


        


    });

    // Connect to the player!
    player.connect();
      // }
      


          // const track = await this.$axios.$get(
          //   '/api/spotify/play/'
          //   , {
          //     params: {
          //       track: this.trackTerm
          //     }
          //   })
        // }
      })();

  
  }, 

  play(uri){

  },
    async waitForSpotifyWebPlaybackSDKToLoad () {
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

<style scoped>
   
</style>
