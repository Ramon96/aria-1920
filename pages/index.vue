<template>
  <div class="container d-flex justify-content-center ">
    <div class="align-self-center">
      <h1>Aria</h1>
      <!-- <a href="/login"><font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY</a> -->
      <nuxt-link
        to="/auth"
        name="auth"
        :aria-current="ariaCurrent"
      >
        <font-awesome-icon :icon="['fab', 'spotify']" /> LOGIN WITH SPOTIFY
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  titleShort: 'is Listening',
  authorName: 'Tomas en Ramon',
  computed: {
    ariaCurrent () {
      return this.$route.name === 'auth' ? 'page' : false
    }
  },
  head () {
    return {
      title: `${this.$options.authorName} ${
            this.$options.titleShort
          } ·X· A Musical App`
    }
  }
}
</script>

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

 <script>
    // this.$axios.get('https://musicbrainz.org/ws/2/area/45f07934-675a-46d6-a577-6f8637a411b1?inc=aliases&fmt=json')
    //   .then(res => console.log(res))
//   const muzicbrainz = async (name) => {
//     const artist = await (await fetch(`http://musicbrainz.org/ws/2/artist/?query=artist:${name}&fmt=json`)).json()
//     const artistId = artist.artists[0].id
//     const artistLinks = await (await fetch(`http://musicbrainz.org/ws/2/artist/${musicbrainzArtistId}?inc=url-rels&fmt=json`)).json()

//     return artistLinks
//   }

// console.log(musicbrainz('beyonce'))

  fetch(`http://musicbrainz.org/ws/2/artist/?query=artist:beyonce&fmt=json`)
    .then(res => res.json())
    .then(res => console.log(res))

      fetch(`http://musicbrainz.org/ws/2/artist/859d0860-d480-4efd-970c-c05d5f1776b8?inc=url-rels&fmt=json`)
    .then(res => res.json())
    .then(res => console.log(res))

// import gql from 'graphql-tag'

// export default{
//   apollo: {
//     Artist: gql ` query getArtist{
//       Artist(name: "Eminem"){
//         name
//       }
//     }`
//   }
// }

 </script>
