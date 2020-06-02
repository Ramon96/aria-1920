<template>
  <section>
    <SearchField />
    <!-- <p v-if="!isConnected">
      😭 {{ $nuxt.layout.authorName }} hasn’t connected yet. 😭
    </p> -->

    <ul v-if="tracks.length" id="track-list">
      <Track v-for="track in tracks" :key="track.id" :track="track" />
    </ul>
  </section>
</template>

<script>
import SearchField from '~/components/SearchField.vue'
import Track from '~/components/Track.vue'

export default {
  components: { SearchField, Track },

  data () {
    return {
      trackTerm: '',
      tracks: []
    }
  },
  methods: {
    async getTracks () {
      console.log('Dit werkt')

      //   debounce(300, () => {
      // Debounced function
      const data = await this.$axios.$get(
        '/api/spotify/search/'
        , {
          params: {
            track: this.trackTerm
          }
        })

      console.log('data', data)

      if (!data.error) {
        console.log('yes, has tracks')
        const {
          data: {
            tracks: {
              items
            }
          }
        } = data

        console.log('data', items)
        this.tracks = items
      } else {
        console.log('nope')
        this.tracks = []
      }

      // });

      // debounce(300, async () => {
      //     // Debounced function
      //         const data = await this.$axios.$get(
      //         `/api/spotify/search/${this.trackTerm}`
      //         )
      //         console.log('now')
      // });
      console.log(this.trackTerm)
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
