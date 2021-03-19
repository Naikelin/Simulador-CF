<template>
  <div>
    <Navbar/>
    <Formulario/>
  </div>
</template>
<script>
import Tabla from '../components/Tabla.vue'
export default {
  components: { Tabla },}
</script>

<style>
.container {

  margin: 0 auto;
  margin-top: 5vh;
  min-height: 100vh;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;

}
</style>
