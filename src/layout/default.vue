<template>
<!-- layout是单独提取出来的公共的依赖的文件(除注册登录另外三个有相同部分的页面) -->
    <div class="layout-default">
        <el-container>
            <!-- el-header和el-footer有默认高度是60px；可以调整为100%或者"" -->
            <el-header height="">
                <my-header />  
            </el-header>

            <el-main>
                <!-- 嵌套路由 children-->

                <!-- router-view路由出口 没有这个中间部分就不显示 有三块地方中间内容是一样的-->
                <!-- 路由匹配到的组件将渲染在这里 -->
                <router-view></router-view>
                <!-- <router-view></router-view> -->

            </el-main>

            <el-footer height="">
                <my-footer />
            </el-footer>

        </el-container>
    </div>

</template>

<script>
import MyHeader from '@/components/header/index.vue' // 不要起名header，因为h5里有header标签，会被认为是h5的标签
import MyFooter from '@/components/footer/index.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang = "scss">
    /* @import引入其它文件的方法，末尾要加分号，scss里的语法(scss文档) */
    @import '@/assets/css/public/layout.scss';
</style>
