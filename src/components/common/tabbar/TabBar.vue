<template>
	<view class="tab-bar-box">
		<view id="tab-bar" :style="{ '--theme-color': themeColor.themeColor }">
			<view class="tab-item" v-for="(item, key) in bar" @click="itemClick(item.path,key)">
				<view class="item-box" :class="{ 'item-center': key === 2 }">
					<view class="img-box" :class="{ 'center': key === 2, 'center-bg': key === 2  }">
						<sheet-animation :ref="`sheetAnimation_${key}`" :id="key" v-if="item.sheetImage" :width-rpx="48"
							:height-rpx="48" :sheetImage="item.sheetImage"
							v-on:onReady="onAnimationReady"></sheet-animation>
						<image class="img" v-if="item.activeImg&&item.img" :lazy-load="true"
							:src="current == key ? item.activeImg : item.img"></image>
						<image class="hot" v-show="key===0 && current==2" :lazy-load="true"
							src="/static/img/tabbar/hot.png"></image>
						<view class="hot-point" v-show="key===0 && current!=2 &&current!=0"></view>
					</view>
					<view class="item-text" :class="{ 'item-text-color': key == current,'center-text': key === 2 }">
						{{ item.text }}
					</view>

				</view>
			</view>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script>
	import sheetAnimation from "../sheetAnimation/SheetAnimation"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "TabBar",
		computed: {
			...mapGetters(["themeColor", "contantsConfigTypeMap"]),

			firstTabbarText() {
				if (this.contantsConfigTypeMap && this.contantsConfigTypeMap[this.$config.enumMgr.CONTANTS_CONFIGS_ID
						.STATION_TEXT]) {
					let configInfo = this.contantsConfigTypeMap[this.$config.enumMgr.CONTANTS_CONFIGS_ID.STATION_TEXT];
					return configInfo.url;
				}
				return null;
			}
		},
		watch: {
			firstTabbarText(txt) {
				if (txt) this.updateTabbarText();
			}
		},

		components: {
			sheetAnimation
		},
		props: {
			current: String | Number,
		},
		data() {
			return {
				isApp: false,
				// safeArea: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeAreaInsets
				// 	.bottom + "px",
				bar: [{
						id: 1,
						sheetImage: "/static/img/tabbar/sheet_picture_luntan_{#theme}.png",
						text: this.$t("components.common.tabbar.Tabbar.text1"),
						path: '/pages/luntan/home/index/Index'
					},
					{
						id: 2,
						sheetImage: "/static/img/tabbar/sheet_picture_taoliao_{#theme}.png",
						// text: '淘料',
						text: this.$t("components.common.tabbar.Tabbar.text2"),
						path: '/pages/luntan/market/index',
					},
					{
						id: 3,
						// img: "/static/img/tabbar/bar3_new.png",
						// activeImg: "/static/img/tabbar/icon_home.gif",
						sheetImage: "/static/img/tabbar/sheet_picture_liuhe_hall.png",
						// text: '购彩大厅',
						text: this.$t("components.common.tabbar.Tabbar.text3"),
						path: '/pages/liuhe/home/index',
					},
					{
						id: 4,
						// img: "/static/img/tabbar/bar4.png",
						// activeImg: "/static/img/tabbar/icon_discover.gif",
						sheetImage: "/static/img/tabbar/sheet_picture_faxian_{#theme}.png",
						// text: '发现',
						text: this.$t("components.common.tabbar.Tabbar.text4"),
						path: '/pages/luntan/find/index'
					},
					{
						id: 5,
						sheetImage: "/static/img/tabbar/sheet_picture_user_01_{#theme}.png",
						text: this.$t("components.common.tabbar.Tabbar.text5"),
						path: '/pages/common/userCenter/index'
					},
				]
			}
		},

		mounted() {
			//20230721 测试新增  优化综合站自定义菜单页切换 loading 测试方案 ，预加载其它页面内容
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;

			this.doCheckAllTabarItems();
			let that = this;
			uni.$on("on-tab-change", (tabIndex) => {
				that.playPageMenuItemAnimation(tabIndex);
			});
			this.updateTabbarText();
			if (this.isApp) {
				this.$nativeBridge.setSafeAreaColor('#f3f9f6')
			}
		},


		methods: {
			isActive(index) {
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
				return this.bar[index].path.indexOf(curRoute) !== -1
			},
			itemClick(path, tabIndex) {
				if (path == '') {
					pop('敬请期待', 2000)
					return false
				}
				// if (tabIndex === 4 && ['sign','demo'].includes(this.$store.state.appInfoStore.userInfo?.userType)) {
				// 	uni.$emit('showPop', {
				// 		refName: 'AlertMessage'
				// 	})
				// 	return false
				// }
				uni.$emit("on-tab-change", tabIndex);
				uni.switchTab({
					url: path
				})
			},
			doCheckAllTabarItems() {
				let paths = [];
				for (let key in this.bar) {
					let barItem = this.bar[key];
					paths.push(barItem.path);
				}
				this.$store.dispatch("preloadPagesByPaths", paths);
			},
			//页面首次加载由动画出事成功后 自动调用
			onAnimationReady(tabIndex) {
				let ref = this.$refs[`sheetAnimation_${tabIndex}`] ? this.$refs[`sheetAnimation_${tabIndex}`][0] : null;
				if (tabIndex == this.current) {
					ref && ref.startAnimationBetween instanceof Function && ref.startAnimationBetween(0, -2, false, -
						2); // 倒数第二帧完结
				} else {
					ref && ref.stopAnimation instanceof Function && ref.stopAnimation(-1); //倒数第一帧为未选中状态
				}
			},
			//每个页面菜单收到通知后惊醒切换处理 虽然JS 计算消耗有 但是因为都是不销毁页面 不好做优化
			playPageMenuItemAnimation() {
				for (let index in this.bar) {
					let ref = this.$refs[`sheetAnimation_${index}`] ? this.$refs[`sheetAnimation_${index}`][0] : null;
					if (index == this.current) {
						ref && ref.startAnimationBetween instanceof Function && ref.startAnimationBetween(0, -2, false, -
							2); // 倒数第二帧完结
					} else {
						ref && ref.stopAnimation instanceof Function && ref.stopAnimation(-1); //倒数第一帧为未选中状态
					}
				}
			},

			updateTabbarText() {
				if (this.firstTabbarText) {
					let str = this.firstTabbarText;
					this.bar[0].text = str.length > 4 ? (str.substr(0, 4) + "...") : str;
				}
			}


		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar-box {
		width: 100%;
		max-width: 480px;
		position: fixed;
		z-index: 2;
		bottom: 0px;

		.safe-area-inset-bottom {
			height: var(--safe-area-inset-bottom);
			background: #F4F9F6;
		}
	}

	#tab-bar {
		z-index: 12;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		align-items: center;
		height: var(--tabBarHeight);
		height: 104rpx;
		width: 100%;
		background: url('/static/img/tabbar/new-bar-230905.png');
		background-size: 100% 100%;

		.tab-item {
			height: 100%;
			color: #646566;
			cursor: pointer;
			display: grid;
			place-content: center;
			position: relative;
			height: 82rpx;

			.item-box {
				display: flex;
				flex-direction: column;
				/*gap: 6rpx;*/
				/*height: 100%;*/
				height: 80rpx !important;
				align-items: center;
				position: relative;
				justify-content: end;
			}

			.item-center {
				z-index: 1;
				color: #646566;
				display: flex;
				align-items: center;
				flex-direction: column;
				/*gap: 6px;*/
				/*position: absolute;*/
				/*bottom: 36rpx;*/
				width: 100%;
				/*height: fit-content;*/
				justify-content: end;
			}

			/*@media screen and (min-width: 768px) {*/
			/*  .item-center {*/
			/*    bottom: 34rpx;*/
			/*    .center {*/
			/*      margin-bottom: 22rpx;*/
			/*    }*/
			/*  }*/
			/*}*/
			.item-text {

				font-size: 28rpx;
				height: 24rpx;
				line-height: 24rpx;
				margin-top: 8rpx;
				/*font-weight: 600;*/
				color: #404040;
			}

			.item-text-color {
				color: var(--theme-color);

				font-weight: bold;
			}

			.img-box {
				display: grid;
				place-content: center;
				position: relative;

				.img {
					width: 24px;
					height: 24px;
				}

				.hot {
					position: absolute;
					top: -16rpx;
					right: -20rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.hot-point {
					position: absolute;
					top: -6rpx;
					right: -20rpx;
					width: 20rpx;
					height: 20rpx;
					border-radius: 50%;
					background: var(--theme-auxiliary-color-remind);
				}

				.dot {
					position: absolute;
					top: -8rpx;
					right: -12rpx;
					display: block;
					width: 16rpx;
					height: 16rpx;
					border-radius: 6px;
					background-color: red;
				}
			}

			.center {
				/*display: none;*/
				flex-shrink: 0;
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				background: rgba(160, 171, 165, 1);
				margin-bottom: 10rpx;
				position: absolute;
				bottom: 30rpx;
			}

			.center-bg {
				// background: var(--theme-color);
				background: var(--theme-color);
			}

			.center-text {
				margin-top: 58rpx;
			}
		}
	}
</style>
