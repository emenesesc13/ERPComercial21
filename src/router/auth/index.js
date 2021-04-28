const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)) {
        const lastPath = JSON.parse(localStorage.getItem('lastPath'))
        if (lastPath) next(lastPath)
        else next('/')
      }
      next()
    },
  },
]

export default authRoutes
