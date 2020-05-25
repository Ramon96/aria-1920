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





    console.log(trackListSource, trackListTemplate, trackListPlaceholder)





    console.log(access_token)

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
                }})
            .then(res => res.json())
            .then(response => {

                console.log(response)
                userProfilePlaceholder.innerHTML = userProfileTemplate(response);



                fetch('https://api.spotify.com/v1/me/tracks?limit=50', {
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

window.onSpotifyWebPlaybackSDKReady = () => {
    // const token = urlParams.get('code');

    // Small play-bar
    var playBarSource = document.getElementById('play-bar-template').innerHTML,
    playBarTemplate = Handlebars.compile(playBarSource),
    playBarPlaceholder = document.getElementById('play-bar');
    
    // Detail-overlay of the current song / artist
    var songDetailOverlaySource = document.getElementById('song-detail-overlay-template').innerHTML,
    songDetailOverlayTemplate = Handlebars.compile(songDetailOverlaySource),
    songDetailOverlayPlaceholder = document.getElementById('song-detail');


    console.log('token', token)


    const player = new Spotify.Player({
        name: 'ARIA',
        getOAuthToken: cb => {
            cb(token);
        },
        volume: 1
    });

    // Error handling
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));

    // Playback status updates
    player.on('player_state_changed', state => {


     

        console.log(state)

        const {
            artists,
            name,
            album,
            duration_ms
        } = state.track_window.current_track

        // Duration from miliseconds to minutest an






        const albumCover = album['images'][1]['url']

        console.table([artists, name])

        const formatedDuration = msToMinAndSec(duration_ms)

        // Render current song in playbar
        playBarPlaceholder.innerHTML = playBarTemplate({
            name: name,
            duration: formatedDuration,
            artists: artists,
            albumCover: albumCover
        });

        // Render current song and artist data in hidden overlay
        // To be enabled when the user clicks on it.
        songDetailOverlayPlaceholder.innerHTML = songDetailOverlayTemplate({
            name: name,
            duration: formatedDuration,
            artists: artists,
            albumCover: albumCover
        });


        songDetailOverlayPlaceholder.querySelector('button').addEventListener('click', function(event) {
            document.body.classList.remove('overflow-hidden')
            songDetailOverlayPlaceholder.dataset.overlay = 'disabled'
        })

        // When clicked on the playbar, trigger overlay with details and content
        playBarPlaceholder.addEventListener('click', function(event){
            document.body.classList.add('overflow-hidden')
            songDetailOverlayPlaceholder.dataset.overlay = 'enabled'
        })
    });

    // Ready
    player.on('ready', data => {
        console.log('Ready with Device ID', data.device_id);
        console.log(token)
        // Play a track using our new device ID
        //play(data.device_id, token);
        setupTrackList(data)
    });

    // Connect to the player!
    player.connect();


    const pauseBtn = document.querySelector('button[data-control="pause"]')
    const playBtn = document.querySelector('button[data-control="play"]')

    const controls = [pauseBtn, playBtn];

    controls.forEach(control => {
        control.addEventListener('click', e => {
            if (e.target.dataset.control === 'pause') {
                player.pause().then(() => {
                    console.log('Paused!');
                });
            } else if (e.target.dataset.control === 'play') {
                player.resume().then(() => {
                    console.log('Paused!');
                });
            }
        })
    })


}




// Play a specified track on the Web Playback SDK's device ID
function play(device_id, token, trackUri) {

    const playBar = document.querySelector('.play-bar')

    console.log(token)
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                uris: [trackUri]
            })
        })
        .then(res => {
            console.log(res)

            if (!playBar.classList.contains('playing')) {
                playBar.classList.add('playing')
            }

        })

}


function setupTrackList(data) {
    document.querySelector('#track-list').addEventListener('click', function (event) {

        const target = event.target;
        console.log(target)

        // Check wether the event bubbling path contains the list item element
        const LI = event.path.find(el => el.tagName == 'LI')

        if (typeof LI != 'undefined') {

            // Get track uri from li data attribute
            const trackUri = LI.getAttribute('data-track_uri')

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
            console.log(data)

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
            console.log("you're at the bottom of the page")

            offset += 50

            loadMore(offset, 50)
        }

    }, 50))

}

isBottom()


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


function msToMinAndSec(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}