<template>
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
                  v-model="article.productType"
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
                  v-model="article.articleName"
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
              <b-form-checkbox
                id="stock"
                v-model.number="article.stock"
              >
                Stock
              </b-form-checkbox>
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
              <b-form-checkbox
                id="service"
                v-model="article.service"
              >
                Servicio
              </b-form-checkbox>
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
                  v-model="article.unitGroup"
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
                  v-model="article.inventoryUnit"
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
                  v-model="article.unitSale"
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
                  v-model.number="article.purchasePrice"
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
                  v-model.number="article.salePrice"
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
                  v-model.number="article.minimumSalePrice"
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
                  v-model.number="article.minimumStock"
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
                  v-model.number="article.maximumStock"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

        </b-row>

        <!-- Features Article -->

        <b-row v-if="!article.service">
          <b-col
            cols="12"
            class="mt-3"
          >
            <h4 class="text-center text-primary">
              Características
            </h4>
            <hr class="mb-3 dividing-line">
          </b-col>

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
                v-model="featureSelected"
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
            md="8"
            lg="6"
            align-self="center"
          >
            <b-form-group
              label-for="valueFeature"
              label="Valor"
            >
              <v-select
                id="valueFeature"
                v-model="valueSelected"
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
            md="4"
            lg="1"
            align-self="center"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="btn-icon"
              block
              @click="handleSubmit(addFeature)"
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
              :rows="article.features"
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
                    variant="danger"
                    size="sm"
                    @click="deleteRow(props.row.id)"
                  >
                    Remover
                  </b-button>
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
          <b-button
            v-if="article.id || article.service"
            type="submit"
            variant="primary"
            @click="handleSubmit(sendArticle)"
          >
            Guardar
          </b-button>
        </template>

      </b-modal>
    </b-form>
  </validation-observer>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import {
  BRow,
  BCol, BForm, BFormGroup, BFormInput, BModal, BFormCheckbox, BButton,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { ref, inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalArticle',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BFormCheckbox,
    BButton,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    VueGoodTable,
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
          field: 'feature',
        },
        {
          label: 'Valor',
          field: 'value',
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
    const tabFeatureDisabled = ref(true)
    const combos = inject('combos')
    const loadCombos = inject('loadCombos')
    const messageToast = inject('messageToast')
    const loadArticles = inject('loadArticles')
    const featureSelected = inject('featureSelected')
    const valueSelected = inject('valueSelected')

    const selectedUnitGroup = async ({ _id }) => {
      loadCombos(['inventoryUnit', 'unitSale'], `/combo/grupounidad/${_id}`, 'Error al momento de cargar las Unidades por Grupo')
      article.value.inventoryUnit = null
      article.value.unitSale = null
    }

    const selectedFeature = async ({ _id }) => {
      loadCombos(['valuesByFeature'], `/comboadv/dcaracteristica/1/${_id}`, 'Error al momento de cargar los Valores por Características')
      valueSelected.value = null
    }

    const sendArticle = async () => {
      const articleToSave = {
        _id: article.value.id,
        sku: article.value.sku,
        nombre: article.value.articleName,
        idTipoProducto: article.value.productType,
        idGrupoUnidad: article.value.unitGroup,
        idUnidadInventario: article.value.inventoryUnit,
        idUnidadVenta: article.value.unitSale,
        precioCompra: article.value.purchasePrice,
        precioVenta: article.value.salePrice,
        precioMinimoVenta: article.value.minimumSalePrice,
        stockMinimo: article.value.minimumStock,
        stockMaximo: article.value.maximumStock,
        flgStock: article.value.stock ? 1 : 0,
        flgServicio: article.value.service ? 1 : 0,
        accion: article.value.id ? 2 : 1,
        idUsuario: store.state.auth.user._id,
      }
      const { data, error } = await useFetch('/articulos', articleToSave, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            article.value.id = id
            messageToast('success', 'Característica', mensaje)
            context.root.$bvModal.hide('modal-article')
            loadArticles()
          }
        })
      }
    }

    const addFeature = async () => {
      if (!article.value.id) {
        const articleToSave = {
          _id: article.value.id,
          sku: article.value.sku,
          nombre: article.value.articleName,
          idTipoProducto: article.value.productType,
          idGrupoUnidad: article.value.unitGroup,
          idUnidadInventario: article.value.inventoryUnit,
          idUnidadVenta: article.value.unitSale,
          precioCompra: article.value.purchasePrice,
          precioVenta: article.value.salePrice,
          precioMinimoVenta: article.value.minimumSalePrice,
          stockMinimo: article.value.minimumStock,
          stockMaximo: article.value.maximumStock,
          flgStock: article.value.stock ? 1 : 0,
          flgServicio: article.value.service ? 1 : 0,
          accion: article.value.id ? 2 : 1,
          idUsuario: store.state.auth.user._id,
        }
        const { error, data } = await useFetch('/articulos', articleToSave, 'POST')
        if (error) {
          messageToast('danger', 'Error', 'Ocurrio un error')
        } else {
          data.forEach(({ id, mensaje }) => {
            if (id === 0) {
              messageToast('warning', 'Advertencia', mensaje)
            } else {
              article.value.id = id
              messageToast('success', 'Característica', mensaje)
            }
          })
        }
      }

      if (article.value.id) {
        if (!featureSelected.value || !valueSelected.value) {
          messageToast('warning', 'Característica', 'Debe seleccionar una característica y su valor')
        } else {
          const { _id: featureId, nombre: feature } = featureSelected.value
          const { _id: valueId, nombre: value } = valueSelected.value
          const featureArticleToSave = {
            idDtlCaracteristica: valueId,
            idArticulo: article.value.id,
            idCaracteristica: featureId,
            accion: 1,
            idUsuario: store.state.auth.user._id,
          }
          const { error, data } = await useFetch('/ACaracteristica', featureArticleToSave, 'POST')
          if (error) {
            messageToast('danger', 'Error', 'Ocurrio un error')
          } else {
            data.forEach(({ id, mensaje }) => {
              if (id === 0) {
                messageToast('warning', 'Advertencia', mensaje)
              } else {
                messageToast('success', 'Característica', mensaje)
                article.value.features.push({ id, feature, value })
                featureSelected.value = null
                valueSelected.value = null
              }
            })
          }
        }
      }
    }

    const deleteRow = async idRow => {
      const result = await context.root.$swal({
        title: 'Desea eliminar esta característica?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminalo!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      if (result.value) {
        const featureArticleToDelete = {
          _id: idRow,
          accion: 3,
          idUsuario: store.state.auth.user._id,
        }
        const { error, data } = await useFetch('/ACaracteristica', featureArticleToDelete, 'POST')
        if (error) {
          messageToast('danger', 'Error', 'Ocurrio un error')
        } else {
          data.forEach(({ id, mensaje }) => {
            if (id === 0) {
              messageToast('warning', 'Advertencia', mensaje)
            } else {
              messageToast('success', 'Característica', mensaje)
              article.value.features = article.value.features.filter(feature => feature.id !== idRow)
            }
          })
        }
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-article')
    }

    return {
      article,
      resetArticle,
      tabFeatureDisabled,
      combos,
      selectedUnitGroup,
      selectedFeature,
      featureSelected,
      valueSelected,
      sendArticle,
      addFeature,
      deleteRow,
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
