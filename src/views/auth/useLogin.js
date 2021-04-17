import axiosIns from '@/libs/axios'
import store from '@/store'

const useLogin = () => {
  const handleLogin = async payload => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.post('/login', payload)
      if (response.status !== 200) throw new Error(response)
      if (!response.data.usuario) {
        info.error = response.data.mensaje
        return info
      }
      info.data = response.data
      store.dispatch('auth/handleLogin', response.data)
    } catch (error) {
      info.error = error
    }
    return info
  }
  return {
    handleLogin,
  }
}

export default useLogin
