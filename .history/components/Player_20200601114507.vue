<template>
  <transition name="fade">
    <section>
      <aside>
        <img v-if="image" :src="image" alt="Album Artwork">
        <Progress :class="className" :progress-percent="progress" :image="image" />
      </aside>
      <div class="metadata">
        <h2>{{ name }}</h2>
        <p>{{ artistsList }}</p>
        <p :class="statusClass">
          <span>{{ $nuxt.layout.authorName }} {{ status }}.</span>
          <a v-if="href" :href="href">Listen?</a>
        </p>
      </div>
    </section>
  </transition>
</template>

<script>

</script>

<style scoped>
   
</style>
