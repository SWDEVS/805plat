<template>
  <div>
    <Xheader title="优惠券二维码"></Xheader>
    <Xcont :header="true">
      <div class="container">
        <div class="qrcode-container">
          <div class="qrcode-title">{{sname}}|{{cname}}</div>
          <div class="qrcode-img">
            <img :src="qrcode" />
          </div>
          <div class="qrcode-tip">
            <p>请出示优惠券二维码完成优惠</p>
            <p>id:{{sn}}</p>
          </div>
        </div>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import QRCode from "qrcode";
let scanlisten;
export default {
  name: "Couponcode",
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
    this.createqrcode(sn);
    this.scanlistener();
  },
  destroyed() {
    clearInterval(scanlisten);
  },
  computed: {},
  methods: {
    createqrcode(sn) {
      QRCode.toDataURL(sn)
        .then(url => {
          this.qrcode = url;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async getcoupondetail() {
      let param = {
        sn: this.sn
      };
      let coupon = await this.$get(this.$api.getcoupondetail, param);
      return coupon;
    },
    scanlistener() {
      scanlisten = setInterval(async () => {
        let coupon = await this.getcoupondetail();
        if (coupon.status == 2) {
          this.$router.replace({
            name: "CouponUsed",
            params: {
              sn: this.sn,
              sname: this.sname,
              cname: this.cname
            }
          });
        }
      }, 1000);
    }
  }
};
</script>
<style lang="stylus" scoped>
.container {
  padding-top: 80px;

  .qrcode-container {
    width: 600px;
    height: 700px;
    margin: 0 auto;
    background: url('assets/images/T_wem_bg.png');
    background-size: 100%;
    color: #fff;

    .qrcode-title {
      width: 580px;
      margin: 0 auto;
      text-align: center;
      height: 120px;
      line-height: 120px;
    }

    .qrcode-img {
      width: 420px;
      margin: 0 auto;

      img {
        border-radius: 30px;
        width: 100%;
      }
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