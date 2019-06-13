<template>
    <div class="search">
        <!-- Input 输入框  Button 图标按钮 -->
        <!-- Input框的v-model要改一下关键字 -->
        <!-- 复习一下：v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。
        你应该通过 JavaScript 在组件的 data 选项中声明初始值。 -->

        <div class="search-panel">
            <el-row class="m-header-searchbar">
                <el-col :span="3" class="left">
                    <img src='https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png' alt="">
                </el-col>
                <el-col :span="15" class="center">
                    <div class="wrapper">
                        <!-- @focus @blur判断鼠标是否聚焦的状态   @input每次在搜索框输入东西时获取数据 -->
                        <el-input v-model="searchWord" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input"></el-input>
                        <el-button type="primary" icon="el-icon-search"></el-button>

                        <!-- 鼠标聚焦出现热门搜索 -->
                        <dl class="hotPlace" v-if="isHotPlace">
                            <dt>热门搜索</dt>
                            <dd v-for="(item, index) in hotPlaceList" :key="index" >
                                <!-- params是路由拼接的数据, 在地址栏可以看到，在index.js里，所以点击热门搜索会跳转 -->
                                <router-link :to="{ name: 'goods', params: {name: item} }">{{item}}</router-link>
                            </dd>
                            <!-- <dd>
                                <router-link to="/s">七天旅馆连锁</router-link>
                            </dd>
                            <dd>
                                <router-link to="/s">加油加油加油</router-link>
                            </dd> -->
                        </dl>

                        <!-- 输入关键字搜索会出现 -->
                        <dl class="searchList" v-if="isSearchList">
                            <dd v-for="(item, index) in searchList" :key="index" >
                                <router-link :to="{ name: 'goods', params: {name: item} }">{{item}}</router-link>
                            </dd>
                        </dl>

                    </div>
                    <p class="suggest">
                        <a href="#" v-for="(item, index) in suggestList" :key="index" >{{item}}</a>
                    </p>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
// Axios 是一个基于 promise 的 HTTP 库 (相当于ajax)     获取数据
// 引入在axios.js配置好的axios
// api 存储着所有获取数据的接口, 调用里面的方法可以获取数据
import api from '@/api/index.js'

export default {
  data () {
    return {
      // v-model值
      searchWord: '',
      // 一开始不展示
      // isHotPlace 和 isSearchList 是由searchWord和isFocus计算来的  返回布尔值
      // isHotPlace: false,
      // isSearchList: false,
      isFocus: false,

      // 下面数组里的占位值会被请求的数据所覆盖
      hotPlaceList: ['美团第一温泉度假村', '旅馆连锁', '海洋世界三日游'],
      searchList: ['火锅', '火锅自助餐', '火锅 重庆'],
      suggestList: ['火锅美团第一温泉度假村', '旅馆连锁', '海洋世界三日游']
    }
  },

  // created是在创建组件时就获取数据
  created() {
      api.searchHotWords().then(res => {
          console.log(res)
          this.hotPlaceList = res.data.data;
          this.suggestList = res.data.data;
      })
  },

  computed: {
    isHotPlace: function () {
      return this.isFocus && !this.searchWord
    },
    isSearchList: function () {
      return this.isFocus && this.searchWord
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      let self = this
      // 延迟再触发blur, 防止搜索失焦后searchList立刻无效, 用户点击不了
      setTimeout(function () {
        self.isFocus = false
      }, 200)
    },

    // 请求搜索框的热门搜索 和 下边提示部分的提示数据
    input () {
        console.log(this.searchWord);
        let val = this.searchWord;

        api.getSearchList().then(res => {
            console.log(res);

            // 后端没有提供过滤结果，自己过滤下
            this.searchList = res.data.data.list.filter((item, index) => {
                //  > -1代表存在关键字，返回
                return item.indexOf(val) > -1;
            });
        })
    }

  },

  // mounted是在dom结构创建完再获取数据
  mounted() {

  }

}
</script>

<style lang = "scss">
    /* 也可以在输出的出口文件即index.vue中引入 */
    @import '@/assets/css/public/header/index.scss' ;
    /* @import '@/assets/css/public/header/search.scss' ; */
</style>
