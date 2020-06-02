<template>
  <transition name="fade">
       <progress value="0" max="100" ></progress>
            <img :src="track.albumCover" :alt="track.title">
            <div class="track-name">{{track.title}}</div>
            <div v-for="artist in track.artists" v-bind:key="artist.id" class="track-artist">
 
            </div>
          <button data-control="pause" class="playButton">
      </button>       
  </transition>
</template>

<script>
export default {
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {
   
  },
  methods: {
  
  }
}
</script>

<style scoped>
   
</style>
