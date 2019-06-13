<template>
    <!-- icon图标 直接通过设置类名为 el-icon-iconName 来使用即可。-->
    <div class="m-geo">
        <div class="position">
            <i class="el-icon-loaction" />
            {{$store.state.position.name}}
            <router-link class="changeCity" :to="{name: 'changeCity'}">
                切换城市
            </router-link>
            [
                <a href="#" v-for="(item, index) in nearCity" :key="index"> {{item.name}} </a>
            ]
        </div>
        <div class="m-user" v-if="!$store.state.userName">   <!--v-if="!$store.state.userName"判断有没有登录的用户名-->
            <router-link class="login" :to="{name: 'login'}">
                立即登录
            </router-link>
            <router-link class="register" :to="{name: 'register'}">
                注册
            </router-link>
        </div>
    </div>
</template>

<script>
import api from '@/api/index.js'

export default {
    data() {
        return {
            nearCity: [],
        }
    },

    // 监听$store.state.position，变化的话则执行一个函数
    watch: {
        "$store.state.position": function () {
            this.nearCity = this.$store.state.position.nearCity;   // 后端数据没有nearCity这个属性，所以就空数组把
        }
    },

    // 获取当前地理位置信息，有个初始化地理位置信息   {{$store.state.position.name}}
    created() {
        api.getCurPosition().then( (res) => {

            // setPosition是store.js里的函数
            this.$store.dispatch('setPosition', res.data.data);
            this.nearCity = res.data.data.nearCity;

        } )
    }
}
</script>

<style scoped>

</style>
