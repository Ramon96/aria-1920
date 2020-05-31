<template>
  <section>
    <SearchField/>
    <!-- <p v-if="!isConnected">
      😭 {{ $nuxt.layout.authorName }} hasn’t connected yet. 😭
    </p> -->
  </section>
</template>

<script>
import SearchField from '~/components/SearchField.vue'

export default {
  components: { SearchField },
  
}
</script>

<style scoped>
section {
  min-width: 300px;
  max-width: 750px;
  margin: auto;
  padding: 1em;
}
</style>