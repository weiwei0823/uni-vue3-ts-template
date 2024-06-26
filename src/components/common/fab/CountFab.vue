<template>
	<footer class="mint-tabbar is-fixed" :class="['theme-' + themeColor.name]">
		<view class="mint-tab-item" v-for="(item, index) in menus[0]" :key="index" @click="tiaozhuan(item)">
			<view :class="!isActive(item.path) || 'router-link-exact-active  router-link-bottom'" aria-current="page">
				<span class="mint-tab-item-icon">
					<span>{{ item.desc }}</span>
				</span>
				<span class="mint-tab-item-label">{{ item.text }}</span>
			</view>
		</view>

		<view class="mint-tab-item" @click="showOpen()">
			<view>
				<span class="mint-tab-item-icon">
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
							<path d="M8.33203 17.5L14.9988 10.8332L21.6656 17.5" stroke="white" stroke-width="3"
								stroke-linecap="round" stroke-linejoin="round" />
						</svg>

					</span>
				</span>
				<span class="mint-tab-item-label"
					:class="isMore()&& 'activeMore'">{{ $t('components.common.fab.CountFab.more') }}</span>
			</view>
		</view>
		<view id="footer-confirm" class="confirm" :style="{top:'-'+statusBarHeight + 'px'}" v-show="show" @click="closeShow()">
			<view class="footer-confirm">
				<view class="mint-tabbar" v-for="(item, index) in menus" :key="index">
					<view class="mint-tab-item" v-for="(val, key) in item" :key="key" @click="tiaozhuan(val,true)">
						<view :class="!isActive(val.path) || 'router-link-exact-active router-link-active'"
							aria-current="page">
							<span class="mint-tab-item-icon">
								<imageSvgUrl style="padding: 0;" :width="68" :height="68" :url="val.icon" replaceThemeTargetColor="#07C160"></imageSvgUrl>
							</span>
							<span class="mint-tab-item-label">{{ val.text }}</span>
						</view>
					</view>
				</view>
				<view class="out"></view>
				<view class="in"></view>
			</view>
		</view>
	</footer>
</template>

<script>
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "CountFab",
		components:{
			imageSvgUrl
		},
		props: {
		},
		data() {
			return {
				statusBarHeight: 20,
				activePath: false,
				show: false,
				menus: [
					[{
							text: this.$t('components.common.fab.CountFab.text0'),
							path: 'liuhe',
							desc: this.$t('components.common.fab.CountFab.text1'),
							prams: "",
							icon: "/static/img/tabbar/count/svgs/1.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text2'),
							path: 'sxcc',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text3'),
							icon: "/static/img/tabbar/count/svgs/2.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text4'),
							path: 'tmls',
							prams: 'type=2',
							desc: this.$t('components.common.fab.CountFab.text5'),
							icon: "/static/img/tabbar/count/svgs/3.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text7'),
							path: 'zmls',
							prams: "type=1",
							desc: this.$t('components.common.fab.CountFab.text6'),
							icon: "/static/img/tabbar/count/svgs/4.svg"
						},
					],
					[{
							text: this.$t('components.common.fab.CountFab.text8'),
							path: 'wsdx',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text9'),
							icon: "/static/img/tabbar/count/svgs/5.svg",

						},
						{
							text: this.$t('components.common.fab.CountFab.text12'),
							path: 'sxtm',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text10'),
							icon: "/static/img/tabbar/count/svgs/6.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text11'),
							path: 'sxzm',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text13'),
							icon: "/static/img/tabbar/count/svgs/7.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text14'),
							path: 'bstm',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text15'),
							icon: "/static/img/tabbar/count/svgs/8.svg"
						},
					],
					[{
							text: this.$t('components.common.fab.CountFab.text16'),
							path: 'bszm',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text17'),
							icon: "/static/img/tabbar/count/svgs/9.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text18'),
							path: 'tmlm',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text20'),
							icon: "/static/img/tabbar/count/svgs/10.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text19'),
							path: 'tmws',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text21'),
							icon: "/static/img/tabbar/count/svgs/11.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text22'),
							path: 'zmws',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text23'),
							icon: "/static/img/tabbar/count/svgs/12.svg"
						},
					],
					[{
							text: this.$t('components.common.fab.CountFab.text26'),
							path: 'zmzf',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text24'),
							icon: "/static/img/tabbar/count/svgs/13.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text25'),
							path: 'hmbd',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text27'),
							icon: "/static/img/tabbar/count/svgs/14.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text28'),
							path: 'jqys',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text31'),
							icon: "/static/img/tabbar/count/svgs/15.svg"
						},
						{
							text: this.$t('components.common.fab.CountFab.text29'),
							path: 'lmzs',
							prams: "",
							desc: this.$t('components.common.fab.CountFab.text30'),
							icon: "/static/img/tabbar/count/svgs/16.svg"
						},
					],
					[{
						text: this.$t('components.common.fab.CountFab.text32'),
						path: 'lxzs',
						prams: "",
						desc: this.$t('components.common.fab.CountFab.text33'),
						icon: "/static/img/tabbar/count/svgs/17.svg"
					}, ],
				]


			}
		},
		watch:{
			show(val){
				let color = '#fff'
				let isLightColor = false
				if(val){
					this.$nativeBridge.setStatusBarColor('#B2B2B2')
				}else{
					this.$nativeBridge.setStatusBarColor('#ffffff')
				}
				// if (val) {
				// 	color = '#B2B2B2'
				// 	isLightColor = true
				// }
				// setTimeout(() => {
				// 	this.$nativeBridge.setStatusBarColor(color, isLightColor)
				// }, 120);
			}
		},
		mounted() {},
		 onLoad: function() {
		    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		  },
		computed: {
			...mapGetters(["themeColor"]),
			// 全文本所占总行数

		},
		methods: {
			showOpen(){
				this.show = !this.show;
				if(this.show){
					this.$nativeBridge.setStatusBarColor('#B2B2B2')
				}else{
					this.$nativeBridge.setStatusBarColor('#ffffff')
				}
			},
			closeShow(){
				this.show = false;
				this.$nativeBridge.setStatusBarColor('#ffffff')
			},
			isMore() {
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route;
				const noMore = this.menus[0];
				const index = noMore.findIndex(item => curRoute.indexOf(item.path) !== -1);
				return !(index > -1);
			},
			//匹配路由
			isActive(path) {
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
				return curRoute.indexOf(path) !== -1
			},
			//跳转方法
			tiaozhuan: function(item, bool = false) {
				if (bool) this.activePath = bool;

				this.activePath = item.path;
				let url = item.path + "?" + item.prams
				uni.redirectTo({
					url: url
				})
			},
		}
	}
</script>

<style scoped>
	.mint-tabbar {
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-shadow: 0px -0.5px 0px 0px var(--theme-auxiliary-color-default);


	}

	.mint-tabbar.is-fixed {
		right: 0;
		bottom: 0;
		padding-bottom: var(--safe-area-inset-bottom);
		left: 0;
		position: fixed;
		z-index: 11;
		max-width: 480px;
		margin: auto;
	}

	.mint-tabbar .mint-tab-item {
		padding: 0;
		display: block;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}

	.mint-tabbar {
		background-image: -webkit-linear-gradient(top, #fff, #fff 50%, transparent 0);
		background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 0);
		background-size: 100% 12px;
		background-repeat: no-repeat;
		background-position: 0 0;
		position: relative;
		background-color: #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
		text-align: center;
		/* box-shadow: 0 5px 2px 0 hsl(0deg 0% 82% / 50%); */
	}

	.mint-tabbar .mint-tab-item .router-link-active {
		background: rgba(244, 244, 244, 0.96);
		border-radius: 24rpx;
	}

	.mint-tabbar .mint-tab-item .router-link-active .mint-tab-item-label {
		color: var(--theme-color) !important;
	}

	.router-link-bottom .mint-tab-item-label {
		color: var(--theme-color) !important;
	}

	/* color: var(--theme-color) !important; */

	.mint-tabbar .mint-tab-item uni-view {
		text-decoration: none;
		display: block;
		padding: 12px 0;
	}

	.mint-tabbar .mint-tab-item-icon {
		display: block;
		width: 68rpx;
		height: 68rpx;
		border-radius: 50%;
		background: var(--theme-color);
		line-height: 68rpx;
		margin: auto auto 6rpx auto;

		color: #FFF;
		text-align: center;
		font-size: 34rpx;
		font-weight: 400;
	}

	.mint-tab-item-icon>* {
		display: block;
		width: 68rpx;
		height: 68rpx;
	}

	.mint-tab-item-label {

		line-height: 1;

		color: #404040;

		font-size: 26rpx;
		font-weight: 400;
	}

	.confirm {
		position: fixed;
		z-index: 99999;
		/* top: 0; */
		left: 0;
		right: 0;
		bottom: var(--safe-area-inset-bottom);
		background: rgba(0, 0, 0, .3);
		max-width: 480px;
		margin: auto;
	}

	.mint-tabbar .confirm .footer-confirm {
		position: absolute;
		background: #fff;
		box-sizing: border-box;
		/* bottom: 166rpx; */
		bottom: 0;
		width: calc(100vw);
		left: 0;
		border-radius: 24rpx 24rpx 0 0;
		/* padding-top: 20rpx; */
		max-width: calc(480px);
		/* padding-left: 28rpx;
		padding-right: 28rpx; */
		padding: 20rpx 28rpx;
	}

	.mint-tabbar .confirm .footer-confirm .mint-tab-item-icon,
	.mint-tabbar .confirm .footer-confirm .mint-tabbar {
		background: none;
		box-shadow: none;
		position: static;
	}

	.mint-tab-item-icon {
		display: flex !important;
		align-items: center;
		justify-content: center;
	}

	.mint-tabbar .confirm .footer-confirm .mint-tab-item {
		max-width: 25%;
	}

	.mint-tabbar .mint-tab-item {
		padding: 0;
	}

	.mint-tab-item {
		display: block;
		padding: 14rpx 0;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		text-decoration: none;
	}

	.mint-tabbar .confirm .footer-confirm .out {
		border: 26rpx solid transparent;
		border-top-color: #fff;
		bottom: -52rpx;
		right: 40rpx;
	}

	.mint-tabbar .confirm .footer-confirm .in {
		border: 26rpx solid transparent;
		border-top-color: #fff;
		bottom: -52rpx;
		right: 40rpx;
	}

	.mint-tabbar .confirm .footer-confirm .in,
	.mint-tabbar .confirm .footer-confirm .out {
		position: absolute;
		width: 0;
		height: 0;
	}

	.activeMore {
		color: var(--theme-color);
	}
</style>
