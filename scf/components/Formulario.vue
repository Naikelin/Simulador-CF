
<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Monto Prestamo"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.montoPrestamo"
          type="number"
          placeholder="Ingrese la cantidad del Prestamo"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Cantidad Meses:"
        label-for="input-4"
        description="Meses de financiamiento"
      >
        <b-form-input
          id="input-4"
          v-model="form.cantidadMeses"
          type="number"
          placeholder="Meses de financiamiento"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Cuota Mensual:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.cuotaMensual"
          type="number"
          placeholder="Ingrese la cuota mensual"
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
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ allForms }}</pre>
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
        allForms: [],
        nombresBancos: [{ text: 'Seleccionar', value: null }, 'Banco de Chile', 'Banco Bice', 'Scotiobank', ''],
        show: true
      }
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault()
        const values = this.form
        const result = await this.$axios.$post('http://localhost:8080/data', values);
        alert(JSON.stringify(result))
        this.allForms.push(result)
        alert(JSON.stringify(this.allForms))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
