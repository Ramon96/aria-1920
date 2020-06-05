<template>
  <div class="videos">
    <div v-for="value in ids" v-bind:key="value">
      <iframe
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${value}`"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

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
  props: [],
  data() {
    return {
      ids: []
    };
  },
  watch: {},
  computed: {},
  beforeMount() {
    this.init();
  },
  methods: {
    async getVideoIds() {
      // TODO vervang eminimen met de youtube handle die we van de music brainz api terug krijgen.
      const videos = await this.$axios.get(`/api/youtube/data/eminemMusic`);
      this.ids = videos.data;
    },
    init() {
      this.getVideoIds();
    }
  }
};
</script>