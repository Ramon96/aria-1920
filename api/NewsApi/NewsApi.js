const express = require('express');
const router = express.Router();
import axios from 'axios'

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

async function getNews(artist, offset){

      // To query /v2/everything
      // You must include at least one q, source, or domain
      return newsapi.v2.everything({
        q: artist,
        domains: "billboard.com,pitchfork.com,rollingstone.com",
        language: 'en',
        sortBy: 'relevancy',
        // page: 1
      }).then(response => {
        // console.log(response);
        return response
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
      });
}



router.get('/newsapi/getnews/:name/:offset?', async (req, res)=>{
    try{
        const news = await getNews(req.params.name, req.params.offset)
        res.send(news)
    }catch(err){
        console.log(err)
    }
})

module.exports = router