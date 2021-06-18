import axiosIns from '@/libs/axios'

// Crear una función para hacer peticiones a la api del sistema
// Recibe 4 paramtros
/*
  1.- Path a donde va hacer la petición por defecto es /
  2.- Parametros si es de tipo POST por defecto es {}
  3.- Metodo de la peticion por defecto es GET
  4.- Estado esperado por defecto es 200
*/
const useFetch = async (url = '/', params = {}, method = 'GET', expectedStatus = 200) => {
  // Constante para almacenar los datos o errores que me devuelve la API
  const info = {
    data: null,
    error: null,
  }
  // Variable para almacenar la respuesta de la peticion
  let response
  try {
    // Verificar metodo
    if (method.toUpperCase().trim() === 'POST') {
      // Enviar la peticion
      response = await axiosIns.post(url, params)
    } else {
      // Enviar la peticion
      response = await axiosIns.get(url)
    }
    // Lanzar un error si el estado no es el esperado
    if (response.status !== expectedStatus) throw new Error(response)
    // Rellenar los datos con la data que devuelve la peticion
    info.data = response.data
  } catch (error) {
    // Verificar si el error es 401
    if (error?.response?.status === 401) {
      // Enviar la propiedad error como null, para que no muestre nada, ya que por defecto este recargara la página
      info.error = null
    } else {
      // Rellenar la propiedad error
      info.error = error
    }
  }
  // Retornar la constante
  return info
}

// Exportar funcion
export default useFetch
