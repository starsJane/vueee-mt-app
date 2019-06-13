import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 用了vuex store实现子组件的数据共用
// 顶部导航的地理位置，搜索框的内容， 要和下边导航栏同步  
// navigator.geolocation.getCurrentPosition( (res)={console.log('xxxx')} )  获取地理位置信息是异步过程

const state = {
  position: {}, // 地理位置共享数据
  userName: ''  // 登录页和首页用户信息共享数据
}

const mutations = {
  // val是state数据变化时传过来的要改变值
  setPosition (state, val) {
    state.position = val    // 赋值
  },
  setUserName(state, val) {
    state.userName = val
  }
}

// 异步请求后端获取当前位置数据   setPosition在actions里执行
const actions = {
  setPosition ({ commit }, val) {   
    // ES6结构赋值语法{ commit }
    commit('setPosition', val)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
