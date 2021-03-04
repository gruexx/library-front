<template>
  <el-container>
    <el-affix :offset="0" style="box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1)">
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <h1 style="margin-left: 20px">LIBRARY</h1>
          </div></el-col
        >
        <el-col :span="6" style="align-self: center"
          ><div class="grid-content bg-purple-light">
            <el-autocomplete
              v-model="search_str"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
              :trigger-on-focus="false"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="test"></el-button>
              </template>
            </el-autocomplete></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple"></div>
          3</el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">4</div></el-col
        >
      </el-row>
    </el-affix>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
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
