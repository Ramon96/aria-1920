<template>
  <div>
    <PlayBar :playing-track="playingTrack" @updateTrack="getTrack" />
    <nuxt />
  </div>
</template>

<script>

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
      playingTrack: false,
      isToggled: false
    }
  },
  created () {
    this.isToggled = this.$store.state.isToggled
    console.log('hoi', this.isToggled)
  },
  watch: {
    isToggled (newVal, oldVal) {
      console.log('triggered')
      console.log(newVal, oldVal)
    }
  },
  methods: {

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
        this.$store.dispatch('player/setPlayingTrack', value)
        console.log(this.$store.state.playingTrack)
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
