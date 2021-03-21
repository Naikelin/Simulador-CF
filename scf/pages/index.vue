<template>
  <div>
    <Navbar/>
    <Formulario/>
    <Tabla/>
    <Footer/>
<!--     <b-table striped hover :items="items"></b-table> -->

  </div>

</template>
<script>
export default {
  head () {
    return {
      title: 'Comparador CAE',
    }
  }
}
</script>


<style>
.container {

  margin: 0 auto;
  margin-top: 5vh;
  min-height: 50vh;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;

}
</style>
