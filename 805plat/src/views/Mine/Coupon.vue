<template>
  <div>
    <Xheader title="我的优惠券" :back="true"></Xheader>
    <Xcont :header="true">
      <div class="container">
        <div class="tab-container">
          <cube-tab-bar class="tab-rank" v-model="selectedLabel" show-slider inline>
            <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
              <!-- <i slot="icon" class="tab-icon" :class="item.icon"></i> -->
              <div class="tab-title" slot="default">{{item.label}}</div>
            </cube-tab>
          </cube-tab-bar>
        </div>
        <div class="list-container">
          <cube-tab-panels v-model="selectedLabel">
            <cube-tab-panel v-for="(item,index) in tabs" :label="item.label" :key="item.label">
              <template v-if="item.list.length>0">
                <dl v-for="store in item.list" :key="store.company_id">
                  <dt>
                    <div class="company-name">{{store.company_name}}</div>
                    <div class="company-address">
                      <span class="iconfont icon-location"></span>
                      {{store.address}}
                    </div>
                  </dt>
                  <dd v-for="coupon in store.coups" :key="coupon.sn" :class="index==0?'':'gray'">
                    <div class="coupon-l">
                      <img :src="coupon.cover" />
                    </div>
                    <div class="coupon-c">
                      <div class="title">{{store.company_name}}</div>
                      <div class="pro">{{coupon.coup_name}}</div>
                      <div class="expired">有效期：{{coupon.expired|timestampToDate}}</div>
                    </div>
                    <div class="coupon-r">
                      <template v-if="index==0">
                        <div
                          class="btn-coupon"
                          @click="gouse(coupon.sn,store.company_name,coupon.coup_name)"
                        >{{index==0?'立即使用':index==1?'已使用':'已过期'}}</div>
                      </template>
                      <template v-else>
                        <div class="btn-coupon">{{index==0?'立即使用':index==1?'已使用':'已过期'}}</div>
                      </template>
                    </div>
                  </dd>
                </dl>
              </template>
              <Empty icon="icon-coupon-text" tip="亲，暂无优惠券哦~" v-else></Empty>
            </cube-tab-panel>
          </cube-tab-panels>
        </div>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import Empty from "@/components/units/empty-block.vue";
export default {
  name: "Coupon",
  components: {
    Xheader,
    Xcont,
    Empty
  },
  data() {
    return {
      selectedLabel: "可使用",
      tabs: [
        {
          label: "可使用",
          list: {}
        },
        {
          label: "已使用",
          list: {}
        },
        {
          label: "已过期",
          list: {}
        }
      ]
    };
  },
  async created() {
    let usecoupon = await this.getcouponlist("1");
    let usedcoupon = await this.getcouponlist("2");
    let timeoutcoupon = await this.getcouponlist("3");
    this.tabs[0].list = usecoupon.list;
    this.tabs[1].list = usedcoupon.list;
    this.tabs[2].list = timeoutcoupon.list;
  },
  methods: {
    async getcouponlist(status) {
      let coupons = await this.$get(this.$api.getmycoupon, { status });
      return coupons;
    },
    gouse(sn, sname, cname) {
      this.$router.push({
        name: "Couponcode",
        params: {
          sn: sn,
          sname: sname,
          cname: cname
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.container {
}

.list-container {
  height: calc(100% - 80px);
  overflow-y: auto;

  dl {
    width: 100%;

    dt {
      width: 100%;
      padding: $padding-m;

      .company-name {
        color: $color-deep;
        margin-bottom: $padding-s;
      }

      .company-address {
        color: $color-shallow;
        font-size: $size-xs;

        .iconfont {
          font-size: $size-m;
        }
      }
    }

    dd {
      width: 100%;
      background: url('assets/images/T_yhj01.png');
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
      height: 210px;
      padding: $padding-m $padding-m $padding-m $padding-l;
      display: flex;
      margin-bottom: 32px;

      .coupon-l {
        width: 243px;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          border-radius: $padding-s;
        }
      }

      .coupon-c {
        width: 270px;
        height: 100%;
        position: relative;
        padding: $padding-s 0 $padding-s $padding-m;

        .title {
          width: 100%;
          font-size: 36px;
          color: #a55520;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 40px;
          line-height: 40px;
        }

        .pro {
          position: absolute;
          width: 204px;
          text-align: center;
          top: 62px;
          right: 50px;
          height: 40px;
          line-height: 40px;
          color: #fff;
          font-size: $size-xs;
        }

        .expired {
          margin-top: 100px;
          color: #cf7b48;
          font-size: $size-xs;
        }
      }

      .coupon-r {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a55520;
        font-size: 36px;
        cursor: pointer;
        line-height: 50px;

        .btn-coupon {
          width: 80px;
        }
      }
    }

    dd.gray {
      filter: grayscale(100%);

      .btn-coupon {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>