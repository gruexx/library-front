<template>
  <el-container style="height: 100%">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="getCurrentIndex"
      background-color="#545652"
      text-color="#d5d5d5"
      active-text-color="#fff"
    >
      <el-menu-item index="home">图书搜索</el-menu-item>
      <el-menu-item index="person">个人信息</el-menu-item>
      <el-menu-item style="float: right"
        ><el-link type="danger" @click="sign_out">退出</el-link></el-menu-item
      >
    </el-menu>
    <router-view />
    <el-footer style="background: #545652; height: 30px; bottom: 0">
      <el-row>
        <el-col>
          <div style="text-align: center; font-size: small;padding-top: 5px">
            <span
              ><a
                href="https://store.steampowered.com/"
                style="color: #fdfdfd; text-decoration: none"
                >关于我们</a
              ></span
            >
            <el-divider direction="vertical"></el-divider>
            <span
              ><a
                href="https://store.steampowered.com/"
                style="color: #fdfdfd; text-decoration: none"
                >联系我们</a
              ></span
            >
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import store from "@/store";

export default {
  name: "Main",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    getCurrentIndex(item) {
      // console.log("Main index:" + item);
      if (item === "home") {
        this.$router.push({ name: "Home" });
      } else if (item === "person") {
        this.$router.push({ name: "PersonalPage" });
      }
    },
    sign_out() {
      store.commit("signOut");
    }
  }
};
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item {
  height: 35px;
  line-height: 35px;
}
</style>
