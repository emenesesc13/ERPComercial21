<template>
  <validation-observer
    ref="modal-feature-detail"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-feature-detail"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary modal--padding"
        centered
        :title="featureDetail._id ? 'Modificar Detalle' : 'Registrar Detalle'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Feature -->

        <b-row>

          <!-- Feature -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="característica"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label-for="feature"
                label="Característica *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="feature"
                  v-model="featureDetail.idCaracteristica"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="features => features._id"
                  label="nombre"
                  :options="combos.features.data"
                  :loading="combos.features.loading"
                  :clearable="false"
                  :disabled="combos.features.disabled"
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
                  v-model="featureDetail.nombre"
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
            :show="featureDetail.loading"
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
  name: 'ModalFeatureDetail',
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
    const featureDetail = inject('featureDetail')
    const messageToast = inject('messageToast')
    const loadFeaturesDetail = inject('loadFeaturesDetail')
    const combos = inject('combos')

    const sendForm = async () => {
      featureDetail.value.loading = true
      featureDetail.value.accion = featureDetail.value._id ? 2 : 1
      featureDetail.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/dcaracteristica', featureDetail.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        featureDetail.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            featureDetail.value._id = id
            messageToast('success', 'Característica', mensaje)
            context.root.$bvModal.hide('modal-feature-detail')
            loadFeaturesDetail()
          }
        })
        featureDetail.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-feature-detail')
    }

    return {
      featureDetail,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
