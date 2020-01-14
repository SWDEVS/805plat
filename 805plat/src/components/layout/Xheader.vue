<template>
  <header>
    <div class="left" @click="handleLeft">
      <slot name="left" v-if="back">
        <span class="iconfont icon-arrow-left"></span>
      </slot>
    </div>
    <div class="title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="right" @click="handleRight">
      <slot name="right">
        <span class="iconfont" :class="right"></span>
      </slot>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    bgc: {
      default: "#FF6C18"
    },
    color: {
      default: "white"
    },
    title: {
      default: ""
    },
    back: {
      type: Boolean,
      default: true
    },
    routerBack: {
      type: Boolean,
      default: true
    },
    right: {
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    handleLeft() {
      this.$emit("leftClick");
      if (this.routerBack === false) {
        return;
      }
      if (this.back) {
        if (window.history.length <= 1) {
          this.$router.push("/");
        } else {
          this.$router.back();
        }
      }
    },
    handleRight() {
      this.$emit("rightClick");
    }
  }
};
</script>
<style lang="stylus" scope>
header {
  width: 100%;
  height: $height-header;
  // line-height: $height-header;
  background: #F82A31;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  position: fixed;
  font-size: $size-m;
  top: 0;
  color: #fff;
  z-index: 999;

  .left, .right {
    width: 90px;
    text-align: center;
  }

  .title {
    flex: 1;
    text-align: center;
  }

  .iconfont {
    font-size: 48px;
  }
}
</style>