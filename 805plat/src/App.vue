<template>
  <div id="app">
    <div v-if="token!=''">
      <transition :name="transitionName">
        <keep-alive :include="keepAlives" :max="10">
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { keepAlives } from "@/common/router";
import { mapState } from "vuex";
export default {
  name: "app",
  data() {
    return {
      transitionName: "",
      keepAlives
    };
  },
  async beforeCreate() {
    let status = this.$route.query.status;
    if (status) {
      this.$router.push({
        name: "collect"
      });
    } else {
      let url = window.location.href;

      let token = this.$route.query.token;
      //localStorage.setItem("vuex",'{"user":{"token":"489068c86e2f3f8abb54c91b9eeca5d4"}}');
      let vuexstorage = localStorage.getItem("vuex");

      let currentUser = "";
      if (vuexstorage) {
        let vuexobj = JSON.parse(vuexstorage);

        if (vuexobj.user) {
          currentUser = vuexobj.user.token;
        }
      }
      if (currentUser) {
        return;
      } else if (!currentUser && token) {
        await this.$store.dispatch("_currentUser", token);
      }
      if (!currentUser && !token) {
        url = escape(url);
        window.location.href = this.$api.gettoken + "?ref=" + url;
      }
    }
  },
  created() {
    //this.wxstart();
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  methods: {
    async wxstart() {
      let that = this;
      let config = await this.$get(this.$api.getwxconfig, {
        url: window.location.href
      });
      this.$wx.config({
        beta: true,
        debug: false,
        appId: config.appid,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: ["getBrandWCPayRequest", "showMenuItems", "hideMenuItems"]
      });

      that.$wx.ready(function() {
        that.$wx.hideMenuItems({
          menuList: [
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari"
          ]
        });
      });
    }
  }
};
</script>

<style>
</style>
