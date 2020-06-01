<template>
  <li data-track_uri="spotify:track:5QTxFnGygVM4jFQiBovmRo">
    <div class="track-name">
      {{ track.name }}
    </div>
    <div class="track-artist">
        {{ track.artists[0] }}
    </div>
    <div class="track-duration">
      {{ track.duration }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'Track',
  props: ['track', 'id', 'name']
}
</script>

<style lang="scss" scoped>

</style>
