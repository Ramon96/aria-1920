<template>
  <transition name="fade" mode="out-in">
    <section aria-live="polite">
      <!-- <nuxt-link
        to="/overview"
        name="home"
        :aria-current="'/overview' === $nuxt.$route.path ? 'page' : false"
      >
      </nuxt-link> -->
      <div class="container d-flex justify-content-center">
        <div class="align-self-center">
          <font-awesome-icon :icon="['fab', 'spotify']" />
          <p>loading ...</p>
        </div>
      </div>
      <!-- {{ message }} -->
    </section>
  </transition>
</template>

<script>
// // https://www.smashingmagazine.com/2019/03/spotify-app-vue-nuxt-javascript/
import { mapState } from 'vuex'
export default {
  asyncData ({ env: { spotifyId, clientUrl }, query }) {
    console.log('query', spotifyId, clientUrl)
    const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyId}&response_type=code&scope=user-read-private,user-read-email,streaming,user-library-read,user-read-playback-state,user-modify-playback-state&redirect_uri=${clientUrl}/api/spotify/callback`
    return {
      spotifyUrl,
      query
    }
  },
  computed: {

    message () {
      return this.$store.state.message
    },

    ...mapState({
      isConnected: state => state.isConnected
    })
  },
  mounted () {
    if (!(this.query.success || this.query.error)) {
      console.log('Not connected, but will connect')
      window.location = this.spotifyUrl
    } else if ((Object.keys(this.query).length !== 0)) {
      console.log('else if')
      window.history.replaceState({}, document.title, window.location.pathname)
      this.$store.commit(
        'updateMessage',
        this.query.success || this.query.error
      )
      if (this.query.success) {
        console.log('query succes')
        this.$store.dispatch('updateConnection', true)
      }
    }
    if (this.isConnected === true) {
      console.log('Connected already...' + this.isConnected)
      this.getAccesToken()
      // this.$store.commit('updateMessage', "⚡ We're Connected ⚡")
      // this.$store.commit('accesToken')
    } else {
      console.log('what...')
    }
  },
  methods: {
    async getAccesToken () {
      console.log('Getting acces token')
      const accesToken = await this.$axios.get('/api/spotify/get-accestoken')
      console.log(accesToken)
      const { data } = accesToken
      this.$store.commit('updateAccessToken', data)
    }
  }
}
</script>

<style scoped lang="scss">

.container {
  height: 100vh;
}

svg {
  font-size: 8rem;
  margin-bottom: 1.5rem;
  path {
    fill: color(GreenActive);
  }
}

p{
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
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
