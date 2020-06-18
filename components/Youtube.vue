<template>
  <div class="videos">
    <h2 v-if="ids.length > 0">Videos</h2>
    <swiper ref="mySwiper" :options="swiperOptions">
     <swiper-slide v-for="value in ids" v-bind:key="value ">
      <iframe
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${value}`"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
     </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">

.videos{
  iframe{
    width: inherit;
    height: auto;
  }
}

.swiper-slide{
  transition: transform 1s;
}

.swiper-slide-active{
  transform-origin: top center;
}

.swiper-slide-next{
  transform: scale(0.5);
  transform-origin: top left;
}

.swiper-slide-prev{
  transform: scale(0.5);
  transform-origin: top right;
}

.swiper-container-android {
  transform: none;
}
</style>

<script>
export default {
  head() {
    return {
      // TODO fix title
      Title: "Youtube"
    };
  },
  name: "Youtube",
  components: {},
  props: ['ythandle'],
  data() {
    return {
      ids: [],
        swiperOptions: {
        grabCursor: true,
        slidesPerView: 1.2,
        // centeredSlides: true,
        loop: true,
        spaceBetween: 20,
        slidesOffsetBefore: 20
      }
    };
  },
  watch: {
    ythandle: function(newHandle, oldHandle){
      this.getVideoIds();
    }, deep: true
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
  },
  methods: {
    async getVideoIds() {
      // TODO vervang eminimen met de youtube handle die we van de music brainz api terug krijgen.
      console.log('ik maak een call' + this.ythandle)
      const videos = await this.$axios.get(`/api/youtube/data/${this.ythandle}`);
      this.ids = videos.data;
    },
    init() {
      this.getVideoIds();
    }
  }
};
</script>