<template>
    <div class="news">
    <h2>News</h2>
        <div class="article" v-for="article in articles" v-bind:key="article">
            <img :src="`${article.urlToImage}`" :alt="`${article.description}`">
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
    .article{
        display: flex;
        padding-bottom: 1em;
        position: relative;
        div{
            padding: 0 1em;
            display: flex;
            flex-direction: column;
            a{
                color: color(Green);
                text-transform: uppercase;
                letter-spacing: 2px;
                font-size: .8em;
            }
            h3{
                color: color(Primary);
                font-size: 1.2em;
                line-height: 1.5em;
            }

            time{
                color: color(Secondairy);
                margin-top: auto;
            }
        }
        img{
            width: 50%;
            object-fit: cover;
        }

        button{
            position: absolute;
            top: 0;
            right: 0;

            &::before{
                content: "\f12d";
                font-size: 1.5em;
                font-family: icons;
                font-style: normal;
                font-weight: 400;
                display: inline-block;
                color: color(Secondairy);
                transform: rotate(90deg)
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
  props: [],
  data() {
    return {
      articles: []
    };
  },
  watch: {},
  computed: {
  },
  beforeMount() {
    this.init();
  },
  mounted() {
  },
  methods: {
    async getPostIds() {
      const postIds = await this.$axios.get(`/api/newsapi/getnews/eminem`);
      this.articles = postIds.data.articles;
        console.log(this.articles)
    },
    init() {
      this.getPostIds();
    }
  }
};
</script>
