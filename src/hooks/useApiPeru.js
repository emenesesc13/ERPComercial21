import apiPeru from '@/libs/api-peru'

// Crear una función para hacer peticiones a apiPeru
// Recibe 2 paramtros
/*
  1.- Numero de documento
  2.- Tipo de documento
*/
const useApiPeru = async (numberDocument, typeDocument = 'dni') => {
  // Constante para almacenar los datos o errores que me devuelve la API
  const info = {
    data: null,
    error: null,
  }
  try {
    // Enviar la peticion
    const response = await apiPeru.get(`/${typeDocument}/${numberDocument}`)
    // Lanzar un error si la peticion no trae un estado 200
    if (response.status !== 200) throw new Error(response)
    // Verificar si el campo success es falso
    if (!response.data.success) info.error = response.data.message
    // Rellenar los datos que me retorna la peticion
    info.data = response.data.data
  } catch (error) {
    // Rellenar los datos de error que me retorna la peticion
    info.error = error
  }
  // Retornar la constante
  return info
}

// Exportar funcion
export default useApiPeru
