<template>
  <a href="/player">Songs</a>
  <p>{{accesToken}}</p>
</template>

<script>
export default {
  asyncData (context) {
    console.log(context)
  }
}
</script>
