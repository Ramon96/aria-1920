
<template>
  <div class="container d-flex justify-content-center ">
    <div class="align-self-center">
      <h1>Player</h1>
      <!-- <a href="/login"><font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY</a> -->
      <nuxt-link to="/">
        <!-- <font-awesome-icon :icon="['fab', 'spotify']" /> Terug -->
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {

  asyncData (context) {
    const params = getHashParams()
    // const trackListSource = document.getElementById('track-list-template').innerHTML
    // const trackListTemplate = Handlebars.compile(trackListSource)
    // const trackListPlaceholder = document.getElementById('track-list')

/* eslint-disable */
    function getHashParams () {
      const hashParams = {}
      let e; const r = /([^&;=]+)=?([^&;]*)/g
      const q = window.location.hash.substring(1)
      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2])
      }
      return hashParams
    }


    const access_token = params.access_token
    const refresh_token = params.refresh_token
    const error = params.error

    console.log(access_token, refresh_token, error)
  }
}

</script>

<style lang="scss">
#track-list {
    ul {
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            list-style-type: none;
            height: 4.5em;
            transition: background-color .2s;
            &:hover {
                background-color: hsla(0, 0%, 100%, .1);
                transition: background-color .2s;
            }
            .track-name {
                font-size: 16px;
                line-height: 22px;
                letter-spacing: .015em;
                color: color(Primary);
            }
            .track-artist {
                color: color(Secondairy);
                font-size: 0.875rem;
            }
        }
    }
}
.play-bar {
    position: fixed;
    bottom: 0;
    background: #282828;
    width: 100%;
    transform: translate(0, 100%);
    transition: transform .5s;
    &.playing {
        transform: translate(0, 0);
        transition: transform .5s;
    }
}
#play-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1rem;
    font-family: spotify-book;
    progress {
        // for some reason, the styling of the progress bar gets lost if you remove the border-radius, I dont know why..
        border-radius: 1px;
        height: 2px;
        position: fixed;
        top: -1px;
        width: 100%;
    }
    progress::-webkit-progress-bar {
        background-color: #535353;
    }
    progress::-webkit-progress-value {
        background: color(Primary);
    }
    progress::-moz-progress-bar {
        /* style rules */
    }
    img {
        padding-right: 10px;
    }
    .track-name {
        color: color(Primary);
        &::after {
            content: "•";
            padding: 0 5px;
        }
    }
    .track-artist {
        color: color(Secondairy);
    }
    button {
        font-family: icons;
        background: none;
        border: none;
        color: color(White);
        margin-left: auto;
        &[data-control="play"] {
            &::before {
                content: "\f132";
                font-size: 16px;
            }
        }
        &[data-control="pause"] {
            &::before {
                content: "\f130";
                font-size: 16px;
            }
        }
    }
}
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
    // overflow-y: scroll;
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
    .track-location{
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
