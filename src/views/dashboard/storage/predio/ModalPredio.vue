<template>
  <validation-observer
    ref="modal-predio"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-predio"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="predio._id ? 'Modificar Predio' : 'Registrar Predio'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Unit Measure -->

        <b-row>

          <ubigeo-component
            cols="12"
            @selected-district="selectedDistrict"
          />

          <!-- Direction -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="direction"
              label="Dirección *"
            >
              <validation-provider
                #default="{ errors }"
                name="dirección"
                rules="required"
              >
                <b-form-input
                  id="direction"
                  v-model="predio.direccion"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Observation -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="observation"
              label="Observación *"
            >
              <validation-provider
                #default="{ errors }"
                name="observación"
                rules="required"
              >
                <b-form-input
                  id="observation"
                  v-model="predio.observacion"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
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
            :show="predio.loading"
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
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'
import UbigeoComponent from '@/components/UbigeoComponent.vue'

export default {
  name: 'ModalPredio',
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
    UbigeoComponent,
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
    const predio = inject('predio')
    const messageToast = inject('messageToast')
    const loadPredios = inject('loadPredios')

    const selectedDistrict = idUbigeo => {
      predio.value.idUbigeo = idUbigeo
    }

    const sendForm = async () => {
      predio.value.loading = true
      predio.value.accion = predio.value._id ? 2 : 1
      predio.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/predio', predio.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        predio.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            predio.value._id = id
            messageToast('success', 'Predio', mensaje)
            context.root.$bvModal.hide('modal-predio')
            loadPredios()
          }
        })
        predio.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-predio')
    }

    return {
      predio,
      selectedDistrict,
      sendForm,
      closeForm,
    }
  },
}
</script>
