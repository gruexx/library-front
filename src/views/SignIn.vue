<template>
  <el-container :style="main_style">
    <el-header></el-header>
    <el-main
      ><el-row>
        <el-col :span="6" :offset="14">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            style="margin-top: 60px; margin-right: 30px"
          >
            <el-form-item>
              <h1>用户登录</h1>
            </el-form-item>
            <el-form-item label="用户名/邮箱" prop="userInfo">
              <el-input
                v-model="ruleForm.userInfo"
                clearable
                autocomplete="on"
                placeholder="输入用户名或邮件地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                show-password
                clearable
                placeholder="输入密码"
              ></el-input>
            </el-form-item>
            <el-alert
              v-if="code !== ''"
              :title="code"
              :description="msg"
              type="info"
              :closable="false"
              show-icon
            >
            </el-alert>
            <el-form-item>
              <span>没有账号？</span>
              <el-button type="text" @click="to_signUp">注册</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                :loading="signIn_ing"
                >{{ signIn_ing ? "登录中..." : "登录" }}</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col></el-row
      >
    </el-main>
    <el-footer style="height: 13%"></el-footer>
  </el-container>
</template>

<script>
import { request } from "@/network/request";
import main_bg from "../assets/img/bg2.jpg";

export default {
  data() {
    let checkUserInfo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      msg: "",
      code: "",
      signIn_ing: false,
      main_style:
        "margin-top:15px;height:90%;background: url(" +
        main_bg +
        ") no-repeat center; background-size: 100% 100%; border-radius: 15px;",
      ruleForm: {
        userInfo: "",
        password: ""
      },
      rules: {
        userInfo: [{ validator: checkUserInfo, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sign_in();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sign_in: function() {
      console.log("开始登录...");
      this.signIn_ing = true;
      request({
        url: "/user/login",
        method: "post",
        data: {
          userInfo: this.ruleForm.userInfo,
          password: this.ruleForm.password
        }
      })
        .then(res => {
          console.log(res);
          this.code = res.data.code;
          this.msg = res.data.msg;
        })
        .catch(err => {
          alert(err);
        })
        .finally(() => {
          this.signIn_ing = false;
        });
    },
    to_signUp: function() {
      this.$router.push({ name: "SignUp" });
    }
  }
};
</script>

<style lang="css"></style>
