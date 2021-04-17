import axiosIns from '@/libs/axios'

const fetchData = async (url = '/', params = {}, method = 'GET') => {
  const info = {
    data: null,
    error: null,
  }
  let response
  try {
    if (method.toUpperCase().trim()==='POST') {
      response = await axiosIns.post(url, params)
    } else {
      response = await axiosIns.get(url)
    }
    if (response.status !== 200) throw new Error(response)
    info.data = response.data
  } catch (error) {
    info.error = error
  }
  return info
}

export default fetchData