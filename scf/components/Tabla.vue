<template>
  <div class="container">
    <button @click="$fetch">Refresh</button>
    <b-table hover :items="items"></b-table>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        items: []
      }
    },
    async fetch() {
      this.items = await this.$http.$get('https://api.nuxtjs.dev/posts')
    }
  }
</script>
