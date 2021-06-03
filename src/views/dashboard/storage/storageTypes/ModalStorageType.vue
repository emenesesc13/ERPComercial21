<template>
  <validation-observer
    ref="modal-storage-type"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-storage-type"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary modal--padding"
        centered
        :title="storageType._id ? 'Modificar Tipo Almacén' : 'Registrar Tipo Almacén'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Storage Type -->

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
                  v-model="storageType.nombre"
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
            :show="storageType.loading"
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
  name: 'ModalStorageType',
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
    const storageType = inject('storageType')
    const messageToast = inject('messageToast')
    const loadStorageTypes = inject('loadStorageTypes')

    const sendForm = async () => {
      storageType.value.loading = true
      storageType.value.accion = storageType.value._id ? 2 : 1
      storageType.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/tipoalmacen', storageType.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        storageType.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            storageType.value._id = id
            messageToast('success', 'Tipo Almacén', mensaje)
            context.root.$bvModal.hide('modal-storage-type')
            loadStorageTypes()
          }
        })
        storageType.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-storage-type')
    }

    return {
      storageType,
      sendForm,
      closeForm,
    }
  },
}
</script>
