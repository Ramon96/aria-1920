<template>
  <li data-track_uri="spotify:track:5QTxFnGygVM4jFQiBovmRo">
    <img class="track-album-cover">
      {{ track.album.images[0] }}
    </div>
    <div class="track-name">
      {{ track.name }}
    </div>
    <div class="track-artist">
        {{ track.artists[0].name }}
    </div>
    <div class="track-duration">
      {{ formatDuration }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'Track',
  props: ['track', 'id', 'name', 'duration_ms', 'artists'],
  methods: {
    
  },
  computed:{
    formatDuration(){
          // https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript/21294619
          let millis = Number(this.duration_ms); 
          console.log(millis)
          console.log(this.duration_ms)
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  }
}
</script>

<style lang="scss" scoped>
  li{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      list-style-type: none;
      height: 4.5em;
      -webkit-transition: background-color .2s;
      transition: background-color .2s;
      user-select: none;
      cursor: pointer;
      .track-name{
        font-size: 16px;
        line-height: 22px;
        letter-spacing: .015em;
        color: #fff;
      }

      .track-artist{
        color: #b3b3b3;
        font-size: 0.875rem;
      }
  }
</style>
