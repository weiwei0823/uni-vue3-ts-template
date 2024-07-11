//项目中和后端协定的一些类型码统一管理

export default {

	RESPONSE_CODE: {
		FAILD: 0,
		//正常返回
		SUCCESS: 200,

		//TOKEN 无效超时状态码
		TOKEN_FAILD: 401,
		//站点不允许访问状态码
		STATION_CLOSE: 9001,
		//系统维护中
		STATION_STAND: 406,
		//访问限制
		ACCESSR_ESTRICTIONS: 9002
	},




	STATION: {
		ALL: "ALL", //集合
		LUNTAN: "LUNTAN", //论坛
		LIUHE: "LIUHE", //六合
	},

	STATION_VERSION_CODE: {
		DEFAULT_CODE: "DEFAULT", //默认主站
		BETA_LUNTAN_20230720: "BETA_LUNTAN_20230720" //20230720 论坛独立体验站
	},

	//反馈页面类型参数
	USER_FEEDBACK_TYPE: {
		BBS: 1, //论坛类型
		LOTTERY: 2 //彩票类型
	},

	LOTTERY_TYPE_ID: {
		LIUHE: 4,
		ELEVEN_OUT_OF_FIVE: 19,
		KUAISAN: 28,
		AIRSHIP: 29,
		SHISHICAI: 30,
		PCEGG: 26,
		LUCKY_TWENTY: 31
	},


	/**
	 * 版本组隐配
	 */
	//隐key
	PAGE_VERSION_ELEMENT_HIDE_KEY: {
		//论首模页2 导页
		EL_LUNTAN_INDEX_02_CATEGORY_01: "components_CommonPages_pages_luntan_LuntanIndex_02>.category-tr",
		EL_LUNTAN_INDEX_02_CATEGORY_02: "components_CommonPages_pages_luntan_LuntanIndex_02>scroll-view"
	},

	//接口系统常量 客户端使用对应ID
	CONTANTS_CONFIGS_ID: {
		//微型站点图标ID
		LOGO_SMALL: 25,
		//带名字的LOGOid
		LOGO_HAD_NAME: 26,
		//登录logo
		LOGIN_LOGO: 27,
		//大尺寸logo
		LOGO_BIG: 24,

		STATION_LOGO:22,

		STATION_LOGO_ERROR_IMAGE:23,

		COURSE_ID: 34,

		AGENT_DEFAULT_REDIRECT_ADDRESS: 'agentDefaultRedirectAddress',

		ABOUT_US: 2,
		QR_CODE: 3,
		DOWNLOAD_URL: 6,
		ANDROID_URL: 14,
		IOS_URL: 15,
		LINE_ID1: 60,
		LINE_ID2: 61,
		LINE_ID3: 65,

		STATION_TEXT:21,

		IMAGE_URL:"projectUrl",

		PROJECT_VERSION:"projectNum",
		//进入电子游戏是否需要开启验证常量
		ENTER_GAME_CONDITION:"enter_game_condition"
	},


	STATION_QUERY_STORAGE_KEY: {
		INVITE_CODE: 'inviteCode'
	},

	APP_LOCALSTORE_KEYS: {
		MEM_USER_THEME_ID: 'mem_user_set_themeid',
		LANGUAGE_SET_VALUE: 'user_set_language_value',
		MEM_CLIENT_ID: 'mem_client_id',
		SYSTEM_INFO: 'systemInfo',
		ORDER_CAR_BACK: 'cartBack',
		LOCAL_STORE_LOTTERYTYPE: 'lotteryType',
		LOCAL_STORE_USERINFO: 'userInfo',
		LOCAL_STORE_LOTTERYSTATUS: 'lotteryStatus',
		LOCAL_STORE_TOKEN: 'token',
		LOCAL_STORE_LOTTERYNAMETITLE: 'lotteryNameTitle',
		LOCAL_STORE_LASTLOTTERY: 'lastLottery',
		LOCAL_STORE_CONFIG: 'config',
		LOCAL_STORE_LOTTERY_LIVE: "lotteryLiveConfigList",
		LOCAL_STORE_CATEGORYDATA: 'categoryData',
		LOCAL_STORE_WEBSITECONFIG: 'webSiteConfig',
		LOCAL_STORE_VERSION_KEY: 'lastClearVersion',
		LOCAL_STORE_DEBUG_LOG_USERINFO: "mem:log:userInfo",
		LOCAL_STORE_DEBUG_LOG_HTTP: "mem:log:http",
		LOCAL_STORE_IN_LOTTERY_NAME: 'm1:inLotteryName',
		LOCAL_STORE_CONFIG_RESPONSE:"lastConfigsResponse",
		LOCAL_STORE_APP_FULL_SCREEN_HEIGHT:"app:height"

	},

	/**
	 * uni.$emit 事件配置点
	 */
	UNIAPP_EMIT_KEYS:{
		//点击详情页发送数据
		LUNTAN_DETAILS_UPDATE_CLICKCOUNT:"onDetailsUpdateEmit",
		LIUHE_BUY_REBATE_INIT:"onInitRebeta"

	},


	API_CACHE_CALLBACK_NAME:"afterUpdateCb",


	LOTTERY_CHANNELS:{
		LAO_AOMEN:{
			id:10,
			name:'老澳门'
		}
	}

}