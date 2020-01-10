<template>
  <div>
    <Xcont :header="false">
      <div>
        <div style="width:70%;padding:100px 0 20px;margin: 0 auto;">
          <img style="width:100%;" src="@/assets/images/qrcode.jpg" />
        </div>
        <div style="width:100%;padding:0 10px;text-align: center;">{{msg}}</div>
      </div>
    </Xcont>
  </div>
</template>
<script>
import Xcont from "@/components/layout/Xcontent.vue";
export default {
  name: "collect",
  components: {
    Xcont
  },
  data() {
    return {
      msg: "您尚未关注805生活，长按二维码识别关注"
    };
  },
  async created() {},
  methods: {}
};
</script>
<style lang="stylus" scoped></style>