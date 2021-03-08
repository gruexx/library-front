<template>
  <el-main>
    <el-row style="padding-top: 20px">
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 14, offset: 5 }"
        :md="{ span: 12, offset: 6 }"
        :lg="{ span: 10, offset: 7 }"
        :xl="{ span: 12, offset: 6 }"
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>
                <el-avatar>🤣</el-avatar>
              </span>
              <el-button class="button" type="text" @click="sign_out"
                >注销</el-button
              >
            </div>
          </template>
          <div class="text item">用户名 : {{ userInfo.userInfo }}</div>
          <div class="text item">ID : {{ userInfo.userId }}</div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import store from "@/store";

export default {
  name: "PersonalPage",
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    sign_out() {
      store.commit("signOut");
    }
  },
  created() {
    this.userInfo = store.getters.userInfo;
    // console.log(this.userInfo);
  }
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>
