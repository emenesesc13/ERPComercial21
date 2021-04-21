<template>
  <validation-observer
    ref="modal-unit-group"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-unit-group"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="unitGroup._id ? 'Modificar Grupo Unidad' : 'Registrar Grupo Unidad'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Product Type -->

        <b-row>

          <!-- Name -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="name"
              label="Nombre"
            >
              <validation-provider
                #default="{ errors }"
                name="nombre"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="unitGroup.nombre"
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
            :show="unitGroup.loading"
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
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalUnitGroup',
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
    const unitGroup = inject('unitGroup')
    const messageToast = inject('messageToast')
    const loadUnitsGroup = inject('loadUnitsGroup')

    const sendForm = async () => {
      unitGroup.value.loading = true
      unitGroup.value.accion = unitGroup.value._id ? 2 : 1
      unitGroup.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/grupounidad', unitGroup.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        unitGroup.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            unitGroup.value._id = id
            messageToast('success', 'Grupo Unidad', mensaje)
            context.root.$bvModal.hide('modal-unit-group')
            loadUnitsGroup()
          }
        })
        unitGroup.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-unit-group')
    }

    return {
      unitGroup,
      sendForm,
      closeForm,
    }
  },
}
</script>

<style>

</style>
