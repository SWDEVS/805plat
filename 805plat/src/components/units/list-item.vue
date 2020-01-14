<template>
  <div>
    <div class="list-item">
      <div class="item-l">
        <div class="title">
          <slot name="title">{{title}}</slot>
        </div>
        <div class="num">
          <slot name="time">{{time}}</slot>
        </div>
      </div>
      <div class="item-r">
        <slot name="num">{{num|formatNumberRgx}}</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: "官方赠送：测试"
    },
    time: {
      default: "2019-12-30 12:30"
    },
    num: {
      default: "100000"
    }
  }
};
</script>
<style lang="stylus" scoped>
.list-item {
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $color-border;

  .item-l {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-size: $size-s;
      color: $color-deep;
      margin-bottom: $padding-s;
    }

    .num {
      font-size: $size-xs;
      color: $color-shallow;
    }
  }

  .item-r {
    width: 150px;
    text-align: right;
    color: $color-regular-blue;
    font-size: $size-xs;
  }
}
</style>