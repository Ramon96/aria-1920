<template>
  <transition name="fade">
       <progress value="0" max="100" ></progress>
            <img src="\{{albumCover}}" alt="\{{name}}">
            <div class="track-name">\{{name}}</div>
            <div class="track-artist">
              \{{#each artists}}
                  \{{this.name}}
              \{{/each}}
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
