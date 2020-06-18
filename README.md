# ARIA @2020

<p align="center">
<img style="margin:0 auto;" width="100%" src="https://github.com/Ramon96/aria-1920/blob/master/docs/images/Banner.gif">
 </p>


# Introduction

Aria is one of the few cases we could choose. Tomas and Ramon decided to team up and face the problems Joost de Boo had in a project called Aria.

Aria is an idea by Joost. His vision was to enhance the experience of music listeners by providing more in depth information about the artists they were listening to. That way you are able to learn about your favorite artists other than just the music they produce. You will get a few about their recent news and a bit about their personal lives.

Over the past decades a huge transition has occurred within the music industry. De sales of physical products from the industry, like CD&#39;s, Vinyl and EP&#39;s had to make a way for streaming services like Spotify. Services that can be pretty handy. You can listen to your favorite artists everywhere and anytime.

But somehow physical products like Vinyl have some kind of a special value to them that Spotify just can&#39;t match yet or maybe never. Where creativity, information and maybe even promotion got expressed on vinyl album covers or CD covers, Spotify lacks that extra enrichment of content and expression.

That&#39;s where the Aria plugin comes into play.

In short:

Aria is a prototype of a Spotify plugin where the user is able to add social media and news platforms to further enhance his music experience.

## Table of content

- [Design rationale](#design-rationale)
  * [**Debriefing**](#--debriefing--)
  * [**Problem definition**](#--problem-definition--)
  * [**Sub Question**](#--sub-question--)
  * [**Edge cases**](#--edge-cases--)
    + [**Our goal is to allow the spotify user to:**](#--our-goal-is-to-allow-the-spotify-user-to---)
  * [**Scope of the project**](#--scope-of-the-project--)
  * [**What we don&#39;t do (at least not during these 5 weeks)**](#--what-we-don--39-t-do--at-least-not-during-these-5-weeks---)
  * [**Solution**](#--solution--)
    + [**Spotify oAuth**](#--spotify-oauth--)
    + [**Social handles**](#--social-handles--)
    + [**Social Media**](#--social-media--)
      - [Instagram](#instagram)
      - [Youtube](#youtube)
      - [**Articles**](#--articles--)
    + [**Code**](#--code--)
- [**Deliverables**](#--deliverables--)
- [**External content providers**](#--external-content-providers--)
  * [**Social media**](#--social-media--)
  * [**Videos**](#--videos--)
  * [**News**](#--news--)
- [**Contributors**](#--contributors--)
- [**Commissioned by**](#--commissioned-by--)
- [**Coaching**](#--coaching--)
- [**External sources**](#--external-sources--)

## Design rationale

### **Debriefing**

The Aria project is commissioned by Joost de Boo. The core concept is to enrich Spotify Users with their musical experience with external embedded media sources within Spotify.

Most important to him is that a user can listen to a song of an artist, then when the user scrolls down the user can see content of external media sources with content about the artist.

It&#39;s nice to have a page where the user can see all external media sources to configure them. But that&#39;s something we want to push forward. First things first.

Also there&#39;s some sort of dynamic menu with all those sources floating around. That&#39;s a little outdated and Joost rather wants us to focus on the Spotify experience and the core concept. If there&#39;s time left we can focus on could-haves.

It should be and feel like Spotify. Because it&#39;s not a standalone platform. It&#39;s supposed to be a Spotify plugin. Therefore it should look and feel like Spotify. The additional content should be in the same flavour.

Ramon and I are gonna explore the Spotify universe the first week, and check out the technical possibilities and boundaries. From then on we&#39;ll check-in with Joost as we make sprints of a week where we keep on re-iterating.

### **Problem definition**

How can we provide **relevant data** from **external apis** and **platforms** to a **spotify application**?

### **Sub Question**

**How** can we allow **the user** to **configure desired information** from **external media channels**

### **Edge cases**

What does it mean for the user when an external data source is not available?

**Not available:** The artist does not use a data source (for example instagram) or the Api server is down.

#### **Our goal is to allow the spotify user to:**

- De user can turn on a song, relanvent media channels will pop-up dependent to the artist
- Research for technical solutions to develop the front-end
- Allowing the user to configure certain media channels.
- To deliver a demo where a specific user can login via Spotify

### **Scope of the project**

To realise the technical possibilities and research mentioned in above points. Possible restrictions, obstacles and other possible challenges will be documented down the line and will be mentioned to Koost.

### **What we don&#39;t do (at least not during these 5 weeks)**

- In principe geen machine-learning, geen heftige algoritmes die de data zelf te veel beïnvloeden.
- No heavy machine learning or algorithms that create data our selves
- Delivering a production ready product. It&#39;s still a demo. We have to protect our scope. After these 5 weeks we have more time to go on if we want.

### **Solution**

To solve Joost&#39;s problem we are gonna need several external sources

for that we use

- Spotify Web Api
- MusicBrainz Api
- Youtube data v3 Api
- News Api
- Instagram Embed&#39;s

Instagram no longer provides an api that lets you retrieve data from other users. You are now only allowed to fetch your own user data. To get around that we make use of a php Scraper. We tried integrating scrapers within our own application. But since we deployed our demo on heroku this was not entirely possible. This is because the herokuapp is blacklisted on instagram. To get around that we deployed an php scraper on oege (one of hva&#39;s provided domains.) Tomas built a Php scraper so that the data would be injected in the DOM before the first paint. That way we can fetch to the oege domain and get our much needed post ids from there.

#### **Spotify oAuth**

To be able to make use of Spotify data we need to go through an authorisation process. This authorisation needs to be done by the oAuth protocol.

The process is pretty complex and we made use of the official Spotify web API oAuth guide to get up and running. But we provide a more simple overview of the steps down here:

1. We need to register our app at [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/)
2. We receive a client\_id and client\_secret, they can be found in the dashboard
3. We need to define a url / route for the callback function after the authorisation on Spotify&#39;s side is done.
4. The credentials we get in step 2 should be put inside a .env file or any other place where you should sensitive data / environment variables so that we don&#39;t directly expose them in public.
5. We specify a url with certain params such as the credentials saved in the .env file. Also we provide a scope as a param which defines what kinda information we want to access from the user that is logging in.
6. We redirect the user to a Spotify url with the credentials as params
7. After some communication up and down the Spotify service, we receive an access token and refresh token in case we want to refresh the access token. With this access token we can do requests to the Spotify services and receive data within the scope we defined.

Later on we switched from Express and HBS to a Nuxt Universal app with Express server middleware. Therefore the oAuth process is still the same, but the way the script is split up and saves the credentials to Redis is different. To make a little more progress we followed along with a [tutorial](https://www.smashingmagazine.com/2019/03/spotify-app-vue-nuxt-javascript/) to better understand how such things work within Nuxt and get along with the fundamentals.

#### **Social handles**

To get the artists his/hers social handles we made use of an api called MusicBrainz (With many thank you&#39;s to [Menno]([https://github.com/Mennauu](https://github.com/Mennauu)) for suggesting this api).

Musicbrainz stores everything you can know about an artist, including their social media links. If you search for example Eminem we will get a link to one of his social media channels, for example his youtube like so [https://www.youtube.com/user/eminemmusic](https://www.youtube.com/user/eminemmusic). Since we only need the handle we can slice the last part off doing so: `this.youtubeHandle = youtube.url.resource.split('/')[4]`

#### **Social Media**

##### Instagram
Instagram doesn&#39;t have a Api we can use, however if you go to a instagram user page and add `?__a=1` you will actually get a json of all the data and posts ( as of june 2020 that is) We fetch this from an oege page build by Tomas and return the post id to aria. Then for each Id we load an iFrame of that post.

##### Youtube

For Youtube we made a developer account on google and got our very own api key. We can use this key to access the Youtube Data api v3. This will return us the Id&#39;s of their recent uploads which we use to render the video of that artist.

##### **Articles**

To get our news sources we made use of the news Api. At the current moment we get our news from the following sources: Pitchfork, Billboard and rolling stone.

At first we were unable to get these news sources because we tried to retrieve these sources directly. We later figured out we could give the newsapi a news source domain and we were able to get the news articles that way.

#### **Code**

**SCSS**

We use SCSS to style our components, this is how the styling looks like for one of our compnents.

NewsApi.vue
 ```css
<style lang="scss">
.article {
  display: flex;
  padding: 0 20px;
  padding-bottom: 20px;
  position: relative;
  height: 200px;

  div {
    padding: 0 1em;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    a {
      color: color(Green);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.7em;
    }
    h3 {
      color: color(Primary);
      font-size: 1.2em;
      line-height: 1.2em;
      height: 6em;
      width: 90%;
      margin-top: .3em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      @supports (-webkit-line-clamp: 2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }

    time {
      color: color(Secondairy);
      margin-top: auto;
      font-family: spotify-book;
      font-size: .7rem;
    }
  }
  img {
    width: 40%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;

    &::before {
      content: "\f12d";
      font-size: 1.5em;
      font-family: icons;
      font-style: normal;
      font-weight: 400;
      display: inline-block;
      color: color(Secondairy);
      transform: rotate(90deg);
    }
  }
}
```

This is how one of our fetches looks like

youtube.js

```javascript
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

```

This is how one of our vue components looks like

Instagram.vue

```javascript

<script>
export default {
  head() {
    return {
      Title: "Instagram",
      script: [
        {
          src: 'https://www.instagram.com/embed.js',
          body: true,
          async: true
        }
      ]
    };
  },
  name: "Instagram",
  components: {},
  props: ['handle'],
  data() {
    return {
      ids: [],
      swiperOptions: {
        grabCursor: true,
        slidesPerView: 1.2,
        loop: true,
        spaceBetween: 20,
        loading: true,
        slidesOffsetBefore: 20
      }
    };
  },
  watch: {
    handle: function(newHandle, oldHandle){
      this.getPostIds().then(() =>{
        window.instgrm.Embeds.process()
      });
    }, deep:true
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  beforeMount() {
    this.init();
  },
  mounted() {
    this.loading = false
  },
  methods: {
    async getPostIds() {
      const postIds = await this.$axios.get(`/api/instagram/recent/${this.handle}`);
      this.ids = postIds.data;
    },
    init() {
      this.getPostIds()
        .then(() => {
          window.instgrm.Embeds.process();
        })
    }
  }
};
</script>

```

**PHP ( What is this magic? )**

Instagram has a deprecated API which they want to get rid of. We tried to make use of it since the new Graph API is quite new, was hard to set up and requires another oAuth process which can complicate our app logic. The transition from Express and Vanilla JS and HBS to Nuxt was complicated enough. We learned that the hard way. But we learned it anyway. Therefore we chose a more simple approach, similar to the approach Menno took last year.

We use fetch to an endpoint with the insta handle as a param like this:

```javascript [https://www.instagram.com/eminem/?\_\_a=1](https://www.instagram.com/eminem/?__a=1) ```

This way we can receive the posts of eminem directly in JSON.

Too good to be true right? It is. Everything worked out just fine, until we tested it live and found out the request to Instagram gets blocked from their side because we requested it from Heroku, a service that is blocked by Instagram.

We tried some NPM packages that don&#39;t require credentials, the whole oAuth process and GraphQL (we did dive into GraphQL a bit). But they didn&#39;t work, were outdated or only worked client side.

In the end we found a solution that required us to use some good oll PHP. This way, with a server in between, we can access the data anyway.

When we need the data, we send the request to our other Apache server. The PHP runs there and gets the Instagram posts with our Instagram account from an artist. Then it gets formatted as JSON and it&#39;s echoed back to our app.

This is a little snippet of PHP we wrote to get the data

```php 
$instagram->login();

$instagram->saveSession();

$user = $_GET['username'];
```

```php
$medias = $instagram -> getMedias($user,25);

// Lets look at $media

$shortcodes = array_map('getShortCodes',$medias);

echo json_encode($shortcodes);

function getShortCodes ($item){

$id = $item->getId();

returnMedia::getCodeFromId($id);

}
```
## **Deliverables**

In 5 weeks time we&#39;re gonna research and develop a front-end application which will demonstrate the enrichment of listening to a song on Spotify, with external embedded content.

Our goal is to provide a demo where a single user can:

- Login with Spotify credentials
- Configure and control which platforms provide enriching content within the Spotify demo
- Listen to a song
- Consume the external content while listening to a song
- Persue embeded content to it&#39;s source / platform

## Wishlist 
- [ ] Database for saving user specific preferences
- [ ] Multi user support
- [ ] More ways to enhance it as a PWA (s.w., webp, skeleton UI, no reflow)
- [ ] More interaction within the player

## **External content providers**

### **Social media**

- Instagram

### **Videos**

- Youtube

### **News**

- Pitchfork
- Billboard
- Rolling stone

## **Contributors**

Ramon Meijers

Tomas Stolp

## **Commissioned by**

Joost de Boo

## **Coaching**

Vasilis van Gemert

## **External sources**

[Spotify housestyle](https://developer.spotify.com/branding-guidelines/)

[Joost&#39;s case](https://drive.google.com/file/d/1LIhH6LVYCvJZ8bm6NlvcSjMMKwOUjwI2/view)
