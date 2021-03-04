<template>
  <el-container style="height: 100%">
    <el-menu
      :default-active="activeIndex2"
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
          <div class="grid-content bg-purple">
            <h1
              style="margin-left: 20px; color: #53a8ff; float: right; margin-right: 30px"
            >
              图书搜索
            </h1>
          </div>
        </el-col>
        <el-col :span="12" style="align-self: center">
          <div class="grid-content bg-purple-light">
            <el-autocomplete
              v-model="search_str"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
              :trigger-on-focus="false"
              style="width: 100%; float: left"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="test"></el-button>
              </template>
            </el-autocomplete>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </el-affix>
    <el-main style="height: 100%">Main</el-main>
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
          }, 500);
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
      search_str: ""
    };
  },
  methods: {
    test() {
      console.log(this.search_str);
    }
  }
});
</script>

<style scoped></style>
