const express = require('express');
const router = express.Router();

const ig = require('instagram-scraping');
const delay = require('delay');

async function getMediaId(handle){
    return  ig.scrapeUserPage('eminem')
        .then( async result => {
            await delay(1500);
        return result.medias.map( post => {
            return post.shortcode
        })
      });
}

router.get('/instagram/recent/:url', async (req,res) =>{
    try{ 
        // const recentPosts = await getUserPage(req.params.url)
        const recentPosts = await getMediaId(req.params.url)
        res.send(recentPosts)
    }
    catch(err){
        console.log(err)
    }
})

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

module.exports = router;