<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main style="width: 60%"
      ><el-space direction="vertical" alignment="start">
        <el-input placeholder="请输入内容" v-model="username">
          <template #prepend>用户名</template>
        </el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password>
          <template #prepend>密码</template>
        </el-input>
      <el-button type="primary" plain @click="sign_up">提交</el-button>
      </el-space>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import { request } from "@/network/request";

export default {
  data() {
    return {
      username: null,
      email: null,
      password: null
    };
  },
  methods: {
    sign_up: function() {
      console.log("开始登录...");
      request({
        url: "/user/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style lang="css"></style>
