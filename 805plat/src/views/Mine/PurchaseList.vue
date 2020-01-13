<template>
  <div>
    <Xheader title="充值" :back="true"></Xheader>
    <Xcont :header="true">
      <div class="banner">
        <div class="title-banner">
          <div class="title">
            我的金豆
            <i class="iconfont icon-ingot"></i>
          </div>
          <div class="num">{{baseinfo.ingot|formatNumberRgx}}</div>
        </div>
        <div class="btn-block">
          <button class="btn-banner" @click="purchasehandle"></button>
        </div>
        <div class="tip">金豆在游戏中流通,可以通过充值和游戏内获得</div>
      </div>
      <Stitle title="充值记录"></Stitle>
      <div class="list-block">
        <div class="list-container">
          <div class="list-head">
            <div class="head-item">金额</div>
            <div class="head-item">金豆</div>
            <!-- <div class="head-item">附赠金豆</div> -->
            <div class="head-item">交易状态</div>
            <div class="head-item">时间</div>
          </div>
          <template v-if="purchaselist.length>0">
            <div
              class="list-row"
              v-for="item in purchaselist"
              :key="item.order_no"
              @click="godetail(item.order_no)"
            >
              <div class="row-item">
                <i class="iconfont icon-money"></i>
                {{item.money|formatmoney}}
              </div>
              <div class="row-item">{{item.total_ingot|formatNumberRgx}}</div>
              <!-- <div class="row-item">{{item.mg_charm|formatNumberRgx}}</div> -->
              <div
                class="row-item"
                :class="item.pay_status=='2'?'txt-success':item.pay_status=='3'?'txt-danger':''"
              >{{item.pay_status|formatstatus}}</div>
              <div class="row-item">{{item.create_time}}</div>
            </div>
          </template>
          <Empty :tip="tip" v-else></Empty>
        </div>
      </div>
    </Xcont>
    <Purchase :showpurchase="showpurchase" @freshlist="freshlist"></Purchase>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import Stitle from "@/components/units/separate_title.vue";
import ListItem from "@/components/units/list-item.vue";
import Empty from "@/components/units/empty-block.vue";
import Purchase from "@/components/units/purchase.vue";
import { mapState } from "vuex";
export default {
  name: "PurchaseList",
  components: {
    Xheader,
    Xcont,
    Stitle,
    ListItem,
    Empty,
    Purchase
  },
  data() {
    return {
      page: 1,
      tip: "最近暂无充值记录~",
      purchaselist: []
    };
  },
  created() {
    this.getpurchaselist();
  },
  computed: {
    ...mapState({
      showpurchase: state => state.purchase.status,
      baseinfo: state => state.baseinfo.baseinfo
    })
  },
  methods: {
    purchasehandle() {
      this.$store.dispatch("_showPurchase", true);
    },

    async getpurchaselist() {
      let param = {
        page: this.page
      };
      let purchaselist = await this.$get(this.$api.getpurchaselist, param);
      this.purchaselist = this.purchaselist.concat(purchaselist.pay_list);
      this.page += 1;
    },
    godetail(orderno) {
      this.$router.push({
        name: "PurchaseDetail",
        params: {
          orderno
        }
      });
    },
    freshlist(msg) {
      this.toast = this.$createToast({
        txt: msg,
        type: "txt"
      });
      this.toast.show();
      this.page = 1;
      this.purchaselist.length = 0;
      this.getpurchaselist(); //刷新列表
    }
  }
};
</script>

<style lang="stylus" scoped>
.banner {
  height: 319px;
  border-radius: $size-radius;
  background-image: url('assets/images/T_bg02.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: $width-content;
  padding: 40px 50px;
  margin: $padding-s auto;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: $size-s;

  .title-banner {
    .title {
      height: 40px;
      display: flex;
      align-items: center;

      .iconfont {
        font-size: $size-l;
        margin-left: 5px;
      }
    }

    .num {
      margin-top: $padding-m;
      font-size: $size-xl;
    }
  }

  .tip {
    width: 100%;
    text-align: center;
  }

  .btn-block {
    width: 100%;
    text-align: center;

    .btn-banner {
      width: 320px;
      height: 58px;
      background: url('assets/images/T_buttom02.png');
      border: none;
      background-size: cover;
    }
  }
}

.list-container {
  margin: 0 auto;
  padding-bottom: $padding-l;

  .list-head {
    width: calc(100% - 40px);
    height: 80px;
    line-height: 80px;
    margin: 0 $padding-l;
    display: flex;
    justify-content: space-between;
    font-size: $size-s;
    color: $color-deep;
    border-bottom: 1px solid $color-regular-blue;

    .head-item {
      text-align: center;
      flex: 1;
    }

    .head-item:first-child {
      width: 80px;
      flex: none;
    }

    .head-item:last-child {
      width: 160px;
      flex: none;
    }
  }

  .list-row {
    width: calc(100% - 40px);
    height: 80px;
    line-height: 80px;
    margin: 0 $padding-l;
    display: flex;
    justify-content: space-between;
    font-size: $size-s;
    color: $color-shallow;
    border-bottom: 1px solid $color-border;

    .row-item {
      flex: 1;
      text-align: center;
      white-space: nowrap;

      .iconfont {
        color: $color-regular-blue;
      }
    }

    .row-item:first-child {
      width: 80px;
      flex: none;
    }

    .row-item:last-child {
      width: 160px;
      flex: none;
    }
  }
}
</style>