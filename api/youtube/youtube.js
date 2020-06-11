const express = require('express');
const router = express.Router();

import axios from 'axios';

async function getUploadsKey(username){
    const youtubeData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${username}&key=${process.env.YOUTUBE_KEY}`)
    const {
        items: {
        [0] :{ 
            contentDetails: {
                relatedPlaylists: {
                    uploads
                }
            }
        }
    }
    } = youtubeData.data


    return await getVideos(uploads);
}

async function getVideos(uploadsKey){
    const playlistData = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=${uploadsKey}&key=${process.env.YOUTUBE_KEY}`)

    let videos = playlistData.data.items.map(item => {
        return item.contentDetails.videoId
    })

    console.log(videos)

    return videos
}

router.get('/youtube/data/:url', async (req, res) =>{
    try{
        const videos = await getUploadsKey(req.params.url)
        res.send(videos)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router;