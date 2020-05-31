
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

  head () {
    return {
      title: 'music-player'
    }
  }

}

</script>

<style lang="scss">

</style>
