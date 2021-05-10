<template>
  <div>
    <validation-observer
      ref="modal-article"
      v-slot="{ handleSubmit }"
    >
      <b-form @submit.prevent="handleSubmit(sendForm)">
        <b-modal
          id="modal-article"
          ok-only
          ok-title="Accept"
          modal-class="modal-primary"
          centered
          :title="article.id ? 'Modificar Articulo' : 'Registrar Articulo'"
          size="lg"
          no-close-on-esc
          no-close-on-backdrop
        >

          <b-tabs>

            <b-tab>

              <template #title>
                <feather-icon icon="HomeIcon" />
                <span>Artículo</span>
              </template>

              <!-- Headers Article -->

              <b-row>

                <!-- SKU -->
                <b-col
                  cols="12"
                  md="3"
                >
                  <b-form-group
                    label-for="SKU"
                    label="SKU"
                  >
                    <b-form-input
                      id="SKU"
                      v-model="article.sku"
                    />
                  </b-form-group>
                </b-col>

                <!-- Product Type -->
                <b-col
                  cols="12"
                  md="9"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="tipo producto"
                    rules="required"
                  >
                    <b-form-group
                      label-for="productType"
                      label="Tipo Producto"
                      :state="errors.length > 0 ? false:null"
                    >
                      <v-select
                        id="productType"
                        v-model="article.idTipoProducto"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="productType => productType._id"
                        label="nombre"
                        :options="combos.productTypes.data"
                        :loading="combos.productTypes.loading"
                        :disabled="combos.productTypes.loading"
                      >
                        <template v-slot:no-options>
                          No se encontraron resultados.
                        </template>
                      </v-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Article Name -->
                <b-col
                  cols="12"
                  lg="8"
                >
                  <b-form-group
                    label="Articulo"
                    label-for="articleName"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="nombre"
                      rules="required"
                    >
                      <b-form-input
                        id="articleName"
                        v-model="article.nombre"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Stock -->
                <b-col
                  cols="6"
                  sm="3"
                  lg="2"
                  align-self="center"
                >
                  <b-form-group
                    label-for="stock"
                    class="form-group-checkbox"
                  >
                    <!-- <b-form-checkbox
                      id="stock"
                      v-model.number="article.flgStock"
                    >
                      Stock
                    </b-form-checkbox> -->
                    <b-form-radio
                      v-model="selectedStockOrService"
                      name="some-radios"
                      value="stock"
                    >
                      Stock
                    </b-form-radio>
                  </b-form-group>
                </b-col>

                <!-- Service -->
                <b-col
                  cols="6"
                  sm="3"
                  lg="2"
                  align-self="center"
                >
                  <b-form-group
                    label-for="service"
                    class="form-group-checkbox"
                  >
                    <!-- <b-form-checkbox
                      id="service"
                      v-model="article.flgServicio"
                    >
                      Servicio
                    </b-form-checkbox> -->
                    <b-form-radio
                      v-model="selectedStockOrService"
                      name="some-radios"
                      value="service"
                      :disabled="featuresArticle.data.length ? true : false"
                    >
                      Servicio
                    </b-form-radio>
                  </b-form-group>
                </b-col>

                <!-- Unit Group -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="grupo unidad"
                    rules="required"
                  >
                    <b-form-group
                      label="Grupo Unidad"
                      label-for="unitGroup"
                      :state="errors.length > 0 ? false:null"
                    >
                      <v-select
                        id="unitGroup"
                        v-model="article.idGrupoUnidad"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="unit => unit._id"
                        label="nombre"
                        :options="combos.unitGroup.data"
                        :loading="combos.unitGroup.loading"
                        :disabled="combos.unitGroup.disabled"
                        :clearable="false"
                        @option:selected="selectedUnitGroup"
                      >
                        <template v-slot:no-options>
                          No se encontraron resultados.
                        </template>
                      </v-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Inventory Unit -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="unidad inventario"
                    rules="required"
                  >
                    <b-form-group
                      label="Unidad Inventario"
                      label-for="inventoryUnit"
                      :state="errors.length > 0 ? false:null"
                    >
                      <v-select
                        id="inventoryUnit"
                        v-model="article.idUnidadInventario"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="inventoryUnit => inventoryUnit._id"
                        label="nombre"
                        :options="combos.inventoryUnit.data"
                        :loading="combos.inventoryUnit.loading"
                        :disabled="combos.inventoryUnit.disabled"
                      >
                        <template v-slot:no-options>
                          No se encontraron resultados.
                        </template>
                      </v-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Unit Sale -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="unidad venta"
                    rules="required"
                  >
                    <b-form-group
                      label="Unidad Venta"
                      label-for="unitSale"
                      :state="errors.length > 0 ? false:null"
                    >
                      <v-select
                        id="unitSale"
                        v-model="article.idUnidadVenta"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="unitSale => unitSale._id"
                        label="nombre"
                        :options="combos.unitSale.data"
                        :loading="combos.unitSale.loading"
                        :disabled="combos.unitSale.disabled"
                      >
                        <template v-slot:no-options>
                          No se encontraron resultados.
                        </template>
                      </v-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Purchase Price -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="2"
                >
                  <b-form-group
                    label="Precio Compra"
                    label-for="purchasePrice"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="precio compra"
                      rules="required"
                    >
                      <b-form-input
                        id="purchasePrice"
                        v-model.number="article.precioCompra"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Sale Price -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="2"
                >
                  <b-form-group
                    label="Precio Venta"
                    label-for="salePrice"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="precio venta"
                      rules="required"
                    >
                      <b-form-input
                        id="salePrice"
                        v-model.number="article.precioVenta"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Minimum Sale Price -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="2"
                >
                  <b-form-group
                    label="Precio min. Venta"
                    label-for="minimumSalePrice"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="precio min. venta"
                      rules="required"
                    >
                      <b-form-input
                        id="minimumSalePrice"
                        v-model.number="article.precioMinimoVenta"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Minimum Stock -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="2"
                  offset-lg="2"
                >
                  <b-form-group
                    label="Stock min."
                    label-for="minimumStock"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="stock min."
                      rules="required"
                    >
                      <b-form-input
                        id="minimumStock"
                        v-model.number="article.stockMinimo"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Maximum Stock -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="2"
                >
                  <b-form-group
                    label="Stock Max."
                    label-for="maximumStock"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="stock max."
                      rules="required"
                    >
                      <b-form-input
                        id="maximumStock"
                        v-model.number="article.stockMaximo"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

              </b-row>

            </b-tab>

            <b-tab v-if="!article.flgServicio">

              <template #title>
                <feather-icon icon="ArchiveIcon" />
                <span>Características</span>
              </template>

              <!-- Features Article -->

              <b-row v-if="!article.flgServicio">

                <!-- Feature -->
                <b-col
                  cols="12"
                  lg="5"
                >
                  <b-form-group
                    label-for="feature"
                    label="Característica"
                  >
                    <v-select
                      id="feature"
                      v-model="featureArticle.idCaracteristica"
                      :reduce="feature => feature._id"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="nombre"
                      :options="combos.features.data"
                      :loading="combos.features.loading"
                      :disabled="combos.features.disabled"
                      :clearable="false"
                      @option:selected="selectedFeature"
                    >
                      <template v-slot:no-options>
                        No se encontraron resultados.
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>

                <!-- Value Feature -->
                <b-col
                  cols="12"
                  sm="10"
                  md="10"
                  lg="6"
                  align-self="center"
                >
                  <b-form-group
                    label-for="valueFeature"
                    label="Valor"
                  >
                    <v-select
                      id="valueFeature"
                      v-model="featureArticle.idDtlCaracteristica"
                      :reduce="detail => detail._id"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="nombre"
                      :options="combos.valuesByFeature.data"
                      :loading="combos.valuesByFeature.loading"
                      :disabled="combos.valuesByFeature.disabled"
                    >
                      <template v-slot:no-options>
                        No se encontraron resultados.
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>

                <!-- Button Add Feature -->
                <b-col
                  cols="12"
                  sm="2"
                  md="2"
                  lg="1"
                  class="d-flex align-items-center justify-content-end"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    class="btn-icon mt-50"
                    @click="handleSubmit(addFeatureArticle)"
                  >
                    <feather-icon
                      icon="PlusCircleIcon"
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
                    :rows="featuresArticle.data"
                    max-height="300px"
                    style-class="vgt-table condensed table-feature"
                    :rtl="direction"
                  >
                    <div
                      slot="emptystate"
                      class="text-center p-1"
                    >
                      <small>No hay características</small>
                    </div>
                    <template
                      slot="table-row"
                      slot-scope="props"
                    >
                      <span v-if="props.column.field === 'action'">
                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="outline-primary"
                          title="Eliminar"
                          class="btn-icon rounded-circle"
                          @click="deleteRow(props.row)"
                        >
                          <feather-icon icon="Trash2Icon" />
                        </b-button>
                      </span>
                    </template>
                  </vue-good-table>
                </b-col>

              </b-row>

            </b-tab>

            <b-tab>

              <template #title>
                <feather-icon icon="FileTextIcon" />
                <span>Receta</span>
              </template>

              <!-- Receta Article -->

              <b-row>

                <!-- Article -->
                <b-col
                  cols="12"
                >

                  <b-form-group
                    label-for="article"
                    label="Articulo"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="articulo"
                      rules="required"
                    >
                      <b-input-group>
                        <b-form-input
                          id="article"
                          :state="errors.length > 0 ? false:null"
                          readonly
                        />
                        <b-input-group-append>
                          <b-button
                            variant="primary"
                            @click="openModalSearchArticleComponent"
                          >
                            <feather-icon
                              icon="SearchIcon"
                            />
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                </b-col>

                <!-- Unit Group -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="grupo unidad"
                    rules="required"
                  >
                    <b-form-group
                      label="Grupo Unidad"
                      label-for="unitGroup"
                      :state="errors.length > 0 ? false:null"
                    >
                      <v-select
                        id="unitGroup"
                        v-model="article.idGrupoUnidad"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="unit => unit._id"
                        label="nombre"
                        :options="combos.unitGroup.data"
                        :loading="combos.unitGroup.loading"
                        :disabled="combos.unitGroup.disabled"
                        :clearable="false"
                        @option:selected="selectedUnitGroup"
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
              :show="article.loading"
              variant="transparent"
              :opacity="0.85"
              blur="2px"
              rounded="sm"
            >
              <b-button
                v-if="article._id || article.flgServicio"
                type="submit"
                variant="primary"
                @click="handleSubmit(updateArticle)"
              >
                Guardar
              </b-button>
            </b-overlay>
          </template>

        </b-modal>
      </b-form>
    </validation-observer>
    <modal-search-article-component @selected-article="selectedArticle" />
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import {
  BRow,
  BCol, BTabs, BTab, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BFormInput, BModal, BFormRadio, BButton, BOverlay,
} from 'bootstrap-vue'
import ModalSearchArticleComponent from '@/components/ModalSearchArticleComponent.vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject, watch } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalArticle',
  components: {
    BRow,
    BCol,
    BTabs,
    BTab,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BModal,
    BFormRadio,
    BButton,
    BOverlay,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    VueGoodTable,
    ModalSearchArticleComponent,
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
          label: 'Característica',
          field: 'nombreCaracteristica',
        },
        {
          label: 'Valor',
          field: 'nombreDCaracteristica',
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
  created() {
    extend('required', {
      message: 'Es requerido',
    })
  },
  setup(props, context) {
    const article = inject('article')
    const resetArticle = inject('resetArticle')
    const selectedStockOrService = inject('selectedStockOrService')
    const featureArticle = inject('featureArticle')
    const featuresArticle = inject('featuresArticle')
    const loadFeaturesArticleByArticleId = inject('loadFeaturesArticleByArticleId')
    const combos = inject('combos')
    const loadComboBoxes = inject('loadComboBoxes')
    const messageToast = inject('messageToast')
    const confirmSwal = inject('confirmSwal')
    const loadArticles = inject('loadArticles')

    watch(selectedStockOrService, newValue => {
      if (newValue === 'stock') {
        article.value.flgStock = 1
        article.value.flgServicio = 0
      } else {
        article.value.flgStock = 0
        article.value.flgServicio = 1
      }
    })

    const selectedUnitGroup = async ({ _id }) => {
      loadComboBoxes(combos.value, ['inventoryUnit', 'unitSale'], `/combo/grupounidad/${_id}`, 'Error al momento de cargar las Unidades por Grupo')
      article.value.idUnidadInventario = 0
      article.value.idUnidadVenta = 0
    }

    const selectedFeature = async ({ _id }) => {
      loadComboBoxes(combos.value, ['valuesByFeature'], `/comboadv/dcaracteristica/1/${_id}`, 'Error al momento de cargar los Valores por Características')
      featureArticle.value.idDtlCaracteristica = 0
    }

    const sendArticle = async () => {
      let result = false
      article.value.loading = true
      // article.value.flgStock = article.value.flgStock ? 1 : 0
      // article.value.flgServicio = article.value.flgServicio ? 1 : 0
      article.value.accion = article.value._id ? 2 : 1
      article.value.idUsuario = store.state.auth.user._id
      const { data, error } = await useFetch('/articulos', article.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        result = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
            result = false
          } else {
            article.value._id = id
            messageToast('success', 'Articulo', mensaje)
            result = true
          }
        })
      }
      return result
    }

    const updateArticle = async () => {
      const responseArticle = await sendArticle()
      if (responseArticle) {
        context.root.$bvModal.hide('modal-article')
        loadArticles()
      }
    }

    const addFeatureArticle = async () => {
      if (!article.value._id) {
        await sendArticle()
      }
      if (article.value._id) {
        if (!featureArticle.value.idCaracteristica || !featureArticle.value.idDtlCaracteristica) {
          messageToast('warning', 'Característica', 'Debe seleccionar una característica y su valor')
        } else {
          featureArticle.value.idArticulo = article.value._id
          featureArticle.value.loading = true
          featureArticle.value.accion = 1
          featureArticle.value.idUsuario = store.state.auth.user._id
          const { error, data } = await useFetch('/ACaracteristica', featureArticle.value, 'POST')
          if (error) {
            messageToast('danger', 'Error', 'Ocurrio un error')
          } else {
            data.forEach(({ id, mensaje }) => {
              if (id === 0) {
                messageToast('warning', 'Advertencia', mensaje)
              } else {
                messageToast('success', 'Característica', mensaje)
                loadFeaturesArticleByArticleId(article.value._id)
              }
            })
          }
        }
      }
    }

    const deleteRow = async ({ _id }) => {
      const { value } = await confirmSwal('Desea eliminar esta característica?', '¡No podrás revertir esto!', '¡Sí, eliminalo!')
      if (value) {
        featureArticle.value._id = _id
        featureArticle.value.accion = 3
        featureArticle.value.idUsuario = store.state.auth.user._id
        const { error, data } = await useFetch('/ACaracteristica', featureArticle.value, 'POST')
        if (error) {
          messageToast('danger', 'Error', 'Ocurrio un error')
        } else {
          data.forEach(({ id, mensaje }) => {
            if (id === 0) {
              messageToast('warning', 'Advertencia', mensaje)
            } else {
              messageToast('success', 'Característica', mensaje)
              loadFeaturesArticleByArticleId(article.value._id)
            }
          })
        }
      }
    }

    const openModalSearchArticleComponent = () => {
      context.root.$bvModal.show('modal-search-article-component')
    }

    const selectedArticle = params => {
      console.log(params)
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-article')
    }

    return {
      article,
      resetArticle,
      selectedStockOrService,
      combos,
      selectedUnitGroup,
      selectedFeature,
      updateArticle,
      featureArticle,
      featuresArticle,
      addFeatureArticle,
      deleteRow,
      openModalSearchArticleComponent,
      selectedArticle,
      closeForm,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-autosuggest.scss';
  .dividing-line {
    border: none;
    height: 1.5px;
    background-color: #BBB;
  }
  .form-group-checkbox {
    margin-top: .5rem;
  }
  #modal-article {
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
