<template>
  <div
    id="app"
    class="h-100"
    :class="[skinClasses]"
  >
    <component :is="layout">
      <router-view />
    </component>
    <modal-change-password />
  </div>
</template>

<script>

// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch, provide, ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
import ModalChangePassword from '@/components/ModalChangePassword.vue'

import { useWindowSize, useCssVar } from '@vueuse/core'

import store from '@/store'
import useFetch from './hooks/useFetch'

const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
const LayoutHorizontal = () => import('@/layouts/horizontal/LayoutHorizontal.vue')
const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

export default {
  components: {

    // Layouts
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,

    // Importar componente de forma global
    ModalChangePassword,
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout() {
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type
    },
  },
  beforeCreate() {
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
  },
  setup(props, context) {
    const { skin, skinClasses } = useAppConfig()

    // Crear variable inicializadora para modificar un usuario
    const initialUserForChangePassword = {
      _id: 0,
      usuario: '',
      idColaborador: 0,
      idRol: 0,
      correo: '',
      clave: '',
      confirmClave: '',
      claveOfUserAuthenticated: '',
      accion: 0,
      idUsuario: null,
      loading: false,
    }
    // Crear variable reactiva
    const userForChangePassword = ref({ ...initialUserForChangePassword })

    // Funciones personalizadas SIMSAC

    // Funcion para resetear userForChangePassword a su estado inicial
    const resetUserForChangePassword = () => {
      userForChangePassword.value = { ...initialUserForChangePassword }
    }

    // Funcion para generar un mensaje toast
    // Parametros
    // variant = (string) con el valor 'primary', 'warning', 'danger', 'etc'
    // title = (string) titulo del mensaje
    // message = (string) cuerpo del mensaje
    const messageToast = (variant, title, message) => {
      context.root.$bvToast.toast(message, {
        title,
        variant,
        solid: true,
      })
    }

    // Funcion para confirmar alguna acción
    // Parametros
    // title = (string) titulo de la confirmacion
    // text = (string) cuerpo de la confirmación
    // confirmButtonText = (string) texto del boton confirmar
    const confirmSwal = async (title, text, confirmButtonText) => {
      const result = await context.root.$swal({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText,
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      return result
    }

    // Funcion para cargar los combos
    // Parametros
    // combos = (object) objeto de variables combo
    // nameCombosForLoad = (array) arreglo de las claves del objeto que se van a cargar
    // url = (string) url a la que se hara la peticion
    // messageError = (string) mensaje de error en caso falle el cargado
    const loadComboBoxes = async (combos, nameCombosForLoad = [], url, messageError) => {
      nameCombosForLoad.forEach(combo => {
        combos[combo].loading = true
        combos[combo].disabled = true
      })
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', messageError)
      } else if (data) {
        nameCombosForLoad.forEach(combo => {
          combos[combo].data = data
        })
      }
      nameCombosForLoad.forEach(combo => {
        combos[combo].loading = false
        combos[combo].disabled = false
      })
    }

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade',
    })

    // Proveer nuestras variables reactivas o funciones personalizadas a los componentes hijos
    provide('userForChangePassword', userForChangePassword)

    provide('resetUserForChangePassword', resetUserForChangePassword)
    provide('confirmSwal', confirmSwal)
    provide('messageToast', messageToast)
    provide('loadComboBoxes', loadComboBoxes)

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, val => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })

    return {
      skinClasses,
    }
  },
}
</script>
