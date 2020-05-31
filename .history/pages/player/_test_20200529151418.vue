
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

  if(process.client){
    
  }

  asyncData (context) {
    
    const params = getHashParams()
    // const trackListSource = document.getElementById('track-list-template').innerHTML
    // const trackListTemplate = Handlebars.compile(trackListSource)
    // const trackListPlaceholder = document.getElementById('track-list')

/* eslint-disable */
    function getHashParams () {
      const hashParams = {}
      let e; const r = /([^&;=]+)=?([^&;]*)/g
      const q = window.location.hash.substring(1)
      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2])
      }
      return hashParams
    }


    const access_token = params.access_token
    const refresh_token = params.refresh_token
    const error = params.error

    console.log(access_token, refresh_token, error)

    console.log('hhh')
  }
}

</script>

<style lang="scss">

</style>
