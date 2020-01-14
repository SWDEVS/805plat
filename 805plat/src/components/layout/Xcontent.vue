<template>
  <div class="x-cont" :style="`padding-top: ${margintop}; `">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    header: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },

  computed: {
    margintop(){
       return this.header?'12.5vw':0;
    }
  }
};
</script>
<style lang="stylus" scope>
.x-cont {
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}
</style>