const express = require('express');
const router = express.Router();

import axios from 'axios';


async function getMediaId(handle) {

      const oege = await axios.get(`https://oege.ie.hva.nl/~stolpt1/insta-aria/index.php?username=${handle}`)
      console.warn("AAAAAAH", oege.data)
      if(!oege.data  || oege.data == null) {

          // return [{
          //   node: {
          //     shortcode: "CHGJcV3BMVO"
          //   }
          // },{
          //   node: {
          //     shortcode: "CG8AoyMBfkU"
          //   },
          // },{
          //   node: {
          //     shortcode: "CG8AouCBmyB"
          //   },
          // },{
          //   node: {
          //     shortcode: "CG8Aot9BK_c"
          //   },
          // }, {
          //   node: {
          //     shortcode: "CG8Aot-hwsS"
          //   },
          // }, {
          //   node: {
          //     shortcode: "CG8Aot-BkPl"
          //   }
          // }]
        }

      return oege.data
    }

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
