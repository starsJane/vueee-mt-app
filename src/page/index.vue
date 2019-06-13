<template>
    <div class="page-index">
        <el-row>
            <el-col :span="5">
                <m-menu />
            </el-col>
            <el-col :span="19">
                <m-life />
            </el-col>
        </el-row>
        <el-row>
            <!-- 可以引入很多个, 且互不影响 ; 以导航nav为例（导航下的内容自行补充），让子组件接收父组件nav, 动态的传数据就行 -->
            <el-col :span="24">
                <container :nav="iStyle"/>
            </el-col>

            <el-col :span="24">
                <container :nav="recomment"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MMenu from '@/components/index/menu.vue'   // h5里有menu标签
import MLife from '@/components/index/life.vue'
import Container from '@/components/index/container.vue'

export default {
    // 把数据传给子组件container.vue
    // class控制颜色  title标题   list数据
    data() {
        return {
            iStyle: {
                class: 'istyle',
                title: '有格调',
                list: [{
                    text: '全部',
                    tab: 'all'
                },{
                    text: '约会聚餐',
                    tab: 'food'
                },{
                    text: '丽人SPA',
                    tab: 'spa'
                },{
                    text: '电影演出',
                    tab: 'moive'
                },{
                    text: '品质出游',
                    tab: 'travel'
                }]
            },
            recomment: {
                class: 'youhui',
                title: '很优惠',
                list: [{
                    text: '全部',
                    tab: 'all'
                },{
                    text: '美食',
                    tab: 'food'
                },{
                    text: '休闲',
                    tab: 'relax'
                }]
            }

        }
    },
    components: {
        MMenu,
        MLife,
        Container
    }

}
</script>

<style lang="scss">
    @import '@/assets/css/index/index.scss';
</style>