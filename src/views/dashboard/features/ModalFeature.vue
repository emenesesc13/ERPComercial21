<template>
  <validation-observer
    ref="modal-article"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-feature"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="feature._id ? 'Modificar Característica' : 'Registrar Característica'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Feature -->

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
                  v-model="feature.nombre"
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
            :show="feature.loading"
            variant="transparent"
            :opacity="0.85"
            blur="2px"
            rounded="sm"
          >
            <b-button
              type="submit"
              variant="primary"
              @click="handleSubmit(sendFeature)"
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
  name: 'ModalFeature',
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
    const feature = inject('feature')
    const messageToast = inject('messageToast')
    const loadFeatures = inject('loadFeatures')

    const sendFeature = async () => {
      feature.value.loading = true
      feature.value.accion = feature.value._id ? 2 : 1
      feature.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/caracteristica', feature.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        feature.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            feature.value._id = id
            messageToast('success', 'Característica', mensaje)
            context.root.$bvModal.hide('modal-feature')
            loadFeatures()
          }
        })
        feature.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-feature')
    }

    return {
      feature,
      sendFeature,
      closeForm,
    }
  },
}
</script>

<style>

</style>
