<template>
  <li data-track_uri="spotify:track:5QTxFnGygVM4jFQiBovmRo">
    <div class="track-name">
      {{ punchline }}
    </div>
    <div class="track-artist">
      Blue Öyster Cult
    </div>
    <div class="track-duration">
      5:08
    </div>
  </li>
</template>

<script>
export default {
  name: 'Track',
  props: ['track', 'id']
}
</script>

<style lang="scss" scoped>

</style>
