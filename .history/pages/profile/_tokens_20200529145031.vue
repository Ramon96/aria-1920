<template>
  <div>
    <nuxt-link :to="player/acces">
      Songs
    </nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData (context) {
    return {
      acces: context.params.tokens
    }
  }
}
</script>
