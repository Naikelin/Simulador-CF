
<template>
  <div class="container-fluid">
    <b-card border-variant="info" img-src="https://image.freepik.com/vector-gratis/cuenta-pago-online-detalles-tarjeta-credito-informacion-personal-transaccion-financiera-trabajador-banco-personaje-dibujos-animados-banca-internet_335657-844.jpg" img-right img-width="500" >
     <div class="col-12">
       <b-card-body title="Comparador de créditos de consumo">
          <b-card-text>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Monto del crédito en CLP"
        label-for="input-1"
        
       
      >
        <b-form-input
          id="input-1"
          v-model="form.montoPrestamo"
          type="number"
          min = "100000"
          max = "100000000"
          placeholder="Ingrese el monto de su crédito, sin puntos"
          :disabled="deshabilitado"
          required 
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Plazo del crédito en meses"
        label-for="input-4"

      >
        <b-form-input
          id="input-4"
          v-model="form.cantidadMeses"
          :disabled="deshabilitado"
          type="number"
          min ="2"
          max = "48"
          placeholder="Ingrese el plazo de su credito"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        id="input-group-2" 
         label="Cuota mensual en CLP" 
        label-for="input-2" 
        :description="descripcionCuota"
        >
        
        <b-form-input
          id="input-2"
          v-model="form.cuotaMensual"
          type="number"
          :min="Math.ceil(form.montoPrestamo/form.cantidadMeses)"
          placeholder="Ingrese la cuota mensual de su crédito"
          :max ="form.montoPrestamo"
          required
        ></b-form-input>
        
      </b-form-group>

      <b-form-group id="input-group-3" label="Institución Financiera:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.nombreBanco"
          :options="nombresBancos"
          required
        ></b-form-select>
      </b-form-group>

<!--       <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
 -->
      <b-button type="submit" variant="outline-info">Simular CAE</b-button>
      <b-button type="reset" variant="outline-danger">Volver a simular</b-button>
    </b-form>
  <!--  <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
   </b-card-text>
    </b-card-body>
  </div>
  </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          montoPrestamo: '',
          cuotaMensual: '',
          cantidadMeses: '',
          nombreBanco: null,
        },
        allForms:[],
        nombresBancos: [ { text: 'Seleccione la institución financiera', value: null },
          'Banco de Chile', 
          'Banco BICE', 
          'Scotiabank', 
          'Banco Estado',
          'Banco BCI', 
          'Banco BBVA', 
          'Banco Falabella',
          'Banco Itaú',
          'Banco Santander',
          'Banco Ripley',
          'Banco Security',
          'Banco Condell',
          'Banco Edwards Citi',
          'Banco Consorcio',
          'Corpbanca',
          'Citibank'
          ],
        deshabilitado: false,
        show: true
      }
    },
    computed: {
      descripcionCuota() {
        return this.form.cantidadMeses? `Ingrese una cuota mensual mayor a \$${Math.ceil(this.form.montoPrestamo/this.form.cantidadMeses)} y menor a \$${Math.ceil(this.form.montoPrestamo)}` : ''
      }
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault()
        const values = this.form
        var result = ""
        try {
          result = await this.$axios.$post('http://localhost:8080/data', values);
        

        result.montoPrestamo = this.$root.$options.filters.currency(result.montoPrestamo, '$', 0, { thousandsSeparator: '.' })
        result.cuotaMensual = this.$root.$options.filters.currency(result.cuotaMensual, '$', 0, { thousandsSeparator: '.' })
        result.CAE += "%"

        this.form.cuotaMensual = ''
        this.form.nombreBanco = null
        this.deshabilitado = true

        this.$emit('onResult',result)
/*         alert(JSON.stringify(result)) */
        this.allForms.push(result)
/*         alert(JSON.stringify(this.allForms)) */
        var data = this.allForms
        this.$root.$emit('eventing', data);

        } catch (error) {

          alert("Error calculando el CAE")

        }
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.montoPrestamo = ''
        this.form.cuotaMensual = ''
        this.form.cantidadMeses = ''
        this.form.nombreBanco = null
        this.deshabilitado = false
        this.allForms = []
        this.$root.$emit('eventing', []);
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
