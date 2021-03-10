<template>
  <el-affix :offset="0" style="box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);">
    <el-row style="background-color: #f6f6f1">
      <el-col class="hidden-sm-and-down" :span="6">
        <h1
          style="margin-left: 20px; color: #53a8ff; float: right; margin-right: 30px"
        >
          图书搜索
        </h1>
      </el-col>
      <el-col
        :xs="16"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        style="align-self: center"
      >
        <el-autocomplete
          v-model="search_str"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          :trigger-on-focus="false"
          style="width: 100%; float: left;padding: 17px 10px 18px 10px"
          @keyup.enter="search"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="search"></el-button>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col
        :xs="8"
        :sm="12"
        :md="6"
        :lg="6"
        :xl="6"
        style="align-self: center"
      >
        <div style="padding-left: 20px">
          <el-radio v-model="search_type" label="1">普通搜索</el-radio>
          <el-radio v-model="search_type" label="2">关键词搜索</el-radio>
        </div>
      </el-col>
    </el-row>
  </el-affix>
  <router-view></router-view>
  <el-main
    v-loading="loading"
    v-if="
      $router.currentRoute.value.name !== 'BookDetail' &&
        $router.currentRoute.value.name !== 'Chapter'
    "
  >
    <el-row
      ><el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div v-if="bookInfo.length === 0 && com_bookInfo.length === 0">
          <!--        <el-row style="margin-top: 20px">-->
          <!--          <el-col>-->
          <!--            <el-carousel-->
          <!--              class="hidden-sm-and-down"-->
          <!--              :interval="4000"-->
          <!--              type="card"-->
          <!--              height="484px"-->
          <!--            >-->
          <!--              <el-carousel-item v-for="item in home_img" :key="item">-->
          <!--                <el-image :src="item" fit="cover"></el-image>-->
          <!--              </el-carousel-item>-->
          <!--            </el-carousel>-->
          <!--            <el-image-->
          <!--              class="hidden-md-and-up"-->
          <!--              v-for="item in home_img"-->
          <!--              :key="item"-->
          <!--              style="width: 100%; height: 300px;padding-bottom: 10px"-->
          <!--              :src="item"-->
          <!--              fit="cover"-->
          <!--            ></el-image>-->
          <!--          </el-col>-->
          <!--        </el-row>-->
          <el-row
            v-for="(item, index) in getAllBookInfo"
            v-bind:key="index"
            style="padding-bottom: 25px"
          >
            <el-col
              :xs="{ span: 6, offset: 0 }"
              :sm="{ span: 4, offset: 2 }"
              :md="{ span: 4, offset: 4 }"
              :lg="{ span: 3, offset: 8 }"
              :xl="{ span: 3, offset: 8 }"
            >
              <el-image
                style="width: 85px; height: 125px"
                :src="get_pic(item.picture)"
                fit="contain"
              ></el-image>
            </el-col>
            <el-col
              :xs="{ span: 16, offset: 2 }"
              :sm="16"
              :md="12"
              :lg="13"
              :xl="13"
            >
              <el-space direction="vertical" alignment="flex-start">
                <el-link
                  class="bookName"
                  @click="to_detail(item.bookId)"
                  href="javascript:void(0)"
                  >{{ item.bookname }}
                </el-link>
                <div class="text">作者：{{ item.author }}</div>
                <div class="text">出版社：{{ item.pressname }}</div>
                <div class="text">ISBN：{{ item.isbn }}</div>
              </el-space>
            </el-col>
          </el-row>
        </div>
        <el-row
          v-for="(item, index) in getBookInfo"
          v-bind:key="index"
          style="padding-bottom: 25px"
        >
          <el-col
            :xs="{ span: 6, offset: 0 }"
            :sm="{ span: 4, offset: 2 }"
            :md="{ span: 4, offset: 4 }"
            :lg="{ span: 3, offset: 8 }"
            :xl="{ span: 3, offset: 8 }"
          >
            <el-image
              style="width: 85px; height: 125px"
              :src="get_pic(item.picture)"
              fit="contain"
            ></el-image>
          </el-col>
          <el-col
            :xs="{ span: 16, offset: 2 }"
            :sm="16"
            :md="12"
            :lg="13"
            :xl="13"
          >
            <el-space direction="vertical" alignment="flex-start">
              <el-link
                class="bookName"
                @click="to_detail(item.bookId)"
                href="javascript:void(0)"
                >{{ item.bookname }}
              </el-link>
              <el-link
                @click="
                  to_chapter(item.bookId, item.chapterPath, item.chapterId)
                "
                class="chapter"
                href="javascript:void(0)"
                >{{ item.chapterName }}
              </el-link>
              <div class="text">
                <span v-html="ellipsis(item.text, item.keyword)"></span>
              </div>
            </el-space>
          </el-col>
        </el-row>
        <el-row
          v-for="(item, index) in getComBookInfo"
          v-bind:key="index"
          style="padding-bottom: 25px"
        >
          <el-col
            :xs="{ span: 6, offset: 0 }"
            :sm="{ span: 4, offset: 2 }"
            :md="{ span: 4, offset: 4 }"
            :lg="{ span: 3, offset: 8 }"
            :xl="{ span: 3, offset: 8 }"
          >
            <el-image
              style="width: 85px; height: 125px"
              :src="get_pic(item.picture)"
              fit="contain"
            ></el-image>
          </el-col>
          <el-col
            :xs="{ span: 16, offset: 2 }"
            :sm="16"
            :md="12"
            :lg="13"
            :xl="13"
          >
            <el-space direction="vertical" alignment="flex-start">
              <el-link
                class="bookName"
                @click="to_detail(item.bookId)"
                href="javascript:void(0)"
                >{{ item.bookname }}
              </el-link>
              <div class="text">作者：{{ item.author }}</div>
              <div class="text">出版社：{{ item.pressname }}</div>
              <div class="text">ISBN：{{ item.isbn }}</div>
            </el-space>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="{ span: 16, offset: 8 }" :xl="{ span: 16, offset: 8 }">
            <div class="block" style="text-align: center">
              <el-pagination
                :page-size="page_size"
                v-model:current-page="current_page"
                layout="prev, pager, next"
                :total="bookInfo.length"
                background
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col
        :xs="0"
        :sm="0"
        :md="0"
        :lg="6"
        :xl="6"
        v-if="bookInfo.length !== 0 || com_bookInfo.length !== 0"
        style="padding-top: 40px;padding-left: 50px"
        class="hidden-md-and-down"
      >
        <h1>相关搜索</h1>
        <el-space direction="vertical" alignment="flex-start">
          <a
            href="javascript:void(0)"
            @click="get_search(item)"
            v-for="item in results"
            :key="item"
            >{{ item.value }}
          </a>
        </el-space>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { request } from "@/network/request";
import { ElMessage } from "element-plus";
import store from "@/store";
import home1 from "../assets/img/home1.jpg";
import home2 from "../assets/img/home2.jpg";
import home3 from "../assets/img/home3.jpg";

export default {
  data() {
    return {
      search_str: "",
      search_type: "2",
      bookInfo: [],
      com_bookInfo: [],
      all_bookInfo: [],
      home_img: [home1, home2, home3],
      current_page: 1,
      page_size: 5,
      loading: false,
      timeout: null,
      results: []
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
      this.search();
    },
    querySearchAsync(queryString, cb) {
      // console.log(queryString.split(/[,\s.;，；。]+/));
      this.results = [{ value: queryString }];
      let rem = store.getters.getRecommends(queryString);

      if (rem !== null && rem.length !== 0) {
        this.results = rem;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.results);
        }, 500);
      } else {
        request({
          url: "/searchBook/recommend",
          method: "post",
          data: {
            searchList: queryString.split(/[,\s.;，；。]+/)
          }
        })
          .then(res => {
            // console.log(res);
            if (res.data.code === "200") {
              for (let i = 0; i < 10; i++) {
                let temp = {};
                temp.value = res.data.result[i];
                // console.log(temp);
                this.results.push(temp);
              }
              store.commit("setRecommend", {
                queryStr: queryString,
                results: this.results
              });
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(this.results);
            }, 100);
          })
          .catch(err => {
            console.log(err);
            ElMessage.error("请求超时！");
          });
      }
    },
    get_search(item) {
      console.log(item);
      this.search_str = item.value;
      this.search_type = "2";
      this.search();
    },
    search() {
      // console.log(this.search_str);
      let url = "";
      if (this.search_type === "1") {
        url = "/searchBook/searchWithoutKeywords";
      } else if (this.search_type === "2") {
        url = "/searchBook/searchByKeywords";
      }
      if (this.search_str === "") {
        ElMessage({
          message: "请输入搜索内容！",
          duration: 700,
          type: "warning"
        });
      } else if (url !== "") {
        this.loading = true;
        request({
          url,
          method: "post",
          data: {
            searchList: this.search_str.split(/[,\s.;，；。]+/)
          }
        })
          .then(res => {
            console.log(res);
            if (res.data.code === "200") {
              if (this.search_type === "1") {
                this.analyse_s1(res.data.result);
              } else if (this.search_type === "2") {
                this.analyse_s2(res.data.result);
              }
              this.$router.push({ name: "Home" });
            } else if (res.data.code === "400") {
              ElMessage({
                message: res.data.code + " " + res.data.msg,
                type: "error",
                duration: 800,
                showClose: true
              });
            }
          })
          .catch(err => {
            console.log(err);
            ElMessage.error("请求超时！");
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    ellipsis(value, keyword) {
      if (!value) return "";
      // if (value.length > 140) {
      //   return this.highLight(value.slice(0, 140) + "...", keyword);
      // }
      return this.highLight(value, keyword);
    },
    analyse_s1(data) {
      this.bookInfo = [];
      this.com_bookInfo = [];
      this.com_bookInfo = data;
    },
    analyse_s2(data) {
      console.log(data);
      this.bookInfo = [];
      this.com_bookInfo = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let temp = {};
        for (let key in item) {
          temp = item[key].book;
          temp.chapterId = key;
          temp.text = item[key].text;
          temp.value = item[key].value;
          temp.keyword = item[key].keyword;
          temp.chapterPath = item[key].chapterPath;
          temp.chapterName = item[key].chapterName;
        }
        this.bookInfo.push(temp);
      }
      // console.log(this.bookInfo);
    },
    to_chapter(bookId, chapterPath, chapterId) {
      window.open("/pdf/web/viewer.html?file=/api/" + chapterPath);
      let userInfo = store.getters.userInfo;
      request({
        url: "/read/readBook",
        method: "post",
        params: {
          bookId: bookId,
          userId: userInfo.userId,
          chapterId: chapterId
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === "400") {
            ElMessage.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
    },
    get_pic(src) {
      return "/api/" + src;
    },
    highLight(val, keyword) {
      // console.log("highLight" + keyword);
      // console.log("highLight" + val);
      //关键字高亮
      val = val + "";
      if (val.indexOf(keyword) !== -1 && keyword !== "") {
        return val.replace(
          keyword,
          `<span style="color:red;">${keyword}</span>`
        );
      } else {
        return val;
      }
    },
    to_detail(bookId) {
      // console.log(bookId);
      this.$router.push({ name: "BookDetail", params: { bookId: bookId } });
    }
  },
  created() {
    this.$notify({
      title: "欢迎回来！",
      message: "🤗🤗",
      position: "bottom-left",
      duration: 1500
    });
    request({
      url: "/read/getAllBooks",
      method: "post"
    })
      .then(res => {
        console.log(res);
        if (res.data.code === "200") {
          this.all_bookInfo = res.data.result;
        } else if (res.data.code === "400") {
          ElMessage.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        ElMessage.error("请求超时！");
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
    },
    getComBookInfo() {
      let temp = [];
      let a = (this.current_page - 1) * this.page_size;
      let b = this.current_page * this.page_size;
      let c = b;
      if (b > this.com_bookInfo.length) {
        c = this.com_bookInfo.length;
      }
      for (let i = a; i < c; i++) {
        temp.push(this.com_bookInfo[i]);
      }
      return temp;
    },
    getAllBookInfo() {
      let temp = [];
      let a = (this.current_page - 1) * this.page_size;
      let b = this.current_page * this.page_size;
      let c = b;
      if (b > this.all_bookInfo.length) {
        c = this.all_bookInfo.length;
      }
      for (let i = a; i < c; i++) {
        temp.push(this.all_bookInfo[i]);
      }
      return temp;
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 13px;
  color: #999;
}
.chapter {
  font-size: 14px;
  color: #5d93c4;
}
.bookName {
  font-size: 18px;
  color: #3377aa;
}
</style>
