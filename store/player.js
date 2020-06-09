
// The actual state
export const state = ( )=> ({
    currentlyPlaying: {}
});


// Mutations, functions to alter the state
export const mutations = {
    setPlayingTrack(value){
        state.currentlyPlaying = value;
    },
};



// Actions
export const actions = {
    updateTrack: ({ commit, state }, currentlyPlaying) => {
        commit('setPlayingTrack', currentlyPlaying)
        return state.currentlyPlaying
    },
};  