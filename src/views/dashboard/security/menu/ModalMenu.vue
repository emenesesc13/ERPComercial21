<template>
  <validation-observer
    ref="modal-menu"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-menu"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary modal--padding"
        centered
        :title="menu._id ? 'Modificar Menú' : 'Registrar Menú'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Unit Measure -->

        <b-row>

          <!-- Modules -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="modulo"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="module"
                label="Modulo *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="module"
                  v-model="menu.idModulo"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="module => module._id"
                  label="nombre"
                  :options="combos.modules.data"
                  :loading="combos.modules.loading"
                  :clearable="false"
                  :disabled="combos.modules.disabled"
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
                  v-model="menu.nombre"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Order -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="order"
              label="Orden *"
            >
              <validation-provider
                #default="{ errors }"
                name="orden"
                rules="required|min_value:0"
              >
                <b-form-input
                  id="order"
                  v-model.number="menu.orden"
                  type="number"
                  min="0"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Icon -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="icon"
              label="Icono *"
            >
              <validation-provider
                #default="{ errors }"
                name="icono"
                rules="required"
              >
                <b-form-input
                  id="icon"
                  v-model="menu.icono"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Form -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="form"
              label="Formulario"
            >
              <b-form-input
                id="form"
                v-model="menu.formulario"
              />
            </b-form-group>
          </b-col>

          <!-- Route -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="route"
              label="Ruta *"
            >
              <validation-provider
                #default="{ errors }"
                name="ruta"
                rules="required"
              >
                <b-form-input
                  id="route"
                  v-model="menu.ruta"
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
            :show="menu.loading"
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
  name: 'ModalMenu',
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
    const menu = inject('menu')
    const messageToast = inject('messageToast')
    const loadMenus = inject('loadMenus')
    const combos = inject('combos')

    const sendForm = async () => {
      menu.value.loading = true
      menu.value.accion = menu.value._id ? 2 : 1
      menu.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/menu', menu.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        menu.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            menu.value._id = id
            messageToast('success', 'Menu', mensaje)
            context.root.$bvModal.hide('modal-menu')
            loadMenus()
          }
        })
        menu.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-menu')
    }

    return {
      menu,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
