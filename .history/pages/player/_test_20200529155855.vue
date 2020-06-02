
<template>
  <div class="container d-flex justify-content-center ">
    <div class="align-self-center">
      <h1>Player</h1>
      <!-- <a href="/login"><font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY</a> -->
      <nuxt-link to="/">
        <!-- <font-awesome-icon :icon="['fab', 'spotify']" /> Terug -->
      </nuxt-link>


      <Track v-for="track in tracks" :key="track.id"/>
    </div>
  </div>
</template>

<script>
import Track from '../../components/Track'
export default {

  components () {
    Track
  },

  data () {
    return {
      tracks: []
    }
  },
  async created () {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }

    try {
      const res = await this.$axios.get('https://official-joke-api.appspot.com/jokes/ten', config)
      console.log(res.data)
      this.tracks = res.data
    } catch (error) {
      console.log(error)
    }
  },
  head () {
    return {
      title: 'music-player',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Place to search for music'
      }]
    }
  }

}

</script>

<style lang="scss">

</style>
