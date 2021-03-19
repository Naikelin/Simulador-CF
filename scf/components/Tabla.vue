<template>
  <div class="container">
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ items }}</pre>
    </b-card>
  </div>
  
</template>

<script>

  export default {
    data() {
      return {
        items: []
      }
    },
    mounted() {
    this.$root.$on('eventing', data => {
      this.items = data
      console.log(data);
    });
    }
  }
</script>
