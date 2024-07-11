/**
 * 接口本地内存中 缓存表 （页面刷新后或者登录状态改变后失效）
 *
 *
 *
 * 配置说明
 * cache:120000 接口缓存120秒后重新通过API从服务端获取
 * forceUpdateCache: 强制缓存 但是会强制通过接口更新数据后 通过 API封装参数中回调刷新结果
 */

export default {

    "/api/article/listLatest":{cache:60000},
    // "/api/lottery/draw/isBind":{cache:120000,afterClear:['/api/lottery/mine/setPinCode']},
    "/api/index/lt/init":{forceUpdateCache:true},
    "/api/index/cp/init":{forceUpdateCache:true},
    "/api/lottery/recharge/getRechargeType":{forceUpdateCache:true},
    "/api/lottery/video/listYear":{cache:360000},
    "/api/lottery/history/listYear":{cache:360000},
    "/api/lottery/listLotteryDate":{cache:360000},
    "/api/common/userLevelList":{cache:360000},
    "/api/mine/setting/agentDesc":{cache:360000},
    "/api/lottery/live":{forceUpdateCache:true},
    "/api/lottery/shop/recommend/games":{cache:100000},
    "/api/lottery/shop/recommend/platformsByCategory":{cache:100000},
    "/api/lottery/shop/recommend/categories":{cache:100000},
    "/api/notice":{cache:120000},
    "/api/article/listArticleType":{cache:360000},
    "/api/lottery/result/query/listYear":{cache:360000},
    "/api/article/search":{cache:120000},
    "/api/lottery/result/query/assistant/list":{cache:10000,desc:"插叙助手获取列表 实时性较高 短时间缓存"},
    "/api/picture/detail":{forceUpdateCache:true,desc:"图片详情接口 缓存1分钟"},
    "/api/lottery/recharge/getRechargeGroup/v2":{forceUpdateCache:true,desc:"充值页获取公告接口"},
    "/api/article/detail":{forceUpdateCache:true,desc:"充值页获取公告接口"},
    "/api/lottery/detail/period":{forceUpdateCache:true,desc:"开奖信息接口"},
    "/api/lottery/getLotteryType":{forceUpdateCache:true,desc:"返点获取接口"},
    "/api/activityTask/types":{forceUpdateCache:true,desc:"活动类型菜单列表数据"},
    "/api/activityTask/details":{forceUpdateCache:true,desc:"活动菜单列表数据"},
    "/api/common/app/new":{forceUpdateCache:true,desc:"获取APP版本接口"},
    "/api/lottery/shop/v2/categoryData":{cache:360000},
    "/api/game/hall/gameListByPlatformCateId":{cache:360000},
    "/api/lottery/stat/summary":{forceUpdateCache:true},
    "/api/lottery/stat/numberStat":{forceUpdateCache:true},
    "/api/lottery/stat/attrConstant":{forceUpdateCache:true},
    "/api/guess/listYear":{cache:360000,desc:"幽默猜测日期接口"},
    "/api/guess/detail":{forceUpdateCache:true,desc:"幽默猜测详情接口"},
    "/api/guess/listPeriod":{forceUpdateCache:true,desc:"幽默猜测详情接口"},
    "/api/description/descriptionList":{cache:360000},
    "/api/lottery/lotteryTime":{forceUpdateCache:true,desc:"幽默猜测详情接口"},

}
