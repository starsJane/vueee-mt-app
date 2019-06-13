<template>
    <div>
        <span class="name">按省份选择:</span>
        <!-- @change_active注意必须小写，不能写驼峰形式，不好使 -->
        <!-- 两个组件之间通信，点击其中一个下拉框再点击另外一个，另外一个消失
        方法一：通过父组件province.vue传递   子-父-子
        方法二：vuex -->
        <m-select 
            :list="provinceList" 
            title="省份" 
            :value="province" 
            :showWrapperActive="provinceActive" 
            @change_active="changeProvinceActive"
            @change="changeProvince"
            className="province"/>

        <m-select 
            :list="cityList" 
            title="城市" 
            :value="city" 
            :showWrapperActive="cityActive" 
            @change_active="changeCityActive"
            @change="changeCity"
            :disabled="cityDisabled"
            className="city"/>

        <!-- 远程搜索el  从服务器搜索数据，输入关键字进行查找 -->
        <span>直接搜索：</span>
        <!-- v-model动态改变当前值  multiple多选不用  filterable可过滤  
        remote远程   remote-method远程搜索执行的方法 loading加载中 -->
        <el-select
            v-model="searchWord"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <!-- el-option搜索框里的数据 -->
            <el-option
                v-for="item in searchList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import MSelect from './select.vue'
import api from '@/api/index.js'

export default {
    data() {
        // 父组件向下传递数据给子组件
        return {
            provinceList: [],
            province: "省份",
            cityList: [],
            city: "城市",

            // 默认是false不展示
            provinceActive: false,
            cityActive: false,

            // 远程搜索框的数据
            searchList: ["哈尔滨", "佳木斯", "牡丹江", "鹤岗"],
            searchWord: '',
            loading: false,

            cityDisabled: true     // 一开始不展示

        }
    },
    components: {
        MSelect
    },

    created() {
        api.getProvinceList().then(res => {
            this.provinceList = res.data.data.map((item) => {
                item.name = item.provinceName;
                return item;
            });
            console.log(this.provinceList)
        })
    },

    methods: {
        changeProvinceActive(flag) {
            this.provinceActive = flag;
            if(flag) {
                this.cityActive = false;
            }
        },
        changeCityActive(flag) {
            this.cityActive = flag;
            if(flag) {
                this.provinceActive = false;
            }
        },

        remoteMethod(val) {
            // 输入完之后，把关键字传给后端，后端返回相应的地理位置信息
            // 请求后端接口
        },

        // 点击选择省份相应展示在框里   此时城市cityDisabled为false展示
        changeProvince(item) {
            this.province = item.name;
            this.cityDisabled = false;

            this.cityList = item.cityInfoList;
        },
        changeCity(item) {
            this.city = item.name;

            this.$store.dispatch('setPosition', item);
            // 更新完之后跳转到首页     给出一个路由 {name: 'index'}
            this.$router.push({name: 'index'})
        }

    }

}
</script>

<style lang="scss">
    @import "@/assets/css/changecity/iselect.scss";
</style>