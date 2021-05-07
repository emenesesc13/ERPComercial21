<template>
  <validation-observer
    ref="modal-partner"
    v-slot="{ handleSubmit, invalid }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-partner"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="partner._id ? 'Modificar Socio' : 'Registrar Socio'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <b-tabs v-model="tabIndex">

          <!-- Headers Partner -->

          <b-tab>

            <template #title>
              <feather-icon icon="UserIcon" />
              <span class="d-none d-sm-inline">Datos</span>
            </template>

            <b-row>

              <!-- Document Type -->

              <b-col
                cols="12"
                md="6"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Tipo documento"
                  rules="required"
                >
                  <b-form-group
                    label-for="documentType"
                    label="Tipo Documento"
                    :state="errors.length > 0 ? false:null"
                  >
                    <v-select
                      id="documentType"
                      v-model="partner.idDocumento"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :reduce="documentType => documentType._id"
                      label="nombre"
                      :options="combos.documentType.data"
                      :loading="combos.documentType.loading"
                      :disabled="combos.documentType.disabled"
                      :clearable="false"
                      @option:selected="selectedDocumentType"
                    >
                      <template v-slot:no-options>
                        No se encontraron resultados.
                      </template>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>

              <!-- Document Number -->
              <b-col
                cols="12"
                md="6"
              >
                <b-form-group
                  label-for="documentNumber"
                  label="N° Documento"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="N° Documento"
                    rules="required"
                  >
                    <b-input-group>
                      <b-form-input
                        id="documentNumber"
                        v-model="partner.numeroDocumento"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                        :disabled="loadingGetDni"
                        min="0"
                        @keypress.enter="getDataByNumberDocument"
                      />
                      <b-input-group-append>
                        <b-button
                          variant="primary"
                          :disabled="!dniSelected || loadingGetDni"
                          @click="getDataByNumberDocument"
                        >
                          <b-spinner
                            v-if="loadingGetDni"
                            small
                          />
                          <feather-icon
                            v-else
                            icon="SearchIcon"
                          />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

              </b-col>

              <!-- Apellido Paterno -->
              <b-col
                cols="12"
                md="6"
              >
                <b-form-group
                  label-for="apellidoPaterno"
                  label="Apellido Paterno"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Apellido Paterno"
                    rules="required"
                  >
                    <b-form-input
                      id="apellidoPaterno"
                      v-model="partner.apellidoPaterno"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Apellido Materno -->
              <b-col
                cols="12"
                md="6"
              >
                <b-form-group
                  label-for="apellidoMaterno"
                  label="Apellido Materno"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Apellido Materno"
                    rules="required"
                  >
                    <b-form-input
                      id="apellidoMaterno"
                      v-model="partner.apellidoMaterno"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Fullname -->
              <b-col
                cols="12"
              >
                <b-form-group
                  label-for="fullName"
                  label="Nombre"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nombre"
                    rules="required"
                  >
                    <b-form-input
                      id="fullName"
                      v-model="partner.nombres"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Email -->
              <b-col
                cols="12"
                md="8"
              >
                <b-form-group
                  label-for="email"
                  label="Email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="email"
                      v-model="partner.correo"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Phone -->
              <b-col
                cols="12"
                md="4"
              >
                <b-form-group
                  label-for="phone"
                  label="Teléfono"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Teléfono"
                    rules="required"
                  >
                    <b-form-input
                      id="phone"
                      v-model="partner.telefono"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                      min="0"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

            </b-row>

          </b-tab>

          <!-- Datos Fiscales -->

          <b-tab>

            <template #title>
              <feather-icon icon="FileTextIcon" />
              <span class="d-none d-sm-inline">Fiscales</span>
            </template>

            <b-row>

              <!-- Ruc -->
              <b-col
                cols="12"
                md="5"
              >
                <b-form-group
                  label-for="ruc"
                  label="Ruc"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Ruc"
                    rules="required"
                  >
                    <b-input-group>
                      <b-form-input
                        id="ruc"
                        v-model="partner.numeroRuc"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                        :disabled="loadingGetRuc"
                        min="0"
                        @keypress.enter="getDataByRuc"
                      />
                      <b-input-group-append>
                        <b-button
                          variant="primary"
                          :disabled="loadingGetRuc"
                          @click="getDataByRuc"
                        >
                          <b-spinner
                            v-if="loadingGetRuc"
                            small
                          />
                          <feather-icon
                            v-else
                            icon="SearchIcon"
                          />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col
                cols="12"
                md="7"
              >
                <b-form-group
                  label-for="typePartner"
                  label="Tipo de Socio"
                  style="min-height: 58px"
                >
                  <div
                    class="d-flex flex-wrap align-items-center mt-1"
                    style="gap: 1em;"
                  >
                    <b-form-checkbox
                      v-model="partner.cliente"
                      class="mr-1"
                    >
                      Cliente
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-model="partner.proveedor"
                      class="mr-1"
                    >
                      Proveedor
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-model="partner.transportista"
                    >
                      Transportista
                    </b-form-checkbox>
                  </div>
                </b-form-group>
              </b-col>

              <!-- Razón Social -->

              <b-col
                cols="12"
              >
                <b-form-group
                  label-for="razonSocial"
                  label="Razón Social"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Razón Social"
                    rules="required"
                  >
                    <b-form-input
                      id="razonSocial"
                      v-model="partner.razonSocial"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

            </b-row>

          </b-tab>

          <!-- Ubicación -->

          <b-tab>

            <template #title>
              <feather-icon icon="MapPinIcon" />
              <span class="d-none d-sm-inline">Ubicación</span>
            </template>

            <b-row>

              <!-- Dirección -->

              <b-col
                cols="12"
              >
                <b-form-group
                  label-for="direccion"
                  label="Dirección"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Dirección"
                    rules="required"
                  >
                    <b-form-input
                      id="direccion"
                      v-model="partner.direccion"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Ubigeo -->

              <ubigeo-component
                cols="12"
                colsm="12"
                colmd="6"
                collg="6"
                @selected-district="selectedDistrict"
              />

            </b-row>

          </b-tab>

          <!-- Contacto -->

          <b-tab>

            <template #title>
              <feather-icon icon="PhoneIcon" />
              <span class="d-none d-sm-inline">Contacto</span>
            </template>

            <b-row>
              <!-- Nombre Contacto -->

              <b-col
                cols="12"
                md="8"
              >
                <b-form-group
                  label-for="nombreContacto"
                  label="Nombre Contacto"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nombre Contacto"
                    rules="required"
                  >
                    <b-form-input
                      id="nombreContacto"
                      v-model="partner.nombreContacto"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Telefono / Movil -->

              <b-col
                cols="12"
                md="4"
              >
                <b-form-group
                  label-for="telefonoMovil"
                  label="Teléfono/Movil"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Teléfono/Movil"
                    rules="required"
                  >
                    <b-form-input
                      id="telefonoMovil"
                      v-model="partner.telefonoContacto"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                      min="0"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Observación -->

              <b-col
                cols="12"
              >
                <b-form-group
                  label-for="observacion"
                  label="Observación"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Observación"
                    rules="required"
                  >
                    <b-form-input
                      id="observacion"
                      v-model="partner.observaciones"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>

          </b-tab>

        </b-tabs>

        <template #modal-footer>
          <b-button
            v-if="tabIndex"
            type="button"
            variant="outline-primary"
            @click="tabIndex--"
          >
            Atrás
          </b-button>
          <b-overlay
            :show="partner.loading"
            variant="transparent"
            :opacity="0.85"
            blur="2px"
            rounded="sm"
          >
            <b-button
              v-if="tabIndex !== 3"
              type="submit"
              variant="primary"
              @click="tabIndex++"
            >
              Siguiente
            </b-button>
            <b-button
              v-else
              type="submit"
              variant="primary"
              :disabled="invalid"
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
  BRow, BForm, BButton, BModal, BOverlay, BCol, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BFormCheckbox, BTabs, BTab, BSpinner,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from '@validations'
import vSelect from 'vue-select'
import { ref, inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'
import useApiPeru from '@/hooks/useApiPeru'
import UbigeoComponent from '@/components/UbigeoComponent.vue'

export default {
  name: 'ModalPartner',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BButton,
    BOverlay,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    BTabs,
    BTab,
    BSpinner,
    ValidationObserver,
    ValidationProvider,
    UbigeoComponent,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
      email,
    }
  },
  created() {
    extend('required', {
      message: 'Es requerido',
    })
    extend('email', {
      message: 'El correo electrónico no es válido',
    })
  },
  setup(props, context) {
    const dniSelected = inject('dniSelected')
    const loadingGetDni = ref(false)
    const loadingGetRuc = ref(false)
    const partner = inject('partner')
    const combos = inject('combos')
    const ubigeoSelected = inject('ubigeoSelected')
    const loadPartners = inject('loadPartners')
    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')
    const resetCombo = inject('resetCombo')
    const tabIndex = inject('tabIndex')

    const selectedDocumentType = ({ nombre }) => {
      if (nombre.toLowerCase().trim() === 'dni') dniSelected.value = true
      else dniSelected.value = false
    }

    const getDataByNumberDocument = async () => {
      if (dniSelected.value) {
        if (partner.value.numeroDocumento.trim().length !== 8) {
          messageToast('warning', 'Advertencia', 'El N° de Documento Debe contener 8 dígitos')
        } else {
          loadingGetDni.value = true
          const { error, data } = await useApiPeru(partner.value.numeroDocumento)
          if (error) {
            messageToast('warning', 'Advertencia', error)
            loadingGetDni.value = false
          } else if (data) {
            partner.value.apellidoPaterno = ''
            partner.value.apellidoMaterno = ''
            partner.value.nombres = ''
            partner.value.apellidoPaterno = data.apellido_paterno
            partner.value.apellidoMaterno = data.apellido_materno
            partner.value.nombres = data.nombres
            loadingGetDni.value = false
          }
        }
      }
    }

    const getDataByRuc = async () => {
      if (partner.value.numeroRuc.trim().length !== 11) {
        messageToast('warning', 'Advertencia', 'El N° RUC Debe contener 11 dígitos')
      } else {
        loadingGetRuc.value = true
        const { error, data } = await useApiPeru(partner.value.numeroRuc, 'ruc')
        if (error) {
          messageToast('warning', 'Advertencia', error)
          loadingGetRuc.value = false
        } else if (data) {
          partner.value.razonSocial = ''
          partner.value.direccion = ''
          ubigeoSelected.value.departament = 0
          ubigeoSelected.value.province = 0
          ubigeoSelected.value.district = 0
          resetCombo(combos.value, ['province', 'district'])
          partner.value.razonSocial = data.nombre_o_razon_social
          if (data.direccion) partner.value.direccion = data.direccion
          if (data.ubigeo[0] !== '-') {
            ubigeoSelected.value.departament = Number(data.ubigeo[0])
            await loadComboBoxes(combos.value, ['province'], `/ComboUbigeo/Provincia/${ubigeoSelected.value.departament}`, 'Ocurrio un Error al momento de cargar las Provincias')
            const idProvince = Number(data.ubigeo[1].slice(-2))
            ubigeoSelected.value.province = idProvince
            await loadComboBoxes(combos.value, ['district'], `/ComboUbigeo/Distrito/${ubigeoSelected.value.departament}/${ubigeoSelected.value.province}`, 'Ocurrio un Error al momento de cargar los Distritos')
            const idDistrict = Number(data.ubigeo[2].slice(-2))
            const districtObject = combos.value.district.data.find(district => district.id === idDistrict)
            ubigeoSelected.value.district = districtObject._id
            partner.value.idUbigeo = districtObject._id
          }
          loadingGetRuc.value = false
        }
      }
    }

    const selectedDistrict = idUbigeo => {
      partner.value.idUbigeo = idUbigeo
    }

    const sendForm = async () => {
      partner.value.loading = true
      partner.value.accion = partner.value._id ? 2 : 1
      partner.value.cliente = partner.value.cliente ? 1 : 0
      partner.value.proveedor = partner.value.proveedor ? 1 : 0
      partner.value.transportista = partner.value.transportista ? 1 : 0
      partner.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/socio', partner.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        partner.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            partner.value._id = id
            messageToast('success', 'Socio', mensaje)
            context.root.$bvModal.hide('modal-partner')
            loadPartners()
          }
        })
        partner.value.loading = false
      }
    }

    const closeForm = async () => {
      context.root.$bvModal.hide('modal-partner')
    }

    return {
      partner,
      tabIndex,
      combos,
      dniSelected,
      getDataByNumberDocument,
      loadingGetDni,
      selectedDocumentType,
      getDataByRuc,
      loadingGetRuc,
      selectedDistrict,
      sendForm,
      closeForm,
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
  #modal-partner {
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
</style>
