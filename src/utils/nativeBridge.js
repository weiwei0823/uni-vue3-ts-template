export default {


	/**
	 * NATIVE 接口参考文档地址
	 * https://gongxiang.notion.site/Native-js-0d78e8e59ebb434ab1d4f5580315b9d4
	 * https://trite-eel-db0.notion.site/Native-js-cf1dad1f2e4d47b88dddbcef3eac02b5
	 * IPA Android 外壳程序统一实现上部文档内Native接口
	 *
	 * 前端调试方式：
	 * 将前端程序端口使用8081 并且运行前端设备局域网IP为192.168.0.106 安装IOS 程序壳
	 * 下载地址：https://kpljmxy.qianmingww006.top/kpljmxy
	 * 安装程序壳启动后会加载:http://192.168.0.106:8081/#/ 页面 ，正常调试即可
	 *
	 *
	 * [nativeBridgeInstance] 表示为挂载到自己程序中的引入对象 例如MK 中是 this.$nativeBridge....
	 *
	 */

	//事件池缓存
	eventPools: {},

	//是否为调试模式 开启H5环境下
	isDebug: false,

	// 最小时间粒度内 保存的已经生成的种子记录
	seedLockedMap: {},


	/**
	 * 打开外部链接
	 * @param openUrl
	 */
	openUrl(openUrl) {
		if (browserPlatform() == browserPlatform.FLUTTER_App) {
			window.flutter_inappwebview && window.flutter_inappwebview?.callHandler("openExtraUrl", openUrl)
			// window.flutter_inappwebview&&window.flutter_inappwebview.callHandler("openExtraUrl", 参数1-url)
		} else {
			window.open(openUrl);
		}
	},
	setSafeAreaColor(color) {
		window.flutter_inappwebview?.callHandler(
			"bottomSpaceColor",
			color
		);
	},
	/**
	 * 调整APP顶部颜色
	 * @param color
	 * @param isLightColor
	 */
	setStatusBarColor(color, isLightColor) {
		if (color.startsWith("#")) {
			color = Number("0xFF" + color.slice(1));
		}
		try {
			if (browserPlatform() == browserPlatform.FLUTTER_App) {
				window.flutter_inappwebview?.callHandler(
					"statusBarColor",
					color,
					isLightColor ? true : false
				);
			}
		} catch (e) {}
	},

	/**
	 * 保存网络图片到本地
	 * @param imageUrl 网络图片地址
	 * @param callBackError 错误回调
	 * @param region 错误回调作用域
	 */
	saveImageByUrl(imageUrl, callBackError, region, showNativeDoMsg = null) {

		if (browserPlatform() != browserPlatform.FLUTTER_App) {
			//#ifdef H5
			uni.saveImageToPhotosAlbum({
				filePath: imageUrl
			});
			//#endif

			callBackError && region && (callBackError.call(region, {
				code: -1,
				params: [imageUrl],
				msg: '当前环境不支持该Native方法'
			}));
			return;
		}
		if (window.flutter_inappwebview) {
			window.flutter_inappwebview?.callHandler("saveImageToGallery", imageUrl);
			showNativeDoMsg && pop(showNativeDoMsg);
		} else {
			callBackError && region && (callBackError.call(region, {
				code: 0,
				params: [imageUrl],
				msg: 'native服务忙，请稍后重试'
			}));
		}
	},

	getWindowTop() {
		if (browserPlatform() != browserPlatform.FLUTTER_App) {
			return {
				code: -1,
				msg: '当前环境不支持该Native方法'
			};
		}
		try {
			if (!window?.flutter_inappwebview?.callHandler) {
				const timmer = setInterval(() => {
					if (window?.flutter_inappwebview?.callHandler) {
						window.flutter_inappwebview?.callHandler("getWindowTop", "tag1")
						clearInterval(timmer);
					}
				}, 3000);
				return
			}
			window.flutter_inappwebview?.callHandler("getWindowTop", "tag1")
		} catch (e) {
			alert(e)
		}
	},

	getWindowBottom() {
		if (browserPlatform() != browserPlatform.FLUTTER_App) {
			return {
				code: -1,
				msg: '当前环境不支持该Native方法'
			};
		}
		try {
			if (!window?.flutter_inappwebview?.callHandler) {
				const timmer = setInterval(() => {
					if (window?.flutter_inappwebview?.callHandler) {
						window.flutter_inappwebview?.callHandler("getWindowBottom", "tag1")
						clearInterval(timmer);
					}
				}, 3000);
				return
			}
			window.flutter_inappwebview?.callHandler("getWindowBottom", "tag1")
		} catch (e) {
			alert(e)
		}
	},


	callNativeGetHandler(eventName){
		if (browserPlatform() != browserPlatform.FLUTTER_App) {
			return {
				code: -1,
				msg: '当前环境不支持该Native方法'
			};
		}
		try {
			let _this=this;
			if (!window?.flutter_inappwebview?.callHandler) {
				const timmer = setInterval(() => {
					let _seed = _this.buildClientSeed();
					if (window?.flutter_inappwebview?.callHandler) {
						window.flutter_inappwebview?.callHandler(eventName, _seed)
						clearInterval(timmer);
					}
				}, 3000);
				return
			}
			let seed =this.buildClientSeed();
			window.flutter_inappwebview?.callHandler(eventName, seed)
		} catch (e) {
		}

	},



	setTopSpace(height) {
		try {
			window.flutter_inappwebview?.callHandler("topSpace", height)
			// alert("topSpace" + height)
			uni.$emit("forceUpdateWinsize", height != 0);
		} catch (e) {}
	},



	/**
	 * 上部分区域为自定义封装区域 随业务需求自行调整
	 */



	/**
	 * 创建一个客户端时间区间内不可能存在重复的随机种子值
	 * @returns {*|*|string|string}
	 */
	buildClientSeed() {
		let time = Date.now();
		let prefix = Math.ceil(Math.random() * 10000).toString().padStart(4, "0");
		let createSeed = `${time}${prefix}`;
		if (!this.seedLockedMap[time]) {
			delete this.seedLockedMap;
			this.seedLockedMap = {};
			this.seedLockedMap[time] = [];
		}
		if (this.seedLockedMap[time].indexOf(createSeed) != -1) {
			return this.buildClientSeed();
		}
		this.seedLockedMap[time].push(createSeed);
		return createSeed;
	},

	/**
	 * 调native 统Get方
	 * @param event
	 * @param seed
	 */
	doGetNativeMessage(event, seed) {
		if (!seed) seed = this.buildClientSeed();
		if (!window.flutter_inappwebview) console.warn("flutter_inappwebview 对象错误")
		window.flutter_inappwebview && window.flutter_inappwebview?.callHandler(event, seed);
	},
	/**
	 *
	 * @param eventName
	 * @param nativeCallBackName
	 * @param callBack
	 * @param region
	 */
	doGetNativeCallHandler(eventName, nativeCallBackName, callBack, region) {
		let seed = this.buildClientSeed();
		this.addOneNativeCallbackListener(eventName, nativeCallBackName, seed, true, callBack, region);
		this.doGetNativeMessage(eventName, seed);
	},
	/**
	 * 以阻塞的方式获取某个值data值
	 * 使用案例 let responseData = await [nativeBridgeInstance].doGetNativeCallHandler([文档中事件名],[文档中Native调用函数名称])
	 * @param eventName native方法名称
	 * @param nativeCallBackName native回调名称
	 * @param timeOut 超时时间
	 * @returns {Promise<any> | Promise}
	 */
	doAwaitGetNativeCallHandler(eventName, nativeCallBackName, timeOut = 0) {
		let seed = this.buildClientSeed();
		let that = this;
		let promise = new Promise((resolve => {
			that.addOneNativeCallbackListener(eventName, nativeCallBackName, seed, true, function(res) {
				resolve(res);
			}, that);
			that.doGetNativeMessage(eventName, seed);
		}));

		return promise;
	},

	/**
	 * 注册或者给任务池添加一个事件监听队形
	 * @param eventName native事件名称
	 * @param nativeCallBackName native 回调名称
	 * @param seed 客户端随机种子值
	 * @param isOnece 是否当前监听只执行一次
	 * @param callback 回调函数
	 * @param region 作用域
	 * @listenAll on 模式下会不处理seed 回调所有同名事件
	 */
	addOneNativeCallbackListener(eventName, nativeCallBackName, seed, isOnece, callback, region, listenAll = false) {
		let eventPool = this.eventPools;
		if (!eventPool[nativeCallBackName]) {
			eventPool[nativeCallBackName] = {};
			global[nativeCallBackName] = function(res) {
				let formartObj = null;
				let targetSeed = -1;
				let responseData = null;
				try {
					formartObj = JSON.parse(res);
					targetSeed = formartObj.tag;
					if (targetSeed === undefined) {
						targetSeed = 1;
						responseData = res;
					} else {
						responseData = formartObj.data;
					}
				} catch (e) {
					targetSeed = 1;
					responseData = res;
				}
				let runEvents = eventPool[nativeCallBackName];
				if (runEvents) {
					for (let seed in runEvents) {
						let eventItem = runEvents[seed];
						if (!eventItem._listenAll && targetSeed !== 1 && seed != targetSeed) continue;
						if (eventItem._didNum < (eventItem._isOnece ? 1 : Infinity)) {
							eventItem._didNum++;
							eventItem._did = true;
							setTimeout(() => {
								eventItem._cb && eventItem._reg && eventItem._cb.call(eventItem._reg,
									responseData);
							});
							if (eventItem._isOnece) {
								delete runEvents[seed];
							}
						}
					}
				}
			}
		}
		eventPool[nativeCallBackName][seed] = {
			_isOnece: isOnece,
			_fromEvent: eventName,
			_did: false,
			_didNum: 0,
			_cb: callback,
			_reg: region,
			_listenAll: listenAll
		};
	},

	/**
	 * 添加监听native回调JS方法
	 * @param nativeCallBackName native 回调名称
	 * @param callback 回调函数
	 * @param region 作用域
	 * @param isOnece 是否只执行一次
	 * @param isClearOtherListener 是否清理当前NativeCallBackName下其它所有的监听器
	 * @param eventFlg 预留event标记 为后续eventPool中保存最小listener溯源做准备
	 */
	on(nativeCallBackName, callback, region, isOnece = false, isClearOtherListener = false, eventFlg =
		"onSetListener") {
		let eventPool = this.eventPools;
		if (isClearOtherListener) {
			let runEvents = eventPool[nativeCallBackName];
			if (runEvents) {
				for (let seed in runEvents) {
					delete runEvents[seed];
				}
			}
		}
		let seed = this.buildClientSeed();
		this.addOneNativeCallbackListener(eventFlg, nativeCallBackName, seed, isOnece, callback, region, true);
	}



};
