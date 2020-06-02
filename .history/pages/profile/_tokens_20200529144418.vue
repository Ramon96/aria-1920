<template>
<div>

<nuxt-link :to="/player">Song</nuxt-link>

  </div>
</template>

<script>
export default {
  asyncData (context) {
    console.log(context.params.tokens)
  }
}
</script>
