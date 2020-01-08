<template>
  <div>
    <Xheader
      title="领奖"
      :back="isjump"
      right="icon-history-record"
      @rightClick="navigate('/order/Orderlist')"
    ></Xheader>
    <Xcont :header="true">
      <div class="container">
        <div class="tab-container">
          <cube-tab-bar
            class="tab-rank"
            v-model="selectedLabel"
            show-slider
            inline
            @click="clickHandler"
          >
            <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
              <div class="tab-title" slot="default">{{item.value}}</div>
            </cube-tab>
          </cube-tab-bar>
        </div>
        <!-- 组件 -->
        <keep-alive>
          <compoent :is="isCompoent"></compoent>
        </keep-alive>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import coupons from "@/views/Rewards/Coupons.vue";
import commodity from "@/views/Rewards/Commodity.vue";
import { localData } from "@/common/plugins/filters.js";
export default {
  name: "Rewards",
  components: {
    Xheader,
    Xcont,
    coupons,
    commodity
  },
  data() {
    return {
      name: "",
      selectedLabel: 0,
      isjump: false,
      tabs: [
        {
          label: 0,
          value: "优惠券"
        },
        {
          label: 1,
          value: "实物商品"
        }
      ],
      isCompoent: "coupons"
    };
  },
  methods: {
    clickHandler: function(label) {
      this.selectedLabel = label;
      this.isCompoent = this.selectedLabel ? "commodity" : "coupons";
    },
    navigate: function(path) {
      this.$router.push(path);
    }
  },
  created() {
    if (this.$route.query.isjump) {
      this.isjump = true;
    }
    let selectedLabel = localData("get", "selectedLabel");
    if (selectedLabel == 1) {
      this.selectedLabel = Number(selectedLabel);
      this.isCompoent = "commodity";
    }
  },
  destroyed() {
    localData("set", "selectedLabel", this.selectedLabel);
  }
};
</script>
<style lang="stylus" scoped>
.container {
  background-color: #eee;
}
</style>