<template>
  <div class="container-fluid" >
<!--     <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ items }}</pre>
    </b-card> -->
    
    <b-table class="table table-bordered" striped hover :items="items" ></b-table>
  </div>
  
</template>

<script>

  export default {
    data() {
      return {
        items:[]
      }
    },
    mounted() {
    this.$root.$on('eventing', data => {
      this.items = data.sort((a,b) => Number(a.CAE.slice(0, a.CAE.length - 1)) - Number(b.CAE.slice(0, b.CAE.length - 1)))
    });
    }
  }
</script>
