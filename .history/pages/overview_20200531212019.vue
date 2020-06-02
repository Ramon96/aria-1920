<template>
  <section>
    <nuxt-link to="/search">
      Search
    </nuxt-link>
    <NowPlaying v-if="isConnected && track" :now-playing="track" :is-playing="isPlaying" />
    <p v-if="!isConnected">
      😭 {{ $nuxt.layout.authorName }} hasn’t connected yet. 😭
    </p>
  </section>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'

export default {
  components: { NowPlaying },
  computed: {
    nowPlaying () {
      if ((Object.keys(this.$store.state.nowPlaying).length !== 0)) {
        this.$store.dispatch('updateConnection', true)
        return this.$store.state.nowPlaying
      }
      return this.$store.state.recentlyPlayed
    },
    track () {
      return this.nowPlaying
    },
    isPlaying () {
      return this.$store.state.isPlaying
    },
    isConnected () {
      return this.$store.state.isConnected
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
