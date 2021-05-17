<template>
  <validation-observer
    ref="modal-storage"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-storage"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="storage._id ? 'Modificar Almacén' : 'Registrar Almacén'"
        size="lg"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers Storage -->

        <b-row>

          <!-- Storage Name -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label-for="Nombe"
              label="Nombre *"
            >
              <validation-provider
                #default="{ errors }"
                name="nombre"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="storage.nombre"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- PREDIOS -->
          <b-col
            cols="12"
            md="12"
          >
            <validation-provider
              #default="{ errors }"
              name="predio"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="estates"
                label="Predio *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="estates"
                  v-model="storage.idPredio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="estates => estates._id"
                  label="nombre"
                  :options="combos.estates.data"
                  :loading="combos.estates.loading"
                  :clearable="false"
                  :disabled="combos.estates.loading"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Storage Type -->
          <b-col
            cols="12"
            md="12"
          >
            <validation-provider
              #default="{ errors }"
              name="tipo almacén"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label-for="storageType"
                label="Tipo Almacen *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="storageType"
                  v-model="storage.idTipoAlmacen"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="storageType => storageType._id"
                  label="nombre"
                  :options="combos.storageTypes.data"
                  :loading="combos.storageTypes.loading"
                  :disabled="combos.storageTypes.loading"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- OBSERVACIONES -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label-for="observation"
              label="Observación"
            >
              <b-form-textarea
                id="observation"
                v-model="storage.observacion"
                placeholder=""
                rows="3"
                no-resize
              />
            </b-form-group>
          </b-col>

        </b-row>

        <!-- SUB ALMACEN -->
        <b-row>
          <b-col
            cols="12"
            class="mt-3"
          >
            <h4 class="text-center text-primary">
              Sub Almacén
            </h4>
            <hr class="mb-3 dividing-line">
          </b-col>

          <!-- NOMBRE SUB ALMACEN -->
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="nameSubStorage"
              label="Nombre"
            >
              <b-form-input
                id="nameSubStorage"
                v-model="subStorage.nombre"
              />
            </b-form-group>
          </b-col>

          <!-- UBICACIÓN SUB ALMACEN -->
          <b-col
            cols="12"
            md="10"
          >
            <b-form-group
              label-for="location"
              label="Ubicación"
            >
              <b-form-input
                id="location"
                v-model="subStorage.ubicacion"
              />
            </b-form-group>
          </b-col>

          <!-- Button Add Feature -->
          <b-col
            cols="12"
            md="2"
            class="d-flex align-items-center justify-content-end"
          >
            <b-button
              v-if="!subStorage._id"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="btn-icon mt-50"
              @click="handleSubmit(addSubStorage)"
            >
              <feather-icon
                icon="PlusCircleIcon"
              />
            </b-button>
            <b-button
              v-else
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="success"
              class="btn-icon mt-50"
              @click="handleSubmit(updateSubStorage)"
            >
              <feather-icon
                icon="RefreshCcwIcon"
              />
            </b-button>
            <b-button
              v-if="subStorage._id"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="btn-icon mt-50 ml-50"
              @click="resetSubStorage"
            >
              <feather-icon
                icon="DeleteIcon"
              />
            </b-button>
          </b-col>

          <!-- Vue Good Table -->
          <b-col
            cols="12"
            class="mt-2 mt-md-1 mt-lg-0"
          >
            <vue-good-table
              :columns="columns"
              :rows="subStorages.data"
              max-height="300px"
              style-class="vgt-table condensed table-feature"
              :rtl="direction"
            >
              <div
                slot="emptystate"
                class="text-center p-1"
              >
                <small>No hay sub Almacenes</small>
              </div>
              <template
                slot="table-row"
                slot-scope="props"
              >
                <!-- Column: Action -->
                <span v-if="props.column.field === 'action'">
                  <span>
                    <b-dropdown
                      variant="link"
                      toggle-class="text-decoration-none"
                      no-caret
                    >
                      <template v-slot:button-content>
                        <feather-icon
                          icon="MoreVerticalIcon"
                          size="16"
                          class="text-body align-middle mr-25"
                        />
                      </template>
                      <b-dropdown-item @click="changeSubStatusAD(props.row)">
                        <feather-icon
                          :icon="props.row.activo ? 'SlashIcon' : 'CheckCircleIcon'"
                          class="mr-50"
                        />
                        <span>{{ props.row.activo ? 'Desactivar' : 'Activar' }}</span>
                      </b-dropdown-item>
                      <b-dropdown-item @click="showRowForEdit(props.row)">
                        <feather-icon
                          icon="Edit2Icon"
                          class="mr-50"
                        />
                        <span>Editar</span>
                      </b-dropdown-item>
                      <b-dropdown-item @click="deleteRow(props.row)">
                        <feather-icon
                          icon="TrashIcon"
                          class="mr-50"
                        />
                        <span>Eliminar</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </span>
                </span>
                <!-- Column: Status -->
                <span v-else-if="props.column.field === 'activo'">
                  <b-badge :variant="props.row.activo ? 'light-success' : 'light-danger'">
                    {{ props.row.activo ? 'Activo' : 'Desactivo' }}
                  </b-badge>
                </span>
              </template>
            </vue-good-table>
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
            :show="storage.loading"
            variant="transparent"
            :opacity="0.85"
            blur="2px"
            rounded="sm"
          >
            <b-button
              v-if="storage._id || storage.flgServicio"
              type="submit"
              variant="primary"
              @click="handleSubmit(updateStorage)"
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
  BRow,
  BCol, BForm, BFormGroup, BFormInput, BModal, BButton, BOverlay, BFormTextarea, BDropdown, BDropdownItem, BBadge,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalStorage',
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
    BFormTextarea,
    VueGoodTable,
    BDropdown,
    BDropdownItem,
    BBadge,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
      columns: [
        {
          label: 'Acción',
          field: 'action',
          width: '120px',
        },
        {
          label: 'Nombre',
          field: 'nombre',
        },
        {
          label: 'Ubicación',
          field: 'ubicacion',
        },
        {
          label: 'Estado',
          field: 'activo',
        },
      ],
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  setup(props, context) {
    const storage = inject('storage')
    const resetStorage = inject('resetStorage')
    const combos = inject('combos')
    const loadComboBoxes = inject('loadComboBoxes')
    const subStorage = inject('subStorage')
    const messageToast = inject('messageToast')
    const loadStorages = inject('loadStorages')
    const subStorages = inject('subStorages')
    const confirmSwal = inject('confirmSwal')
    const loadSubStoragesByStorageID = inject('loadSubStoragesByStorageID')
    const resetSubStorage = inject('resetSubStorage')
    const selectedEstate = async ({ _id }) => {
      loadComboBoxes(combos.value, ['inventoryUnit', 'unitSale'], `/combo/predios/${_id}`, 'Error al momento de cargar los predios')
      storage.value.idPredio = 0
    }
    const sendStorage = async () => {
      let result = false
      storage.value.loading = true
      storage.value.accion = storage.value._id ? 2 : 1
      storage.value.idUsuario = store.state.auth.user._id
      const { data, error } = await useFetch('/almacen', storage.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        result = false
        storage.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
            result = false
          } else {
            storage.value._id = id
            messageToast('success', 'Almacen', mensaje)
            result = true
          }
        })
        storage.value.loading = false
      }
      return result
    }

    const updateStorage = async () => {
      const responseStorage = await sendStorage()
      if (responseStorage) {
        context.root.$bvModal.hide('modal-storage')
        loadStorages()
      }
    }

    const deleteRow = async ({ _id }) => {
      const { value } = await confirmSwal('Desea eliminar este Sub Almacén?', '¡No podrás revertir esto!', '¡Sí, eliminalo!')
      if (value) {
        subStorage.value._id = _id
        subStorage.value.accion = 3
        subStorage.value.idUsuario = store.state.auth.user._id
        const { error, data } = await useFetch('/dalmacen', subStorage.value, 'POST')
        if (error) {
          messageToast('danger', 'Error', 'Ocurrió un error')
        } else {
          data.forEach(({ id, mensaje }) => {
            if (id === 0) {
              messageToast('warning', 'Advertencia', mensaje)
            } else {
              messageToast('success', 'sub Almacén', mensaje)
              loadSubStoragesByStorageID(storage.value._id)
            }
          })
        }
      }
    }

    const showRowForEdit = row => {
      subStorage.value.idAlmacen = storage.value._id
      subStorage.value._id = row._id
      subStorage.value.nombre = row.nombre
      subStorage.value.ubicacion = row.ubicacion
    }

    const updateSubStorage = async () => {
      subStorage.value.accion = 2
      subStorage.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/dalmacen', subStorage.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrió un error')
      } else if (data) {
        data.forEach(element => {
          if (element.id === 0) {
            messageToast('warning', 'Advertencia', element.mensaje)
          } else {
            messageToast('success', 'Exitoso', element.mensaje)
            loadSubStoragesByStorageID(storage.value._id)
            resetSubStorage()
          }
        })
      }
    }

    const addSubStorage = async () => {
      if (!storage.value._id) {
        await sendStorage()
      }
      if (storage.value._id) {
        if (!subStorage.value.nombre || !subStorage.value.ubicacion) {
          messageToast('warning', 'Sub Almacén', 'Debe registrar el nombre y ubicación')
        } else {
          subStorage.value.idAlmacen = storage.value._id
          subStorage.value.loading = true
          subStorage.value.accion = 1
          subStorage.value.idUsuario = store.state.auth.user._id
          const { error, data } = await useFetch('/dalmacen', subStorage.value, 'POST')
          if (error) {
            messageToast('danger', 'Error', 'Ocurrio un error')
          } else {
            data.forEach(({ id, mensaje }) => {
              if (id === 0) {
                messageToast('warning', 'Advertencia', mensaje)
              } else {
                messageToast('success', 'Sub Almacen', mensaje)
                loadSubStoragesByStorageID(storage.value._id)
                resetSubStorage()
              }
            })
          }
        }
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-storage')
      resetSubStorage()
    }

    const changeSubStatus = async () => {
      subStorage.value.accion = 4
      subStorage.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/dalmacen', subStorage.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrió un error')
      } else if (data) {
        data.forEach(element => {
          if (element.id === 0) {
            messageToast('warning', 'Advertencia', element.mensaje)
          } else {
            messageToast('success', 'Exitoso', element.mensaje)
            loadSubStoragesByStorageID(storage.value._id)
            resetSubStorage()
          }
        })
      }
    }

    const changeSubStatusAD = row => {
      subStorage.value.idAlmacen = storage.value._id
      subStorage.value._id = row._id
      changeSubStatus()
    }

    return {
      storage,
      resetStorage,
      combos,
      selectedEstate,
      updateStorage,
      closeForm,
      addSubStorage,
      subStorage,
      subStorages,
      deleteRow,
      changeSubStatus,
      showRowForEdit,
      updateSubStorage,
      resetSubStorage,
      changeSubStatusAD,
    }
  },
}
</script>

<style lang="scss">
  .dividing-line {
    border: none;
    height: 1.5px;
    background-color: #BBB;
  }
  .form-group-checkbox {
    margin-top: .5rem;
  }
  #modal-storage {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    .modal-dialog {
      @media screen and (min-width: 576px) {
        max-width: 700px;
        width: 90%;
      }
    }
    .modal-lg {
      @media screen and (min-width: 992px) {
        max-width: 1000px;
        width: 90%;
      }
    }
  }
  [dir] .vgt-table.condensed.table-feature td, [dir] .vgt-table.condensed.table-feature th.vgt-row-header {
    padding: .35em .75em !important;
  }
</style>
