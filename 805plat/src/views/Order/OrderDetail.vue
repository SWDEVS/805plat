<template>
  <div>
    <Xheader title="订单详情" :back="true"></Xheader>
    <Xcont :header="true">
      <div class="img-container">
        <img :src="goodsdetail.goods_cover">
      </div>
      <div class="detail-container">
        <div class="info-list">
          <div class="info-row">
            <div class="title">奖品状态</div>
            <div class="txt" :style="'color:'+statuscolor">{{statusstr}}</div>
          </div>
          <div class="info-row">
            <div class="title">订单号码</div>
            <div class="txt">{{orderdetail.order_no}}</div>
          </div>
          <div class="info-row">
            <div class="title">订单时间</div>
            <div class="txt">{{orderdetail.create_time|timestampToDate}}</div>
          </div>
          <div class="info-row">
            <div class="title">订单来源</div>
            <div class="txt">{{orderdetail.channel_id|sourceformat}}</div>
          </div>
          <div class="info-row">
            <div class="title">消耗积分</div>
            <div class="txt">{{orderdetail.use_num|formatNumberRgx}}</div>
          </div>
          <div class="info-row">
            <div class="title">手机号码</div>
            <div class="txt">{{subjoin.receive_phone}}</div>
          </div>
        </div>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import { mapState } from "vuex";
const statusobj = {
  "2": { name: "处理中", color: "blue" },
  "3": { name: "失败", color: "red" },
  "4": { name: "关闭", color: "gray" },
  "5": { name: "未中奖", color: "gray" },
  "6": { name: "未领奖", color: "red" },
  "7": { name: "已发放", color: "green" },
  "8": { name: "拒绝", color: "red" }
};
export default {
  name: "OrderDetail",
  components: {
    Xheader,
    Xcont
  },
  data() {
    return {
      orderdetail: {},
      goodsdetail: {},
      subjoin: {},
      statuscolor: "",
      statusstr: ""
    };
  },
  async created() {
    let orderid = this.$route.params.orderid;
    await this.getpurchasedetail(orderid);
  },
  methods: {
    async getpurchasedetail(orderid) {
      let orderdetail = await this.$get(this.$api.getorderdetail, {
        orderid
      });
      this.orderdetail = orderdetail.data;
      this.goodsdetail = orderdetail.goods;
      this.subjoin = orderdetail.subjoin;

      this.statuscolor = statusobj[orderdetail.data.status].color;
      this.statusstr = statusobj[orderdetail.data.status].name;
    }
  },

  filters: {
    sourceformat(sourceid) {
      let sourceobd = {
        0: "领奖",
        1: "夹娃娃",
        2: "后台",
        3: "活动",
        4: "英雄榜"
      };
      return sourceobd[sourceid];
    }
  }
};
</script>

<style lang="stylus" scoped>
.img-container {
  margin: $padding-l $padding-m;
  height 50vw;
  width: $width-content;
  background: #fff;
  border-radius: $size-radius;
  display flex;
  justify-content center;
  align-items center;
  padding $padding-m
  img{
    max-width 100%;
    max-height 100%;
  }
}

.detail-container {
  margin: $padding-l $padding-m;
  width: $width-content;
  background: #fff;
  border-radius: $size-radius;

  .info-list {
    width: calc(100% - 40px);
    margin: 0 auto;
    color: $color-deep;

    .info-row {
      height: 110px;
      display: flex;
      border-bottom: 1px solid $color-border;
      align-items: center;

      .title {
        width: 190px;
        padding-left: $padding-s;
      }

      .txt {
        flex: 1;
        color: $color-shallow;

        .iconfont {
          font-size: $size-icon-s;
          color: $color-regular-blue;
        }
      }
    }

    .info-row:last-child {
      border-bottom: none;
    }
  }
}
</style>