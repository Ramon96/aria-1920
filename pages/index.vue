<template>
  <div class="container d-flex justify-content-center ">
    <div class="align-self-center">
      <h1>Aria</h1>
      <!-- <a href="/login"><font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY</a> -->
      <nuxt-link
        to="/auth"
        name="auth"
        :aria-current="ariaCurrent"
      >
        <font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY
      </nuxt-link>
      <!-- <Youtube /> -->
    </div>
  </div>
</template>

<script>
// import Instagram from '~/components/Instagram.vue'
// import Youtube from '~/components/Youtube.vue'
export default {
  titleShort: 'is Listening',
  authorName: 'Tomas en Ramon',
  components: {
    // Instagram,
    // Youtube
  },
  computed: {
    ariaCurrent () {
      return this.$route.name === 'auth' ? 'page' : false
    }
  },
  head () {
    return {
      title: `${this.$options.authorName} ${
            this.$options.titleShort
          } ·X· A Musical App`
    }
  },
  Instagram () {
    return this.Instagram
  },
  Youtube () {
    return this.Youtube
  }
}
</script>

<style lang="scss">
.container{
  height: 100vh;
      h1{
        margin-top: 0;
        margin-bottom: 2rem;
        text-align: center;
        color: color(White);
        padding: 0.08em 0px;
        font-size: 96px;
        font-weight: 900;
        letter-spacing: -.04em;
        line-height: 96px;
        color: #fff;
        font-family: spotify-bold;
    }
    a{
      color: color(Primary);
      font-family: spotify-bold;
      background: color(Green);
      border: none;
      border-radius: 15px;
      padding: 5px 10px;
      path{
        fill: color(White);
      }
    }
}
</style>
