<template>
  <validation-observer
    ref="modal-role"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-role"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary modal--padding"
        centered
        :title="role._id ? 'Modificar Rol' : 'Registrar Rol'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Role -->

        <b-row>

          <!-- Role -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Predio"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="predio"
                label="Predio *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="predio"
                  v-model="role.idPredio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="predio => predio._id"
                  label="nombre"
                  :options="combos.predio.data"
                  :loading="combos.predio.loading"
                  :clearable="false"
                  :disabled="combos.predio.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Storage -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Almacen"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="storage"
                label="Almacen *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="storage"
                  v-model="role.idAlmacen"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="storage => storage._id"
                  label="nombre"
                  :options="combos.storage.data"
                  :loading="combos.storage.loading"
                  :clearable="false"
                  :disabled="combos.storage.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

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
                  v-model="role.nombre"
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
            :show="role.loading"
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
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalRole',
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
    const role = inject('role')
    const messageToast = inject('messageToast')
    const loadRoles = inject('loadRoles')
    const combos = inject('combos')

    const sendForm = async () => {
      role.value.loading = true
      role.value.accion = role.value._id ? 2 : 1
      role.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/roles', role.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrió un error')
        role.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            role.value._id = id
            messageToast('success', 'Roles', mensaje)
            context.root.$bvModal.hide('modal-role')
            loadRoles()
          }
        })
        role.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-role')
    }

    return {
      role,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
