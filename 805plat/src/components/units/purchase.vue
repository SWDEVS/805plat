<template>
  <div class="purchase-modal" v-show="showpurchase">
    <div class="modal-content">
      <div class="title">获取金豆</div>
      <div class="close-block" @click="purchaseclose">
        <i class="iconfont icon-close"></i>
      </div>
      <div class="top-block">
        <div class="block-l">我的金豆:{{payitem.ingot}}</div>
        <div class="block-r">每日充值限额:{{payitem.pay_max}}元</div>
      </div>
      <div class="marquee-block">
        <div class="icon-block">
          <i class="iconfont icon-loud-speaker"></i>
        </div>
        <div class="tip-block">
          <div class="text">适度游戏理性消费。游戏仅限娱乐，请勿过度沉迷</div>
        </div>
      </div>
      <div class="list-block">
        <div class="purchase-item" v-for="item in payitem.list" :key="item.id">
          <div class="item-icon">
            <img :src="item.icon"/>
          </div>
          <div class="item-bean">{{item.ingot | formatNumberRgx}}金豆</div>
          <div class="item-amount" @click="createorder(item.id)">
            <button class="btn-purchase">￥{{item.money}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {},
  data() {
    return {
      payitem: []
    };
  },
  created() {
    this.getpayitem();
    
    this.wxstart();
  },
  computed: {
    ...mapState({
      showpurchase: state => state.purchase.status
    })
  },
  methods: {
    purchaseclose() {
      this.$store.dispatch("_showPurchase", false);
    },
    async getpayitem() {
      let payitemlist = await this.$get(this.$api.getpayitem, {});
      this.payitem = payitemlist;
    },
    async wxstart() {
      let config = await this.$get(this.$api.getwxconfig, {
        url: window.location.href
      });
      this.$wx.config({
        beta: true,
        debug: false,
        appId: config.appid,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: ["getBrandWCPayRequest"]
      });
    },
    async createorder(product_id) {
      
      let param = {
        pay_num: 1,
        pay_type: 3,
        product_id,
        product_type: 1
      };
      let order = await this.$post(this.$api.createorder, param);
      let orderconfig = await this.$post(this.$api.getpayconfig, {
        order_no: order.orderno
      });
      if (orderconfig.data.jsApiParameters) {
        orderconfig = orderconfig.data.jsApiParameters;
      }else{
        this.toast = this.$createToast({
			        txt: '订单创建失败',
			        type: 'txt'
			    })
			    this.toast.show();
      }

      this.$wx.invoke(
        "getBrandWCPayRequest",
        {
          appId: orderconfig.appId, //公众号名称，由商户传入
          timeStamp: orderconfig.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: orderconfig.nonceStr, //随机串
          package: orderconfig.packAge,
          signType: "MD5", //微信签名方式
          paySign: orderconfig.signType //微信签名
        },
        function(res) {
          var a = JSON.stringify(res);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
          } else {
          } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        }
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.purchase-modal {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  .modal-content {
    width: 620px;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: $size-radius;
    transform: translate(-50%, -50%);
    background: #fff;
    height: 64vh;
    padding: 40px;

    .title {
      position: absolute;
      top: -80px;
      padding-top: 24px;
      height: 142px;
      width: 520px;
      background: url('assets/images/title-luck.png');
      background-repeat: no-repeat;
      background-size: cover;
      font-size: 46px;
      color: #fff;
      text-align: center;
    }

    .close-block {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      padding: $padding-s;

      .iconfont {
        font-size: $size-icon-m;
        color: $color-light-grey;
      }
    }

    .top-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 0;
      margin-top: 32px;
      font-size: $size-s;
      white-space: nowrap;

      .block-l {
        color: #9a3600;
      }

      .block-r {
        color: #e28623;
      }
    }

    .marquee-block {
      width: 100%;
      background: #fdecbf;
      color: #dfa25a;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      margin: $padding-l 0;
      display: flex;
      justify-content: space-between;

      .icon-block {
        width: 60px;
        text-align: center;

        .iconfont {
          color: #dfa25a;
          font-size: $size-icon-m;
        }
      }

      .tip-block {
        flex: 1;
        color: #dfa25a;
        overflow: hidden;
        position: relative;

        .text {
          left: 0;
          font-size: $size-xs;
          -webkit-animation: marquee 15s linear infinite;
          animation: marquee 10s linear infinite;
          white-space: nowrap;
        }
      }

      @keyframes marquee {
        0% {
          transform: translatex(0);
        }

        100% {
          transform: translatex(-260px);
        }
      }
    }

    .list-block {
      width: 100%;
      height: calc(100% - 120px);
      overflow-y: auto;

      .purchase-item {
        height: 110px;
        width: 100%;
        padding: 0 $padding-s;
        border-bottom: 1px solid #fdefd5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $size-s;

        .item-icon {
          width: 60px;
          height: 60px;
          // background: url('assets/images/ingot.png') no-repeat;
          // background-size: 100%;
          img{
            width:100%;
          }
        }

        .item-bean {
          flex: 1;
          color: #9a3600;
          padding: 0 $padding-l;
        }

        .item-amount {
          width: 100px;

          .btn-purchase {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: $color-regular-blue;
            border-radius: 20px;
            color: #fff;
            border: none;
          }
        }
      }
    }
  }
}
</style>