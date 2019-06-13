import axios from 'axios'


// 把appkey 和 域名单独提取出来：在全局做一层拦截，用拦截器            
// appkey（params）和 域名（配置的默认值/defaults，可以指定将被用在各个请求的配置默认值）

// baseURL 基础域名
axios.defaults.baseURL = 'http://api.duyiedu.com'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    console.log(config)

    // 动态地添加appkey
    config.params = {
        // ...config.params防止覆盖params，用ES6的解构赋值，把之前传过来的params放这里，再拼接上appkey
        ...config.params,       
        appkey: "KongGuangJun_1555124027631"
    } 
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 对配置了的axios导出
export default axios;   

