<template >
  <div class="news">
    <h2 v-if="articles.length > 0">News</h2>
    <div class="article" v-for="article in articles" :key="article.id">
      <img :src="`${article.urlToImage}`" :alt="`${article.description}`" />
      <div class="article-content">
        <a :href="`${article.url}`">{{article.source.name}}</a>
        <h3>{{article.title}}</h3>
        <!-- TODO 24 aug 2019  w/e this format is calles is desired. -->
        <time>{{article.publishedAt}}</time>
      </div>
      <button class="vertical-dots"></button>
    </div>
  </div>
</template>

<style lang="scss">
.article {
  display: flex;
  padding-bottom: 1em;
  position: relative;
  div {
    padding: 0 1em;
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
      font-size: 1.2em;
      line-height: 1.5em;
      height: 3em;
      width: 85%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      @supports (-webkit-line-clamp: 2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    time {
      color: color(Secondairy);
      margin-top: auto;
    }
  }
  img {
    width: 50%;
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
</style>

<script>
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
      articles: []
    };
  },
  watch: {
    artist: function(newArtist, oldArtist) {
    //   console.log("De artist is nu: " + newArtist)
      this.getPostIds();
    },
    deep: true
  },
  computed: {
    // naam
    //   this.getPostIds();
    
  },
  beforeMount() {
    this.init();
  },
  mounted() {
    // this.$watch(
    //   this.$props.artist, (newVal, oldVal) => {console.log(newVal)}
    // )
  },
  methods: {
    async getPostIds() {
      const postIds = await this.$axios.get(`/api/newsapi/getnews/${this.artist}`);
      this.articles = postIds.data.articles;
        console.log(this.articles)
    },
    init() {
      this.getPostIds();
    }
  }
};
</script>
