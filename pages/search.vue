<template>
  <section>
    <SearchField @getTracks="onSearch" />

    <ul v-if="tracks.length" id="track-list" @getPlaying="getTrack">
      <Track v-for="track in tracks" :key="track.id" :track="track" @click.native="getTrack(track)" />
    </ul>
    <PlayBar :playing-track="playingTrack" @updateTrack="getTrack" />
  </section>
</template>

<script>
import SearchField from '~/components/SearchField.vue'
import Track from '~/components/Track.vue'
import PlayBar from '~/components/PlayBar.vue'

export default {
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
      }
    },

    // getTrack (event) {
    //   console.log(event.path)
    //   console.log(event.target.dataset.track_uri)
    //   // this.$store.dispatch('')

    //   const LI = event.path.find(el => el.tagName.toLowerCase() === 'li')
    //   console.log('li', LI)
    //   if (typeof LI !== 'undefined') {
    //     // Get track uri from li data attribute
    //     const trackUri = LI.getAttribute('data-track_uri')
    //     console.log('trackuri', trackUri)
    //     // play(data.device_id, token, trackUri);
    //     // this.$emit('playTrack', trackUri)

    //     this.playingTrack = trackUri
    //   } else {
    //     console.error("Can't find list-item along event path")
    //   }
    // },
    async play (uri) {
      // const track = await this.$axios.$get(
      //   '/api/spotify/play/'
      //   , {
      //     params: {
      //       track: this.trackTerm
      //     }
      //   })
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
section {
  min-width: 300px;
  max-width: 750px;
  margin: auto;
  padding: 1em;
}
</style>
