<template>
  <transition name="fade">
    <section>
      <h1>Search</h1>
     <input @focus="focus" id="search" ref="search" type="text" name="search" v-model=trackTerm @input="getTracks" placeholder="Search tracks...">
      <!-- <li >
          {{ track.name }}
      </li> -->
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
           trackTerm: ''
       }
   },
  methods: {
    async getTracks () {
      // console.log('Dit werkt')

      if(this.trackTerm.length <= 0){
        // this.$refs.search.classList.remove('focus')
        // this.$refs.search.blur()
      }
    //   debounce(300, () => {
        // Debounced function
            const data = await this.$axios.$get(
            `/api/spotify/search/`
            , {
                params:{
                    track: this.trackTerm
                }
            })

            // console.log('data',data)

            if(!data.error){
            
            // console.log('yes, has tracks')
            const { 
                data:{
                  tracks:{
                      items
                  }
                }
            } = data;

          
                // console.log('data', items)
                this.tracks = items
                this.$emit('getTracks', this.tracks)
            }
            else{
                // console.log('nope')
                this.tracks = []
                this.$emit('getTracks', this.tracks)
            }
    },
    focus (){
      this.$refs.search.classList.add('focus')
    }
  }
}
</script>

<style lang="scss"scoped>
@import "~/css/main.scss";

h1{
  color: color(Primary);
  margin: 3rem 0;
  text-align: center;
}

// TODO right now we added a focus class over the focus state, because the focus state gets removed
// easily when navigating with a mouse a lot
// Tried to fix this with focussing onblur, but there's a delay
.focus{
  color: #000;
  caret-color: color(GreenActive);
  outline: none;
  width: 100%;
  border-radius: 0;
  // transform: translate(-50%, 0);
  -webkit-transition: transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
  -moz-transition:  transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
  -o-transition: transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
  transition:  transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
  
  &:focus{
    color: color(White);
  }

}

input{
    color: #000;
    padding: 6px 48px;
    height: 40px;
    // top: 0;
    // left: 50%;
    // transform: translate(-50%, 50%);
    border: 0;
    border-radius: 500px;
    text-overflow: ellipsis;
    margin-bottom: .5rem;
    margin-left: auto;
    margin-right: auto;
    display: block;
    // position: fixed;
    width: 90%;
    transition: width .3s ease-in-out;
    &:focus,
    &:active{
      caret-color: color(GreenActive);
      outline: none;
      width: 100%;
      border-radius: 0;
      // transform: translate(-50%, 0);
      -webkit-transition: transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
      -moz-transition:  transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
      -o-transition: transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
      transition:  transform .3s ease-in-out, width .3s ease-in-out .3s, border-radius .3s ease-in-out .3s, background-color .3s ease-in-out;
      color: color(White);
      &::placeholder{
        color: color(White);
      }
      background-color: color(DarkerGrey);
      
    }
}

</style>
