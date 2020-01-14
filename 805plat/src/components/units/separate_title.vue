<template>
  <div class="separate-container">
    <div class="separate-line"></div>
    <div class="title-block">
      <slot name="icon">
        <span class="iconfont" :class="icon"></span>
      </slot>
      <slot name="title">
        <span>{{title}}</span>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      default: "icon-ingot"
    },
    title: {
      default: ""
    }
  }
};
</script>
<style lang="stylus" scoped>
.separate-container {
  width: $width-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 64px;
  position: relative;

  .title-block {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: $size-m;
    color: $color-regular-blue;
    padding: 0 40px;
    background: $color-bg;
    display: flex;
    align-items: center;

    .iconfont {
      font-size: $size-l;
      margin-right: $padding-s;
    }
  }

  .separate-line {
    height: 4px;
    width: 100%;
    background: $color-regular-blue;
  }
}
</style>