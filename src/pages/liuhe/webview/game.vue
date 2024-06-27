<template>
	<view class="fixed-locked" :class="['theme-' + themeColor.name]">
		<!-- <movable-area style="" class="move-back">
			<movable-view :x="x" :y="y" direction="all" @change="onChange"> -->
		<view class="back-box-new" v-if="isShow" @click="backConfrim" @touchstart="drag_start"
			@touchmove.prevent="drag_hmove" :style="{ top: isMove ? y + 'px' : '80rpx', left: isMove ? x + 'px' : '528rpx' }">
			<view class="left" @click="backConfrim">
				<view class="home-img" @click="backConfrim">
					<image src="@/static/imgs-liuhe/game_back.png" mode=""
						style="width:72rpx;height:72rpx;margin-left:0;margin-right:0;">
					</image>
					<image src="@/static/imgs-liuhe/game_back_text.png" mode="" style="width:68rpx;height:36rpx;margin-left:0;">
					</image>
				</view>
			</view>
		</view>
		<!-- 	</movable-view>
		</movable-area> -->
		<view v-if="$store.state.appInfoStore.configs && $store.state.appInfoStore.configs.isDebug && false"
			class="debug-box" @click="updateDebugBoxStatu">
			<view class="btn-debug-show-url" v-if="!debugBoxShow">
				DEBUG
			</view>
			<view class="btn-debug-show-url-content" v-if="debugBoxShow">
				{{ systemInfo.screenHeight }}
				{{ systemInfo.windowHeight }}
			</view>
		</view>

		<view name="webview-box" :style="{ height: webViewHeight }">
			<web-view ref="webview" id="gameWebview" :style="{ height: webViewHeight }" v-if="isShow" :src="url"></web-view>
			<!-- 	<iframe ref="webview" id="gameWebview" :style="{ height:webViewHeight }" v-if="isShow" :src="url"></iframe> -->
			<!-- v-if="isShow && !pageLoaded" -->
			<view v-if="isShow && !pageLoaded" class="uni-async-loading "
				style="background-color: #fff; z-index:9999; position:fixed; top:0;">

			</view>
			<!-- <image class="load-image uni-async-loading" src="@/static/img/loading_v2.gif"></image> -->

			<!-- <image v-if="isShow && !pageLoaded" class="load-image" src="@/static/img/loading_v2.gif" mode="widthFix"
				style="top:600rpx"></image> -->
		</view>

		<!--    <movable-area class="area">
      <movable-view class="home" direction="all" :inertia="true" @change="onChange" :x="x" :y="y">
        <view class="title">
          <view>返</view>
          <view>回</view>
          <view>大</view>
          <view>厅</view>
        </view>
        <image @click="backHome" src="@/static/home.png"></image>
      </movable-view>
    </movable-area>-->

		<AlertInjectLayer />
	</view>
</template>

<script>
import {
	getUserBalance,
	rollIn,
	exit,
	rollOut
} from "@/utils/lottery/mine";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
export default {
	components: {
		AlertInjectLayer,
	},
	name: "game",
	data() {
		return {
			url: '',
			platformId: '',
			backPath: '',

			isShow: false,
			debugBoxShow: false,
			pageLoaded: false,
			balance: {
				userBalance: '0.00'
			},
			winHeight: 0,
			title: '',
			pageHeader: false,
			start: [],
			isMove: false,
			x: 0,
			y: 0,
		}
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),
		webViewHeight() {
			let winHeight = this.winHeight;
			// let winHeight = this.winHeight;
			return `calc(${winHeight}px)`;
		},
		systemInfo() {
			return uni.getSystemInfoSync();
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	onLoad(item) {
		let _this = this;
		this.winHeight = uni.getSystemInfoSync().windowHeight;
		let url = null;
		let htmlContent = null;
		try {
			url = decodeURIComponent(item.url);
			// if (!/^[hH][tT][tT][pP]([sS]?):\/\/(\S+\.)+\S{2,}$/.test(url)) {
			// 	url = null;
			// 	htmlContent = item.url;
			// }
			// if (url.includes('c.iabc3000.com')) {
			// 	htmlContent = item.url;
			// } else {
			if (!/^[hH][tT][tT][pP]([sS]?):\/\/(\S+\.)+\S{2,}$/.test(url)) {
				url = null;
				htmlContent = item.url;
			}
			if (url.includes('c.iabc3000.com')) {
				url = item.url;
			}
		} catch (e) {
			htmlContent = item.url;
		}
		// 判断打开url还是 html 为后续逻辑做准备
		if (url) this.url = url;
		else {
			// 写入store 避免部分机型URL 长度限制 打开会导致丢失
			// 风险：html 在url参数中传递 长度超限 从内存中读取 ，但是用户手动刷新当前页面 导致页面内容丢失 或者不完整
			let gameResponseInMem = this.$store.state.memObStore.apiEnterGameDetails;
			if (gameResponseInMem && gameResponseInMem.result && gameResponseInMem.result != htmlContent) {
				htmlContent = gameResponseInMem.result;
			}
		}
		this.platformId = item.platformId
		this.backPath = item.backPath || '/pages/liuhe/home/index'
		uni.setNavigationBarTitle({
			title: item.gameName
		});
		this.getBalance();
		uni.$on("onWindowResize", function (sizeInfo) {
			_this.winHeight = sizeInfo.size.windowHeight;
		});

		this.isShow = true;
		console.log(this.isShow, "this.isShow")
		//#ifdef H5
		this.$nextTick(function () {
			let iframes = document.getElementsByTagName("iframe");
			let iframe = null; //iframes[iframes.length-1];
			//避免腾讯云导入IFRAME 影响此处
			for (let i = 0; i < iframes.length; i++) {
				if (iframes[i].id == "gameWebview") {
					iframe = iframes[i];
				}
			}
			iframe.sandbox = "allow-top-navigation allow-scripts allow-same-origin allow-forms ";
			if (htmlContent) {
				iframe.src = "data:text/html;charset=utf-8," + escape(htmlContent);
			}
			console.log(this.url, "this.url")
			iframe.addEventListener("load", function () {
				// const b = iframes.contentWindow.document​
				//代码能执行到这里说明已经载入成功完毕了
				_this.pageHeader = true;
				_this.pageLoaded = true;
			}, false);
		})
		//#endif

		// 传入需要跳转的链接 使用web-view标签进行跳转
	},
	methods: {
		drag_start(event) {
			this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
			this.start[1] = event.touches[0].clientY - event.target.offsetTop;
		},
		drag_hmove(event) {
			let tag = event.touches;
			this.isMove = true;
			// if (tag[0].clientX < 0) {
			// 	tag[0].clientX = 0
			// }
			// if (tag[0].clientY < 0) {
			// 	tag[0].clientY = 0
			// }
			// if (tag[0].clientX > this.windowWidth) {
			// 	tag[0].clientX = this.windowWidth
			// }
			// if (tag[0].clientY > this.windowHeight) {
			// 	tag[0].clientY = this.windowHeight
			// }
			this.x = tag[0].clientX - 36
			this.y = tag[0].clientY
			// this.x = tag[0].clientX - this.start[0];
			// this.y = tag[0].clientY - this.start[1];
		},


		back() {
			uni.switchTab({
				url: this.backPath,
				fail: () => {
					uni.redirectTo({
						url: this.backPath,
					});
				}
			})
		},
		onChange: function (e) {
			this.x = e.detail.x
			this.y = e.detail.y
		},
		getBalance() {
			getUserBalance().then(res => {
				this.balance = res.result
			}).catch(err => {
				console.log(err)
			})
		},
		backConfrim() {
			uni.$emit('showPop', {
				refName: "AlertMsg",
				data: {
					title: this.$t('pages.common.userCenter.index.warmPrompt'),
					content: "确定要退出游戏吗？"
				},
				confirm: () => {
					this.backHome();
				}
			})
		},
		backHome() {
			let prams = {
				platformId: Number(this.platformId)
			}
			exit(prams).then(res => {
				this.back()
			}).catch(err => {
				console.log(err)
			})
		},
		out() {
			let prams = {
				platformId: this.platformId
			}
			rollOut(prams).then(res => {
				if (res.code == 200) {
					pop("转入成功", 2000)
					this.getBalance()
				} else {
					pop(res.message, 2000)
				}
			}).catch(err => {
				console.log(err)
			})
		},

		updateDebugBoxStatu() {
			this.debugBoxShow = !this.debugBoxShow;
		}
	}
}
</script>

<style>
.uni-async-loading {
	background: red;
}
</style>

<style lang="scss" scoped>
::v-deep body {
	width: 100%;
	height: calc(100vh);
	position: fixed;
	overflow: hidden;
	z-index: 99;
	/*background: #ffffff;*/
}

::v-deep body {
	width: 100%;
	height: calc(100vh);
	position: fixed;
	overflow: hidden;
	z-index: 99;
	/*background: #ffffff;*/
}

::v-deep body {
	width: 100%;
	height: calc(100vh);
	position: fixed;
	overflow: hidden;
	z-index: 99;
	/*background: #ffffff;*/
}


::v-deep .pop-box {
	height: 294rpx !important;
}

.load-image {
	// width: 196rpx;
	// height: 156rpx;
	width: 82rpx;
	height: 82rpx;
	position: fixed;
	top: 530rpx;
	// left: calc(50% - 41rpx);
	left: calc(50%);
}

.area {
	width: 100vw;
	height: 89vh;
}

.home {
	position: fixed;
	right: 108rpx;
	top: 45rpx;
	z-index: 200000;
	display: flex;
	width: 150rpx;

	.title {

		font-style: normal;
		font-weight: 400;
		font-size: 24rpx;
		text-align: center;
		color: #FFFFFF;

		view {
			transform: rotate(90deg);
		}
	}

	image {
		height: 124rpx;
		width: 124rpx;
	}
}

.move-back {
	position: fixed;
	z-index: 99;
	top: 0;
	left: 0;
}

.back-box-new {
	position: fixed;
	z-index: 99;
	top: 80rpx;
	// left: 36rpx;
	right: 70rpx;
	transform: rotate(90deg);
	width: 140rpx;

	.left {
		.home-img {
			display: flex;
			align-items: center;
			width: 140rpx;
			// image {
			// 	height: 70rpx;
			// 	width: 70rpx;
			// 	margin-right: 5rpx;
			// 	margin-left: 20rpx;
			// }
		}
	}
}

.back-box {
	height: 88rpx;
	padding: 0 28rpx;
	background: #FFFFFF;
	width: 100%;
	box-sizing: border-box;
	max-width: 480px;
	top: env(safe-area-inset-top);
	z-index: 10;
	display: flex;
	align-items: center;
	border-radius: 0 0 24rpx 24rpx;

	.left {
		width: 50%;

		.home-img {
			display: flex;
			align-items: center;

			image {
				height: 70rpx;
				width: 70rpx;
				margin-right: 5rpx;
				margin-left: 20rpx;
			}
		}
	}

	.right {
		width: 50%;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.balance {
			display: flex;
			align-items: center;

			.blance-text {
				font-weight: 400;
				font-size: 30rpx;
				color: #404040;
				white-space: nowrap;
				margin-right: 20rpx;
			}

			.btn {
				width: 124rpx;
				height: 54rpx;
				background: var(--theme-color);
				border-radius: 12rpx;
				font-weight: 400;
				font-size: 26rpx;
				display: grid;
				place-content: center;
				color: #FFFFFF;
			}
		}
	}
}


.debug-box {
	position: fixed;
	top: 100rpx;
	/*background: skyblue;*/
	z-index: 999;
	max-width: 480px;
	word-break: break-all;

	.btn-debug-show-url {
		margin-left: 10px;
		background: #2f85dd;
		font-size: 12px;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
		text-align: center;
		font-weight: bold;
		color: white;
		border: 2px solid gainsboro;
	}

	.btn-debug-show-url-content {
		background: skyblue;
	}
}
</style>
