<template>
  <section>
    <div class="songDetail-navigation">
      <button data-btn="back">
        <svg height="24" role="img" width="24" viewBox="0 0 24 24" class="folddown">
          <polygon points="7.96,21.151 7.311,20.39 16.865,12.229 7.311,4.069 7.96,3.309 18.405,12.229 " />
        </svg></button>
      <button class="horizontal-dots" />
    </div>
    <div class="track">
      <img class="cover-img" src="" alt="">
      <div class="track-information">
        <h2 class="track-name"></h2>
        <div class="track-artist">
          <!-- {{#each artists}}
            \{{this.name}}
            \{{/each}} -->
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
          <button class="playPause" />
          <button class="nextSong" />
        </div>
        <button class="repeat" />
      </div>
      <div class="track-location">
        <button class="devices" />
        <button class="queue" />
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>
