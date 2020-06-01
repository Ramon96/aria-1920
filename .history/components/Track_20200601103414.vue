<template>
  <li data-track_uri="spotify:track:5QTxFnGygVM4jFQiBovmRo">
    <div class="track-name">
      {{ track.name }}
    </div>
    <div class="track-artist">
        {{ track.artists[0].name }}
    </div>
    <div class="track-duration">
      {{ formatDuration(track.duration) }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'Track',
  props: ['track', 'id', 'name', 'duration', 'artists'],
  methods: {
    formatDuration(milis){
          // https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript/21294619
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
