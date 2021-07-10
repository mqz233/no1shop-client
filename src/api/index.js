// 封装请求接口函数
import request from './ajax'
import mockRequest from './mockAjax'

//请求三级目录函数
export const reqCategoryList = () => {
    return request({
        // 路径
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}

//请求模拟接口的数据banner和floor
export const reqBannerList = () => {
    return mockRequest({
        url: "/banner",
        method: "get"
    })
}

export const reqFloorList = () => {
    return mockRequest({
        url: "/floor",
        method: "get"
    })
}

// 获取搜索的商品数据
export const reqSearchInfo = (searchParams) => {
    return request({
        url: "/list",
        method: "post",
        data: searchParams
    })
}