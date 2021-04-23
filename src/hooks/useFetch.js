import axiosIns from '@/libs/axios'

const useFetch = async (url = '/', params = {}, method = 'GET', expectedStatus = 200) => {
  const info = {
    data: null,
    error: null,
  }
  let response
  try {
    if (method.toUpperCase().trim() === 'POST') {
      response = await axiosIns.post(url, params)
    } else {
      response = await axiosIns.get(url)
    }
    if (response.status !== expectedStatus) throw new Error(response)
    info.data = response.data
  } catch (error) {
    if (error?.response?.status === 401) info.error = null
    else info.error = error
  }
  return info
}

export default useFetch
