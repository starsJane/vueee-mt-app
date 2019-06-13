
// 把所有请求都写在这，在其它位置想要调用接口时，直接调用这个文件的方法就行

import axios from '@/axios.js'

var api = {
    // 首页搜索框、热门搜索
    searchHotWords (params) {   // 也可以传参数
       return axios.get('/api/meituan/header/searchHotWords.json', params)
    },
    getSearchList () {
        return axios.get('/api/meituan/header/search.json')
    },
    // 首页侧边导航
    getMenuList () {
        return axios.get('/api/meituan/index/nav.json')
    },
    // 首页有格调内容区
    resultsByKeywords () {
        return axios.get('/api/meituan/index/resultsByKeywords.json')
    },

    // 搜索内容子页
    getProductsList () {
      return axios.get('/api/meituan/list/goodsList.json')
    },

    // 切换城市页 热门城市
    getHotCity () {
      return axios.get('/api/meituan/city/hot.json')
    },
    // 切换城市页 最近搜索城市
    getRecentCity () {
      return axios.get('/api/meituan/city/recents.json')
    },
    // 切换城市页 获取省份列表
    // 点击某一个城市切换地理位置信息(两个组件geo.vue  province.vue交互)   province.vue->store.js->geo.vue
    getProvinceList () {
      return axios.get('/api/meituan/city/province.json')
    },
    // 切换城市页 获取当前地理位置信息，有个初始化地理位置信息   geo.vue
    getCurPosition () {
      return axios.get('/api/meituan/city/getPosition.json')
    },
    // 切换城市页 获取城市列表    catagory.vue
    getCityList () {
      return axios.get('/api/meituan/city/cityList.json')
    },
    // 登录 login.vue    第二个参数params是对请求的配置，所有传给后端的数据在params下
    login (params) {
      return axios.get('/api/meituan/login', params)
    },
    // 注册 register.vue
    register (params) {
      return axios.get('/api/meituan/register', params)
    }
}


export default api;




