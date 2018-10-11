import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 引入api实例
import { instance } from './api';
// 不推荐全局挂载，按需导入方式更优雅
// Vue.prototype.$api = api;

// 全局filter挂载
import * as filters from './filters';
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    vm.$store.dispatch('showLoading', true);
    return config;
}, error => {
    // 对请求错误做些什么
    console.error('request reject');
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
    // 响应处理
    vm.$store.dispatch('showLoading', false);
    return response;
}, error => {
    // 对响应错误做点什么
    vm.$store.dispatch('showLoading', false);

    if (error && error.response) {
        switch (error.response) {
            // 根据错误码区分设置提示语   ！注意：接口超时状态为pending --> fail，没有错误码返回
            case 404:
            default:
                console.error('系统开小差了，请稍后再试！');
        }
    }
    return Promise.reject(error);
});

// 路由拦截器
router.beforeEach((to, from, next) => {
    // 处理keep-alive缓存后切换路由后页面返回顶部
    next();
});