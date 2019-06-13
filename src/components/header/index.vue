<template>
<!-- index.vue是输出模块： searchBar + topBar组合起来，头部区域 -->
    <div class="m-header">
        <!-- Layout布局  通过 row 和 col 组件 -->
        <el-row>
            <top-bar />         <!-- 组件里边没有内容，最好写成单标签形式 -->
        </el-row>
        <el-row>
            <search-bar />
        </el-row>
    </div>

</template>

<script>
import topBar from './topBar.vue'
import searchBar from './searchBar.vue'

export default {
  components: {
    topBar,
    searchBar
  }
}
</script>

<style scoped>

</style>
