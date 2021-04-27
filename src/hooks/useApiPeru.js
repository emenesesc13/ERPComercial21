import apiPeru from '@/libs/api-peru'

const useApiPeru = async (numberDocument, typeDocument = 'dni') => {
  const info = {
    data: null,
    error: null,
  }
  try {
    const response = await apiPeru.get(`/${typeDocument}/${numberDocument}`)
    if (response.status !== 200) throw new Error(response)
    if (!response.data.success) info.error = response.data.message
    info.data = response.data.data
  } catch (error) {
    info.error = error
  }
  return info
}

export default useApiPeru
