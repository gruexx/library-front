<template>
  <router-view></router-view>
  <el-main v-if="$router.currentRoute.value.name !== 'Chapter'">
    <el-row style="padding-top: 30px">
      <el-col
        :xs="{ span: 8, offset: 1 }"
        :sm="{ span: 7, offset: 2 }"
        :md="{ span: 4, offset: 5 }"
        :lg="{ span: 3, offset: 7 }"
        :xl="{ span: 3, offset: 7 }"
      >
        <el-image
          style="max-height: 250px"
          :src="get_pic(book_detail.picture)"
          fit="contain"
        ></el-image>
      </el-col>
      <el-col
        :xs="{ span: 11, offset: 3 }"
        :sm="{ span: 11, offset: 2 }"
        :md="{ span: 10, offset: 4 }"
        :lg="{ span: 9, offset: 2 }"
        :xl="{ span: 9, offset: 2 }"
      >
        <el-space
          direction="vertical"
          alignment="flex-start"
          style="padding-top: 10px"
        >
          <div class="bookName">{{ book_detail.bookname }}</div>
          <div class="block">
            <el-rate
              disabled
              v-model="value"
              :colors="colors"
              score-template="{value}"
              show-score
            >
            </el-rate>
          </div>
          <div>作者：{{ book_detail.author }}</div>
          <div>出版社：{{ book_detail.pressname }}</div>
          <div>ISBN：{{ book_detail.isbn }}</div>
        </el-space>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 18, offset: 4 }"
        :lg="{ span: 12, offset: 6 }"
        :xl="{ span: 12, offset: 6 }"
      >
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 18, offset: 4 }"
        :lg="{ span: 12, offset: 6 }"
        :xl="{ span: 12, offset: 6 }"
      >
        <div class="tag-left">章节目录 · · · · · ·</div>
      </el-col>
    </el-row>
    <el-row v-if="currentChapter.chapterName">
      <el-col
        :xs="{ span: 11, offset: 1 }"
        :sm="{ span: 9, offset: 3 }"
        :md="{ span: 7, offset: 5 }"
        :lg="{ span: 5, offset: 7 }"
        :xl="{ span: 5, offset: 7 }"
      >
        <div class="last_time">
          上次阅读章节: {{ currentChapter.chapterName }}
        </div>
      </el-col>
      <el-col
        :xs="{ span: 11, offset: 1 }"
        :sm="{ span: 9, offset: 1 }"
        :md="{ span: 7, offset: 2 }"
        :lg="{ span: 5, offset: 2 }"
        :xl="{ span: 5, offset: 2 }"
      >
        <div class="last_time">时间: {{ currentChapter.lastTime }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 16, offset: 4 }"
        :lg="{ span: 10, offset: 7 }"
        :xl="{ span: 10, offset: 7 }"
      >
        <el-table
          max-height="300"
          :data="
            chapters.filter(
              data =>
                !search ||
                data.chapterName.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <el-table-column
            label="章节"
            prop="chapterName"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column width="200">
            <template #header>
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入章节名称搜索"
              />
            </template>
            <template #default="scope">
              <el-button
                style="text-align: center; width: 100%"
                size="mini"
                @click="handleEdit(scope)"
                >阅读本章
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 18, offset: 4 }"
        :lg="{ span: 12, offset: 6 }"
        :xl="{ span: 12, offset: 6 }"
      >
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="{ span: 16, offset: 0 }"
        :sm="{ span: 12, offset: 2 }"
        :md="{ span: 8, offset: 4 }"
        :lg="{ span: 4, offset: 6 }"
        :xl="{ span: 4, offset: 6 }"
      >
        <div class="tag-left">短评 · · · · · ·</div>
      </el-col>
      <el-col
        :xs="{ span: 8, offset: 0 }"
        :sm="{ span: 8, offset: 2 }"
        :md="{ span: 6, offset: 4 }"
        :lg="{ span: 1, offset: 6 }"
        :xl="{ span: 1, offset: 6 }"
      >
        <el-button type="warning" icon="el-icon-edit" @click="set_comment"
          >我来说两句
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 16, offset: 4 }"
        :lg="{ span: 10, offset: 7 }"
        :xl="{ span: 10, offset: 7 }"
      >
        <el-table
          max-height="1000"
          :data="comments"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="username"
            label="用户名"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="comment"
            label="评论"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="写短评" v-model="dialogComment" fullscreen>
      <el-input
        type="textarea"
        :autosize="{ minRows: 8 }"
        placeholder="请输入内容"
        v-model="my_comment"
        maxlength="200"
        show-word-limit
      >
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogComment = false">取 消</el-button>
          <el-button type="primary" @click="update_comment">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-main>
</template>

<script>
import { request } from "@/network/request";
import { ElMessage } from "element-plus";
import store from "@/store";

export default {
  name: "BookDetail",
  data() {
    return {
      bookId: null,
      userId: null,
      book_detail: {},
      currentChapter: {},
      chapters: [],
      comments: [],
      value: 4.8,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      search: "",
      my_comment: "",
      dialogComment: false
    };
  },
  methods: {
    handleEdit(scope) {
      let chapterId = scope.row.chapterId;
      // let chapterName = scope.row.chapterName;
      let chapterPath = scope.row.chapterPath;
      // window.open("/api/" + chapterPath);
      window.open("/pdf/web/viewer.html?file=/api/" + chapterPath);
      request({
        url: "/read/readBook",
        method: "post",
        params: {
          bookId: this.bookId,
          userId: this.userId,
          chapterId: chapterId
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === "200") {
            this.currentChapter = res.data.result;
          } else if (res.data.code === "400") {
            ElMessage.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
      // this.$router.push({
      //   name: "Chapter",
      //   params: { chapterPath: chapterPath, chapterName: chapterName }
      // });
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      }
      return "";
    },
    set_comment() {
      this.dialogComment = true;
      request({
        url: "/comment/getMyComment",
        method: "post",
        params: {
          bookId: this.bookId,
          userId: this.userId
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === "200") {
            this.my_comment = res.data.result;
            if (this.my_comment !== "") {
              ElMessage.info("已显示上一次评论内容");
            }
          } else if (res.data.code === "400") {
            ElMessage.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
    },
    update_comment() {
      this.dialogComment = false;
      request({
        url: "/comment/updateComment",
        method: "post",
        data: {
          bookId: this.bookId,
          userId: this.userId,
          comment: this.my_comment
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === "200") {
            ElMessage.success("提交成功！");
            this.get_detail();
          } else if (res.data.code === "400") {
            ElMessage.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
    },
    get_detail() {
      request({
        url: "/details",
        method: "post",
        params: {
          bookId: this.bookId,
          userId: this.userId
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === "200") {
            store.commit("setBookInfo", {
              bookId: this.bookId,
              book_detail: res.data.result
            });
            this.analyse_detail(res.data.result);
          } else if (res.data.code === "400") {
            ElMessage.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
    },
    analyse_detail(data) {
      this.book_detail = data.book_detail;
      this.chapters = data.chapters;
      this.comments = data.comments;
      this.currentChapter = data.currentChapter;
    }
  },
  computed: {
    get_pic() {
      return function(src) {
        if (src === undefined) {
          return "";
        }
        return "/api/" + src;
      };
    }
  },
  created() {
    // console.log("detail:" + this.$route.params.bookId);
    // console.log("detail:" + store.state.userInfo.userId);
    this.bookId = this.$route.params.bookId;
    this.userId = store.getters.userInfo.userId;
    if (this.bookId === undefined || this.bookId === null) {
      this.bookId = store.getters.getCurrentBookId;
    } else {
      store.commit("setCurrentBookId", this.bookId);
    }
    // console.log(this.bookId);
    // console.log(this.userId);
    if (store.getters.getBookInfo(this.bookId) !== null) {
      this.analyse_detail(store.getters.getBookInfo(this.bookId));
    } else {
      this.get_detail();
    }
  }
};
</script>

<style scoped>
.bookName {
  font-size: 20px;
}

.block {
  padding-bottom: 10px;
  padding-top: 10px;
}

.tag-left {
  margin: 0;
  color: #007722;
  font-size: 20px;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.last_time {
  color: #007722;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
