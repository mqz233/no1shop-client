// 封装请求接口函数
import request from './ajax'

//请求三级目录函数
export const reqCategoryList = () => {
    return request({
        // 路径
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}