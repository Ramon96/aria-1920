
// The actual state
export const state = ( )=> ({
    currentlyPlaying: {},
    isToggled: ''
});


// Mutations, functions to alter the state
export const mutations = { 
    setPlayingTrack(state, currentlyPlaying){
        state.currentlyPlaying = currentlyPlaying;
    },
    togglePlay(value){
        state.isToggled = value
    }
};



// Actions
export const actions = {
    async nuxtServerInit ({ commit }) {
    
        try {
          const redisUrl = `${clientUrl}/api/spotify/data/`
          const {
            data: { is_connected }
          } = await axios.get(`${redisUrl}is_connected`)
    
          commit('connectionChange', is_connected)
    
          if (is_connected) {
            const {
              data: { item, is_playing }
            } = await axios.get(`${clientUrl}/api/spotify/now-playing`)
            commit('setPlayingTrack', item)
          }
        } catch (err) {
          console.error(err)
        }
      },
    updateTrack: ({ commit, state }, currentlyPlaying) => {
        commit('setPlayingTrack', currentlyPlaying)
        // return state.currentlyPlaying
    },
    togglePlay: ({ commit, state }, toggle) => {
        commit('togglePlay', 'yes')
    },
};  