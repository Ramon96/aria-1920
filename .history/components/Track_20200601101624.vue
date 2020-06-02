<template>
  <ul>
    <li v-for="track in tracks" v-bind:key="track.id">
      {{tracks}}
      <div class="track-name">
        {{ track.name }}
      </div>
      <div class="track-artist">
        Blue Öyster Cult
      </div>
      <div class="track-duration">
        5:08
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Track',
  props: ['track', 'id', 'name', 'title'],

    data() {
       return {
           tracks: []
       }
   },
}
</script>

<style lang="scss" scoped>

</style>
