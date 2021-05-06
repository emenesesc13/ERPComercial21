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
        modal-class="modal-primary"
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
            md="6"
          >
            <b-form-group
              label-for="user"
              label="Usuario"
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
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Colaborador -->
          <b-col
            cols="12"
            md="6"
          >
            <validation-provider
              #default="{ errors }"
              name="colaborador"
              rules="required"
            >
              <b-form-group
                label-for="collaborator"
                label="Colaborador"
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
            md="6"
          >
            <validation-provider
              #default="{ errors }"
              name="rol"
              rules="required"
            >
              <b-form-group
                label-for="role"
                label="Rol"
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
              label="Email"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="email"
                rules="required"
              >
                <b-form-input
                  id="email"
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
              label="Clave"
              label-for="clave"
            >
              <validation-provider
                #default="{ errors }"
                name="clave"
                rules="required"
              >
                <b-form-input
                  id="clave"
                  v-model="user.clave"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Inicio"
              label-for="inicio"
            >
              <flat-pickr
                id="inicio"
                v-model="user.inicio"
                class="form-control"
                :config="{ enableTime: true, enableSeconds: true, dateFormat: 'Y-m-d H:i:s', minuteIncrement: 1}"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Fin"
              label-for="fin"
            >
              <flat-pickr
                id="fin"
                :parseDate="value => new Date(value).toISOString()"
                v-model="user.fin"
                class="form-control"
                :config="{ enableTime: true, enableSeconds: true, dateFormat: 'Y-m-d H:i:s', minuteIncrement: 1}"
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
  BRow, BCol, BForm, BFormGroup, BFormInput, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
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
    BFormInput,
    BModal,
    BButton,
    BOverlay,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    flatPickr,
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
    const user = inject('user')
    const messageToast = inject('messageToast')
    const loadUsers = inject('loadUsers')
    const combos = inject('combos')

    const sendForm = async () => {
      user.value.loading = true
      user.value.accion = user.value._id ? 2 : 1
      user.value.idUsuario = store.state.auth.user._id
      if (user.value.idColaborador && user.value.idRol) {
        user.value.inicio = new Date(user.value.inicio).toISOString()
        user.value.fin = new Date(user.value.fin).toISOString()
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
              messageToast('success', 'Característica', mensaje)
              context.root.$bvModal.hide('modal-user')
              loadUsers()
            }
          })
          user.value.loading = false
        }
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

<style>

</style>
