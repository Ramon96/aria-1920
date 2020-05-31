<template>
  <div>
    <a href="/player">Songs</a>
  </div>
</template>

<script>
export default {
  computed: {
    accesToken: this.$store.state.posts.all.find(key => key.accesToken == 'onze acces token')
  }
}
</script>
