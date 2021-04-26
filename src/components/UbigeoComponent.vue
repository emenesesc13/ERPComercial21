<template>
  <b-row>

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <b-form-group
        label-for="department"
        label="Departamento"
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
      </b-form-group>
    </b-col>

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <b-form-group
        label-for="province"
        label="Provincia"
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
      </b-form-group>
    </b-col>

    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <b-form-group
        label-for="district"
        label="Distrito"
      >
        <v-select
          id="district"
          v-model="ubigeo.district"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :reduce="district => district.id"
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
      </b-form-group>
    </b-col>

  </b-row>
</template>

<script>
import { onMounted, ref, inject } from '@vue/composition-api'
import { BRow, BCol, BFormGroup } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  name: 'UbigeoComponent',
  components: {
    BRow,
    BCol,
    BFormGroup,
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
    const initialStateCombo = {
      loading: false,
      data: [],
      disabled: true,
    }
    const combos = ref({
      departament: { ...initialStateCombo },
      province: { ...initialStateCombo },
      district: { ...initialStateCombo },
    })
    const resetCombo = (combosVar, nameCombo = []) => {
      nameCombo.forEach(combo => {
        combosVar[combo] = { ...initialStateCombo }
      })
    }
    const ubigeo = ref({
      departament: 0,
      province: 0,
      district: 0,
    })
    const idUbigeo = ref(0)

    const selectedDepartament = async ({ id }) => {
      ubigeo.value.departament = id
      ubigeo.value.province = 0
      ubigeo.value.district = 0
      resetCombo(combos.value, ['province', 'district'])
      loadComboBoxes(combos.value, ['province'], `/ComboUbigeo/Provincia/${ubigeo.value.departament}`, 'Ocurrio un Error al momento de cargar las Provincias')
    }

    const selectedProvince = async ({ id }) => {
      ubigeo.value.province = id
      ubigeo.value.district = 0
      resetCombo(combos.value, ['district'])
      loadComboBoxes(combos.value, ['district'], `/ComboUbigeo/Distrito/${ubigeo.value.departament}/${ubigeo.value.province}`, 'Ocurrio un Error al momento de cargar las Provincias')
    }

    const selectedDistrict = async ({ _id, id }) => {
      ubigeo.value.district = id
      idUbigeo.value = _id
      context.emit('selected-district', idUbigeo.value)
    }

    onMounted(() => {
      loadComboBoxes(combos.value, ['departament'], '/ComboUbigeo/Departamento', 'Ocurrio un Error al momento de cargar los Departamentos')
    })

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
