<template >
  <div class="news">
    <h2 v-if="articles.length > 0">News</h2>
    <div class="article" v-for="article in articles" :key="article.id">
      <img :src="`${article.urlToImage}`" :alt="`${article.description}`" />
      <div class="article-content">
        <a :href="`${article.url}`">{{article.source.name}}</a>
        <h3>{{article.title}}</h3>
        <!-- TODO 24 aug 2019  w/e this format is calles is desired. -->
        <time>{{article.formatedDate}}</time>
      </div>
      <button class="vertical-dots"></button>
    </div>
    <button @click="loadMore" v-if="showLoadMorebtn" class="load-more">More</button>
  </div>
</template>

<style lang="scss">
.article {
  display: flex;
  padding: 15px 20px;
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
      font-size: 0.8em;
    }
    h3 {
      color: color(Primary);
      font-size: 1em;
      line-height: 1.5em;
      height: 6em;
      width: 90%;
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
      font-size: .8rem;
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

// TODO fix styling button? Not too elegant
#song-detail button.load-more {
  color: #fff;
  font-family: spotify-bold;
  background: #1DB954;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  display: block;
  width: 80%;
  margin: 20px auto;
}
</style>

<script>
import moment from 'moment';
export default {
  head() {
    return {
      Title: "News Api"
    };
  },
  name: "NewsApi",
  components: {},
  props: ['artist'],
  data() {
    return {
      loadedArticles: [],
      articles: [],
      offset: 0,
      showLoadMorebtn: true
    };
  },
  watch: {
    artist: function(newArtist, oldArtist) {
      this.getPostIds()
    },
    deep: true
  },
  computed: {
    // naam
    //   this.getPostIds();
  },
  beforeMount () {
    this.init()
  },
  mounted () {
    // this.$watch(
    //   this.$props.artist, (newVal, oldVal) => {console.log(newVal)}
    // )
  },
  methods: {
    async getPostIds (offset) {
      const postIds = await this.$axios.get(`/api/newsapi/getnews/${this.artist}?offset=${offset}`)
      // All articles go here
      const articles = this.formatDates(postIds.data.articles)
      this.loadedArticles = articles
      // get 5 articles of the max 20 loaded
      this.articles = articles.filter((article, i) => i < 5)
      this.totalArticles = postIds.data.totalResults
      this.offset += 5

       if(this.loadedArticles.length <= this.articles.length){
         this.showLoadMorebtn = false
       }
      // console.log(this.articles)
    },
    init () {
      this.getPostIds(this.offset)
    },
    loadMore () {
      // console.log(this.loadedArticles)

      const postOffset = this.articles.length
          this.articles = this.loadedArticles.filter((article, i) => i < postOffset + this.offset)
      if(this.loadedArticles.length > this.articles.length){
        console.log(this.articles)
      }else{
         this.showLoadMorebtn = false
      }
    },
    formatDates (articles) {
      return articles.map(article =>{
        return {
          ...article,
          formatedDate: moment(article.publishedAt).format('DD MMM. YYYY').toUpperCase()
        }
      })
    }
  }
};
</script>
