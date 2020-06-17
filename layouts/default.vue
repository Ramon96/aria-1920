<template>
  <div>
    <PlayBar :playing-track="playingTrack" @updateTrack="getTrack" />
    <!-- {{ playingTrack }} -->
    <nuxt />
  </div>
</template>

<script>

// import { mapState } from 'vuex'
import PlayBar from '~/components/PlayBar.vue'
export default {
  transition: 'slide-out',
  components: {
    PlayBar
  },
  data () {
    return {
      trackTerm: '',
      tracks: [],
      // playingTrack: null,
      isToggled: false
    }
  },

  computed: {
    playingTrack () {
      const temp = this.$store.state.player.currentlyPlaying
      return Object.keys(temp).length === 0 && temp.constructor === Object ? false : temp
    }
  },
  watch: {
    playingTrack (newVal, oldVal) {
      console.log('hmmm', oldVal, newVal)
    },
    isToggled (newVal, oldVal) {
      console.log('triggered')
      console.log(newVal, oldVal)
    }
  },
  created () {
    // this.playingTrack = this.$store.state.player.currentlyPlaying
    // console.log(';wef', JSON.parse(JSON.stringify(this.$store.state.player.currentlyPlaying)))
  },
  // created () {
  //   this.isToggled = this.$store.state.isToggled
  //   this.playingTrack = this.$store.state.currentlyPlaying
  //   console.log('hoi', this.playingTrack)
  //   console.log('hoi', this.isToggled)
  // },

  mounted () {
    // this.test()
  },
  methods: {
    async test () {
      const data = await this.$axios.get('/api/spotify/now-playing/')
      // console.log(data.data.item)
      this.playingTrack = data.data.item
    },

    onSearch (value) {
      console.log(value)
      this.tracks = value
    },

    togglePlay (value) {
      console.log('toggle')
    },

    getTrack (value) {
      if (value !== 'undefined') {
        this.playingTrack = value
        // this.$store.dispatch('player/setPlayingTrack', value)
        // console.log(this.$store.state.playingTrack)
      }
    }
  },
  head () {
    return {
      script: [
        {
          src: 'https://sdk.scdn.co/spotify-player.js',
          body: true,
          async: true
        }
      ]
    }
  }

}
</script>
