import axios from 'axios';
// import qs from 'qs';    // 参见node qs模块，如不需要可删除

// 配置请求域名
export const baseUrl = '/api';  // dev环境    反向代理，参见vue.config.js devServer.proxy
// export const baseUrl = '';  // prod环境    发版真实域名

// 创建实例
export const instance = axios.create({
    baseURL: baseUrl,
    // timeout: 20000,  // 超时时间，单位毫秒    可不设，默认60s
    headers: { // 默认可不设，如单一接口需修改参数类型，请在方法内部修改
        'Content-Type': 'application/json; charset=UTF-8'
    }
});

// Login
export const Login = data => {
    return instance.request({
        method: 'POST',
        url: 'path',
        data
    });
};
