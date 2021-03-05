<template>
  <el-container :style="main_style">
    <el-main>
      <el-row>
        <el-col :span="6" :offset="14">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            style="margin-top: 100px; margin-right: 30px"
          >
            <el-form-item>
              <h1>注册</h1>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="ruleForm.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="请输入邮箱"
                type="email"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
                placeholder="再次输入密码"
              ></el-input>
            </el-form-item>
            <el-alert
              v-if="code !== ''"
              :title="code"
              :description="msg"
              type="info"
              show-icon
              :closable="false"
            >
            </el-alert>
            <el-form-item>
              <span>已有账号？</span>
              <el-button type="text" @click="to_signIn">登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                :loading="signUp_ing"
                >{{ signUp_ing ? "注册中..." : "注册" }}</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col></el-row
      >
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import { request } from "@/network/request";
import main_bg from "@/assets/img/bg2.jpg";
import { ElMessage } from "element-plus";
import store from "@/store";

export default {
  name: "SignUp",
  data() {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        let reg = new RegExp(/@/);
        if (reg.test(value)) {
          return callback(new Error("用户名不能含有@"));
        } else {
          callback();
        }
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        let reg = new RegExp(/^\S+@\S+\.\S{2,}$/);
        if (!reg.test(value)) {
          return callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      msg: "",
      code: "",
      signUp_ing: false,
      main_style:
        "margin-top:15px;height:90%;background: url(" +
        main_bg +
        ") no-repeat center; background-size: 100% 100%; border-radius: 15px;",
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        email: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sign_up();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    to_signIn() {
      this.$router.push({ name: "SignIn" });
    },
    sign_up: function() {
      console.log("开始注册...");
      this.signUp_ing = true;
      request({
        url: "/user/signin",
        method: "post",
        data: {
          username: this.ruleForm.username,
          email: this.ruleForm.email,
          password: this.ruleForm.pass
        }
      })
        .then(res => {
          console.log(res);
          this.code = res.data.code;
          this.msg = res.data.msg;
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        })
        .finally(() => {
          this.signUp_ing = false;
        });
    }
  },
  beforeCreate() {
    let user = store.getters.userInfo;
    if (user !== null && user !== undefined) {
      this.$router.replace({ name: "Home" });
    }
  }
};
</script>

<style scoped></style>
