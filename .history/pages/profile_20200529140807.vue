<template>
<div>
  <a href="/player">Songs</a>

  </div>
</template>

<script>
export default {
  asyncData (context) {
    console.log(context.params)
  }
}
</script>
