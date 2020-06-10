const express = require('express');
const router = express.Router();

import axios from 'axios';

async function getUserPage(handle){
    const instagramJson = await axios.get(`https://www.instagram.com/${handle}/?__a=1`);
    const {
         graphql:{
             user:{
                edge_owner_to_timeline_media: {
                    edges
                }
             }
         }
    } = instagramJson.data;
    return getShortCodes(edges)
}


function getShortCodes(edges){
    return edges.map(edge => {
        return edge.node.shortcode
    })
}

router.get('/instagram/recent/:handle', async (req,res) =>{
    try{ 
        const recentPosts = await getUserPage(req.params.handle)
        res.send(recentPosts)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router;