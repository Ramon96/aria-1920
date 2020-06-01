<template>
  <transition name="fade">
    <section>
      <input id="search" type="text" name="search" v-model=trackTerm @input="getTracks" placeholder="Search tracks...">
      <!-- <li >
          {{ track.name }}
      </li> -->
      <ul id="track-list" v-if="tracks.length">
        <Track v-for="track in tracks" :key="track.id" :track="track" />
      </ul>
    </section>
  </transition>
</template>

<script>
import { debounce } from 'throttle-debounce';
import Track from './Track.vue'
export default {
  components: { Track },
  data() {
       return {
           trackTerm: '',
           tracks: []
       }
   },
  methods: {
    async getTracks () {
      console.log('Dit werkt')

    //   debounce(300, () => {
        // Debounced function
            const data = await this.$axios.$get(
            `/api/spotify/search/`
            , {
                params:{
                    track: this.trackTerm
                }
            })

            console.log('data',data)

            if(!data.error){
            
            console.log('yes, has tracks')
            const { 
                data:{
                  tracks:{
                      items
                  }
                }
            } = data;

          
                console.log('data', items)
                this.tracks = items
            }
            else{
                console.log('nope')
                this.tracks = []
            }

           
       
    // });

    // debounce(300, async () => {
    //     // Debounced function
    //         const data = await this.$axios.$get(
    //         `/api/spotify/search/${this.trackTerm}`
    //         )
    //         console.log('now')
    // });
      console.log(this.trackTerm)
    }
  }
}
</script>

<style lang="scss"scoped>
@import "~/css/main.scss";

input{
    color: #000;
    padding: 6px 48px;
    height: 40px;
    top: 2rem;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 0;
    border-radius: 500px;
    text-overflow: ellipsis;
    margin-bottom: .5rem;
    position: fixed;
    width: 50vw;
    transition: width 1s ease-in-out;
    &:focus,
    &:active{
      caret-color: color(Green-active);
      outline: none;
      width: 100%;
      border-radius: 0;
      transform: translate(-50%, -2rem);
      -webkit-transition: transform 1s ease-in-out, width 1s ease-in-out 1s, border-radius 1.5s ease-in-out 1s, background-color 1s ease-in-out;
      -moz-transition:  transform 1s ease-in-out, width 1s ease-in-out 1s, border-radius 1.5s ease-in-out 1s, background-color 1s ease-in-out;
      -o-transition: transform 1s ease-in-out, width 1s ease-in-out 1s, border-radius 1.5s ease-in-out 1s, background-color 1s ease-in-out;
      transition:  transform 1s ease-in-out, width 1s ease-in-out 1s, border-radius 1.5s ease-in-out 1s, background-color 1s ease-in-out;
      
      &::placeholder{
        color: color(White);
      }
      background-color: color(DarkerGrey);
      
    }
}

</style>
