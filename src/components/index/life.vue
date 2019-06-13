<template>
  <div class="m-life">
    <!-- 导航 -->
    <el-row>
      <ul class="nav">
        <!-- 这里全部让它回到首页/ -->
        <li>
          <router-link to="/" class="takeout">美团外卖</router-link>
        </li>
        <li>
          <router-link to="/" class>猫眼电影</router-link>
        </li>
        <li>
          <router-link to="/" class>美团酒店</router-link>
        </li>
        <li>
          <router-link to="/" class="apartment">民宿/公寓</router-link>
        </li>
        <li>
          <router-link to="/" class="business">商家入驻</router-link>
        </li>
        <li>
          <router-link to="/" class>美团公益</router-link>
        </li>
      </ul>
    </el-row>

    <!-- 中间上部分:轮播图+图片+登录注册 -->
    <el-row>
        
      <el-col :span="14">
          <!-- slide轮播图组件:用element-ui的Carousel走马灯 -->
        <slider/>
      </el-col>

      <el-col :span="4">
        <!-- 用背景图片的方式 -->
        <div class="m-life-pic"></div>
      </el-col>

      <el-col :span="6">
        <!-- 不用写成组件 -->
        <div class="m-life-login">
          <h4>
            <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt>
          </h4>
          <!-- <p class="m-life-login-name">Hi！你好</p>
          <p>
              <router-link :to="{name: register}">
                  <el-button round>注册</el-button>
              </router-link>
          </p>
          <p>
              <router-link :to="{name: login}">
                  <el-button round>登录</el-button>
              </router-link>
          </p> -->
          <p class="m-life-login-name">Hi！ {{$store.state.userName ? $store.state.userName : '你好！'}}</p>
          <p v-if="!$store.state.userName">
            <router-link :to="{name: 'register'}">
              <el-button round>注册</el-button>
            </router-link>
          </p>
          <p v-if="!$store.state.userName">
            <router-link :to="{name: 'login'}">
              <el-button round>立即登陆</el-button>
            </router-link>
          </p>
        </div>

      </el-col>

    </el-row>
    
    <!-- 中间下部分: 背景图片 -->
    <el-row>
        <!-- 按照上边轮播图占的14来计算 7+7 -->
        <el-col :span="7">
            <div class="m-life-hotel"></div>
        </el-col>
        <el-col :span="7">
            <div class="m-life-music"></div>
        </el-col>
        <el-col :span="4">
            <div class="m-life-coop"></div>
        </el-col>

        <el-col :span="6">
            <div class="m-life-downapp">
                <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP">
                <p>美团APP手机版</p>
                <p class="last-p">
                    <span class="red">
                        1元起
                    </span>
                    吃喝玩乐
                </p>
            </div>
        </el-col>

    </el-row>
  </div>
</template>
<script>
// 轮播图
import Slider from "./slider.vue";

export default {
  components: {
    Slider
  }
};
</script>

<style lang="scss">

@import "@/assets/css/index/life.scss";

</style>

