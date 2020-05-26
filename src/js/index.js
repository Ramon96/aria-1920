// TODO remove eslint disable when done with sorting this file out, and creating modules
/* eslint-disable */


var params = getHashParams();
var trackListSource = document.getElementById('track-list-template').innerHTML,
    trackListTemplate = Handlebars.compile(trackListSource),
    trackListPlaceholder = document.getElementById('track-list');

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;

(function () {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */




    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');

    var oauthSource = document.getElementById('oauth-template').innerHTML,
        oauthTemplate = Handlebars.compile(oauthSource),
        oauthPlaceholder = document.getElementById('oauth');





    // console.log(trackListSource, trackListTemplate, trackListPlaceholder)





    // console.log(access_token)

    let tracks;

    if (error) {
        alert('There was an error during the authentication');
    } else {
        if (access_token) {
            // render oauth info
            oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
            });

            // TODO remove any jQuery, remove what's unnecessary, refactor to vanilla what's useful 
            fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                })
                .then(res => res.json())
                .then(response => {

                    console.log(response)
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);

                    

                    fetch('https://api.spotify.com/v1/playlists/7rQWuA6G9Q1IJ1houKNKj5/tracks?limit=50', {
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            }
                        })
                        .then(data => data.json())
                        .then(data => {


                            //console.table(data.items.map(song => song.track))
                            console.log(data)

                            const tracks = data.items.map(song => {
                                return {
                                    name: song.track.name,
                                    duration: msToMinAndSec(song.track.duration_ms),
                                    artists: song.track.artists,
                                    uri: song.track.uri
                                }
                            })
                            trackListPlaceholder.innerHTML = trackListTemplate({
                                tracks: tracks
                            })


                            return data
                        })

                    fetch('https://api.spotify.com/v1/search?q=battery&type=track&limit=50', {
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            }
                        })
                        .then(data => data.json())
                        .then(data => {

                            console.log(data.tracks.items[0].artists)
                            console.log(data.tracks.items.filter(song => song.artists[0]['name'] == "Metallica"))
                        })
                })


        } else {
            // render initial screen
            // $('#login').show();
            // $('#loggedin').hide();

            // TODO Redirect to login? Can we handle this better?
        }

        document.getElementById('obtain-new-token').addEventListener('click', function () {

            fetch(`/refresh_token?refresh_token=${refresh_token}`)
                .then(res => {
                    return res.json()
                })
                .then(json => {
                    console.log(json.access_token)
                    access_token = json.access_token;
                    oauthPlaceholder.innerHTML = oauthTemplate({
                        access_token: access_token,
                        refresh_token: refresh_token
                    });
                })
        }, false);
    }
})();





const token = window.location.hash.substr(1).split('=')[1]
var playBarSource = document.getElementById('play-bar-template').innerHTML,
    playBarTemplate = Handlebars.compile(playBarSource),
    playBarPlaceholder = document.getElementById('play-bar');
var songDetailOverlaySource = document.getElementById('song-detail-overlay-template').innerHTML,
    songDetailOverlayTemplate = Handlebars.compile(songDetailOverlaySource),
    songDetailOverlayPlaceholder = document.getElementById('song-detail');

window.onSpotifyWebPlaybackSDKReady = () => {

    console.log('token', token)

    // Create a new player, listening to the playtrack
    const player = new Spotify.Player({
        name: 'ARIA',
        getOAuthToken: cb => {
            cb(token);
        },
        volume: 1
    });

    // Error logging
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));

    // Current to check later if the song has changed, to rerender
    let currentTrack = null;

    // Playback status updates
    player.on('player_state_changed', state => {
    
        
    // If currentTrack is not set, set it with the current_track
        if (currentTrack == null) {
            currentTrack = state.track_window.current_track
            
            setupTrack(state, player)
        }

        // state.context.uri = "spotify:user:upthepunx666:collection"


        console.log(state)



        // Duration from miliseconds to minutest an
        // const albumCover = album['images'][1]['url']

        // console.table([artists, name])



        // Get the playbackstate every second to update the progress bar
        const getPlaybackState = setInterval(function () {

            // Get progress bar
            const progressBar = document.querySelector('#play-bar progress')

            // Get the state of the playtrack
            getState(player)
                .then(state => {
                    if (!state) {
                        console.error('User is not playing music through the Web Playback SDK');
                        return;
                    }

                    // Object destruct
                    let {
                        current_track,
                        next_tracks: [next_track],
                        position
                    } = state.track_window;


                    if(state.paused && state.position == 0){
                        // player.nextTrack().then(() => {
                        //     console.log('Skipped to next track!');
                        //   });
                        clearInterval(getPlaybackState)
                        getNextSong()

                    }



                    // TODO remove this because it should happen once.
                    progressBar.setAttribute('max', current_track.duration_ms)

                    progressBar.setAttribute('value', state.position)

                    console.log(state.paused)
                    if (state.paused) {
                        clearInterval(getPlaybackState)

                    }



                    // console.log('Currently Playing', current_track);
                    // console.log('Playing Next', next_track);
                    // console.log('Track window', state);
                    console.log(position)


                });

        }, 1000)

        if (state.track_window.current_track.id != currentTrack.id) {
            currentTrack = state.track_window.current_track
            // Render current song in playbar
            setupTrack(state, player)

        }
        // songDetailOverlayPlaceholder.querySelector('button').addEventListener('click', function(event) {
        //     document.body.classList.remove('overflow-hidden')
        //     songDetailOverlayPlaceholder.dataset.overlay = 'disabled'
        // })

        // // When clicked on the playbar, trigger overlay with details and content
        // playBarPlaceholder.addEventListener('click', function(event){
        //     document.body.classList.add('overflow-hidden')
        //     songDetailOverlayPlaceholder.dataset.overlay = 'enabled'
        // })
    });

    // Ready
    player.on('ready', data => {
        console.log('Ready with Device ID', data.device_id);
        setupTrackList(data)
    });

    // Connect to the player!
    player.connect();

}

// Play a specified track on the Web Playback SDK's device ID
function play(device_id, token, trackUri) {

    const playBar = document.querySelector('.play-bar')

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
            
                context_uri: "spotify:user:upthepunx666:playlist:7rQWuA6G9Q1IJ1houKNKj5",
                offset: {'uri': trackUri}
            })
        })

        .then(json => {


            console.log('res', json)


            if (!playBar.classList.contains('playing')) {
                playBar.classList.add('playing')
            }

            document.querySelector(`li[data-track-uri="${trackUri}"] div.track-name`)
                .classList.add('playing')

            // fetch('https://api.spotify.com/v1/me/player', {
            //             headers: {
            //                 'Authorization': 'Bearer ' + access_token
            //             }
            //         })
            //         .then(data => {
            //             return data.json()
            //         })
            //         .then(json => console.log('currently playing', json))

        })

}

function setupTrack(state, player) {
    console.log(state)
    const {
        artists,
        name,
        album,
        duration_ms
    } = state.track_window.current_track


    const formatedDuration = msToMinAndSec(duration_ms);
    const albumCoverIcon = album['images'][1]['url'];
    const albumCover = album['images'][2]['url'];

    playBarPlaceholder.innerHTML = playBarTemplate({
        name: name,
        duration: formatedDuration,
        artists: artists,
        albumCover: albumCoverIcon
    });
    // TODO: turn this into a function
    const pauseBtn = document.querySelector('button.playButton')

    pauseBtn.addEventListener('click', function (event) {
        console.log('Pause btn click')
        const target = event.target
        if (target.dataset.control === 'pause') {
            player.togglePlay().then(() => {
                target.setAttribute('data-control', 'play')
            });
        } else if (target.dataset.control === 'play') {
            player.togglePlay().then(() => {
                target.setAttribute('data-control', 'pause')
            });
        }
    })

    // Render current song and artist data in hidden overlay
    // To be enabled when the user clicks on it.
    songDetailOverlayPlaceholder.innerHTML = songDetailOverlayTemplate({
        name: name,
        duration: formatedDuration,
        artists: artists,
        albumCover: albumCover
    });
}

function getState(player) {
    console.log('getting state')
    return player.getCurrentState()
}


function setupTrackList(data) {
    document.querySelector('#track-list').addEventListener('click', function (event) {

        const target = event.target;

        // Check wether the event bubbling path contains the list item element
        const LI = event.path.find(el => el.tagName == 'LI')

        if (typeof LI != 'undefined') {

            // Get track uri from li data attribute
            const trackUri = LI.getAttribute('data-track_uri')

            // play(data.device_id, token, trackUri);
            play(data.device_id, token, trackUri);
        } else {
            console.error("Can't find list-item along event path")
        }
    }, false)
}

function loadMore(offset, limit) {

    fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
        .then(data => data.json())
        .then(data => {

            //console.table(data.items.map(song => song.track))

            const tracks = data.items.map(song => {
                return {
                    name: song.track.name,
                    duration: msToMinAndSec(song.track.duration_ms),
                    artists: song.track.artists,
                    uri: song.track.uri
                }
            })
            trackListPlaceholder.innerHTML += trackListTemplate({
                tracks: tracks
            })

            return data
        })
}

function isBottom() {
    let offset = 0;
    window.addEventListener('scroll', throttle(function (e) {
        // console.table(window.innerHeight, window.scrollY, document.body.scrollHeight)
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            // console.log("you're at the bottom of the page")

            offset += 50

            loadMore(offset, 50)
        }

    }, 50))

}

isBottom()

function getNextSong(player){
    fetch(`https://api.spotify.com/v1/me/player/next`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        method: 'POST'
    })
    // .then(data => {
    //     console.log(data)
    //     return data.json()
    // })
    .then(json => {
        console.log(json)
        // playNextSong()
    })
}

// function playNextSong(songID){

// }


// https://stackoverflow.com/questions/27078285/simple-throttle-in-js
function throttle(func, timeFrame) {
    var lastTime = 0;
    return function () {
        var now = new Date();
        if (now - lastTime >= timeFrame) {
            func();
            lastTime = now;
        }
    };
}

// https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript/21294619
function msToMinAndSec(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}