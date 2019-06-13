<template>
  <dl class="s-item">

    <dt>
      <img :src="meta.image" alt="图片">
    </dt>

    <dd>

      <h3>
        <router-link :to="{name: 'productDeatil'}">{{meta.title}}</router-link>
      </h3>

      <p>
        <!-- Rate 评分星级  这里用只读的评分用来展示分数，允许出现半星 -->
        <el-rate
          v-model="meta.score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>
        <span v-if="meta.score > 4.5">很好</span>
        <span v-else-if="meta.score > 4">好</span>
        <span v-else-if="meta.score > 3.5">不错</span>
        <span v-else-if="meta.score > 3">一般</span>
        <span v-else>很差</span>
        <span class>{{meta.score}}分</span>
        <span class="s-item-comment-total">{{meta.commentNum}}人评论</span>
      </p>

      <p>
          <span class="s-item-tab">
              <!-- i < meta.tab.length - 1判断是否为最后一项，例如火锅|沙河，不是就来个 | -->
              <span v-for="(v, i) in meta.tab" :key="v">{{v + (i < meta.tab.length - 1 ? '|' : '')}}</span>
          </span>

          <span class="s-item-addr">{{meta.address}}</span>
          
          <span>
              <a href="#">
                  <i class="el-icon-location"></i>
                  查看地图
              </a>
          </span>

      </p>

      <p>
          <span class="s-item-price">
              人均￥{{meta.avg_price}}
          </span>
      </p>

      <ul class="deal-items">
          <!-- meta.dealItems.slice(0, 2)控制只展示两个，多个就收起来了； 从0开始删除2个，然后返回被删除的2个  -->
          <li class="items" v-for="(item, index) in meta.dealItems.slice(0, 2)" :key="index">
              <p class="deal-title">
                  {{item.title}}
              </p>
              <p>
                  <span class="deal-price">
                      ￥{{item.price}}
                  </span>
                  <span class="deal-old-price">门市价￥{{item.counterPrice}}</span>
                  <span class="deal-sales">已售{{item.saleNum}}</span>
              </p>
          </li>
      </ul>

    </dd>

  </dl>
    <!-- splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。 -->
    <!-- arr.splice(index,howmany,item1,.....,itemX)
    index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
    howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
    item1, ..., itemX	可选。向数组添加的新项目。 -->

</template>
<script>
export default {
    props: [
      "meta"
    ]
};
</script>

