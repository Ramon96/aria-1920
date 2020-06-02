<template>
<div>
  <a href="/player">Songs</a>
  <p>{{accesToken}}</p>
  </div>
</template>

<script>
export default {
  asyncData (context) {
    console.log(context)
  }
}
</script>
