<template>
  <div class="song">
    <div class="songDetail-navigation">
      <nuxt-link to="/search" data-btn="back">
        <svg height="24" role="img" width="24" viewBox="0 0 24 24" class="folddown">
          <polygon points="7.96,21.151 7.311,20.39 16.865,12.229 7.311,4.069 7.96,3.309 18.405,12.229 " />
        </svg>
      </nuxt-link>
      <button class="horizontal-dots" />
    </div>
    <div class="track">
      <img class="cover-img" :src="albumCover" :alt="name">
      <div class="track-information">
        <h2 class="track-name">{{ name }}</h2>
        <div class="track-artist">
          {{ artists }}
        </div>
        <button class="like-button" />
      </div>
      <input class="track-progress" type="range" min="1" max="100" value="1">
      <div class="track-duration">
        <div id="timecurrent">
        <!-- current time -->
        </div>
        <div id="timeleft">
        <!-- duration -->
        </div>
      </div>
      <div class="track-controls">
        <button class="shuffle"></button>
        <div>
          <button class="prevSong" />
          <button @click="isPaused" class="playPause" />
          <button class="nextSong" />
        </div>
        <button class="repeat" />
      </div>
      <div class="track-location">
        <button class="devices" />
        <button class="queue" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['trackdata', 'track'],

  beforeMount (){
    // this.track = data.item; 
    // console.log('Name is', this.name)
  },

  computed: {
    name(){
      // console.log(this.track.name)
      return this.track.name
    },
    albumCover(){
      if(this.track.album.images != undefined){
          return this.track.album.images[0].url
      }else{
        // TODO show album cover placeholder img or icon
      }
    },
    artists(){
      // This is formated, when using the artist name to fetch data, we should
      // devide that into another property or somehow get it from the route params
      return this.track.artists.length > 1 ? 
        this.track.artists.map(artist => artist.name).join(', ') : this.track.artists[0].name
    },

  },

  methods: {
    isPaused(){
      // console.log(this.trackdata)
      this.$store.dispatch('player/togglePlay', 'yes')
    }
  }
}
</script>
