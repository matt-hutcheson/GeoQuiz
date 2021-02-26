<template>

</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'geoNav',
  props: ['currentMode'],

  methods: {
    handleClick: function(change) {
      eventBus.$emit('mode-changed', change);
      this.imageIsHidden = true;
    },
  },
  data() {
    return {
      imageIsHidden: false
    }
  }
}
</script>

<style scoped>



</style>


