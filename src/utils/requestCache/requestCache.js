import cacheConfigs from "./cacheConfig/ApiCacheConfig"
import {config} from "@/config/config";

export default {

    clearApiMap: null,

    initApiCacheConfig: function (requestArgs) {
        let openCache = config.allHttpRequestUseCacheMap;
        if (!openCache) return;
        let api = requestArgs.url;
        let configPice = cacheConfigs[api];
        if (configPice) {
            configPice['cache'] && (requestArgs["cacheTime"] = configPice['cache']);
            configPice['forceUpdateCache'] && (requestArgs["forceUpdateCache"] = configPice['forceUpdateCache']);
            configPice['afterClear'] && (requestArgs['afterClearCaches'] = configPice['afterClear']);
        }

    },

    getApiCacheConfigMap: function () {

    },

    getApiClearCachePointMap: function () {
        if (this.clearApiMap) return this.clearApiMap;
        let clearApiMap = {};
        for (let apiset in cacheConfigs) {
            let configPice = cacheConfigs[apiset];
            let afterClearApis = configPice.afterClear || null;
            if (afterClearApis && Array.isArray(afterClearApis)) {
                afterClearApis.forEach((_excuteApi => {
                    if (!clearApiMap[_excuteApi]) clearApiMap[_excuteApi] = [];
                    let pointList = clearApiMap[_excuteApi];
                    if (pointList.indexOf(apiset) == -1) pointList.push(apiset);
                }))
            }
        }
        this.clearApiMap = clearApiMap;
        return this.clearApiMap;
    },

    bindLastCacheUpdateApiCallBack(res, callBack, region) {
        res[config.enumMgr.API_CACHE_CALLBACK_NAME] = (netResp) => {
            // console.log("绑定回调内容",res,callBack,region)
            if (callBack && region)
                callBack.call(region,netResp);
        }
    }

}
