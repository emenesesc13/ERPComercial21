<template>
  <validation-observer
    ref="modal-service-type"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-service-type"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary modal--padding"
        centered
        :title="serviceType._id ? 'Modificar Tipo Servicio' : 'Registrar Tipo Servicio'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Service Type -->

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
                  v-model="serviceType.nombre"
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
            :show="serviceType.loading"
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

export default {
  name: 'ModalServiceType',
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
    const serviceType = inject('serviceType')
    const messageToast = inject('messageToast')
    const loadServiceTypes = inject('loadServiceTypes')

    const sendForm = async () => {
      serviceType.value.loading = true
      serviceType.value.accion = serviceType.value._id ? 2 : 1
      serviceType.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/tiposervicio', serviceType.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        serviceType.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            serviceType.value._id = id
            messageToast('success', 'Tipo Servicio', mensaje)
            context.root.$bvModal.hide('modal-service-type')
            loadServiceTypes()
          }
        })
        serviceType.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-service-type')
    }

    return {
      serviceType,
      sendForm,
      closeForm,
    }
  },
}
</script>
