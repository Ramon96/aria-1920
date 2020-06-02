<template>
  <div>
    <nuxt-link :to="acces">
      Songs
    </nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData (context) {
    return {
      acces: `player/${context.params.tokens}`
    }
  }
}
</script>
