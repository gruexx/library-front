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
      <el-menu-item style="float: right"
        ><el-link type="danger" @click="sign_out">退出</el-link></el-menu-item
      >
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
      <el-row style="margin-top: 50px" v-if="bookInfo.length === 0">
        <el-col>
          <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in home_img" :key="item">
              <h3 class="medium">
                <el-image :src="item" fit="cover"></el-image>
              </h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in getBookInfo" v-bind:key="index">
        <el-col :span="2" :offset="6">
          <el-image
            style="width: 70px; height: 100px"
            :src="get_pic(item.picture)"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :span="10">
          <el-space direction="vertical" alignment="flex-start">
            <el-link type="primary">{{ item.bookname }}</el-link>
            第{{ item.chapter }}章
            <div class="text">{{ ellipsis(item.text) }}</div>
          </el-space>
        </el-col>
        <el-divider style="margin: 10px"></el-divider>
      </el-row>
      <el-row>
        <el-col>
          <div class="block" style="text-align: center">
            <el-pagination
              :page-size="page_size"
              v-model:current-page="current_page"
              layout="prev, pager, next"
              :total="bookInfo.length"
              background
              hide-on-single-page="true"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer style="background: #545c64; height: 30px; bottom: 0">
      <el-row>
        <el-col>
          <div style="text-align: center; font-size: small;padding-top: 5px">
            <span
              ><a href="" style="color: #fdfdfd; text-decoration: none"
                >关于我们</a
              ></span
            >
            <el-divider direction="vertical"></el-divider>
            <span
              ><a href="" style="color: #fdfdfd; text-decoration: none"
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
import { defineComponent } from "vue";
import { request } from "@/network/request";
import { ElMessage } from "element-plus";
import store from "@/store";
import home1 from "../assets/img/home1.jpg";
import home2 from "../assets/img/home2.jpg";
import home3 from "../assets/img/home3.jpg";

export default defineComponent({
  setup() {
    let timeout;
    const querySearchAsync = (queryString, cb) => {
      let results = [{ value: queryString }];
      let rem = store.getters.getRecommends(queryString);

      if (rem !== null && rem.length !== 0) {
        results = rem;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(results);
        }, 500);
      } else {
        request({
          url: "/searchBook/recommend",
          method: "post",
          data: {
            searchList: [queryString]
          }
        })
          .then(res => {
            // console.log(res);
            if (res.data.code === "200") {
              for (let i = 0; i < 10; i++) {
                let temp = {};
                temp.value = res.data.result[i];
                // console.log(temp);
                results.push(temp);
              }
              store.commit("setRecommend", {
                queryStr: queryString,
                results: results
              });
            } else {
              ElMessage.info(res.data.code + " " + res.data.msg);
            }
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              cb(results);
            }, 100);
          })
          .catch(err => {
            console.log(err);
            ElMessage.error("请求超时！");
          });
      }
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
      search_type: "2",
      bookInfo: [],
      home_img: [home1, home2, home3],
      current_page: 1,
      page_size: 5
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
          // console.log(res);
          if (res.data.code === "200") {
            if (this.search_type === "1") {
              this.analyse_s1(res.data.result);
            } else if (this.search_type === "2") {
              this.analyse_s2(res.data.result);
            }
          } else {
            ElMessage.error(res.data.code + " " + res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
    },
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 75) {
        return value.slice(0, 75) + "...";
      }
      return value;
    },
    analyse_s1() {
      //todo
    },
    analyse_s2(data) {
      this.bookInfo = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let temp = {};
        for (let key in item) {
          temp = item[key].book;
          temp.chapter = key;
          temp.text = item[key].text;
          temp.value = item[key].value;
        }
        this.bookInfo.push(temp);
      }
      console.log(this.bookInfo);
    },
    get_pic(src) {
      return "/api/" + src;
    },
    sign_out() {
      store.commit("signOut");
    }
  },
  created() {
    this.$notify({
      title: "欢迎回来！",
      message: "🤗",
      position: "bottom-left"
    });
  },
  computed: {
    getBookInfo() {
      let temp = [];
      let a = (this.current_page - 1) * this.page_size;
      let b = this.current_page * this.page_size;
      let c = b;
      if (b > this.bookInfo.length) {
        c = this.bookInfo.length;
      }
      for (let i = a; i < c; i++) {
        temp.push(this.bookInfo[i]);
      }
      return temp;
    }
  }
});
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
