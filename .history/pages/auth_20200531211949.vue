<template>
  <transition name="fade" mode="out-in">
    <section aria-live="polite">
      <nuxt-link
        to="/overview"
        name="home"
        :aria-current="'/overview' === $nuxt.$route.path ? 'page' : false"
      >
        Close
      </nuxt-link>
      {{ message }}
    </section>
  </transition>
</template>

<script>
export default {
  asyncData ({ env: { spotifyId, clientUrl }, query }) {
    console.log('Spotify id', spotifyId)
    const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyId}&response_type=code&scope=user-read-private,user-read-email,streaming,user-library-read,user-read-playback-state,user-modify-playback-state&redirect_uri=${clientUrl}/api/spotify/callback`
    return {
      spotifyUrl,
      query
    }
  },
  computed: {
    isConnected () {
      return this.$store.state.isConnected
    },
    message () {
      return this.$store.state.message
    }
  },
  mounted () {
    if (
      !(this.query.success || this.query.error) &&
      !this.isConnected
    ) {
      window.location = this.spotifyUrl
    } else if ((Object.keys(this.query).length !== 0)) {
      window.history.replaceState({}, document.title, window.location.pathname)
      this.$store.commit(
        'updateMessage',
        this.query.success || this.query.error
      )
      if (this.query.success) {
        this.$store.dispatch('updateConnection', true)
      }
    }
    if (this.isConnected) {
      this.$store.commit('updateMessage', "⚡ We're Connected ⚡")
    }
  }
}
</script>

<style scoped>
section {
  position: absolute;
  width: 30%;
  min-width: 300px;
  left: 0;
  right: 0;
  bottom: 50%;
  margin: auto;
  padding: 1em;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  mix-blend-mode: hard-light;
  z-index: 2;
}
section:after,
section:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
section:after {
  transform: rotate(1deg);
  background: rgba(255, 255, 255, 0.1);
}
section:before {
  transform: rotate(3deg);
  background: rgba(255, 255, 255, 0.03);
}
a {
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 600ms ease-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
