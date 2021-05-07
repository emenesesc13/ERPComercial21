<template>
  <validation-observer
    ref="modal-user-clave"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
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

          <!-- Clave -->
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
                    v-model="user.clave"
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

          <!-- Confirm Clave -->
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
                    v-model="confirmClave"
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
            :show="user.loading"
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
  BRow, BCol, BForm, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalUserPassword',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
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
      passwordFieldType: 'password',
      passwordFieldTypeConfirm: 'password',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    confirmPasswordToggleIcon() {
      return this.passwordFieldTypeConfirm === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  created() {
    extend('required', {
      message: 'Es requerido',
    })
    extend('confirmClave', {
      validate: value => value === this.user.clave,
      message: 'No coinciden las claves',
    })
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordConfirmVisibility() {
      this.passwordFieldTypeConfirm = this.passwordFieldTypeConfirm === 'password' ? 'text' : 'password'
    },
  },
  setup(props, context) {
    const user = inject('user')
    const messageToast = inject('messageToast')
    const confirmClave = inject('confirmClave')

    const sendForm = async () => {
      user.value.loading = true
      user.value.accion = 5
      user.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/usuario', user.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        user.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            user.value._id = id
            messageToast('success', 'Usuario', mensaje)
            context.root.$bvModal.hide('modal-user-clave')
          }
        })
        user.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-user-clave')
    }

    return {
      user,
      confirmClave,
      sendForm,
      closeForm,
    }
  },
}
</script>
