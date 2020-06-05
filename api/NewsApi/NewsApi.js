const express = require('express');
const router = express.Router();
import axios from 'axios'

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

async function getNews(artist){

      // To query /v2/everything
      // You must include at least one q, source, or domain
      return newsapi.v2.everything({
        q: artist,
        sources: 'mtv-news,the-verge,google-news',
        language: 'en',
        sortBy: 'relevancy',
        page: 2
      }).then(response => {
        console.log(response);
        return response
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
      });
}



router.get('/newsapi/getnews/:name', async (req, res)=>{
    try{
        const news = await getNews(req.params.name)
        res.send(news)
    }catch(err){
        console.log(err)
    }
})

module.exports = router