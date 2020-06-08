<template>
  <section id="song-detail" data-overlay="enabled">
    <Player />
    <Instagram />
  </section>
</template>

<script>
import Player from '~/components/Player.vue'
import Instagram from '~/components/Instagram.vue'
export default {
  components: {
    Player,
    Instagram
  },
  Instagram () {
    return this.Instagram
  }
}
</script>

<style lang="scss">
/* TODO: Refactor styling, styling should be in its own component */
#song-detail {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  height: 100vh;
  top: 0;
  transition: opacity 3s;
  padding: 1.5rem;
  // TODO The color has to be determined by the album color, Tomas found a node library for this
  // https://cssgradient.io/
  background: rgb(25, 20, 20);
  background: linear-gradient(360deg, rgba(25, 20, 20, 1) 0%, rgba(88, 15, 57, 1) 33%, rgba(97, 14, 62, 1) 48%, rgba(255, 0, 155, 1) 100%);

  // background-color: #292929db;
  overflow-y: scroll;
  // Wat doet deze before?
  &::before {
    content: '';
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background-color: #000;
  }

  &[data-overlay="disabled"] {
    transform: translate(0, 100%);
    transition: transform .3s;

    &::before {
      opacity: 1;
      transition: opacity .3s .3s;
    }
  }

  &[data-overlay="enabled"] {
    transform: translate(0, 0);
    transition: transform .3s;

    &::before {
      opacity: 0;
      transition: opacity .3s .3s;
      display: none;
    }
  }

  button {
    background: none;
    border: none;
  }

  .songDetail-navigation {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .folddown {
      transform: rotate(90deg);
      fill: color(White);
    }

    .horizontal-dots {
      &::before {
        content: "\f12d";
        font-size: 32px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }
    }
  }

  .cover-img {
    width: 95%;
    display: block;
    margin: auto;
  }

  .track-information {
    display: grid;
    grid-template-areas:
      'track-name like-button'
      'track-artist like-button';
    padding: 1.5rem 0;

    .track-name {
      grid-area: track-name;
      margin: 0;
    }

    .track-artist {
      grid-area: track-artist;
      color: color(White);
      font-family: spotify-light;
    }

    .like-button {
      grid-area: like-button;
      justify-self: flex-end;
      // padding-top half the font-size to center the heart
      padding-top: 14px;

      &::before {
        content: "\f320";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }

      &.active {
        &::before {
          content: "\f322";
          font-size: 16px;
          font-family: icons;
          font-style: normal;
          font-weight: 400;
          display: inline-block;
          color: color(Green);
        }
      }
    }
  }

  /*Chrome*/
  .track-progress {
    background: linear-gradient(to right, color(White) 0%, color(White) 1%, #535353 1%, #535353 100%);
    border-radius: 8px;
    height: 3px;
    width: 100%;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;
  }

  .track-progress::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: color(White);
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .track-duration {
    display: flex;
    justify-content: space-between;
    color: color(White);
    font-family: spotify-light;
  }

  .track-controls {
    display: flex;
    justify-content: space-between;

    .shuffle {
      position: relative;

      &::before {
        content: "\f144";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }

      &.active {
        &::before {
          color: color(Green);
        }

        &::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          display: block;
          width: 4px;
          height: 4px;
          content: "";
          border-radius: 50%;
          background-color: #1db954;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
    }

    .repeat {
      position: relative;

      &::before {
        content: "\f13e";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }

      &.active {
        &::before {
          color: color(Green);
        }

        &::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          display: block;
          width: 4px;
          height: 4px;
          content: "";
          border-radius: 50%;
          background-color: #1db954;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
    }

    .prevSong {
      &::before {
        content: "\f146";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }
    }

    .nextSong {
      &::before {
        content: "\f148";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }
    }

    .playPause {
      position: relative;
      width: 32px;
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      border-radius: 500px;
      background: white;

      &::before {
        content: "\f130";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: black;
      }
    }
  }

  .track-location {
    display: flex;
    justify-content: space-between;

    .devices {
      position: relative;

      &::before {
        content: "\f213";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }
    }

    .queue {
      position: relative;

      &::before {
        content: "\f13a";
        font-size: 16px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }
    }
  }
}
</style>
