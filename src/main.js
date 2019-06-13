// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// @符号代表当前src文件

import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/main.css'

import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false


// 自定义指令: 通过自定义指令绑定document事件
// 注册一个全局自定义指令 `v-document-click`

// 一个指令定义对象可以提供如下几个钩子函数 (均为可选)：bind等
// 钩子函数有参数：
// el：指令所绑定的元素，可以用来直接操作 DOM。
// binding：一个对象，包含有几个属性（其中value是指令的绑定值）
// vnode：Vue 编译生成的虚拟节点。

Vue.directive('document-click', {
  // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind(el, binding, vnode) {
    console.log('----bind', el, binding, vnode); 

    //在document上绑定click事件  事件处理函数在binding.value    false不捕获
    document.addEventListener('click', binding.value, false);  
  },


  // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  // inserted() {
  //   console.log('insert');
  // },
  // // 所在组件的 VNode 即节点更新时调用
  // update() {
  //   console.log('update');
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
