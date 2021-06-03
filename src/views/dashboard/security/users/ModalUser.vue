<template>
  <validation-observer
    ref="modal-user"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-user"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary modal--padding"
        centered
        :title="user._id ? 'Modificar Usuario' : 'Registrar Usuario'"
        size="lg"
        no-close-on-esc
        no-close-on-backdrop
      >

        <b-row>

          <!-- Usuario -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label-for="user"
              label="Usuario *"
            >
              <validation-provider
                #default="{ errors }"
                name="usuario"
                rules="required"
              >
                <b-form-input
                  id="user"
                  v-model="user.usuario"
                  :state="errors.length > 0 ? false:null"
                  :readonly="!!user._id"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Colaborador -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="colaborador"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="collaborator"
                label="Colaborador *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="collaborator"
                  v-model="user.idColaborador"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="collaborator => collaborator._id"
                  label="nombre"
                  :options="combos.collaborators.data"
                  :loading="combos.collaborators.loading"
                  :clearable="false"
                  :disabled="combos.collaborators.loading"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Rol -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="rol"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="role"
                label="Rol *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="role"
                  v-model="user.idRol"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="role => role._id"
                  label="nombre"
                  :options="combos.roles.data"
                  :loading="combos.roles.loading"
                  :clearable="false"
                  :disabled="combos.roles.loading"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Correo -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Email *"
              label-for="emailUser"
            >
              <validation-provider
                #default="{ errors }"
                name="email"
                rules="required|email"
              >
                <b-form-input
                  id="emailUser"
                  v-model="user.correo"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Clave -->
          <b-col
            v-if="!user._id"
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Clave *"
              label-for="claveUser"
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
                    id="claveUser"
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

          <!-- Inicio -->
          <!-- <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="inicio"
              rules="required"
            >
              <b-form-group
                label="Inicio *"
                label-for="inicio"
                :state="errors.length > 0 ? false:null"
              >
                <flat-pickr
                  id="inicio"
                  v-model="user.inicio"
                  class="form-control"
                  :config="config"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col> -->

          <!-- Fin -->
          <!-- <b-col md="6">
            <b-form-group
              label="Fin *"
              label-for="fin"
            >
              <flat-pickr
                id="fin"
                v-model="user.fin"
                class="form-control"
                :config="config"
              />
            </b-form-group>
          </b-col> -->

          <!-- Inicio -->
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="inicio"
              rules="required"
            >
              <b-form-group
                label="Inicio *"
                label-for="inicio"
              >
                <b-form-datepicker
                  id="inicio"
                  v-model="user.inicio"
                  :state="errors.length > 0 ? false:null"
                  v-bind="labelsFormDate"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Fin -->
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="fin"
              rules="required"
            >
              <b-form-group
                label="Fin *"
                label-for="fin"
              >
                <b-form-datepicker
                  id="fin"
                  v-model="user.fin"
                  :state="errors.length > 0 ? false:null"
                  v-bind="labelsFormDate"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
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
  BRow, BCol, BForm, BFormGroup, BInputGroup, BFormDatepicker, BInputGroupAppend, BFormInput, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
// import flatPickr from 'vue-flatpickr-component'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { required, email } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalUser',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BInputGroup,
    BFormDatepicker,
    BInputGroupAppend,
    BFormInput,
    BModal,
    BButton,
    BOverlay,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    // flatPickr,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      required,
      email,
      labelsFormDate: {
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Año anterior',
        labelPrevMonth: 'El mes pasado',
        labelCurrentMonth: 'Mes actual',
        labelNextMonth: 'Próximo mes',
        labelNextYear: 'El próximo año',
        labelNextDecade: 'La próxima década',
        labelToday: 'Hoy',
        labelSelected: 'Fecha seleccionada',
        labelNoDateSelected: 'Sin fecha elegida',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  setup(props, context) {
    const user = inject('user')
    const messageToast = inject('messageToast')
    const loadUsers = inject('loadUsers')
    const combos = inject('combos')

    // const formatDateTime = dateTime => {
    //   const date = new Date(dateTime)
    //   const year = `0000${date.getFullYear()}`.slice(-4)
    //   const month = `00${date.getMonth() + 1}`.slice(-2)
    //   const day = `00${date.getDate()}`.slice(-2)
    //   const hour = `00${date.getHours()}`.slice(-2)
    //   const minute = `00${date.getMinutes()}`.slice(-2)
    //   const second = `00${date.getSeconds()}`.slice(-2)
    //   return `${year}-${month}-${day}T${hour}:${minute}:${second}`
    // }

    const sendForm = async () => {
      user.value.loading = true
      user.value.accion = user.value._id ? 2 : 1
      user.value.idUsuario = store.state.auth.user._id
      if (user.value.accion === 2) delete user.value.clave
      if (user.value.idColaborador && user.value.idRol) {
        // user.value.inicio = formatDateTime(user.value.inicio)
        // user.value.fin = formatDateTime(user.value.fin)
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
              context.root.$bvModal.hide('modal-user')
              loadUsers()
            }
          })
          user.value.loading = false
        }
      } else {
        messageToast('warning', 'Advertencia', 'Debe ingresar la fecha fin')
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-user')
    }

    return {
      user,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
