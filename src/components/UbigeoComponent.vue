<template>
  <fragment>

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
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

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
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

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
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
import { ref, inject } from '@vue/composition-api'
import { Fragment } from 'vue-fragment'
import { BCol, BFormGroup } from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'

export default {
  name: 'UbigeoComponent',
  components: {
    Fragment,
    BCol,
    BFormGroup,
    ValidationProvider,
    vSelect,
  },
  props: {
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
    const loadComboBoxes = inject('loadComboBoxes')
    const combos = inject('combos')
    const resetCombo = inject('resetCombo')
    const ubigeo = inject('ubigeoSelected')
    const idUbigeo = ref(0)

    const selectedDepartament = async ({ id }) => {
      ubigeo.value.departament = id
      ubigeo.value.province = 0
      ubigeo.value.district = 0
      idUbigeo.value = 0
      resetCombo(combos.value, ['province', 'district'])
      loadComboBoxes(combos.value, ['province'], `/ComboUbigeo/Provincia/${ubigeo.value.departament}`, 'Ocurrio un Error al momento de cargar las Provincias')
      context.emit('selected-district', idUbigeo.value)
    }

    const selectedProvince = async ({ id }) => {
      ubigeo.value.province = id
      ubigeo.value.district = 0
      idUbigeo.value = 0
      resetCombo(combos.value, ['district'])
      loadComboBoxes(combos.value, ['district'], `/ComboUbigeo/Distrito/${ubigeo.value.departament}/${ubigeo.value.province}`, 'Ocurrio un Error al momento de cargar las Provincias')
      context.emit('selected-district', idUbigeo.value)
    }

    const selectedDistrict = async ({ _id }) => {
      ubigeo.value.district = _id
      idUbigeo.value = _id
      context.emit('selected-district', idUbigeo.value)
    }

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
