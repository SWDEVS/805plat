<template>
  <div>
    <Xheader title="个人中心" :back="false" right="icon-gear" @rightClick="navigate('/mine/setting')"></Xheader>
    <Xcont :header="true">
      <div class="user-info">
        <div class="banner" @click="navigate('/mine/setting')">
          <div class="avartar">
            <img :src="userinfo.face_src" />
          </div>
          <div class="nickname-block">
            <div class="nickname">{{userinfo.nick_name}}</div>
            <div class="account">ID:{{userinfo.user_id}}</div>
          </div>
        </div>
        <div class="detail-block">
          <div class="top-block">
            <div class="title">已为我节省</div>
            <div class="num">
              <span>￥</span>
              {{userinfo.coup_price | fmoney}}
            </div>
          </div>
          <div class="bottom-block">
            <div class="item" @click="navigate('/mine/bean')">
              <div class="title">
                <span>
                  金豆
                  <i class="iconfont icon-ingot"></i>
                </span>
                <i class="iconfont icon-arrow-right"></i>
              </div>
              <div class="num">{{userinfo.ingot|formatNumberRgx}}</div>
            </div>
            <div class="item" @click="navigate('/mine/point')">
              <div class="title">
                <span>
                  积分
                  <i class="iconfont icon-diamond"></i>
                </span>
                <i class="iconfont icon-arrow-right"></i>
              </div>
              <div class="num">{{userinfo.ticket|formatNumberRgx}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-block">
        <ul class="list">
          <li class="item" @click="navigate('/mine/Coupon')">
            <span class="item-icon">
              <i class="iconfont icon-coupon"></i>
            </span>
            <span class="item-text">优惠券</span>
            <span class="item-arrow">
              <i class="iconfont icon-arrow-right"></i>
            </span>
          </li>

          <li class="item" @click="navigate('/mine/PurchaseList')">
            <span class="item-icon">
              <i class="iconfont icon-wallet"></i>
            </span>
            <span class="item-text">充值</span>
            <span class="item-arrow">
              <i class="iconfont icon-arrow-right"></i>
            </span>
          </li>
          <li class="item" @click="navigate('/order/Orderlist')">
            <span class="item-icon">
              <i class="iconfont icon-menu"></i>
            </span>
            <span class="item-text">商品订单记录</span>
            <span class="item-arrow">
              <i class="iconfont icon-arrow-right"></i>
            </span>
          </li>
        </ul>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import { mapState } from "vuex";
export default {
  name: "Mine",
  components: {
    Xheader,
    Xcont
  },
  data() {
    return {
      userinfo: ""
    };
  },
  created() {
    this.getuserinfo();
  },
  computed: {
    ...mapState({
      baseinfo: state => state.baseinfo.baseinfo,
      token: state => state.user.token
    })
  },
  methods: {
    async getuserinfo() {
      let userinfo = await this.$post(this.$api.getuserinfo, {});
      this.userinfo = userinfo;
      let baseinfo = {
        ingot: userinfo.ingot,
        ticket: userinfo.ticket
      };
      this.$store.dispatch("_currentBaseinfo", baseinfo);
    },
    // async getbasenfo() {
    //   let baseinfo = await this.$post(this.$api.getbasenfo, {});
    //   console.log(baseinfo);
    // },
    navigate(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="stylus" scoped>
.user-info {
  width: $width-content;
  margin: $padding-s $padding-m 0;
  border-radius: $size-radius;
  background: #fff;

  .banner {
    padding: $padding-m;
    display: flex;
    justify-content: flex-start;
    margin-bottom: $padding-s;

    .avartar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-right: $padding-m;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .nickname-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 120px;

      .nickname {
        color: $color-deep;
        font-size: $size-m;
        margin-bottom: $padding-l;
      }

      .account {
        color: $color-shallow;
        font-size: $size-xs;
      }
    }
  }

  .detail-block {
    height: 319px;
    border-radius: $size-radius;
    background-image: url('assets/images/T_bg01.png');
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    padding: 40px 60px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-block {
      width: 100%;

      .title {
        margin-bottom: $padding-l;
      }

      .num {
        margin-top: 40px;

        span {
          font-size: $size-m;
        }

        font-size: $size-xl;
      }
    }

    .bottom-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: $size-s;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 70px;
        width: 50%;
        font-size: $size-s;

        .title {
          display: flex;
          align-items: center;
          height: 38px;

          span {
            margin-right: $padding-l;
          }

          .iconfont {
            font-size: $size-m;
          }
        }

        .num {
        }
      }
    }
  }
}

.list-block {
  width: $width-content;
  background: #fff;
  border-radius: $size-radius $size-radius 0 0;
  margin: $padding-xxl auto 0;
  height: calc(100vh - 615px);
  overflow-y: auto;

  .list {
    width: 100%;
    padding: $padding-l $padding-xxxl;

    .item {
      width: 100%;
      height: 110px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid $color-border;

      &-icon {
        width: 80px;

        .iconfont {
          font-size: $size-icon-l;
          color: $color-deep;
        }
      }

      &-text {
        flex: 1;
        color: $color-deep;
      }

      &-arrow {
        width: 80px;
        text-align: right;

        .iconfont {
          font-size: $size-icon-m;
          color: $color-border;
        }
      }
    }
  }
}
</style>