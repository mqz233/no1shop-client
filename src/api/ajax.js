//二次封装axios
import axios from "axios";
// import e from "express";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

//1.配置公共路径 和 超时时间
const service = axios.create({
    baseURL: "/api",
    timeout: 5000
})

//2.使用拦截器：添加进度条,直接返回响应内容中的数据 (还可以给请求头添加信息 config是请求报文)
service.interceptors.request.use(function (config) {

    nProgress.start()
    return config;
});


service.interceptors.response.use(function (response) {

    nProgress.done()
    return response.data;
}, function (error) {

    nProgress.done()
    //3.统一处理出现的错误
    alert("error:" + error.message)
    //这个错误让后面继续处理
    // return Promise.reject(error);
    //不想让后面继续处理，返回pending状态promise
    return new Promise(() => { })
});

export default service