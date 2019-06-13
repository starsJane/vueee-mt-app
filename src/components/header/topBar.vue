<template>
    <!-- 混合布局
    通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
    span	栅格占据的列数	number	—	24 -->
    <el-row class="m-header-topbar m-header" >
        <el-col :span="10">
            <geo />
        </el-col>
        <el-col :span="14">
            <m-nav />
        </el-col>
    </el-row>

</template>

<script>
import geo from './geo.vue'
import MNav from './nav.vue'

export default {
  components: {
    geo,
    MNav
    // h5有nav标签，改成MNav
  }

}
</script>

<style lang = "scss">
    @import '@/assets/css/public/header/topbar.scss';
</style>
