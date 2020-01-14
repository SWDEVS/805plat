<template>
  <div>
    <Xheader title="805生活平台" :back="true"></Xheader>
    <Xcont :header="true">
      <div>{{txt}}</div>
    </Xcont>
  </div>
</template>
<script>
import Xcont from "@/components/layout/Xcontent.vue";
export default {
  name: "notfound",
  components: {
    Xcont
  },
  data() {
    return {
      txt: "您访问的地址有误"
    };
  },
  async created() {},
  methods: {}
};
</script>
<style lang="stylus" scoped></style>