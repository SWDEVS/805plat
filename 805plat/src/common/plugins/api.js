//export const baseUrl = 'https://m-test.dev805.com'//内网测试
//export const baseUrl = 'https://m-test.805.com'//外网测试
//export const baseUrl = 'https://m.805.com'//正式
export const baseUrl=""
const api = {
    gettoken:baseUrl+"/gamelogin/wechat",
    getuserinfo:baseUrl+"/gameuser/userinfo",
    getuserbaseinfo:baseUrl+"/gameuser/userbaseinfo",//获取个人信息
    address:baseUrl+"/gameuser/address",//修改地址
    finishsend:baseUrl+"/gameuser/finishsend",//修改地址
    bindaccount:baseUrl+"/gameuser/bindaccount",//绑定手机
    couplist:baseUrl+"/gameshop/couplist",//获取领奖列表
    getbeanlist:baseUrl+"/gameuser/Ybwaterlist",//获取金豆记录
    getpointlist:baseUrl+"/gameuser/ticketRecord",//获取积分记录
    getpayitem:baseUrl+"/gamepay/payitem",//获取充值列表
    receivecoup:baseUrl+"/gameshop/receivecoup",//优惠券领取
    cates:baseUrl+"/gameshop/cates",//获取商品分类
    list:baseUrl+"/gameshop/list",//获取商品列表
    goodsdetail:baseUrl+"/gameshop/detail",//获取商品详情
    convertgoods:baseUrl+"/gameshop/convertgoods",//商品兑换    
    getcoupondetail:baseUrl+"/gameshop/getcoup",//优惠券详情
    convertgoodsExchange:baseUrl+"/gameshop/convertgoods2",//商品兑换
    listhot:baseUrl+"/gameshop/listhot",//热门商品  
    getwxconfig:baseUrl+"/weixin/share",//获取微信jssdk config
    createorder:baseUrl+"/gamepay/createorder",//创建订单
    getpayconfig:baseUrl+"/gamepay/payup",//获取支付信息
    getmycoupon:baseUrl+"/gameuser/mymchcoupons",//获取个人优惠券
    getpurchaselist:baseUrl+"/gameuser/paywaterlist",//获取充值记录列表
    getpurchasedetail:baseUrl+"/gameuser/paywaterinfo",//获取充值订单详情
    getorderlist:baseUrl+"/gameuser/ajaxexchangelist",//获取订单列表
    getorderdetail:baseUrl+"/gameuser/exchangedetail",
    getsignlist:baseUrl+"/gameuser/signlist",//签到列表
    sign:baseUrl+"/gameuser/sign",//签到列表
    activelist:baseUrl+"/gameuser/activelist",//日常任务列表
    share:baseUrl+"/gameuser/Share",//日常任务列表
    receiveActive:baseUrl+"/gameuser/ReceiveActive",//日常任务列表
    gethotcates:baseUrl+"/gameshop/hotcates",//商品分类
}

export default api