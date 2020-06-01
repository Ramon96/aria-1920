<template>
  <section>
    <SearchField @getTracks="onSearch" />

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

    onSearch (value) {
      console.log(value)
      this.tracks = value
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
