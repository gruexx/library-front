<template>
  <router-view></router-view>
  <el-main v-if="$router.currentRoute.value.name !== 'Chapter'">
    <el-row style="padding-top: 30px">
      <el-col :span="3" :offset="6">
        <el-image
          style=" height: 300px"
          :src="get_pic(book_detail.picture)"
          fit="cover"
        ></el-image>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-space direction="vertical" alignment="flex-start">
          <div class="bookName">书名：{{ book_detail.bookname }}</div>
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
      <el-col :span="12" :offset="6">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="tag-left">目录······</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
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
          <el-table-column label="章节" prop="chapterName" show-overflow-tooltip="true"></el-table-column>
          <el-table-column width="200">
            <template #header>
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
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
      <el-col :span="12" :offset="6">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="6">
        <div class="tag-left">短评······</div>
      </el-col>
      <el-col :span="1" :offset="7">
        <el-button type="warning" icon="el-icon-edit" @click="set_comment"
          >我来说两句
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-table
          :data="comments"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="username" label="用户名" width="100" show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="comment" label="评论" width="477" show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="写短评" v-model="dialogComment" width="30%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6 }"
        placeholder="请输入内容"
        v-model="my_comment"
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
      chapters: [],
      comments: [],
      value: 3.7,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      search: "",
      my_comment: "",
      dialogComment: false
    };
  },
  methods: {
    handleEdit(scope) {
      let chapterId = scope.row.chapterId;
      let chapterName = scope.row.chapterName;
      let chapterPath = scope.row.chapterPath;
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
          if (res.data.code === "400") {
            ElMessage.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
      this.$router.push({
        name: "Chapter",
        params: { chapterPath: chapterPath, chapterName: chapterName }
      });
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
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
            this.book_detail = res.data.result.book_detail;
            this.chapters = res.data.result.chapters;
            this.comments = res.data.result.comments;
          } else if (res.data.code === "400") {
            ElMessage.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          ElMessage.error("请求超时！");
        });
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
    this.userId = store.state.userInfo.userId;
    this.get_detail();
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
.el-rate__icon {
  font-size: 25px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
