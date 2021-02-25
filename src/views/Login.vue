<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">登录</h4>
              <p slot="description" class="description">
                没有账号？<a href="#/register">注册</a>
              </p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>用户名/邮箱</label>
                <md-input v-model="username"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>密码</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button
                @click="sign_up"
                slot="footer"
                class="md-simple md-success md-lg"
              >
                提交
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { request } from "@/network/request";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      username: null,
      email: null,
      password: null
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    sign_up: function() {
      console.log("开始登录...");
      request({
        url: "/user/login",
        method: "post",
        data: {
          User: {
            username: this.username,
            password: this.password
          }
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="css"></style>
