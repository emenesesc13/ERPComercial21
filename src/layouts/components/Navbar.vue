<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0 text-capitalize">
              {{ user.usuario }}
            </p>
            <span class="user-status text-capitalize">{{ user.nombreRol }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="openModalForChangePassword"
        >
          <feather-icon
            size="16"
            icon="LockIcon"
            class="mr-50"
          />
          <span>Cambiar clave</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="handleLogout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Cerrar Sesión</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BAvatar,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { mapState } from 'vuex'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/handleLogout')
    },
  },
  setup(props, context) {
    const userForChangePassword = inject('userForChangePassword')
    const resetUserForChangePassword = inject('resetUserForChangePassword')
    const messageToast = inject('messageToast')

    const openModalForChangePassword = async () => {
      resetUserForChangePassword()
      const { error, data } = await useFetch(`/usuario/${store.state.auth.user._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
      } else {
        userForChangePassword.value = { ...userForChangePassword.value, ...data, clave: '' }
        context.root.$bvModal.show('modal-user-clave')
      }
    }
    return {
      openModalForChangePassword,
    }
  },
}
</script>
