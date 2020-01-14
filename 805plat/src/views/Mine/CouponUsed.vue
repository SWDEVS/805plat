<template>
  <div>
    <Xheader title="优惠券二维码"></Xheader>
    <Xcont :header="true">
      <div class="container">
        <div class="qrcode-container">
          <div class="qrcode-title">{{sname}}</div>
          <div class="coupon-name">{{cname}}</div>
          <div class="qrcode-tip">
            <p>优惠券使用成功！</p>
          </div>
        </div>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
export default {
  name: "CouponUsed",
  components: {
    Xheader,
    Xcont
  },
  data() {
    return {
      sn: "",
      qrcode: "",
      sname: "",
      cname: ""
    };
  },
  created() {
   
    let { sn, sname, cname } = this.$route.params;
    let coupon = {
      sn,
      sname,
      cname
    };
    this.sn = sn;
    this.sname = sname;
    this.cname = cname;
    localStorage.setItem("coupon", JSON.stringify(coupon));
   
  },
  computed: {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.container {
  padding-top: 80px;

  .qrcode-container {
    width: 600px;
    height: 826px;
    margin: 0 auto;
    background: url('assets/images/T_ok01.png');
    background-size: 100%;
    color: #fff;
    padding-top: 290px;

    .qrcode-title {
      width: 580px;
      margin: 0 auto 0;
      text-align: center;
      line-height: 120px;
      margin-bottom: $padding-l;
    }

    .coupon-name {
      width: 100%;
      height 100px;
      text-align: center;
      font-size: $size-xl;
      margin-bottom: $padding-m;
    }

    .qrcode-tip {
      width: 500px;
      margin: 40px auto 0;
      text-align: center;

      p:first-child {
        margin-bottom: $padding-s;
      }
    }
  }
}
</style>