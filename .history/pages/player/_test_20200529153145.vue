
<template>
  <div class="container d-flex justify-content-center ">
    <div class="align-self-center">
      <h1>Player</h1>
      <!-- <a href="/login"><font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY</a> -->
      <nuxt-link to="/">
        <!-- <font-awesome-icon :icon="['fab', 'spotify']" /> Terug -->
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      tracks: []
    }
  },
  created () {
    const config = {
      headers: {
        Accept: 'application/json'
      }
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
