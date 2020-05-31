<template>
  <div class="container d-flex justify-content-center ">
    <div class="align-self-center">
      <h1>Aria</h1>
      <!-- <a href="/login"><font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY</a> -->
      <nuxt-link to="/player">
        <font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.container{
  height: 100vh;
      h1{
        margin-top: 0;
        margin-bottom: 2rem;
        text-align: center;
        color: color(White);
        padding: 0.08em 0px;
        font-size: 96px;
        font-weight: 900;
        letter-spacing: -.04em;
        line-height: 96px;
        color: #fff;
        font-family: spotify-bold;
    }
    a{
      color: color(Primary);
      font-family: spotify-bold;
      background: color(Green);
      border: none;
      border-radius: 15px;
      padding: 5px 10px;
      path{
        fill: color(White);
      }
    }
}
</style>
