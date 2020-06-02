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
  components: { SearchField, Track }

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
