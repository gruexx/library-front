<template>
  <el-main class="main_text">
    <!--    <el-affix :offset="111">-->
    <!--      <el-row class="title">-->
    <!--        <el-col-->
    <!--          :xs="{ span: 24, offset: 0 }"-->
    <!--          :sm="{ span: 20, offset: 2 }"-->
    <!--          :md="{ span: 16, offset: 4 }"-->
    <!--          :lg="{ span: 12, offset: 6 }"-->
    <!--          :xl="{ span: 12, offset: 6 }"-->
    <!--        >-->
    <!--          <el-page-header-->
    <!--            @back="goBack"-->
    <!--            :content="chapterName"-->
    <!--            title="返回"-->
    <!--          ></el-page-header>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </el-affix>-->
    <iframe :src="url" width="100%" height="100%"></iframe>

    <!--    <el-row>-->
    <!--      <el-col-->
    <!--        :xs="{ span: 24, offset: 0 }"-->
    <!--        :sm="{ span: 20, offset: 2 }"-->
    <!--        :md="{ span: 16, offset: 4 }"-->
    <!--        :lg="{ span: 12, offset: 6 }"-->
    <!--        :xl="{ span: 12, offset: 6 }"-->
    <!--      >-->
    <!--        &lt;!&ndash;        <div class="text">{{ content }}</div>&ndash;&gt;-->
    <!--      </el-col>-->
    <!--    </el-row>-->
  </el-main>
</template>

<script>
// import { request } from "@/network/request";

export default {
  name: "Chapter",
  data() {
    return {
      chapterPath: "",
      chapterName: "详情页面",
      content: "",
      url: ""
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "BookDetail" });
    },
    read() {
      console.log(this.chapterPath);
      // request({
      //   url: this.chapterPath,
      //   method: "get"
      // }).then(res => {
      //   // console.log(res);
      //   this.content = res.data;
      // });
      // window.open("/pdf/web/viewer.html?file=" + this.get_text);
      this.url = "/pdf/web/viewer.html?file=" + this.get_text;
    }
  },
  created() {
    // console.log("Chapter:" + this.$route.params.chapterPath);
    // console.log("Chapter:" + this.$route.params.chapterName);
    this.chapterPath = this.$route.params.chapterPath;
    this.chapterName = this.$route.params.chapterName;
    if (
      this.chapterPath === undefined ||
      this.chapterPath === null ||
      this.chapterName === undefined ||
      this.chapterName === null
    ) {
      this.goBack();
    } else {
      this.read();
    }
  },
  computed: {
    get_text() {
      return "/api/" + this.chapterPath;
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 20px;
  line-height: 50px;
}
.main_text {
  background-color: #fffdf3;
  padding: 0;
}
.title {
  height: 66px;
  padding-top: 20px;
  background-color: #fffdf3;
}
</style>
