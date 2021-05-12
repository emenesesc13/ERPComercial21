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
          :title="article._id ? 'Modificar Articulo' : 'Registrar Articulo'"
          size="lg"
          no-close-on-esc
          no-close-on-backdrop
        >

          <b-tabs v-model="tabIndex">

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
                  lg="7"
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
                  cols="12"
                  sm="6"
                  lg="5"
                  align-self="center"
                  class="d-flex justify-content-between"
                >
                  <b-form-group
                    label-for="stock"
                    class="form-group-checkbox"
                  >
                    <b-form-radio
                      v-model="article.flgSelected"
                      name="some-radios"
                      value="stock"
                      :disabled="!!recetasArticle.data.length"
                    >
                      Stock
                    </b-form-radio>
                  </b-form-group>

                  <b-form-group
                    label-for="service"
                    class="form-group-checkbox"
                  >
                    <b-form-radio
                      v-model="article.flgSelected"
                      name="some-radios"
                      value="servicio"
                      :disabled="featuresArticle.data.length || recetasArticle.data.length ? true : false"
                    >
                      Servicio
                    </b-form-radio>
                  </b-form-group>

                  <b-form-group
                    label-for="receta"
                    class="form-group-checkbox"
                  >
                    <b-form-radio
                      v-model="article.flgSelected"
                      name="some-radios"
                      value="receta"
                    >
                      Receta
                    </b-form-radio>
                  </b-form-group>
                </b-col>

                <!-- Unit Group -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <template v-if="!article._id">
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
                  </template>
                  <template v-else>
                    <b-form-group
                      label="Grupo Unidad"
                      label-for="unitGroup"
                    >
                      <b-form-input
                        id="unitGroup"
                        v-model="article.nombreGrupoUnidad"
                        disabled
                      />
                    </b-form-group>
                  </template>
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

            <b-tab v-if="article.flgSelected !== 'servicio'">

              <template #title>
                <feather-icon icon="ArchiveIcon" />
                <span>Características</span>
              </template>

              <!-- Features Article -->

              <b-row>

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
                    :disabled="featureArticle.loading"
                    @click="handleSubmit(addFeatureArticle)"
                  >
                    <feather-icon
                      v-if="!featureArticle.loading"
                      icon="PlusCircleIcon"
                    />
                    <b-spinner
                      v-else
                      small
                    />
                  </b-button>
                </b-col>

                <!-- Vue Good Table -->
                <b-col
                  cols="12"
                  class="mt-2 mt-md-1 mt-lg-0"
                >
                  <vue-good-table
                    mode="remote"
                    :columns="columnsFeatureArticle"
                    :rows="featuresArticle.data"
                    :is-loading="featuresArticle.loading"
                    :sort-options="{
                      enabled: false,
                    }"
                    max-height="300px"
                    style-class="vgt-table condensed table-detail"
                    :rtl="direction"
                  >
                    <template slot="loadingContent">
                      <img
                        width="30"
                        src="@/assets/images/loaders/circles.svg"
                        class="m-0 p-0"
                      >
                    </template>
                    <div
                      slot="emptystate"
                      class="text-center p-1"
                    >
                      <small v-if="!featuresArticle.loading">No hay características</small>
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
                          @click="deleteFeatureArticle(props.row)"
                        >
                          <feather-icon icon="Trash2Icon" />
                        </b-button>
                      </span>
                    </template>
                  </vue-good-table>
                </b-col>

              </b-row>

            </b-tab>

            <b-tab v-if="article.flgSelected === 'receta'">

              <template #title>
                <feather-icon icon="FileTextIcon" />
                <span>Receta</span>
              </template>

              <!-- Receta Article -->

              <b-row>

                <!-- Receta -->
                <b-col
                  cols="12"
                >

                  <b-form-group
                    label-for="article"
                    label="Articulo"
                  >
                    <b-input-group>
                      <b-form-input
                        id="article"
                        v-model="recetaArticle.nombreArticulo"
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
                  </b-form-group>

                </b-col>

                <!-- Unit Group -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="4"
                >

                  <b-form-group
                    label-for="unitGroupArticle"
                    label="Grupo Unidad"
                  >
                    <b-form-input
                      id="unitGroupArticle"
                      v-model="recetaArticle.nombreGrupoUnidad"
                      readonly
                    />
                  </b-form-group>

                </b-col>

                <!-- Unit Measure -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="unidad de medida"
                    rules="required"
                  >
                    <b-form-group
                      label="Unidad Medida"
                      label-for="unitMeasure"
                      :state="errors.length > 0 ? false:null"
                    >
                      <v-select
                        id="unitMeasure"
                        v-model="recetaArticle.idUnidad"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="unit => unit._id"
                        label="nombre"
                        :options="combos.unitMeasure.data"
                        :loading="combos.unitMeasure.loading"
                        :disabled="combos.unitMeasure.disabled"
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

                <!-- Cantidad -->
                <b-col
                  cols="12"
                  sm="6"
                  lg="3"
                >

                  <b-form-group
                    label-for="count"
                    label="Cantidad"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="grupo unidad"
                      rules="required"
                    >
                      <b-form-input
                        id="count"
                        v-model.number="recetaArticle.cantidad"
                        type="number"
                        min="0"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                </b-col>

                <!-- Button Add Receta -->
                <b-col
                  sm="2"
                  md="2"
                  lg="1"
                  class="d-flex align-items-center justify-content-end"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    class="btn-icon mt-50"
                    :disabled="recetaArticle.loading"
                    @click="handleSubmit(addRecetaArticle)"
                  >
                    <feather-icon
                      v-if="!recetaArticle.loading"
                      icon="PlusCircleIcon"
                    />
                    <b-spinner
                      v-else
                      small
                    />
                  </b-button>
                </b-col>

                <!-- Vue Good Table -->
                <b-col
                  cols="12"
                  class="mt-2 mt-md-1 mt-lg-0"
                >

                  <vue-good-table
                    mode="remote"
                    :columns="columnsRecetaArticle"
                    :rows="recetasArticle.data"
                    :is-loading="recetasArticle.loading"
                    :sort-options="{
                      enabled: false,
                    }"
                    max-height="300px"
                    style-class="vgt-table condensed table-detail"
                    :rtl="direction"
                  >
                    <template slot="loadingContent">
                      <img
                        width="30"
                        src="@/assets/images/loaders/circles.svg"
                        class="m-0 p-0"
                      >
                    </template>
                    <div
                      slot="emptystate"
                      class="text-center p-1"
                    >
                      <small v-if="!recetasArticle.loading">No hay recetas</small>
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
                          @click="deleteRecetaArticle(props.row)"
                        >
                          <feather-icon icon="Trash2Icon" />
                        </b-button>
                      </span>
                    </template>
                  </vue-good-table>

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
            <b-button
              v-if="tabIndex > 0"
              type="button"
              variant="outline-primary"
              @click="tabIndex--"
            >
              Atras
            </b-button>
            <b-button
              v-if="tabIndex < calculateLimitTab"
              type="button"
              variant="primary"
              @click="tabIndex++"
            >
              Siguiente
            </b-button>
            <b-button
              v-if="article._id || article.flgSelected === 'servicio'"
              type="button"
              variant="primary"
              :disabled="article.loading"
              @click="handleSubmit(updateArticle)"
            >
              <template v-if="article.loading">
                <b-spinner small />
                Guardando ...
              </template>
              <template v-else>
                Guardar
              </template>
            </b-button>
          </template>

        </b-modal>
      </b-form>
    </validation-observer>
    <modal-search-article-component
      :filter-optional="`opcional=a.id<>${article._id}`"
      @selected-article="selectedArticle"
    />
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import {
  BRow,
  BCol, BTabs, BTab, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BFormInput, BModal, BFormRadio, BButton, BSpinner,
} from 'bootstrap-vue'
import ModalSearchArticleComponent from '@/components/ModalSearchArticleComponent.vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import {
  inject, computed, provide, ref,
} from '@vue/composition-api'
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
    BSpinner,
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
      columnsFeatureArticle: [
        {
          label: 'Acción',
          field: 'action',
          width: '90px',
        },
        {
          label: 'Característica',
          field: 'nombreCaracteristica',
          thClass: 'align-middle',
          tdClass: 'align-middle',
        },
        {
          label: 'Valor',
          field: 'nombreDCaracteristica',
          thClass: 'align-middle',
          tdClass: 'align-middle',
        },
      ],
      columnsRecetaArticle: [
        {
          label: 'Acción',
          field: 'action',
          width: '90px',
        },
        {
          label: 'Receta',
          field: 'nombreReceta',
          thClass: 'align-middle',
          tdClass: 'align-middle',
        },
        {
          label: 'Grupo Unidad',
          field: 'nombreGrupo',
          thClass: 'align-middle',
          tdClass: 'align-middle',
        },
        {
          label: 'Unidad Medida',
          field: 'nombreUnidad',
          thClass: 'align-middle',
          tdClass: 'align-middle',
        },
        {
          label: 'Cantidad',
          field: 'cantidad',
          thClass: 'align-middle',
          tdClass: 'align-middle',
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
    const resetFeatureArticle = inject('resetFeatureArticle')
    const featuresArticle = inject('featuresArticle')
    const recetaArticle = inject('recetaArticle')
    const resetRecetaArticle = inject('resetRecetaArticle')
    const recetasArticle = inject('recetasArticle')
    const loadFeaturesArticleByArticleId = inject('loadFeaturesArticleByArticleId')
    const loadRecetasArticleByArticleId = inject('loadRecetasArticleByArticleId')
    const combos = inject('combos')
    const loadComboBoxes = inject('loadComboBoxes')
    const messageToast = inject('messageToast')
    const confirmSwal = inject('confirmSwal')
    const loadArticles = inject('loadArticles')
    const tabIndex = inject('tabIndex')

    const tableInfo = ref({
      data: [],
      loading: false,
      totalRecords: 0,
    })
    const serverParamsSearchArticle = ref({
      columnFilters: {
        field: 'a.nombre',
        value: '',
      },
      page: 1,
      perPage: 10,
    })

    const calculateLimitTab = computed(() => {
      let limitTab = 0
      if (article.value.flgSelected === 'stock') limitTab = 1
      else if (article.value.flgSelected === 'servicio') limitTab = 0
      else if (article.value.flgSelected === 'receta') limitTab = 2
      return limitTab
    })

    const selectedUnitGroup = async unitGroupSelected => {
      const { _id } = unitGroupSelected
      loadComboBoxes(combos.value, ['inventoryUnit', 'unitSale'], `/combo/grupounidad/${_id}`, 'Error al momento de cargar las Unidades por Grupo')
      article.value.idUnidadInventario = 0
      article.value.idUnidadVenta = 0
    }

    const selectedFeature = async ({ _id }) => {
      loadComboBoxes(combos.value, ['valuesByFeature'], `/comboadv/dcaracteristica/1/${_id}`, 'Error al momento de cargar los Valores por Características')
      featureArticle.value.idDtlCaracteristica = 0
    }

    const sendArticle = async (withToastSuccess = true, withButtonLoading = true) => {
      let result = false
      if (withButtonLoading) article.value.loading = true
      if (article.value.flgSelected === 'stock') {
        article.value.flgStock = 1
        article.value.flgServicio = 0
        article.value.flgReceta = 0
      } else if (article.value.flgSelected === 'servicio') {
        article.value.flgStock = 0
        article.value.flgServicio = 1
        article.value.flgReceta = 0
      } else if (article.value.flgSelected === 'receta') {
        article.value.flgStock = 0
        article.value.flgServicio = 0
        article.value.flgReceta = 1
      }
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
            if (withToastSuccess) messageToast('success', 'Articulo', mensaje)
            const unidadSeleccionada = combos.value.unitGroup.data.find(group => group._id === article.value.idGrupoUnidad)
            article.value.nombreGrupoUnidad = unidadSeleccionada.nombre
            loadArticles()
            result = true
          }
        })
      }
      if (withButtonLoading) article.value.loading = false
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
      await sendArticle(!article.value._id, false)
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
                resetFeatureArticle()
                loadFeaturesArticleByArticleId(article.value._id)
              }
            })
          }
          featureArticle.value.loading = false
        }
      }
    }

    const deleteFeatureArticle = async ({ _id }) => {
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

    const addRecetaArticle = async () => {
      await sendArticle(!article.value._id, false)
      if (article.value._id) {
        if (!recetaArticle.value.idReceta || !recetaArticle.value.idGrupoUnidad || !recetaArticle.value.idUnidad || !recetaArticle.value.cantidad) {
          messageToast('warning', 'Receta', 'Debe llenar los campos para poder agregar una registro')
        } else {
          recetaArticle.value.idArticulo = article.value._id
          recetaArticle.value.loading = true
          recetaArticle.value.accion = 1
          recetaArticle.value.idUsuario = store.state.auth.user._id
          const { error, data } = await useFetch('/articulosreceta', recetaArticle.value, 'POST')
          if (error) {
            messageToast('danger', 'Error', 'Ocurrio un error')
          } else {
            data.forEach(({ id, mensaje }) => {
              if (id === 0) {
                messageToast('warning', 'Advertencia', mensaje)
              } else {
                messageToast('success', 'Receta', mensaje)
                resetRecetaArticle()
                loadRecetasArticleByArticleId(article.value._id)
              }
            })
          }
          recetaArticle.value.loading = false
        }
      }
    }

    const deleteRecetaArticle = async params => {
      const { _id } = params
      const { value } = await confirmSwal('Desea eliminar esta receta?', '¡No podrás revertir esto!', '¡Sí, eliminalo!')
      if (value) {
        recetaArticle.value._id = _id
        recetaArticle.value.accion = 3
        recetaArticle.value.idUsuario = store.state.auth.user._id
        const { error, data } = await useFetch('/articulosreceta', recetaArticle.value, 'POST')
        if (error) {
          messageToast('danger', 'Error', 'Ocurrio un error')
        } else {
          data.forEach(({ id, mensaje }) => {
            if (id === 0) {
              messageToast('warning', 'Advertencia', mensaje)
            } else {
              messageToast('success', '', mensaje)
              loadRecetasArticleByArticleId(article.value._id)
            }
          })
        }
      }
    }

    const loadArticlesForSearch = async () => {
      tableInfo.value.loading = true
      const { columnFilters, page, perPage } = serverParamsSearchArticle.value
      const { field, value } = columnFilters
      let url = `/articulos/?_id=0&tabla=articulos&pinicio=${page}&pfin=${perPage}`
      url += '&opcional=a.id<>'
      url += article.value._id
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los artículos')
      } else if (data) {
        tableInfo.value.data = data
        if (data?.length) {
          if (data[0]?.numberRow) tableInfo.value.totalRecords = data[0].numberRow
        }
      }
      tableInfo.value.loading = false
    }

    const openModalSearchArticleComponent = () => {
      loadArticlesForSearch()
      context.root.$bvModal.show('modal-search-article-component')
    }

    const selectedArticle = async params => {
      const { _id, nombre, nombreGrupoUnidad } = params
      const { error, data: dataArticle } = await useFetch(`/articulos/${_id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
      } else if (dataArticle) {
        resetRecetaArticle()
        recetaArticle.value.idReceta = _id
        recetaArticle.value.nombreArticulo = nombre
        recetaArticle.value.idGrupoUnidad = dataArticle.idGrupoUnidad
        recetaArticle.value.nombreGrupoUnidad = nombreGrupoUnidad
        await loadComboBoxes(combos.value, ['unitMeasure'], `/combo/unidad/${dataArticle.idGrupoUnidad}`, 'Error al momento de cargar las Unidades de Medida')
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-article')
    }

    provide('tableInfo', tableInfo)
    provide('serverParamsSearchArticle', serverParamsSearchArticle)
    provide('loadArticlesForSearch', loadArticlesForSearch)

    return {
      tabIndex,
      calculateLimitTab,
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
      deleteFeatureArticle,
      recetaArticle,
      recetasArticle,
      openModalSearchArticleComponent,
      selectedArticle,
      addRecetaArticle,
      deleteRecetaArticle,
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
  [dir] .vgt-table.condensed.table-detail td, [dir] .vgt-table.condensed.table-detail th.vgt-row-header {
    padding: .35em .75em !important;
  }
</style>
