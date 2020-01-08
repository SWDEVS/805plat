<template>
  <div>
    <Xheader title="订单记录" :back="true"></Xheader>
    <Xcont :header="true">
      <div class="container">
        <div class="tab-container">
          <cube-tab-bar class="tab-rank" v-model="selectedLabel" show-slider inline>
            <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.tabnum">
              <!-- <i slot="icon" class="tab-icon" :class="item.icon"></i> -->
              <div class="tab-title" slot="default">{{item.label}}</div>
            </cube-tab>
          </cube-tab-bar>
        </div>
        <div class="list-container">
          <cube-tab-panels v-model="selectedLabel">
            <cube-tab-panel v-for="item in tabs" :label="item.label" :key="item.label">
              <div class="scroll-list-wrap" v-if="item.list">
                <cube-scroll
                  :ref="item.tabname"
                  @pulling-up="onPullingUp(item.tabnum)"
                  :data="item.list"
                  :options="options"
                >
                  <template>
                    <div
                      class="list-item"
                      v-for="order in item.list"
                      :key="order.order_id"
                      @click="godetail(order.order_id)"
                    >
                      <div class="item-pic">
                        <img :src="order.goods_pic" />
                      </div>
                      <div class="item-detail">
                        <div class="name">{{order.goods_name}}</div>
                        <div class="point">{{order.use_num|formatNumberRgx}}积分</div>
                      </div>
                      <div
                        class="item-status"
                        :style="'color:'+order.statusColor"
                      >{{order.strStatus}}</div>
                      <div class="icon-detail">
                        <i class="iconfont icon-arrow-right"></i>
                      </div>
                    </div>
                  </template>
                </cube-scroll>
              </div>
              <Empty :tip="tip" v-else></Empty>
            </cube-tab-panel>
          </cube-tab-panels>
        </div>
      </div>
      <div class="btn-block" v-show="selectedLabel=='领奖'">
        <cube-button class="btn-primary" :primary="true" @click="gorewards">开始抽奖</cube-button>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import Empty from "@/components/units/empty-block.vue";
export default {
  name: "OrderList",
  components: {
    Xheader,
    Xcont,
    Empty
  },
  data() {
    return {
      selectedLabel: "全部",
      tabs: [
        {
          label: "全部",
          tabnum: "2",
          tabname: "all",
          list: []
        },
        {
          label: "领奖",
          tabnum: "9",
          tabname: "reward",
          list: []
        },
        {
          label: "其它",
          tabnum: "1",
          tabname: "others",
          list: []
        }
      ],
      page_all: 1,
      page_rewards: 1,
      page_others: 1,
      tip: "暂无该类订单记录~",
      options: {
        pullDownRefresh: false,
        pullUpLoad: {
          threshold: 60,
          // txt: {
          //   more: "获取更多记录...",
          //   nomore: "没有更多记录..."
          // },
          visible: true
        },
        scrollbar: true
      }
    };
  },
  async created() {
    let order_all = await this.getorderlist(this.page_all, 2);
    this.page_all += 1;
    this.tabs[0].list = order_all;
    let order_rewards = await this.getorderlist(this.page_rewards, 9);
    this.page_rewards += 1;
    this.tabs[1].list = order_rewards;
    let order_others = await this.getorderlist(this.page_others, 1);
    this.page_others += 1;
    this.tabs[2].list = order_others;
  },
  methods: {
    async getorderlist(page, source) {
      let param = {
        page,
        source
      };
      let orderlist = await this.$get(this.$api.getorderlist, param);

      return orderlist.data_list;
    },
    async onPullingUp(tab) {
      tab = tab * 1;
      let pageindex, tabindex, ref, page;
      switch (tab) {
        case 2:
          tabindex = 0;
          pageindex = this.page_all;
          page = "page_all";
          break;
        case 9:
          tabindex = 1;
          pageindex = this.page_rewards;
          page = "page_rewards";

          break;
        case 1:
          tabindex = 2;
          pageindex = this.page_ohters;
          page = "page_ohters";
          break;
        default:
          tabindex = 0;
          pageindex = this.page_all;
          page = "page_all";
          break;
      }
      let orderlist = await this.getorderlist(pageindex, tab);
      if (orderlist) {
        this.tabs[tabindex].list = this.tabs[tabindex].list.concat(orderlist);
        this[page] += 1;
      } else {
        let ref = this.tabs[tabindex].tabname;
        this.$refs[ref][0].forceUpdate(false);
      }
    },
    godetail(orderid) {
      this.$router.push({
        name: "OrderDetail",
        params: {
          orderid
        }
      });
    },
    gorewards() {
      this.$router.push({
        name: "Rewards",
        query:{
          isjump:1
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.list-container {
  width: calc(100% - 40px);
  margin: 0 auto;
  padding-bottom: $padding-l;
  height: calc(100vh - 30vw);
  overflow-y: hidden;
  font-size: $size-s;

  .scroll-list-wrap {
    height: calc(100vh - 30vw);
    overflow: hidden;

    .list-item {
      width: 100%;
      height: 110px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $color-border;
      font-size: $size-s;
      color: $color-deep;

      .item-pic {
        width: 90px;
        height: 90px;
        margin-right: $padding-m;

        img {
          width: 100%;
        }
      }

      .item-detail {
        display: flex;
        flex-direction: column;
        text-align: left;
        flex: 1;

        .name {
          margin-bottom: $padding-s;
        }

        .point {
          color: #FF870C;
          font-size: $size-xs;
        }
      }

      .item-status {
        flex: 1;
        text-align: right;
        font-size: $size-s;
      }

      .icon-detail {
        width: 40px;
        text-align: right;

        .iconfont {
          color: $color-border;
          font-size: $size-icon-m;
        }
      }
    }
  }
}

.btn-block {
  position: fixed;
  bottom: $padding-l;
  width: 100%;
  display: flex;
  justify-content: center;

  .btn-primary {
    width: 450px;
    height: 70px;
    margin: 0 auto;
    font-size: 28px;
    border-radius: 10px;
    background-image: linear-gradient(#ff704c, #ff3231);
  }
}
</style>