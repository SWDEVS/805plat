<template>
  <div class="empty-block">
    <span v-if="icon" class="iconfont" :class="icon"></span>
    <slot>
        <span>{{tip}}</span>
    </slot>
    
  </div>
</template>
<script>
export default {
  props: {
    tip: {
      default: ""
    },
    icon: {
      default: ""
    }
  }
};
</script>
<style lang="stylus" scoped>
  .empty-block {
    height: 495px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-shallow;

    .iconfont {
      font-size: 140px;
      margin-bottom: $padding-s;
    }
  }
</style>