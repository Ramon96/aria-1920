<template>
    <section>
      <aside>
        <img v-if="image" :src="image" alt="Album Artwork">
        <Progress :class="className" :progress-percent="progress" :image="image" />
      </aside>
      <div class="metadata">
        <h2>{{ name }}</h2>
        <p>{{ artistsList }}</p>
      </div>
    </section>
</template>

<script>
import Progress from './Progress.vue'

export default {
  components: { Progress },
  props: ['isPlaying', 'nowPlaying'],
  data () {
    return { staleTimer: '', trackTimer: '' }
  },
  computed: {
    image () {
      const { album, image } = this.nowPlaying
      if (album) {
        const { url } = album.images[0]
        return url
      }
      return image || 'https://developer.spotify.com/assets/branding-guidelines/icon2@2x.png'
    },
    progress () {
      return this.$store.state.trackProgress
    },
    artistsList () {
      const { artists } = this.nowPlaying
      return artists ? artists.map(artist => artist.name).join(', ') : null
    },
    href () {
      const { external_urls } = this.nowPlaying
      return external_urls ? external_urls.spotify : null
    },
    name () {
      return this.nowPlaying.name
    },
    status () {
      return this.isPlaying
        ? `is playing this track with ${Math.round(
            this.$store.state.trackProgress
          )}% complete`
        : 'has paused this track'
    }
  },
  created () {
    this.getNowPlaying()
    this.staleTimer = setInterval(() => {
      this.getNowPlaying()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.staleTimer)
    clearInterval(this.trackTimer)
  },
  methods: {
    updateProgress (progress = 0, duration = 0) {
      this.$store.dispatch('updateProgress', { progress, duration })
    },
    async getNowPlaying () {
      const { progress_ms, is_playing, item } = await this.$axios.$get(
        '/api/spotify/now-playing/'
      )
      if (item) {
        const progress = progress_ms
        const duration = item.duration_ms
        this.$store.dispatch('updateStatus', is_playing)
        clearInterval(this.trackTimer)
        if (is_playing) {
          this.timeTrack(Date.now(), duration, progress)
        } else {
          this.updateProgress(progress, duration)
        }
        let id = null
        if (this.nowPlaying) { id = this.nowPlaying.id }
        if (item && (is_playing && item.id !== id)) {
          this.$store.dispatch('updateTrack', item)
        }
      }
    },
    timeTrack (now, duration, progress) {
      const remainder = duration - progress
      const until = now + remainder
      this.trackTimer = setInterval(() => {
        const newNow = Date.now()
        if (newNow < until + 2500) {
          const newRemainder = until - newNow
          const newProgressMs = duration - newRemainder
          this.updateProgress(newProgressMs, duration)
        } else {
          this.updateProgress(1, 1)
          clearInterval(this.trackTimer)
          this.getNowPlaying()
        }
      }, 100)
    }
  }
}
</script>

<style scoped>
   
</style>
