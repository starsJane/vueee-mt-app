<template>
    <div class="category">
        <dl class="m-categroy">
            <dt>按拼音首字母选择</dt>
            <dd v-for="(item, index) in list" :key="index" >
                <a :href=" '#city-' + item">{{item}}</a>
            </dd>
        </dl>

        <dl class="m-categroy-section" v-for="(item, index) in cityGroup" :key="index" :id="'city-' + index">   <!--id用于跳转，也可以加在dt上-->
            <dt>{{index}}</dt>      <!--注意这里index是相应的首字母，不是数字-->
            <dd>
                <!-- changeCity点击城市切换城市并跳转 -->
                <span v-for="city in item" :key="city.id" @click="changeCity(city)">{{city.name}}</span>  <!--相应城市-->
            </dd>
        </dl>


    </div>

</template>

<script>
import api from '@/api/index.js'

export default {
    data() {
        return {
            // split() 方法用于把一个字符串分割成字符串数组。
            // 如果您希望把单词分割为字母，或者把字符串分割为字符，可使用下面的代码：
            // "hello".split("")	//可返回 ["h", "e", "l", "l", "o"]

            list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            // ["A", "B", "C"......]

            // 美团网的城市数据
            cityList: [],
            cityGroup: {}       // cityGroup对象数组都行
        }
    },

    // created 钩子可以用来在一个实例被创建之后执行代码
    created() {
        // 美团网的城市数据  直接上网站的请求里面拿
        // var data = [
        //     {
        //         "id": 1,
        //         "name": "北京",
        //         "pinyin": "beijing",
        //         "acronym": "bj",
        //         "rank": "S",
        //         "firstChar": "B"
        //     }
        // ];

        api.getCityList().then(res => {
            // 按照首字母firstChar分组，一样的在一块，分组完保存在obj里
            var obj = {}
            res.data.data.forEach((item, index) => {
                if(!obj[item.firstChar.toUpperCase()]) {
                    // 每个首字母都是数组     没有就创建一个空数组
                    //.toUpperCase() 如果数据的字母小写的话
                    obj[item.firstChar.toUpperCase()] = [];
                }
                // 存在，就往数组里放数据；保证了相同首字母的数据在一块
                obj[item.firstChar.toUpperCase()].push(item);
            })
            console.log(obj);
            // {B: Array(1), J: Array(1), Y: Array(1)}...
                // B: [{…}]
                // J: [{…}]
                // Y: [{…}]
            this.cityGroup = obj;
            // 把obj保存到data
        })
    },

    methods: {
        changeCity(item) {
            console.log('item=====', item)
            this.$store.dispatch('setPosition', item);
            this.$router.push({name: 'index'})
        }
    }

}
</script>

<style lang="scss">
    @import "@/assets/css/changecity/categroy.scss";
</style>