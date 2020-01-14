<template>
  <div>
    <Xheader title="排行榜" :back="false" right="iconquestion"></Xheader>
    <Xcont :header="true">

        <cube-tab-bar class="tab-rank" v-model="selectedLabel" show-slider inline>
          <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
            <i slot="icon" class="tab-icon" :class="item.icon"></i>
            <div slot="default">{{item.label}}</div>
          </cube-tab>
        </cube-tab-bar>
        <div class="list-ttile">
          <div class="list-ttile-item">排名</div>
          <div class="list-ttile-item">用户</div>
          <div class="list-ttile-item">当前元宝</div>
        </div>
        <cube-tab-panels v-model="selectedLabel">
          <cube-tab-panel v-for="(item) in tabs" :label="item.label" :key="item.label">
            <ul>
              <li class="tab-panel-li" v-for="(rankitem,index) in item.ranklist" :key="index">
                <div class="tab-row">
                  <div class="row-item">{{rankitem.rank}}</div>
                  <div class="row-item">{{rankitem.user}}</div>
                  <div class="row-item">{{rankitem.coin}}</div>
                </div>
              </li>
            </ul>
          </cube-tab-panel>
        </cube-tab-panels>
     
    </Xcont>
  </div>
</template>
   
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
export default {
  name: "Rank",
  components: {
    Xheader,
    Xcont
  },
  data() {
    return {
      selectedLabel: "今日排名",
      tabs: [
        {
          label: "今日排名",
          icon: "iconfont iconrank",
          ranklist: [
            {
              rank: 1,
              user: "张三",
              coin: "12312321"
            },
            {
              rank: 1,
              user: "李四",
              coin: "1231232"
            },
            {
              rank: 1,
              user: "王五",
              coin: "123123"
            },
            {
              rank: 1,
              user: "赵六",
              coin: "12312"
            },
            {
              rank: 1,
              user: "钱七",
              coin: "1231"
            },
            {
              rank: 1,
              user: "孙八",
              coin: "123"
            },
            {
              rank: 1,
              user: "周九",
              coin: "12"
            }
          ]
        },
        {
          label: "昨日排名",
          icon: "iconfont icon-line-graph",
          ranklist: [
            {
              rank: 1,
              user: "张三",
              coin: "12312321"
            },
            {
              rank: 1,
              user: "李四",
              coin: "1231232"
            },
            {
              rank: 1,
              user: "王五",
              coin: "123123"
            },
            {
              rank: 1,
              user: "赵六",
              coin: "12312"
            },
            {
              rank: 1,
              user: "钱七",
              coin: "1231"
            },
            {
              rank: 1,
              user: "孙八",
              coin: "123"
            },
            {
              rank: 1,
              user: "周九",
              coin: "12"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
.list-ttile {
  width: calc(100% - 30px);
  margin: 0 15px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-content: center;
  text-align: center;

  &-item {
    flex: 1;
    text-align: center;
  }
}

.tab-rank {
  width: calc(100% - 20px);
  margin: 0 10px 10px;
}

.tab-rank .tab-icon {
  margin-right: 5px;
}

.tab-row {
  width: calc(100% - 30px);
  margin: 0 15px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-content: center;
  text-align: center;
  font-size: 14px;

  .row-item {
    flex: 1;
    text-align: center;
  }
}
</style>