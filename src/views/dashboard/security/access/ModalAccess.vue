<template>
  <validation-observer
    ref="modal-access"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-access"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="access._id ? 'Modificar Acceso' : 'Registrar Acceso'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <b-row>

          <!-- Rol -->
          <b-col
            cols="12"
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
                  v-model="access.idRol"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="role => role._id"
                  label="nombre"
                  :options="combos.roles.data"
                  :loading="combos.roles.loading"
                  :clearable="false"
                  :disabled="combos.roles.disabled"
                  @option:selected="loadOptionsAccessAvailable"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Modulo -->
          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="módulo"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="module"
                label="Módulo *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="module"
                  v-model="access.idModulo"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="module => module._id"
                  label="nombre"
                  :options="combos.modules.data"
                  :loading="combos.modules.loading"
                  :clearable="false"
                  :disabled="combos.modules.disabled"
                  @option:selected="selectedModule"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Menú -->
          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="menú"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="menu"
                label="Menú *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="menu"
                  v-model="access.idMenu"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="menu => menu._id"
                  label="nombre"
                  :options="combos.menus.data"
                  :loading="combos.menus.loading"
                  :clearable="false"
                  :disabled="combos.menus.disabled"
                  @option:selected="loadOptionsAccessAvailable"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            cols="12"
          >
            <b-form-group
              label-for="optionsAvailable"
              label="Opciones restantes disponibles"
            >
              <div class="border rounded p-2">
                <template>
                  <b-form-checkbox-group
                    v-model="optionsAccessSelected"
                  >
                    <b-form-checkbox
                      v-for="(option) in optionsAccess.data"
                      :key="option._id"
                      :value="option._id"
                      class="d-block mt-2"
                    >
                      {{ option.nombre }}
                    </b-form-checkbox>
                  </b-form-checkbox-group>
                </template>
              </div>
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
            :show="access.loading"
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
  BRow, BCol, BFormCheckboxGroup, BFormCheckbox, BForm, BFormGroup, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalAccess',
  components: {
    BRow,
    BCol,
    BFormCheckboxGroup,
    BFormCheckbox,
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
  setup(props, context) {
    const access = inject('access')
    const optionsAccess = inject('optionsAccess')
    const optionsAccessSelected = inject('optionsAccessSelected')
    const optionAccess = inject('optionAccess')
    const messageToast = inject('messageToast')
    const loadAccess = inject('loadAccess')
    const loadOptionsAccessAvailable = inject('loadOptionsAccessAvailable')
    const combos = inject('combos')
    const resetCombos = inject('resetCombos')
    const loadComboBoxes = inject('loadComboBoxes')

    const selectedModule = ({ _id }) => {
      access.value.idMenu = 0
      resetCombos(['menus'])
      loadComboBoxes(combos.value, ['menus'], `/combo/programas/${_id}`, 'Ocurrio un Error al momento de cargar los Menus')
    }

    const existsAccess = async ({ idRol, idModulo, idMenu }) => {
      let idAccess = 0
      if (idRol && idModulo && idMenu) {
        const { data, error } = await useFetch(`/accesos/seguridad/${idRol}/${idModulo}/${idMenu}`)
        if (error) {
          messageToast('danger', 'Error', 'Ocurrio un error')
        } else if (data) {
          idAccess = data
        }
      }
      return idAccess
    }

    const registerOptionsAccess = async idAccesss => {
      optionAccess.value.loading = true
      optionAccess.value.idAcceso = idAccesss
      optionAccess.value.idUsuario = store.state.auth.user._id
      optionAccess.value.accion = 1

      return new Promise(resolve => {
        optionsAccessSelected.value.forEach(async (optionSelected, index) => {
          optionAccess.value.idOpcion = optionSelected
          const { error, data } = await useFetch('/accesoopcion', optionAccess.value, 'POST')
          if (error) {
            messageToast('danger', 'Error', 'Ocurrio un error')
            optionAccess.value.loading = false
          } else if (data) {
            data.forEach(({ id, mensaje }) => {
              if (id === 0) {
                messageToast('warning', 'Advertencia', mensaje)
              }
            })
            optionAccess.value.loading = false
          }
          if (optionsAccessSelected.value.length - 1 === index) {
            resolve(true)
          }
        })
      })
    }

    const sendForm = async () => {
      access.value.loading = true
      access.value.accion = 1
      access.value.idUsuario = store.state.auth.user._id
      const idAccess = await existsAccess(access.value)
      if (!idAccess) {
        const { error, data } = await useFetch('/accesos', access.value, 'POST')
        if (error) {
          messageToast('danger', 'Error', 'Ocurrio un error')
          access.value.loading = false
        } else if (data) {
          await data.forEach(async ({ id, mensaje }) => {
            if (id === 0) {
              messageToast('warning', 'Advertencia', mensaje)
            } else {
              access.value._id = id
              await registerOptionsAccess(id)
              await loadAccess()
              messageToast('success', 'Acceso', mensaje)
              context.root.$bvModal.hide('modal-access')
            }
          })
          access.value.loading = false
        }
      } else {
        await registerOptionsAccess(idAccess)
        await loadAccess()
        messageToast('success', 'Acceso', 'Se guardaron los cambios')
        context.root.$bvModal.hide('modal-access')
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-access')
    }

    return {
      access,
      combos,
      selectedModule,
      loadOptionsAccessAvailable,
      optionsAccess,
      optionsAccessSelected,
      sendForm,
      closeForm,
    }
  },
}
</script>

<style lang="scss">
  .custom-control.custom-checkbox:first-child {
    margin-top: 0 !important;
  }
</style>
