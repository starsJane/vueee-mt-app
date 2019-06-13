<template>
  <div class="page-register">

    <div class="header">
      <header>
        <a href="#" class="site-logo"></a>
        <div class="login">
          <span>已有美团账号</span>
          <router-link :to="{name: 'login'}">登录</router-link>
        </div>
      </header>
    </div>

    <div class="content">
      <!-- Form 表单   自定义校验规则    model传给后端的数据（表单数据对象）   rules校验规则（产品经理定的）-->
      <!-- prop传入 Form 组件的 model 中的字段 -->
      <!-- ref除了可以获取本页面的dom元素，还可以拿到子组件中的data和去调用子组件中的方法 -->
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="registerForm.userName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off" @input="input"></el-input>
          
          <!-- 自己添加在这 -->
          <!-- transition 过渡  去看scss样式-->
          <div class="pw-strength">
            <!-- 动画div 动态添加类名改变宽度    strengthClass动态改变的类名 在data里存了数据 -->
            <div :class="['bar', strengthClass]"></div>
            <!-- 弱中强div -->
            <div class="letter">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>

        </el-form-item>

        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="registerForm.rePassword" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
        </el-form-item>

      </el-form>
    </div>

    <footer></footer>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
  data() {

    // 校验规则
    var validateUser = (rule, value, callback) => {
        console.log(value)
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 4 || value.length > 16) {
        callback(new Error("用户名必须为4-16位的字母数字下划线组成"));
      }else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.Password !== '') {
          // validateField	对部分表单字段进行校验的方法
          this.$refs.registerForm.validateField('Password');
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        userName: "",
        password: "",
        rePassword: ""
      },
      strengthClass: "",

      // 设置校验
      rules: {
        userName: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        rePassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  methods: {
    // 提交表单校验   formName是传过来的表单名称registerForm, 通过表单名称来拿到数据
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // valid 代表当前所有的数据都认证成功时,进入if判断, 调用后端接口传递参数
          if (valid) {
            api.register({
                params: this.registerForm
            }).then((res) => {
                if (res.data.status == 'success') {
                    // 跳转到登录页
                    this.$router.push({name: 'login'});
                } else {
                    alert(res.data.msg);
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },

    // 弱中强校验
    input() {
      // g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）
      // \w 查找单词字符，等价于[a-zA-Z0-9]  \d 查找数字，等价于[0-9]
      // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。
      // 重复字符匹配   + 表示匹配前面的子表达式一次或多次
        var regStr = /(\w)+/g;    //创建一个 RegExp 对象并通过 regStr 变量进行引用.
        var regNum = /(\d)+/g;
        var reg = /_/g;
        var strongth = this.registerForm.password.match(reg) &&  this.registerForm.password.match(regStr) && this.registerForm.password.match(regNum);

        console.log('abc123_'.match(reg));
        if (this.registerForm.password.length > 20 || (this.registerForm.password.length > 6 && strongth)) {
            this.strengthClass = 'strong';
        } else if (this.registerForm.password.length < 6) {
            this.strengthClass = 'week';
        } else if (!this.registerForm.password) {
            this.strengthClass = '';
        } else{
            this.strengthClass = 'normal';
        }

    }
  }
};

// this指向问题
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>