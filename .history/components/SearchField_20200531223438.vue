<template>
  <transition name="fade">
    <section>
      <!-- <aside>
        <img v-if="image" :src="image" alt="Album Artwork">
        <Progress :class="className" :progressPercent="progress" :image="image"/>
      </aside>
      <div class="metadata">
        <h2>{{name}}</h2>
        <p>{{artistsList}}</p>
        <p :class="statusClass">
          <span>{{$nuxt.layout.authorName}} {{ status }}.</span>
          <a v-if="href" :href="href">Listen?</a>
        </p>
      </div> -->

      <input id="search" type="text" name="search" placeholder="Search tracks..." @input="getTracks">
    </section>
  </transition>
</template>

<script>

export default {

  methods: {
    async getTracks (event) {
      console.log('Dit werkt')

      const data = await this.$axios.$get(
        `/api/spotify/search/`
      )
      console.log(data)
    }
  }
}
</script>

<style scoped>
input{
color: #000;
    padding: 6px 48px;
    height: 40px;
    width: 100%;
    border: 0;
    border-radius: 500px;
    text-overflow: ellipsis;
}

</style>
