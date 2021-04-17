const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('_secret')) {
        next('/')
      }
      next()
    },
  },
]

export default authRoutes
