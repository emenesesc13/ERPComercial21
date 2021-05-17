<template>
  <validation-observer
    ref="modal-option"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-option"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="option._id ? 'Modificar Opción' : 'Registrar Opción'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Option -->

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
                  v-model="option.nombre"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Icono -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="icono"
              label="Icono *"
            >
              <validation-provider
                #default="{ errors }"
                name="icono"
                rules="required"
              >
                <b-form-input
                  id="icono"
                  v-model="option.icono"
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
            :show="option.loading"
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
  name: 'ModalOption',
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
    const option = inject('option')
    const messageToast = inject('messageToast')
    const loadOptions = inject('loadOptions')

    const sendForm = async () => {
      option.value.loading = true
      option.value.accion = option.value._id ? 2 : 1
      option.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/opciones', option.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        option.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            option.value._id = id
            messageToast('success', 'Opción', mensaje)
            context.root.$bvModal.hide('modal-option')
            loadOptions()
          }
        })
        option.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-option')
    }

    return {
      option,
      sendForm,
      closeForm,
    }
  },
}
</script>
