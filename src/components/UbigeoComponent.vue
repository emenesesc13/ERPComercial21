<template>
  <fragment>

    <!-- Departamento -->

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <!-- Validador -->
      <validation-provider
        #default="{ errors }"
        name="departamento"
        rules="requiredComboVueSelect:m"
      >
        <b-form-group
          label-for="department"
          label="Departamento *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo -->
          <v-select
            id="department"
            v-model="ubigeo.departament"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="departament => departament.id"
            label="nombre"
            :options="combos.departament.data"
            :loading="combos.departament.loading"
            :disabled="combos.departament.disabled"
            :clearable="false"
            @option:selected="selectedDepartament"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>

    <!-- Provincia -->

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <!-- Validador -->
      <validation-provider
        #default="{ errors }"
        name="provincia"
        rules="requiredComboVueSelect"
      >
        <b-form-group
          label-for="province"
          label="Provincia *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo -->
          <v-select
            id="province"
            v-model="ubigeo.province"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="province => province.id"
            label="nombre"
            :options="combos.province.data"
            :loading="combos.province.loading"
            :disabled="combos.province.disabled"
            :clearable="false"
            @option:selected="selectedProvince"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>

    <!-- Distrito -->

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <!-- Validador -->
      <validation-provider
        #default="{ errors }"
        name="distrito"
        rules="requiredComboVueSelect:m"
      >
        <b-form-group
          label-for="district"
          label="Distrito *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo -->
          <v-select
            id="district"
            v-model="ubigeo.district"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="district => district._id"
            label="nombre"
            :options="combos.district.data"
            :loading="combos.district.loading"
            :disabled="combos.district.disabled"
            :clearable="false"
            @option:selected="selectedDistrict"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>

  </fragment>
</template>

<script>
// Importar dependencias del componente
import { ref, inject } from '@vue/composition-api'
import { Fragment } from 'vue-fragment'
import { BCol, BFormGroup } from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'

export default {
  name: 'UbigeoComponent',
  components: {
    // Instalar los componentes que se utilizaran
    Fragment,
    BCol,
    BFormGroup,
    ValidationProvider,
    vSelect,
  },
  props: {
    // Propiedades permitidas para la distribución de columnas del Departamento, Provincia, Distrito
    cols: {
      type: String,
      default: '12',
    },
    colsm: {
      type: String,
      default: '12',
    },
    colmd: {
      type: String,
      default: '12',
    },
    collg: {
      type: String,
      default: '12',
    },
  },
  setup(props, context) {
    // Inyectando variables reactivas o funciones que nos provee un componente padre
    const loadComboBoxes = inject('loadComboBoxes')
    const combos = inject('combos')
    const resetCombo = inject('resetCombo')
    const ubigeo = inject('ubigeoSelected')
    // Variables reactiva que va contener el valor del idUbigeo
    const idUbigeo = ref(0)

    // Función asincrona que se ejecuta cuando se selecciona un departamento
    // Recibe un parametro
    /*
      1.- idDepartamento
    */
    const selectedDepartament = async ({ id }) => {
      ubigeo.value.departament = id
      ubigeo.value.province = 0
      ubigeo.value.district = 0
      idUbigeo.value = 0
      // Limpiar combos de provincia y distrito
      resetCombo(combos.value, ['province', 'district'])
      // Cargar combos de provincia y distrito en base al departamento seleccionado
      loadComboBoxes(combos.value, ['province'], `/ComboUbigeo/Provincia/${ubigeo.value.departament}`, 'Ocurrio un Error al momento de cargar las Provincias')
      // Emitir un evento enviando como parametro el idUbigeo
      context.emit('selected-district', idUbigeo.value)
    }

    // Función que se ejecuta cuando se selecciona una provincia, recibe como parametro el idProvincia
    const selectedProvince = async ({ id }) => {
      ubigeo.value.province = id
      ubigeo.value.district = 0
      idUbigeo.value = 0
      // Limpiar combo de distrito
      resetCombo(combos.value, ['district'])
      // Cargar combo de distrito en base a la provincia seleccionada
      loadComboBoxes(combos.value, ['district'], `/ComboUbigeo/Distrito/${ubigeo.value.departament}/${ubigeo.value.province}`, 'Ocurrio un Error al momento de cargar las Provincias')
      // Emitir un evento enviando como parametro el idUbigeo
      context.emit('selected-district', idUbigeo.value)
    }

    // Función que se ejecuta cuando se selecciona un distrito, recibe como parametro el idDistrito. Y a su vez emite un evento para que el componente padre que lo utilice pueda capturar el idUbigeo
    const selectedDistrict = async ({ _id }) => {
      ubigeo.value.district = _id
      idUbigeo.value = _id
      // Emitir un evento enviando como parametro el idUbigeo
      context.emit('selected-district', idUbigeo.value)
    }

    // Retornando variables reactivas o funciones que se utilizan en el template
    return {
      combos,
      ubigeo,
      selectedDepartament,
      selectedProvince,
      selectedDistrict,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
