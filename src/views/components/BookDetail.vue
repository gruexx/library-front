<template>
  <el-main>
    <el-row style="padding-top: 30px">
      <el-col :span="3" :offset="6">
        <el-image
          style=" height: 300px"
          src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          fit="cover"
        ></el-image>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-space direction="vertical" alignment="flex-start"
          ><div class="bookName">书名</div>
          <div class="block">
            <el-rate
              disabled
              v-model="value"
              :colors="colors"
              score-template="{value}"
              show-score
            >
            </el-rate></div
        ></el-space>
      </el-col>
    </el-row>
    <el-row
      ><el-col :span="12" :offset="6"><el-divider></el-divider></el-col
    ></el-row>
  </el-main>
</template>

<script>
export default {
  name: "BookDetail",
  data() {
    return {
      value: 3.7,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  }
};
</script>

<style scoped>
.bookName {
  font-size: 20px;
}
</style>
<style>
.el-rate__icon {
  font-size: 25px;
}
</style>
