const express = require('express');
const router = express.Router();


import axios from 'axios'

async function getArtistData(artistName){
    const artist = await axios.get(`http://musicbrainz.org/ws/2/artist/?query=${artistName}&fmt=json`)
    const artistid = artist.data.artists[0].id
    const artistData = await axios.get(`http://musicbrainz.org/ws/2/artist/${artistid}?inc=url-rels&fmt=json`)
    const {
        relations
    }= artistData.data ;
         return relations

}

router.get('/musicbrainz/getartist/:name', async (req, res)=>{
    try{
        const artistData = await getArtistData(req.params.name)
        res.send(artistData)
    }catch(err){
        console.log(err)
    }
})

module.exports = router