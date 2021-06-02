<template>
  <validation-observer
    ref="modal-business-unit"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-business-unit"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="businessUnit._id ? 'Modificar Unidad de Negocio' : 'Registrar Unidad de Negocio'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <b-row>

          <!-- Nombre -->
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
                  v-model="businessUnit.nombre"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Razón Social -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="razonSocial"
              label="Razón Social"
            >
              <b-form-input
                id="razonSocial"
                v-model="businessUnit.razonSocial"
              />
            </b-form-group>
          </b-col>

          <!-- Ruc -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="ruc"
              label="RUC"
            >
              <validation-provider
                #default="{ errors }"
                name="RUC"
                rules="numeric|length:11"
              >
                <b-form-input
                  id="ruc"
                  v-model="businessUnit.ruc"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Ruta API -->
          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="ruta Api"
              :rules="{ regex: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ }"
            >
              <b-form-group
                label-for="rutaApi"
                label="Ruta API"
              >
                <b-form-input
                  id="rutaApi"
                  v-model="businessUnit.rutaApi"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Token API -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="tokenApi"
              label="Token API"
            >
              <b-form-input
                id="tokenApi"
                v-model="businessUnit.tokenApi"
              />
            </b-form-group>
          </b-col>

          <!-- Usuario Sunat -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="usuarioSunat"
              label="Usuario (SUNAT)"
            >
              <b-form-input
                id="usuarioSunat"
                v-model="businessUnit.usuarioSunat"
              />
            </b-form-group>
          </b-col>

          <!-- Clave Sunat -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="claveSunat"
              label="Clave (SUNAT)"
            >
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  id="claveSunat"
                  v-model="businessUnit.claveSunat"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  placeholder="············"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <!-- Produccion Sunat -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="produccion"
              label="Producción *"
            >
              <b-form-checkbox
                v-model="businessUnit.checkProduccion"
                class="custom-control-success"
                name="check-button"
                switch
              />
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
            :show="businessUnit.loading"
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
  BRow, BCol, BForm, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalBusinessUnit',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BModal,
    BButton,
    BOverlay,
    ValidationObserver,
    ValidationProvider,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      required,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  setup(props, context) {
    const businessUnit = inject('businessUnit')
    const messageToast = inject('messageToast')
    const loadBusinessUnits = inject('loadBusinessUnits')

    const sendForm = async () => {
      businessUnit.value.loading = true
      businessUnit.value.accion = businessUnit.value._id ? 2 : 1
      businessUnit.value.idUsuario = store.state.auth.user._id
      businessUnit.value.produccion = +businessUnit.value.checkProduccion
      const { error, data } = await useFetch('/unidadnegocio', businessUnit.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        businessUnit.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            businessUnit.value._id = id
            messageToast('success', 'Unidad Negocio', mensaje)
            context.root.$bvModal.hide('modal-business-unit')
            loadBusinessUnits()
          }
        })
        businessUnit.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-business-unit')
    }

    return {
      businessUnit,
      sendForm,
      closeForm,
    }
  },
}
</script>
