<template>
  <validation-observer
    ref="modal-collaborator"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-collaborator"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="collaborator._id ? 'Modificar Colaborador' : 'Registrar Colaborador'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Collaborator -->

        <b-row>

          <!-- Name -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="name"
              label="Nombre"
            >
              <validation-provider
                #default="{ errors }"
                name="nombre"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="collaborator.nombre"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Ape Paterno -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="apePaterno"
              label="Apellido paterno"
            >
              <validation-provider
                #default="{ errors }"
                name="apellido paterno"
                rules="required"
              >
                <b-form-input
                  id="apePaterno"
                  v-model="collaborator.apellidoPaterno"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Ape Materno -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="apeMaterno"
              label="Apellido Materno"
            >
              <validation-provider
                #default="{ errors }"
                name="apellido materno"
                rules="required"
              >
                <b-form-input
                  id="apeMaterno"
                  v-model="collaborator.apellidoMaterno"
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
            :show="collaborator.loading"
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
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalCollaborator',
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
  created() {
    extend('required', {
      message: 'Es requerido',
    })
  },
  setup(props, context) {
    const collaborator = inject('collaborator')
    const messageToast = inject('messageToast')
    const loadCollaborators = inject('loadCollaborators')

    const sendForm = async () => {
      collaborator.value.loading = true
      collaborator.value.accion = collaborator.value._id ? 2 : 1
      collaborator.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/colaborador', collaborator.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        collaborator.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            collaborator.value._id = id
            messageToast('success', 'Colaborador', mensaje)
            context.root.$bvModal.hide('modal-collaborator')
            loadCollaborators()
          }
        })
        collaborator.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-collaborator')
    }

    return {
      collaborator,
      sendForm,
      closeForm,
    }
  },
}
</script>
