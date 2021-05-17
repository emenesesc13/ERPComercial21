<template>
  <validation-observer
    ref="modal-module"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-module"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="moduleOne._id ? 'Modificar Modulo' : 'Registrar Modulo'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Module -->

        <b-row>

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
                  v-model="moduleOne.nombre"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Module -->

          <b-col
            cols="12"
          >
            <b-form-group
              label-for="moduleOne"
              label="Modulo"
            >
              <v-select
                id="moduleCmb"
                v-model="moduleOne.idPadre"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="moduleCmb => moduleCmb._id"
                label="nombre"
                :options="combos.moduleCmb.data"
                :loading="combos.moduleCmb.loading"
                :disabled="combos.moduleCmb.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </v-select>
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
            :show="moduleOne.loading"
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
  name: 'ModalModule',
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
    const moduleOne = inject('moduleOne')
    const messageToast = inject('messageToast')
    const loadModules = inject('loadModules')
    const combos = inject('combos')

    const sendForm = async () => {
      moduleOne.value.loading = true
      moduleOne.value.accion = moduleOne.value._id ? 2 : 1
      moduleOne.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/modulos', moduleOne.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        moduleOne.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            moduleOne.value._id = id
            messageToast('success', 'Modulos', mensaje)
            context.root.$bvModal.hide('modal-module')
            loadModules()
          }
        })
        moduleOne.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-module')
    }

    return {
      moduleOne,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
