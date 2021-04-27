<template>
  <validation-observer
    ref="modal-partner"
    v-slot="{ handleSubmit }"
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

        <b-tabs>

          <!-- Headers Partner -->

          <b-tab>

            <template #title>
              <feather-icon icon="UserIcon" />
              <span>Datos</span>
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
                        v-model="partner.numberoDocumento"
                        :state="errors.length > 0 ? false:null"
                      />
                      <b-input-group-append>
                        <b-button variant="primary">
                          <feather-icon icon="SearchIcon" />
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
                cols="8"
              >
                <b-form-group
                  label-for="email"
                  label="Email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required"
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
                cols="4"
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
                      :state="errors.length > 0 ? false:null"
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
              <span>Fiscales</span>
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
                        :state="errors.length > 0 ? false:null"
                      />
                      <b-input-group-append>
                        <b-button variant="primary">
                          <feather-icon icon="SearchIcon" />
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
                class="d-flex justify-content-between align-items-center mb-1 mb-md-0"
                style="height: 72px"
              >
                <b-form-checkbox
                  v-model="partner.cliente"
                >
                  Cliente
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="partner.proveedor"
                >
                  Proveedor
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="partner.transportista"
                >
                  Transportista
                </b-form-checkbox>
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
              <span>Ubicación</span>
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
                collg="4"
                @selected-district="selectedDistrict"
              />

            </b-row>

          </b-tab>

          <!-- Contacto -->

          <b-tab>

            <template #title>
              <feather-icon icon="PhoneIcon" />
              <span>Contacto</span>
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
                      :state="errors.length > 0 ? false:null"
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
            type="button"
            variant="outline-primary"
            @click="closeForm"
          >
            Cerrar
          </b-button>
          <b-overlay
            :show="partner.loading"
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
  BRow, BForm, BButton, BModal, BOverlay, BCol, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BFormCheckbox, BTabs, BTab,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'
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
    }
  },
  created() {
    extend('required', {
      message: 'Es requerido',
    })
  },
  setup(props, context) {
    const partner = inject('partner')
    const combos = inject('combos')
    const messageToast = inject('messageToast')
    const loadPartners = inject('loadPartners')

    const selectedDistrict = idUbigeo => {
      partner.value.idUbigeo = idUbigeo
    }

    const sendForm = async () => {
      partner.value.loading = true
      partner.value.accion = partner.value._id ? 2 : 1
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

    const closeForm = () => {
      context.root.$bvModal.hide('modal-partner')
    }

    return {
      partner,
      combos,
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
