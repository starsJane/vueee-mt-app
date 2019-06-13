<template>
    <div class="m-menu">
        <!-- 左侧导栏 -->
        <dl class="nav" @mouseleave="menuLeave">
            <dt>全部分类</dt>
            <dd v-for="(item, index) in menuList" :key="index" @mouseenter="menuEnter(item)">
                <i :class="item.type"></i>
                {{item.name}}
                <span class="arrow"></span>
            </dd>
        </dl>

        <!-- 鼠标移入显示右侧 curDetail保存当前数据 一开始是null-->
        <div v-if="curDetail" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
            <!-- template模板，鼠标移入，有几个就展示几个 ； 不占用dom-->
            <!-- 因为 v-if 是一个指令，所以必须将它添加到一个元素上。
            但是如果想切换多个元素呢？
            此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。
            最终的渲染结果将不包含 <template> 元素。 -->

            <template v-for="(item, index) in curDetail.items" >
                <!-- template不能写key值，所以写h4标签上了 -->
                <h4 :key="index">{{item.title}}</h4>
                <span v-for="(v, i) in item.items" :key="v + '_'+ i">{{v}}</span>
            </template>
        </div>
        
    </div>
</template>
<script>
import api from '@/api/index.js'

export default {
    data() {
        return {
            curDetail: null,            // 一开始是null
            menuList: []
        }
    },

    created() {
        api.getMenuList().then( res => {
            this.menuList = res.data.data
        })
    },

    methods: {
        menuEnter(item) {
            console.log(item);
            this.curDetail = item;      // 鼠标移入给curDetail赋值
        },
        menuLeave() {
            // 加定时器，防止鼠标移除导栏，移入右侧内容区域消失
            var self = this;
            this.timer = setTimeout(function () {
                self.curDetail = null;
            }, 200);

        },
        detailEnter() {
            clearTimeout(this.timer);   // 清除定时器self.curDetail = null;
        },
        detailLeave() {
            this.curDetail = null;
        }
    }
}
</script>

