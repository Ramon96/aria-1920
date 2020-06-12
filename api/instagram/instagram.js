const express = require('express');
const router = express.Router();

// TODO remove this, this is just for testing purposes
const fetch = require('node-fetch');

import axios from 'axios';

async function getUserPage(handle){
    // const instagramJson = await axios.get(`https://www.instagram.com/${handle}/?__a=1`);
    const instagramJson = await (await fetch(`https://www.instagram.com/${handle}/?__a=1`)).json();
    // const {
    //      graphql:{
    //          user:{
    //             edge_owner_to_timeline_media: {
    //                 edges
    //             }
    //          }
    //      }
    // } = await instagramJson.data;
    console.log('handle from server ', handle )
    // console.log(instagramJson.data)

    // const data = await instagramJson.json()
    // console.log(data)
    return getShortCodes(instagramJson.graphql.user.edge_owner_to_timeline_media.edges)
}


function getShortCodes(edges){
    return edges.map(edge => {
        return edge.node.shortcode
    })
}

router.get('/instagram/recent/:url', async (req,res) =>{
    try{ 
        const recentPosts = await getUserPage(req.params.url)
        res.send(recentPosts)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router;