<template>
  <main>
    <section>
      <SearchField @getTracks="onSearch" />

      <ul v-if="tracks.length" id="track-list" @getPlaying="getTrack">
        <Track v-for="track in tracks" :key="track.id" :track="track" @click.native="getTrack(track)" />
      </ul>
    </section>
    <footer>
      <nuxt-link to="/player">
        <PlayBar :playing-track="playingTrack" @updateTrack="getTrack" />
      </nuxt-link>
    </footer>
  </main>
</template>

<script>
import SearchField from '~/components/SearchField.vue'
import Track from '~/components/Track.vue'
import PlayBar from '~/components/PlayBar.vue'

export default {
  transition: 'slide-out',
  components: {
    SearchField,
    Track,
    PlayBar
  },

  data () {
    return {
      trackTerm: '',
      tracks: [],
      playingTrack: false
    }
  },
  methods: {

    onSearch (value) {
      console.log(value)
      this.tracks = value
    },

    getTrack (value) {
      if (value !== 'undefined') {
        this.playingTrack = value
        this.$store.dispatch('player/setPlayingTrack', value)
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

<style scoped>

.slide-out-leave{
  transform: translate(0, 0);
  /* opacity: 1; */
}
.slide-out-leave-active,
.slide-out-enter-active{
  transition: all 1s;
}
.slide-out-leave-to,
.slide-enter{
  transform: translate(-100%, 0);
  /* opacity: 0; */
}

section {
  min-width: 300px;
  max-width: 750px;
  margin: auto;
  padding: 1em;
}
</style>
