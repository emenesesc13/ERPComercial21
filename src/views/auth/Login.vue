<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo d-flex align-items-center">
        <b-img
          :src="require('@/assets/images/logo/ico-simsac.png')"
          alt="Simsac Perú"
        />
        <h2 class="brand-text text-primary ml-1 my-0">
          Simsac Perú
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            Bienvenido al Sistema! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Inicie sesión con su cuenta
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- email -->
              <b-form-group
                label="Usuario"
                label-for="login-user"
              >
                <validation-provider
                  #default="{ errors }"
                  name="usuario"
                  rules="required"
                >
                  <b-form-input
                    id="login-user"
                    v-model="user"
                    :disabled="sendLoading"
                    :state="errors.length > 0 ? false:null"
                    name="login-user"
                    placeholder="Ejemplo"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group
                label="Contraseña"
                label-for="login-password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="contraseña"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :disabled="sendLoading"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
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

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Recuerdame
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="sendLoading"
                @click="validationForm"
              >
                <template v-if="sendLoading">
                  <b-spinner
                    class="mr-25"
                    small
                  />
                  Cargando...
                </template>
                <template v-else>
                  Ingresar
                </template>
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Nuevo en el sistema? </span>
            <b-link :to="{name:'login'}">
              <span>&nbsp;Crear una cuenta</span>
            </b-link>
          </b-card-text>

        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BSpinner,
} from 'bootstrap-vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useFetch from '@/hooks/useFetch'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      sendLoading: false,
      status: '',
      password: '',
      user: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      variant: 'white',
      opacity: '0.85',
      blur: '3px',
      variants: ['transparent', 'white', 'light', 'dark', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      blurs: [{ text: 'None', value: '' }, '1px', '2px', '5px', '0.5em', '1rem'],
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    async validationForm() {
      const success = await this.$refs.loginValidation.validate()
      if (success && !this.sendLoading) {
        this.sendLoading = true
        const payload = {
          usuario: this.user,
          clave: this.password,
        }
        const { error, data } = await useFetch('/login', payload, 'POST')
        if (error || !data.usuario) {
          this.sendLoading = false
          this.$bvToast.toast(error || data.mensaje, {
            title: 'Error al iniciar sesión',
            variant: 'danger',
            solid: true,
          })
        } else {
          this.$store.dispatch('auth/handleLogin', data)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Bienvenido',
              icon: 'CheckIcon',
              text: 'Ha iniciado sesión correctamente',
              variant: 'success',
            },
          })
          const lastPath = JSON.parse(localStorage.getItem('lastPath'))
          if (lastPath) this.$router.push(lastPath)
          else this.$router.push('/')
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
