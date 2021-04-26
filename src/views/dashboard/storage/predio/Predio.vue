<template>
  <b-card>
    <ubigeo-component
      colmd="6"
      collg="4"
      @selected-district="selectedDistrict"
    />
  </b-card>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import UbigeoComponent from '@/components/UbigeoComponent.vue'

export default {
  name: 'Predio',
  components: {
    BCard,
    UbigeoComponent,
  },
  setup() {
    const selectedDistrict = _id => {
      console.log(_id)
    }
    return {
      selectedDistrict,
    }
  },
}
</script>
