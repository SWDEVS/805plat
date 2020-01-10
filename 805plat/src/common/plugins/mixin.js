import Vue from 'vue'
import {
  mapState
} from 'vuex'
export default () => {
  Vue.mixin({
    computed: {
      ...mapState({
        currentUser: state => state.user.token,
      }),
    },
    methods: {
      //获取微信配置
      async getwxconfig() {

        let config = await this.$get(this.$api.getwxconfig, {
          url: window.location.href
        });
        return config;
      },

      //设置微信配置
      async setwxconfig(config) {
        this.$wx.config({
          beta: true,
          debug: false,
          appId: config.appid,
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          signature: config.signature,
          jsApiList: ["getBrandWCPayRequest", "showMenuItems", "hideMenuItems"]
        });
      },

      //创建订单
      async createOrder(product_id,product_type) {
        //product_type
        //1:金豆
        //2:礼包
        //3:优惠券
        //4:实物
        let param = {
          pay_num: 1,
          pay_type: 3,
          product_id,
          product_type
        };
        let order = await this.$post(this.$api.createorder, param);
        let orderconfig = await this.$post(this.$api.getpayconfig, {
          order_no: order.orderno
        });
        return orderconfig;
      },

      //调起支付
      async payup(orderconfig) {
        this.$wx.invoke(
          "getBrandWCPayRequest",
          {
            appId: orderconfig.appId, //公众号名称，由商户传入
            timeStamp: orderconfig.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: orderconfig.nonceStr, //随机串
            package: orderconfig.package,
            signType: orderconfig.signType, //微信签名方式
            paySign: orderconfig.paySign //微信签名
          },
          async function (res) {
            return res;
          }
        )
      }
    }
  })

}