const express = require('express');
const router = express.Router();

import axios from 'axios';


async function getMediaId(handle) {
      const oege = await axios.get(`https://oege.ie.hva.nl/~stolpt1/insta/index.php?username=${handle}`)
      console.log(oege.data)
      return(oege.data)
    }

    // function getShortCodes(edges) {
    //   return edges.map(edge => {
    //     return edge.node.shortcode
    //   })
    // }

    router.get('/instagram/recent/:url', async (req, res) => {
      try {
        // const recentPosts = await getUserPage(req.params.url)
        const recentPosts = await getMediaId(req.params.url)
        res.send(recentPosts)
      } catch (err) {
        console.log(err)
      }
    })


    module.exports = router;
