import Vue from 'vue'
import Router from 'vue-router'

// layout文件夹下
import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'

// page文件夹下
import Index from '@/page/index.vue'   
import ChangeCity from '@/page/changeCity.vue'
import goodsList from '@/page/goodsList.vue'

// page文件夹下
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'

Vue.use(Router)

export default new Router({
  // 去掉#
  mode: 'history',    

  routes: [
    // 这里做两大模板功能

    // 默认模板
    {
      path: '/',
      name: 'default',
      component: defaultPage,
      // 重定向  一开始就是http://localhost:8080/#/index
      redirect: '/index',
      // 嵌套路由  模板嵌套形式
      children: [{
        // 动态路由匹配:name
        // 我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果
        // 当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用
        path: 's/:name',   // 可以拿到searchBar的name
        name: 'goods',
        component: goodsList
      },{
        path: '/index',
        name: 'index',
        component: Index
      },{
        path: '/changeCity',
        name: 'changeCity',
        component: ChangeCity
      }
    ]
    },

    // 注册登录模板
    {
      path: '/blank',
      name: 'blankPage',
      component: blankPage,
      children: [{
        path: 'login',
        name: 'login',
        component: Login
      }, {
        path: 'register',
        name: 'register',
        component: Register
      }]
    }
  ]
})
