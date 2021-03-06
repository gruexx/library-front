<template>
  <el-main class="main_text">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-page-header
          @back="goBack"
          :content="chapterName"
          title="返回"
        ></el-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="text">{{ content }}</div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { request } from "@/network/request";

export default {
  name: "Chapter",
  data() {
    return {
      chapterPath: "",
      chapterName: "详情页面",
      content: ""
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    read() {
      request({
        url: this.chapterPath,
        method: "get"
      }).then(res => {
        console.log(res);
        this.content = res.data;
      });
    }
  },
  created() {
    console.log("Chapter:" + this.$route.params.chapterPath);
    console.log("Chapter:" + this.$route.params.chapterName);
    this.chapterPath = this.$route.params.chapterPath;
    this.chapterName = this.$route.params.chapterName;
    this.read();
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
  padding-top: 20px;
  font-size: 20px;
  line-height: 50px;
}
.main_text {
  background-color: #fffdf3;
}
</style>
