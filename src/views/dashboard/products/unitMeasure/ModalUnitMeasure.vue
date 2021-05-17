<template>
  <validation-observer
    ref="modal-unit-measure"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-unit-measure"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="unitMeasure._id ? 'Modificar Unidad Medida' : 'Registrar Unidad Medida'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Unit Measure -->

        <b-row>

          <!-- Name -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="name"
              label="Nombre *"
            >
              <validation-provider
                #default="{ errors }"
                name="nombre"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="unitMeasure.nombre"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Unit Group -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="grupo unidad"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="unitGroup"
                label="Grupo Unidad *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="unitGroup"
                  v-model="unitMeasure.idGrupoUnidad"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="unitGroup => unitGroup._id"
                  label="nombre"
                  :options="combos.unitGroup.data"
                  :loading="combos.unitGroup.loading"
                  :clearable="false"
                  :disabled="combos.unitGroup.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Unit Sunat -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="unidad sunat"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label-for="unitSunat"
                label="Unidad Sunat *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="unitSunat"
                  v-model="unitMeasure.idUnidadSunat"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="unitSunat => unitSunat._id"
                  label="nombre"
                  :options="combos.unitSunat.data"
                  :loading="combos.unitSunat.loading"
                  :clearable="false"
                  :disabled="combos.unitSunat.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

        </b-row>

        <template #modal-footer>
          <b-button
            type="button"
            variant="outline-primary"
            @click="closeForm"
          >
            Cerrar
          </b-button>
          <b-overlay
            :show="unitMeasure.loading"
            variant="transparent"
            :opacity="0.85"
            blur="2px"
            rounded="sm"
          >
            <b-button
              type="submit"
              variant="primary"
              @click="handleSubmit(sendForm)"
            >
              Guardar
            </b-button>
          </b-overlay>
        </template>

      </b-modal>
    </b-form>
  </validation-observer>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalUnitMeasure',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BButton,
    BOverlay,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
    }
  },
  setup(props, context) {
    const unitMeasure = inject('unitMeasure')
    const messageToast = inject('messageToast')
    const loadUnitsMeasure = inject('loadUnitsMeasure')
    const combos = inject('combos')

    const sendForm = async () => {
      unitMeasure.value.loading = true
      unitMeasure.value.accion = unitMeasure.value._id ? 2 : 1
      unitMeasure.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/unidadmedida', unitMeasure.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        unitMeasure.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            unitMeasure.value._id = id
            messageToast('success', 'Unidad de Medida', mensaje)
            context.root.$bvModal.hide('modal-unit-measure')
            loadUnitsMeasure()
          }
        })
        unitMeasure.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-unit-measure')
    }

    return {
      unitMeasure,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
