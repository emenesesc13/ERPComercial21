<template>
  <!-- Componente observador de Validación -->
  <validation-observer
    ref="modal-user-clave"
    v-slot="{ handleSubmit }"
  >
    <!-- Componente formulario -->
    <b-form @submit.prevent="handleSubmit(sendForm)">

      <!-- Componente modal -->
      <b-modal
        id="modal-user-clave"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        title="Modificar Clave"
        no-close-on-esc
        no-close-on-backdrop
      >

        <b-row>

          <!-- Campo Usuario Actual -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="userName"
              label="Usuario actual"
            >
              <b-form-input
                id="userName"
                :value="$store.state.auth.user.fullname"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Campo contraseña actual del usuario autenticado -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Clave del usuario actual para verificar"
              label-for="claveValidate"
            >
              <validation-provider
                #default="{ errors }"
                name="clave de usuario actual"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="claveValidate"
                    v-model="userForChangePassword.claveOfUserAuthenticated"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    :type="passwordOfCurrentUserFieldType"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordOfCurrentUserToggleIcon"
                      @click="togglePasswordOfCurrentUserVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Campo de la nueva clave -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Clave"
              label-for="clave"
            >
              <validation-provider
                #default="{ errors }"
                name="clave"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="clave"
                    v-model="userForChangePassword.clave"
                    :state="errors.length > 0 ? false:null"
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
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Campo para confirmar la nueva clave -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Confirmar clave"
              label-for="confirmClave"
            >
              <validation-provider
                #default="{ errors }"
                name="clave"
                rules="required|confirmClave"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="confirmClave"
                    v-model="userForChangePassword.confirmClave"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    :type="passwordFieldTypeConfirm"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="confirmPasswordToggleIcon"
                      @click="togglePasswordConfirmVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
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
            :show="userForChangePassword.loading"
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
// Importando componentes de BootstrapVue
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
// Importando componentes de validacion
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
// Importando reglas de validación
import { required } from '@validations'
// Importando funcion de Vue 3 para inyectar variables reactivas o funciones que nos provee un componente superior
import { inject } from '@vue/composition-api'
// Importando directiva para efectos del botón
import Ripple from 'vue-ripple-directive'
// Importando la tienda global
import store from '@/store'
// Importando funcion para hacer peticiones
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalChangePassword',
  components: {
    // Registrando componentes de Bootstrap Vue
    BModal,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BOverlay,
    // Registrando componentes de validación
    ValidationObserver,
    ValidationProvider,
  },
  directives: {
    // Registrando directivas
    Ripple,
  },
  data() {
    return {
      // Variables reactivas que se utilizaran en el template
      required,
      passwordOfCurrentUserFieldType: 'password',
      passwordFieldType: 'password',
      passwordFieldTypeConfirm: 'password',
    }
  },
  computed: {
    // Propiedades computadas independientes que retornaran el estado del ojo visible por cada caja de contraseña
    passwordOfCurrentUserToggleIcon() {
      return this.returnIconNameByInputType(this.passwordOfCurrentUserFieldType)
    },
    passwordToggleIcon() {
      return this.returnIconNameByInputType(this.passwordFieldType)
    },
    confirmPasswordToggleIcon() {
      return this.returnIconNameByInputType(this.passwordFieldTypeConfirm)
    },
  },
  created() {
    // Extender reglas de validación personalizando el mensaje en caso de no pasar la validación
    extend('required', {
      message: 'Es requerido',
    })
    extend('confirmClave', {
      validate: value => value === this.userForChangePassword.clave,
      message: 'No coinciden las claves',
    })
  },
  methods: {
    // Sirve para devolver el nombre del icono por tipo de entrada (password | text)
    returnIconNameByInputType(inputType) {
      return inputType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    togglePasswordOfCurrentUserVisibility() {
      this.passwordOfCurrentUserFieldType = this.passwordOfCurrentUserFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordConfirmVisibility() {
      this.passwordFieldTypeConfirm = this.passwordFieldTypeConfirm === 'password' ? 'text' : 'password'
    },
  },
  setup(props, context) {
    // Injectar variables reactivas o funciones que nos provee un componente de cualquier nivel superior
    const userForChangePassword = inject('userForChangePassword')
    const messageToast = inject('messageToast')

    // Crear funcion para cambiar contraseña
    const sendForm = async () => {
      userForChangePassword.value.loading = true
      // Verifica si el usuario logueado es el que va cambiar la contraseña
      const { error: errorValidateUser, data: dataValidateUser } = await useFetch('/verificausuario', {
        usuario: store.state.auth.user.usuario,
        clave: userForChangePassword.value.claveOfUserAuthenticated,
      }, 'POST')
      if (errorValidateUser) {
        // Si hay un error de servidor
        messageToast('danger', 'Error', 'Ocurrio un error')
      } else if (!dataValidateUser) {
        // Si falla la validación
        messageToast('warning', 'Advertencia', 'No eres el usuario autenticado')
      } else if (dataValidateUser) {
        // Si el usuario es el correcto
        userForChangePassword.value.accion = 5
        userForChangePassword.value.idUsuario = store.state.auth.user._id
        // Envia los datos a la API
        const { error, data } = await useFetch('/usuario', userForChangePassword.value, 'POST')
        if (error) {
          messageToast('danger', 'Error', 'Ocurrio un error')
          userForChangePassword.value.loading = false
        } else {
          data.forEach(({ id, mensaje }) => {
            if (id === 0) {
              messageToast('warning', 'Advertencia', mensaje)
            } else {
              userForChangePassword.value._id = id
              messageToast('success', 'Usuario', mensaje)
              context.root.$bvModal.hide('modal-user-clave')
            }
          })
        }
      }
      userForChangePassword.value.loading = false
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-user-clave')
    }

    // Retornar variables o funciones que se utilizaran en el template
    return {
      userForChangePassword,
      sendForm,
      closeForm,
    }
  },
}
</script>

<style lang="scss">
  // Importando estilos de vue-select
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
