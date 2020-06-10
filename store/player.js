
// The actual state
export const state = ( )=> ({
    currentlyPlaying: {},
    isToggled: ''
});


// Mutations, functions to alter the state
export const mutations = {
    setPlayingTrack(value){
        state.currentlyPlaying = value;
    },
    togglePlay(value){
        state.isToggled = value
    }
};



// Actions
export const actions = {
    updateTrack: ({ commit, state }, currentlyPlaying) => {
        commit('setPlayingTrack', currentlyPlaying)
        return state.currentlyPlaying
    },
    togglePlay: ({ commit, state }, toggle) => {
        commit('togglePlay', 'yes')
    }
};  