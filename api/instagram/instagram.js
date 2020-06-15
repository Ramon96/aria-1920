const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
const Nanogram = require('nanogram.js');

(function () {
  if (typeof globalThis === 'object') return;
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function () {
      return this;
    },
    configurable: true
  });
  __magic__.globalThis = __magic__;
  delete Object.prototype.__magic__;
}());

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}
const instagramParser = new Nanogram();



async function getMediaId(handle) {
    return await instagramParser.getMediaByUsername(handle).then((media) => {
            const {
              profile: {
                  edge_owner_to_timeline_media: {
                    edges
                  }
              }
            } = media;
            console.log(media)
        return getShortCodes(edges)

      })
    }

    function getShortCodes(edges) {
      return edges.map(edge => {
        return edge.node.shortcode
      })
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
