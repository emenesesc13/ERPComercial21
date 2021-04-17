import axiosIns from '@/libs/axios'
import store from '@/store'

const useArticles = () => {
  const getArticles = async serverParams => {
    const info = {
      data: null,
      error: null,
    }
    const { columnFilters, page, perPage } = serverParams
    const { field, value } = columnFilters
    const url = `/articulos/?_id=0&tabla=articulos&pinicio=${page}&pfin=${perPage}${field ? `&campofiltro=${field}&filtro=${value}` : ''}`
    try {
      const response = await axiosIns.get(url)
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getArticleById = async articleId => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get(`/articulos/?_id=${articleId}&tabla=articulos`)
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getProductTypes = async () => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get('/combo/tipoproducto/1')
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getUnitGroup = async () => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get('/combo/grupounidad/0')
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getUnitsByGroup = async groupId => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get(`/combo/grupounidad/${groupId}`)
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getFeatures = async () => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get('/combo/caracteristica/1')
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getValuesByFeature = async featureId => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get(`/comboadv/dcaracteristica/1/${featureId}`)
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const saveArticle = async article => {
    const { _id: userId } = store.state.auth.user
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.post('/articulos', {
        _id: article.id,
        sku: article.sku,
        nombre: article.articleName,
        idTipoProducto: article.productType,
        idGrupoUnidad: article.unitGroup,
        idUnidadInventario: article.inventoryUnit,
        idUnidadVenta: article.unitSale,
        precioCompra: article.purchasePrice,
        precioVenta: article.salePrice,
        precioMinimoVenta: article.minimumSalePrice,
        stockMinimo: article.minimumStock,
        stockMaximo: article.maximumStock,
        flgStock: article.stock ? 1 : 0,
        flgServicio: article.service ? 1 : 0,
        accion: article.id ? 2 : 1,
        idUsuario: userId,
      })
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const saveFeatureArticle = async (idArticulo, idCaracteristica, idDtlCaracteristica) => {
    const { _id: userId } = store.state.auth.user
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.post('/ACaracteristica', {
        idDtlCaracteristica,
        idArticulo,
        idCaracteristica,
        accion: 1,
        idUsuario: userId,
      })
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getFeaturesByArticleId = async articleId => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get(`/ACaracteristica/?_id=0&tabla=ARTICULOCARACTERISTICA&campo=a.idarticulo&indice=${articleId}`)
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const deleteFeatureArticle = async featureId => {
    const { _id: userId } = store.state.auth.user
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.post('/ACaracteristica', {
        _id: featureId,
        accion: 3,
        idUsuario: userId,
      })
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const deleteArticle = async articleId => {
    const { _id: userId } = store.state.auth.user
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.post('/articulos', {
        _id: articleId,
        accion: 3,
        idUsuario: userId,
      })
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  return {
    getArticles,
    getArticleById,
    getProductTypes,
    getUnitGroup,
    getUnitsByGroup,
    getFeatures,
    getValuesByFeature,
    saveArticle,
    saveFeatureArticle,
    getFeaturesByArticleId,
    deleteFeatureArticle,
    deleteArticle,
  }
}

export default useArticles
