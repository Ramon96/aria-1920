<template>
  <section>
    <SearchField @getTracks="onSearch" />

    <ul v-if="tracks.length" id="track-list" @click="getTrack">
      <Track v-for="track in tracks" :key="track.id" :track="track" />
    </ul>
    <transition name="fade">
      <PlayBar :playingTrack="playingTrack" />
    </transition>
  </section>
</template>

<script>
import SearchField from '~/components/SearchField.vue'
import Track from '~/components/Track.vue'

export default {
  components: {
    SearchField,
    Track
  },

  data () {
    return {
      trackTerm: '',
      tracks: [],
      playingTrack: {}
    }
  },
  methods: {

    onSearch (value) {
      console.log(value)
      this.tracks = value
    },

    test (value) {
      console.log(value)
    },

    getTrack (event) {
      console.log(event.path)
      console.log(event.target.dataset.track_uri)
      // this.$store.dispatch('')

      const LI = event.path.find(el => el.tagName.toLowerCase() === 'li')
      console.log('li', LI)
      if (typeof LI !== 'undefined') {
        // Get track uri from li data attribute
        const trackUri = LI.getAttribute('data-track_uri')
        console.log('trackuri', trackUri)
        // play(data.device_id, token, trackUri);
        // this.$emit('playTrack', trackUri)

        this.playTrack(trackUri)
      } else {
        console.error("Can't find list-item along event path")
      }
    },
    async play (uri) {
      const track = await this.$axios.$get(
        '/api/spotify/play/'
        , {
          params: {
            track: this.trackTerm
          }
        })
    }
  }

}
</script>

<style scoped>
section {
  min-width: 300px;
  max-width: 750px;
  margin: auto;
  padding: 1em;
}
</style>
