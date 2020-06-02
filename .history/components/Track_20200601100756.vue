<template>
  <ul>
    <li
      v-for="track in tracks"
      :key="track.id>
    <div class="
      track-name"
    >
      {{ name }}
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
  props: ['track', 'id', 'name', 'title']
}
</script>

<style lang="scss" scoped>

</style>
