<template>
  <section id="song-detail" data-overlay="enabled">
    <Player v-if="currentTrack" :trackdata="trackdata" :track="currentTrack" />
    <Instagram v-if="instagramHandle" :handle="instagramHandle" />
    <Youtube v-if="youtubeHandle" :ythandle="youtubeHandle" />
    <NewsApi v-if="artist" :artist="artist" />
  </section>
</template>

<script>
import Player from '~/components/Player.vue'
import Instagram from '~/components/Instagram.vue'
import Youtube from '~/components/Youtube.vue'
import NewsApi from '~/components/NewsApi.vue'
export default {
  components: {
    Player,
    Instagram,
    Youtube,
    NewsApi
  },
  data () {
    return {
      currentTrack: null,
      trackdata: null,
      interval: null,
      uri: [],
      newartist: null,
      artist: null,
      instagramHandle: null,
      youtubeHandle: null,
      resources: ['youtube', 'instagram']
    }
  },
  watch: {
    // artist () {
    //   console.log('player watch')
    // }
  },
  created () {
    // console.time()
    this.updateCurrentSong()
    // console.timeEnd()

    this.interval = setInterval(() => {
      this.updateCurrentSong()
    }, 10000)
  },
  methods: {
    async updateCurrentSong () {
      const data = await this.$axios.$get('/api/spotify/now-playing/')
      // console.log('item', data)
      this.currentTrack = data.item
      this.trackdata = data
      if (data.item.uri !== this.currentTrack.uri) {
        this.$store.dispatch('player/updateTrack', data.item)
      }

      this.newartist = data.item.artists[0].name
      // console.log(this.artist)
      if (this.newartist !== this.artist) {
        console.error(
          'New Artist: ' + this.newartist + 'Old Artist' + this.artist
        )
        this.artist = this.newartist
        const uris = await this.$axios.get(
          '/api/musicbrainz/getartist/' + this.artist
        )
        this.uri = uris
        this.updateHandles(uris)
      }
    },
    updateHandles (uris) {
      // if none of the resources are available then the value's should be set to null so the compents dont stay
      const filter = uris.data.filter((item) => {
        for (let i = 0; i < this.resources.length; i++) {
          if (item.url.resource.includes(this.resources[i])) {
            return item
          }
        }
      })

      const getHandle = (array) => {
        console.log('Getting new handles')
        const instagram = array.find(handle =>
          handle.url.resource.includes('instagram')
        )
        if (instagram == null) {
          this.instagramHandle = null
        } else {
          this.instagramHandle = instagram.url.resource.split('/')[3]
        }

        const youtube = array.find(handle =>
          handle.url.resource.includes('youtube')
        )
        if (youtube == null) {
          this.youtubeHandle = null
        } else {
          this.youtubeHandle = youtube.url.resource.split('/')[4]
        }
      }

      getHandle(filter)
    }
  }
}
</script>

<style lang="scss">
/* TODO: Refactor styling, styling should be in its own component */

#song-detail {
  h2 {
    color: color(White);
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 1.5em;
    margin: 0;
    padding: 1em 0;
  }

  h2:not(.track-name){
    padding: 1em 20px;
    font-size: 1.2em;
  }
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  height: 100vh;
  top: 0;
  transition: opacity 3s;
  // TODO The color has to be determined by the album color, Tomas found a node library for this
  // https://cssgradient.io/
  background: rgb(25, 20, 20);
  background: linear-gradient(to top, black, #939393);

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
    transition: transform 0.3s;

    &::before {
      opacity: 1;
      transition: opacity 0.3s 0.3s;
    }
  }

  &[data-overlay="enabled"] {
    transform: translate(0, 0);
    transition: transform 0.3s;

    &::before {
      opacity: 0;
      transition: opacity 0.3s 0.3s;
      display: none;
    }
  }

  button {
    background: none;
    border: none;
  }

  .song{
    padding: 5px 20px;
    h2{
      padding: 0;
      letter-spacing: 1.5px;
      text-transform: initial;
    }
  }

  .songDetail-navigation {
    display: flex;
    justify-content: space-between;

    .folddown {
      transform: rotate(90deg);
      fill: color(White);
      height: 100%;
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
    padding-bottom: 30px;
  }

  .track {
    .track-information {
      display: grid;
      grid-template-areas:
        "track-name like-button"
        "track-artist like-button";
      // padding: 1.5rem 0;

      .track-name {
        grid-area: track-name;
        margin: 0;
      }

      .track-artist {
        grid-area: track-artist;
        color: color(Secondairy);
        font-family: spotify-book;
      }
    }

    .like-button {
      grid-area: like-button;
      justify-self: flex-end;
      align-self: flex-start;
      &::before {
        content: "\f320";
        font-size: 20px;
        font-family: icons;
        font-style: normal;
        font-weight: lighter;
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
    background: linear-gradient(
      to right,
      color(White) 0%,
      color(White) 1%,
      #535353 1%,
      #535353 100%
    );
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
    padding: 20px 0;

    .shuffle {
      position: relative;

      &::before {
        content: "\f144";
        font-size: 20px;
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
        font-size: 20px;
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
      padding-right: 10px;
      &::before {
        content: "\f146";
        font-size: 35px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }
    }

    .nextSong {
      padding-left: 10px;

      &::before {
        content: "\f148";
        font-size: 35px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: color(White);
      }
    }

    .playPause {
      position: relative;
      width: 65px;
      min-width: 65px;
      height: 65px;
      line-height: 62px;
      border-radius: 500px;
      background: white;

      &::before {
        content: "\f130";
        font-size: 30px;
        font-family: icons;
        font-style: normal;
        font-weight: 400;
        display: inline-block;
        color: black;
        letter-spacing: -2px;
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
        font-size: 20px;
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
        font-size: 20px;
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
