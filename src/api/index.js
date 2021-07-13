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

// 获取商品详情信息
// /api/item/{ skuId }
export const reqDetailInfo = (skuId) => {
    return request({
        url: `/item/${skuId}`,
        method: "get"
    })
}

// 通知服务器添加购物车的商品和数量
export const reqAddShopCart = (skuId, skuNum) => {
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: "post"
    })
}

// 获取购物车列表
// /api/cart/cartList
export const reqCartList = () => {
    return request({
        url: "/cart/cartList",
        method: "get"
    })
}

// 更改复选框状态
// 商品选中状态 0代表取消选中 1代表选中
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqIsChecked = (skuId, isChecked) => {
    return request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "get"
    })
}