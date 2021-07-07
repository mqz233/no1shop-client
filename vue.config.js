module.exports = {
    // 更改eslint的提示级别
    lintOnSave: 'warning',
    // 配置代理 请求/api，会被转发
    devServer: {
        proxy: {
            "/api": {
                target: "http://api.atguigu.cn/",
                secure: false
            }
        }
    }

}