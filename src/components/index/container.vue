<template>
  <div class="m-istyle">
    <!-- 通过事件冒泡绑定事件 :class="nav.class"控制颜色-->
    <dl @mouseover="over" :class="nav.class">
      <!-- 数据从父级传过来 -->
      <dt>{{nav.title}}</dt>
      <!-- 通过ajax获取数据,把类型传给后端,后端返回相应的数据    -->
      <!-- data-type存储类型 -->
      <dd v-for="(item, index) in nav.list" 
        :key="index" 
        :class="{active: kind == item.tab}" 
        :data-type="item.tab">{{item.text}}</dd>
    </dl>

    <ul class="ibody">
      <!-- <li v-for="(item, index) in list" :key="index"> -->
      <li v-for="(item, index) in resultsData[kind]" :key="index">    
        <!-- 用了element-ui的Card卡片   带图片的卡片   将信息聚合在卡片容器中展示。 -->
        <!-- shadow	设置阴影显示时机   always / hover / never	默认always -->
        <el-card :body-style="{ padding: '0px' }" shadow="never">

          <img :src="item.image" class="image">
          
          <div class="cbody">
            <div class="title" :title="item.title">{{item.title}}</div>
            <div class="sub-title" :title="item.sub_title">{{item.sub_title}}</div>
            
            <!-- 普通价格 -->
            <!-- <div class="price-info" v-if="item.rentNum && item.price_info.current_price">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price_info.current_price}}</span>
              </span>
              <span class="old-price">门市价¥{{item.price_info.old_price}}</span>
              <span class="sold bottom-right-info">{{item.address}}</span>
            </div> -->

            <div class="price-info">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price}}</span>
              </span>
               <span class="sold bottom-right-info">{{item.address}}</span>
            </div>


            <!--后端的数据没有下面两种情况，注释掉-->
            <!-- 抢光了 -->
            <!-- <div class="price-info" v-else-if="!item.rentNum">
                <span class="current-price-wrapper">
                    <span class="price-symbol numfont">¥</span>
                    <span class="current-price numfont">抢光了</span>
                </span>
            </div> -->
            <!-- 人均 -->
            <!-- <div class="price-info" v-else>
                <span class="current-price-wrapper">
                    <span class="price-symbol numfont">¥</span>
                    <span class="current-price numfont">{{item.price_info.avg_price}}</span>
                    <span class="units">/{{item.price_info.units}}均</span>
                </span>
            </div> -->

          </div>

        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data() {
    return {
        // 有格调类型,最开始默认是all
        kind: 'all',

        // 和后端约定好的数据结构   请求过来了（上边注释掉的结构使用了list的）
        // list: [{
        //     image: 'https://p0.meituan.net/mogu/50c775bda3ec3c371e4ed320b5cfe53393356.jpg@368w_208h_1e_1c',
        //     title: 'COSTA COFFEE（东方新天地店）',
        //     sub_title: '浪漫美味, 建议二人使用',
        //     price_info: {
        //         current_price: null,
        //         old_price: null,
        //         // avg_price均值和units单位
        //         avg_price: 18,
        //         units: '人'
        //     },
        //     // rentNum控制抢光了, 没有这个就是抢光了
        //     rentNum: 30,
        //     address: '鲤鱼门'
        // },{
        //     image: 'https://p0.meituan.net/scarlett/0938786f28888cfcebdf59de23f87dd394965.png@368w_208h_1e_1c',
        //     title: 'COSTA COFFEE（东方新天地店）',
        //     sub_title: '浪漫美味, 建议二人使用',
        //     price_info: {
        //         current_price: 98,
        //         old_price: 194,
        //         // avg_price均值和units单位
        //         avg_price: null,
        //         units: null

        //     },
        //     rentNum: 10,
        //     address: '鲤鱼门'
        // },{
        //     image: 'https://p0.meituan.net/msmerchant/f0f72ccd78773cc5a0156b1c00d588c0961404.jpg@368w_208h_1e_1c',
        //     title: 'COSTA COFFEE（东方新天地店）',
        //     sub_title: '浪漫美味, 建议二人使用',
        //     price_info: {
        //         current_price: 18,
        //         old_price: 36
        //     },
        //     address: '鲤鱼门'
        // },{
        //     image: 'https://p1.meituan.net/deal/bd9a5c59a6646c683b214139056b7fe1332966.jpg@368w_208h_1e_1c',
        //     title: 'COSTA COFFEE（东方新天地店）',
        //     sub_title: '浪漫美味, 建议二人使用',
        //     price_info: {
        //         current_price: 70,
        //         old_price: 36
        //     },
        //     rentNum: 10,
        //     address: '鲤鱼门'
        // },{
        //     image: 'https://p0.meituan.net/merchantpic/3f2e8a9335a0b95a1d26c3c34273d700262758.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
        //     title: 'COSTA COFFEE（东方新天地店）',
        //     sub_title: '浪漫美味, 建议二人使用',
        //     price_info: {
        //         current_price: 87,
        //         old_price: 36
        //     },
        //     rentNum: 10,
        //     address: '鲤鱼门'
        // },{
        //     image: 'https://p0.meituan.net/msmerchant/1c131a9ae655062479a119abf5538d3c154240.jpg@368w_208h_1e_1c',
        //     title: 'COSTA COFFEE（东方新天地店）',
        //     sub_title: '浪漫美味, 建议二人使用',
        //     price_info: {
        //         current_price: 50,
        //         old_price: 36
        //     },
        //     rentNum: 10,
        //     address: '鲤鱼门'
        // }]

        resultsData: {}
    };
  },

  // 子组件接收父组件的导航部分
  props: [
    'nav'
  ],

  created() {
    api.resultsByKeywords().then((res) => {
      console.log(res);
      this.resultsData = res.data.data;
    })
  },

  methods: {
    over(e) {
        console.log(e.target);
        let dom = e.target;
        let tagName = dom.tagName.toLowerCase();
        // console.log(dom.tagName);
        // 编程技巧: 如果不等于dd, 就不往下执行了, 看着比较舒服
        if (tagName != 'dd') {
            return false;
        }
        this.kind = dom.getAttribute('data-type');

        // 重新获取列表信息  动态获取数据 ajax请求

    }
  }
};
</script>

<style lang="scss">

@import "@/assets/css/index/artistic.scss";

</style>