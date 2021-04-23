import Vue from 'vue'
import VueRouter from 'vue-router'
import authRoutes from './auth'
import errorRoutes from './error'
import dashboardRoutes from './dashboard'

Vue.use(VueRouter)

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  ...errorRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)
  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next({ name: 'login' })
    return
  }
  next()
})

export default router
