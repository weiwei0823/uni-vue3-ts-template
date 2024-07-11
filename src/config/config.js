import configGameRouter from './models/configGameRouter.js'
import configEnums from './models/configEnum.js'
import configLotties from './models/configLotteries'
import configUIMgr from './models/configUIMgr'
import configVersionMgr from './models/configVersionMgr'
import configLanguage from './models/configLanguage'
import configCache from './models/configCache'
import configuratioBuilder from './configurationBuilder/configurationBuilder.js'

var isDebug = configuratioBuilder.getConfigIsDebugOrDefault(false); //true;
//是否为开发环境
var isDev = configuratioBuilder.getConfigIsDevOrDefault(true);
//是否强制使用服务端主题
var isForceServerTheme = configuratioBuilder.getConfigIsForceServerTheme(true);
//是否强制使用服务端语言
var isForceServerLanguage = configuratioBuilder.getConfigIsForceServerLanguage(true);
//当前站点对应环境
var station = configEnums.STATION.ALL; //ALL LIUHE LUNTAN

//生产环境 禁用log
if (!isDebug && !isDev) {
	console.log = function() {};
	console.error = function() {};
	console.debug = function() {};
	console.info = function() {};
	console.warn = function() {};
	console.trace = function() {};
}

//重写站点环境
station = configuratioBuilder.getConfigStationOrDefault(station);

//当前站点版本 默认为default 后续可以做不通状态码做区分
var stationVersionCode = configuratioBuilder.getConfigStationVersionCodeOrDefault(configEnums.STATION_VERSION_CODE
	.DEFAULT_CODE);
//是否开启HTTP 发送消息加密
var allHttpRequestUseEncrypt = configuratioBuilder.getConfigUseEncyptOnHttpReq(true);
//是否开启HTTP 打印发送消息加密日志
var allHttpRequestUseEncryptPrintLog = configuratioBuilder.getConfigUseEncyptOnHttpReqPrintLog(isDebug ? true : false);
//是否开启HTTP 返回消息需要解密
var allHttpResponseUserEncrypt = configuratioBuilder.getConfigUseEncyptOnHttpResp(true);

//是否打开HTTP本地缓存
var allHttpRequestUseCacheMap = configuratioBuilder.getConfigUseHttpCacheMap(true);


//是否开启Sign加密流程
var stationOpenHttpSign = configuratioBuilder.getConfigOpenHttpSign(isDebug ? true : false);


//初始google统计代码
// configuratioBuilder.initGoogleTag();

console.log("重写结果", isDebug, isDev, station, stationVersionCode);


/**
 * 配置文件选择使用的服务器域名
 * @type {string}
 */
var apiDomainPool = isDebug ? [""] : [""];
var apiDomain = apiDomainPool[0];


//设置页面显示版本号 生产环境鉴别版本使用
var versionPro = "v2.31.1";
//个人中心页面显示版本号 测试环境显示生产不显示 用于测试高频发布鉴别版本使用

var versionDev = "v2.31.1_2024071001";



/**
 * websocket 连接池配置 方便后期扩张检测链接最快速度
 */
var websocketWsUrls = isDebug ? (isDev ? ["https://h5.test-mk.net", "https://h5.test-mk.net"] : [
	"https://h5.test-mk.net"
]) : [
	""
]
var websocketWsUrl = websocketWsUrls[0];
//#ifdef H5
if (websocketWsUrl == "") {
	websocketWsUrl = location.protocol + "//" + location.host;
}
//#endif
websocketWsUrl = configuratioBuilder.getConfigUsedWsServer(websocketWsUrl)


const config = {
	// 论坛特殊处理 日期:230720
	// TODO yt 此类需求查config下 configUIMgr
	//is_230720: station === configEnums.STATION.LUNTAN && stationVersionCode == configEnums.STATION_VERSION_CODE.BETA_LUNTAN_20230720,
	station,
	stationVersionCode,
	isDebug: isDebug,
	isForceServerTheme,
	isForceServerLanguage,
	apiKey: "mk@20240124",
	base_url: [apiDomain + '/out'],
	me_base_url: [apiDomain + '/interface'],
	websocket_url_pool: websocketWsUrls,
	websocket_url: websocketWsUrl,

	version_pro: versionPro,
	version_dev: versionDev,

	apiUserShareRouter: '/interface/api/common/shareRouter/',
	apiUserShareDebugStation: 'https://66136.cc',

	loggerMax: 100,

	localDataChannel: 'localStore',

	//游戏枚举类
	enumMgr: configEnums,

	// 游戏路由管理器
	gameRouterMgr: configGameRouter,

	//彩票信息管理
	configLotties: configLotties,

	//通用UI配置
	configUIMgr: configUIMgr,
	//多语言配置相关项
	configLanguage: configLanguage,
	//缓存数据时间设置
	configCache: configCache,
	//皮肤设置是否按照不同UID用户存储信息
	saveThemeColorByUserId: false,
	//是否所有request接口使用加密方式发送参数
	allHttpRequestUseEncrypt: allHttpRequestUseEncrypt,
	//是否所有打印所有request加密明文日志
	allHttpRequestUseEncryptPrintLog: allHttpRequestUseEncryptPrintLog,
	//是否开启HTTP 返回消息需要解密
	allHttpResponseUserEncrypt: allHttpResponseUserEncrypt,
	//是否开始HTTP 接口缓存匹配
	allHttpRequestUseCacheMap: allHttpRequestUseCacheMap,

	stationOpenHttpSign: stationOpenHttpSign,

	configVersionMgr: configVersionMgr,

	stationOpenLanguageHeader: true,

	showLocalStorageReadLog: false,

	showLocalStorageWriteLog: true,

	defaultValues: {
		DEFAULT_SELECT_LOTTERY_TYPE: 2
	},
	//论坛切换按钮排序
	lotterTimesTabsSort: [2, 1, 5, 3, 4],



	init() {
		this.autoClearStorageBeforeOpen();
		// this.writeDefaultLocalStorage();
		this.initBuildSignModule();
	},

	// update api domain
	updateDomain(apiDomain = null) { //可以传入url 或者info信息
		console.log("update domain", apiDomain, "-----", new Date().getTime())
		if (apiDomain === null) {
			//从localStore读取内容
			apiDomain = uni.getStorageSync('apiDomain');
		} else {
			//写入localStore
			uni.setStorageSync('apiDomain', apiDomain);
		}
		//将url写入
		const url = apiDomain && apiDomain.url ? (apiDomain.url[apiDomain.url.length - 1] == '/' ? apiDomain.url
			.slice(0, -1) : apiDomain.url) : null;
		this.base_url = url ? [url + '/out'] : this.base_url;
		this.me_base_url = url ? [url + '/interface'] : this.me_base_url;
		// 引起H5生产报错
		// this.websocket_url = url || websocketWsUrls[0];
		this.websocket_url = url || this.websocket_url;
	},

	initedGooleTagIdMap: {},

	/**
	 * 初始化google统计代码
	 * @param googleId
	 */
	initGoogleTag(googleId) {
		// let googleId = this.getConfigValue(this.KEY_STATION_GOOGLE_ID);
		//#ifdef H5
		if (this.initedGooleTagIdMap[googleId]) return;
		if (!googleId) return console.error("google tag id is null");
		this.initedGooleTagIdMap[googleId] = true;
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', googleId);
		var hm = document.createElement("script");
		hm.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
		hm.async = true;
		hm.id = "googleTag";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
		//#endif

		//#ifndef H5
		console.error("google tag can't load");
		//#endif
	},

	/**
	 * 判断当前平台是否有彩票游戏
	 * **/
	stationHasLotteryGames() {
		return this.compriseLiuheStation();
	},

	/**
	 * 判断当前环境是否包含六合
	 * @returns {boolean}
	 */
	compriseLiuheStation() {
		return this.station == configEnums.STATION.ALL || this.station == configEnums.STATION.LIUHE;
	},


	queryParamFromSeachTmp: {},
	queryParamFromSeach(parameterName) {
		//#ifdef H5
		let search = window && window.location.search ? window.location.search.slice(1) : null;
		if (!search) return null;
		let queryMap = this.queryParamFromSeachTmp[search];
		if (!queryMap) {
			queryMap = {};
			let querysStrings = search.split('&');
			for (let k in querysStrings) {
				let queryString = querysStrings[k];
				if (queryString.indexOf('=') == -1) continue;
				let querySplited = queryString.split('=');
				if (!querySplited || querySplited.length != 2) {
					console.warn("split queryString error");
					continue;
				}
				let paramename = querySplited[0];
				let paramevalue = querySplited[1];
				queryMap[paramename] = paramevalue;
			}
			this.queryParamFromSeachTmp[search] = queryMap;
		}
		console.log(queryMap[parameterName], parameterName);
		return queryMap[parameterName];
		//#endif
		return null;
	},

	/**
	 *
	 * @param key
	 * @param defaultValue
	 * @param initAfterDefault 使用默认值的情况下初始化写入缓存
	 * @returns {*}
	 */
	getStorageSync(key, defaultValue, initAfterDefault = false) {
		let value = uni.getStorageSync(key);
		let usedDefault = false;
		if ((value === '' || value == null) && defaultValue !== undefined) {
			usedDefault = true;
			value = defaultValue;
		}
		if (usedDefault && initAfterDefault) {
			this.setStorageSync(key, value);
		}
		this.showLocalStorageReadLog && (console.log(`【localstorage:read】  key = ${key} value=`, value,
			` isUsed default=${usedDefault}`));
		return value;
	},

	setStorageSync(key, value, tryClearIfWriteError = false) {
		this.showLocalStorageReadLog && (console.log(`【localstorage:write】  key = ${key} value=`, value));
		uni.setStorage({
			key: key,
			data: value,
			fail: () => {
				if (tryClearIfWriteError) {
					uni.removeStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_DEBUG_LOG_USERINFO);
					uni.removeStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_DEBUG_LOG_HTTP);
					uni.setStorageSync(key, value);
				}
			}
		});
	},
	/**
	 * 清理用户缓存
	 * @param isClearUser
	 */
	clearStorage(isClearUser, reload = true) {
		let noClearUserMessage = [
			this.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
			this.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN,
			this.enumMgr.APP_LOCALSTORE_KEYS.MEM_CLIENT_ID
		];
		if (!isClearUser) {
			let mem = {};
			for (let key in noClearUserMessage) {
				let storageKey = noClearUserMessage[key];
				mem[storageKey] = this.getStorageSync(storageKey);
			}
			uni.clearStorageSync();
			for (let key in mem) {
				let storageKey = key;
				mem[storageKey] = this.setStorageSync(storageKey, mem[key]);
			}
		} else {
			uni.clearStorageSync();
		}
		//#ifdef H5
		reload && window.location.reload(true);
		//#endif
	},

	/**
	 * 对比版本消息清理Store
	 * 比较缓存版本和JS 返回版本不一致的情况下  清理localStore
	 */
	autoClearStorageBeforeOpen() {
		let version = this.getStorageSync(this.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_VERSION_KEY);
		if (version != this.version_dev) {
			this.clearStorage(false, false);
		}
		this.setStorageSync(this.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_VERSION_KEY, this.version_dev);
	},
	/**
	 * 是否初始化签名模块 开启HTTP验签
	 */
	initBuildSignModule() {
		if (this.stationOpenHttpSign && window['initSignModel'] && window['initSignModel'] instanceof Function) {
			initSignModel();
		}
	}


}


export {
	config
}
