<template>
  <validation-observer
    ref="modal-menu-option"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-menu-option"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="menuOption._id ? 'Modificar Opción del Menú' : 'Registrar Opción del Menú'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Menu Option -->

        <b-row>

          <!-- Menu -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="menú"
              rules="required"
            >
              <b-form-group
                label-for="menu"
                label="Menú"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="menu"
                  v-model="menuOption.idMenu"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="menu => menu._id"
                  label="nombre"
                  :options="combos.menus.data"
                  :loading="combos.menus.loading"
                  :disabled="combos.menus.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Option -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="opción"
              rules="required"
            >
              <b-form-group
                label-for="option"
                label="Opción"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="option"
                  v-model="menuOption.idOpcion"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="option => option._id"
                  label="nombre"
                  :options="combos.options.data"
                  :loading="combos.options.loading"
                  :disabled="combos.options.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
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
            :show="menuOption.loading"
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
  BRow, BCol, BForm, BFormGroup, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalMenuOption',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
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
  created() {
    extend('required', {
      message: 'Es requerido',
    })
  },
  setup(props, context) {
    const menuOption = inject('menuOption')
    const messageToast = inject('messageToast')
    const loadMenuOptions = inject('loadMenuOptions')
    const combos = inject('combos')

    const sendForm = async () => {
      menuOption.value.loading = true
      menuOption.value.accion = menuOption.value._id ? 2 : 1
      menuOption.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/menuopciones', menuOption.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        menuOption.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            menuOption.value._id = id
            messageToast('success', 'Opción Menú', mensaje)
            context.root.$bvModal.hide('modal-menu-option')
            loadMenuOptions()
          }
        })
        menuOption.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-menu-option')
    }

    return {
      menuOption,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
