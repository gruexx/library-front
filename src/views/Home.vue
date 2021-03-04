<template>
  <el-container style="height: 100%">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">图书搜索</el-menu-item>
      <el-menu-item index="2">历史记录</el-menu-item>
      <el-menu-item index="3">个人信息</el-menu-item>
      <el-menu-item index="4" style="float: right">退出</el-menu-item>
    </el-menu>
    <el-affix :offset="0" style="box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);">
      <el-row>
        <el-col :span="6">
          <h1
            style="margin-left: 20px; color: #53a8ff; float: right; margin-right: 30px"
          >
            图书搜索
          </h1>
        </el-col>
        <el-col :span="12" style="align-self: center">
          <el-autocomplete
            v-model="search_str"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            :trigger-on-focus="false"
            style="width: 100%; float: left"
          >
            <template #append>
              <el-button icon="el-icon-search" @click="search"></el-button>
            </template>
          </el-autocomplete>
        </el-col>
        <el-col :span="6" style="align-self: center">
          <div style="padding-left: 20px">
            <el-radio v-model="search_type" label="1">普通搜索</el-radio>
            <el-radio v-model="search_type" label="2">关键词搜索</el-radio>
          </div>
        </el-col>
      </el-row>
    </el-affix>
    <el-main>
      <el-row style="padding-bottom: 20px">
        <el-col :span="12" :offset="6"
          ><el-card>
            <el-space alignment="center">
              <el-image
                style="width: 100px; height: 100px;margin-bottom: -8px"
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                fit="cover"
              ></el-image>
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div></el-space
            >
          </el-card></el-col
        >
      </el-row>
      <el-row style="padding-bottom: 20px">
        <el-col :span="12" :offset="6"
        ><el-card>
          <el-space alignment="center">
            <el-image
              style="width: 100px; height: 100px;margin-bottom: -8px"
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              fit="cover"
            ></el-image>
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div></el-space
          >
        </el-card></el-col
        >
      </el-row>
    </el-main>
    <el-footer style="background: #545c64; height: 30px">Footer</el-footer>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import { request } from "@/network/request";

export default defineComponent({
  setup() {
    let timeout;
    const querySearchAsync = (queryString, cb) => {
      request({
        url: "/searchBook/recommend",
        method: "post",
        data: {
          searchList: [queryString]
        }
      })
        .then(res => {
          console.log(res);
          let results = [{ value: queryString }];
          for (let i = 0; i < 10; i++) {
            let temp = {};
            temp.value = res.data.result[i];
            console.log(temp);
            results.push(temp);
          }
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            cb(results);
          }, 100);
        })
        .catch(err => {
          alert(err);
        });
    };
    const handleSelect = item => {
      console.log(item);
    };
    return {
      querySearchAsync,
      handleSelect
    };
  },
  data() {
    return {
      search_str: "",
      activeIndex: "1",
      search_type: "1"
    };
  },
  methods: {
    search() {
      console.log(this.search_str);
      let url = "";
      if (this.search_type === "1") {
        url = "/searchBook/searchWithoutKeywords";
      } else if (this.search_type === "2") {
        url = "/searchBook/searchByKeywords";
      }
      request({
        url,
        method: "post",
        data: {
          searchList: [this.search_str]
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
});
</script>

<style scoped></style>
