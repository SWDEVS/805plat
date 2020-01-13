<template>
  <div>
    <Xheader title="积分明细" :back="true"></Xheader>
    <Xcont :header="true">
      <div class="banner">
        <div class="title-banner">
          <div class="title">
            我的积分
            <i class="iconfont icon-diamond"></i>
          </div>
          <div class="num">{{baseinfo.ticket|formatNumberRgx}}</div>
        </div>
        <div class="btn-block">
          <button class="btn-banner"></button>
        </div>
        <div class="tip">积分用于兑换实物和优惠券,积分在游戏中产出</div>
      </div>
      <Stitle title="积分明细" icon="icon-diamond"></Stitle>
      <div class="list-block">
        <div class="tab-container">
          <cube-tab-bar
            class="tab-rank"
            v-model="selectedLabel"
            show-slider
            inline
            @change="changeHandler"
          >
            <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
              <i slot="icon" class="iconfont" :class="item.icon"></i>
              <div class="tab-title" slot="default">{{item.label}}</div>
            </cube-tab>
          </cube-tab-bar>
        </div>
        <div class="list-container">
          <cube-tab-panels v-model="selectedLabel">
            <cube-tab-panel v-for="item in tabs" :label="item.label" :key="item.label">
              <div class="scroll-list-wrap">
                <cube-scroll
                  v-if="item.list.length>0"
                  :ref="item.tabname"
                  @pulling-up="onPullingUp"
                  :data="item.list"
                  :options="options"
                >
                  <template>
                    <ListItem
                      v-for="(recorditem,index) in item.list"
                      :key="index"
                      :title="recorditem.reason"
                      :time="recorditem.time"
                      :num="recorditem.ticket"
                    ></ListItem>
                  </template>
                </cube-scroll>
                <Empty :tip="tip" v-else></Empty>
              </div>
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
import Stitle from "@/components/units/separate_title.vue";
import ListItem from "@/components/units/list-item.vue";
import Empty from "@/components/units/empty-block.vue";
import { mapState } from "vuex";
export default {
  name: "Point",
  components: {
    Xheader,
    Xcont,
    Stitle,
    ListItem,
    Empty
  },
  data() {
    return {
      incomepage: 1,
      paypage: 1,
      selectedLabel: "收入",
      tabs: [
        {
          label: "收入",
          tabname: "income",
          icon: "icon-shouru",
          list: []
        },
        {
          label: "支出",
          tabname: "pay",
          icon: "icon-zhichu",
          list: []
        }
      ],
      tip: "最近暂无收入记录~",
      options: {
        pullUpLoad: {
          threshold: 60,
          txt: {
            more: "获取更多记录",
            nomore: "没有更多记录"
          }
        },
        scrollbar: true
      }
    };
  },
  async created() {
    let incomelist = await this.getincomelist();
    let paylist = await this.getpaylist();
    this.tabs[0].list = incomelist.list;
    this.tabs[1].list = paylist.list;
  },
  computed: {
    ...mapState({
      baseinfo: state => state.baseinfo.baseinfo
    })
  },
  methods: {
    changeHandler(label) {
      this.tip = `最近暂无${label}记录~`;
    },
    async getincomelist() {
      let param = {
        type: 1,
        page: this.incomepage
      };
      let incomelist = await this.$get(this.$api.getpointlist, param);

      this.incomepage += 1;
      return incomelist;
    },

    async getpaylist() {
      let param = {
        type: 2,
        page: this.paypage
      };
      let paylist = await this.$get(this.$api.getpointlist, param);

      this.paypage += 1;
      return paylist;
    },
    
    async onPullingUp() {
      if (this.selectedLabel == "收入") {
        let incomelist = await this.getincomelist();
        if (incomelist.list) {
          this.tabs[0].list = this.tabs[0].list.concat(incomelist.list);
        } else {
          this.$refs.income.forceUpdate();
        }
      } else {
        let paylist = await this.getpaylist();
        if (paylist.list) {
          this.tabs[1].list = this.tabs[1].list.concat(paylist.list);
        } else {
          this.$refs.pay.forceUpdate();
        }
      }
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
      background: url('assets/images/T_buttom03.png');
      border: none;
      background-size: cover;
      display: none;
    }
  }
}

.list-container {
  width: calc(100% - 120px);
  margin: 0 auto;
  padding-bottom: $padding-l;
  height: calc(100vh - 640px);
  overflow-y: hidden;

  .scroll-list-wrap {
    height: calc(100vh - 88.889vw);
    overflow: hidden;
  }
}
</style>