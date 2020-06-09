<template>
  <section>
    <Player v-if="currentTrack" :trackdata="trackdata" :track="currentTrack" />
  </section>
</template>

<script>
import Player from '~/components/Player.vue'
export default {
  components: {
    Player
  },
  data () {
    return {
      currentTrack: null,
      trackdata: null,
      interval: null
    }
  },
  created () {
    console.time()
    this.updateCurrentSong()
    console.timeEnd()

    this.interval = setInterval(() => {
      this.updateCurrentSong()
    }, 10000)
  },
  methods: {
    async updateCurrentSong () {
      // const {
      //   progress_ms: progressMs,
      //   is_playing: isPlaying,
      //   item
      // } = await this.$axios.$get(
      //   '/api/spotify/now-playing/'
      // )

      const data = await this.$axios.$get(
        '/api/spotify/now-playing/'
      )
      console.log('item', data)
      this.currentTrack = data.item
      this.trackdata = data
    }
  }
}
</script>

<style>

</style>
