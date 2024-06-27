<template>
	<view class="safe-box pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }"
		:class="['theme-' + themeColor.name]">
		<Header :title="$t('common.safeCenter.title')" isBack @back="back" isFixed :header-style="{top:0}">

		</Header>
		<scroll-view scroll-y class="scroll-y" :style="{height:`calc(${winHeight}px - 88rpx)`,marginTop:'-4rpx'}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="img-box">
				<!-- <filterIcon src="@/static/img/safe/banner.png" :width="320" :height="350" /> -->
				<image src="@/static/img/safe/banner.png"></image>
				<view class="title">{{$t('common.safeCenter.text0')}}</view>
			</view>
			<view class="list-row">
				<view class="list-item" @click="setMobile()">
					<view class="left">
						<imageSvgUrl url="@/static/img/safe/svgs/1.svg" :width="44" :height="44"
							replaceThemeTargetColor="#07C160" />
						<view class="title">{{$t('common.safeCenter.text1')}}</view>
					</view>
					<view class="right">
						<text class="title" v-if="init.isBindMobile == 1">{{ init.phone }}</text>
						<text class="title" v-else>{{$t('common.safeCenter.text2')}}</text>
						<uni-icons type="right" style="font-size: 40rpx;color: #8f9b94"></uni-icons>
					</view>
				</view>

				<view class="list-item" @click="setPwd()">
					<view class="left">
						<imageSvgUrl url="@/static/img/safe/svgs/2.svg" :width="44" :height="44"
							replaceThemeTargetColor="#07C160" />
						<view class="title">{{$t('common.safeCenter.text3')}}</view>
					</view>
					<view class="right">
						<text class="title">{{$t('common.safeCenter.text4')}}</text>
						<uni-icons type="right" style="font-size: 40rpx;color: #8f9b94"></uni-icons>
					</view>
				</view>

				<view class="list-item" @click="setPinCode()">
					<view class="left">
						<imageSvgUrl url="@/static/img/safe/svgs/3.svg" :width="44" :height="44"
							replaceThemeTargetColor="#07C160" />
						<view class="title">{{$t('common.safeCenter.text5')}}</view>
					</view>
					<view class="right">
						<text
							class="title">{{ init.isBindPinCode == 1 ? $t('common.safeCenter.text14') : $t('common.safeCenter.text15') }}</text>
						<uni-icons type="right" style="font-size: 40rpx;color: #8f9b94"></uni-icons>
					</view>
				</view>

<!--				<view class="list-item">-->
<!--					<view class="left">-->
<!--						<imageSvgUrl url="@/static/img/safe/svgs/4.svg" :width="44" :height="44"-->
<!--							replaceThemeTargetColor="#07C160" />-->
<!--						<view class="title">{{$t('common.safeCenter.text6')}}</view>-->
<!--					</view>-->
<!--					<view class="right" @click="updateSafe">-->
<!--						<text class="title">{{$t('common.safeCenter.text7')}}</text>-->
<!--						<uni-icons type="right" style="font-size: 40rpx;color: #8f9b94"></uni-icons>-->
<!--					</view>-->
<!--				</view>-->

<!--				<view class="list-item">-->
<!--					<view class="left">-->
<!--						<imageSvgUrl url="@/static/img/safe/svgs/5.svg" :width="44" :height="44"-->
<!--							replaceThemeTargetColor="#07C160" />-->
<!--						<view class="title">{{$t('common.safeCenter.text8')}}</view>-->
<!--					</view>-->
<!--					<view class="right">-->
<!--						<view class="custom-switch" v-if="checked" @click="switchChange(false)">-->
<!--							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 28" fill="none">-->
<!--								<rect width="49" height="28" rx="14" transform="matrix(-1 0 0 1 49 0)"-->
<!--									:fill="themeColor.themeColor" />-->
<!--								<circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 47 2)" fill="white" />-->
<!--							</svg>-->
<!--						</view>-->
<!--						<view class="custom-switch" v-else @click="switchChange(true)">-->
<!--							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 28" fill="none">-->
<!--								<rect width="49" height="28" rx="14" transform="matrix(-1 0 0 1 49 0)" fill="#DFDFDF" />-->
<!--								<circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 26 2)" fill="white" />-->
<!--							</svg>-->
<!--						</view>-->
<!--					</view>-->
<!--				</view>-->

				<view class="list-item" @click="toPage('/pages/common/userCenter/bank/index')">
					<view class="left">
						<imageSvgUrl url="@/static/img/safe/svgs/6.svg" :width="44" :height="44"
							replaceThemeTargetColor="#07C160" />
						<view class="title">{{$t('common.safeCenter.text9')}}</view>
					</view>
					<view class="right">
						<text class="title"></text>
						<uni-icons type="right" style="font-size: 40rpx;color: #8f9b94"></uni-icons>
					</view>
				</view>

			</view>
		</scroll-view>
		<uni-popup ref="confirm" type="center" border-radius="24" @maskClick="cancel">
			<view class="confirm-box">
				<view class="head-box">{{$t('common.safeCenter.text10')}}</view>
				<view class="title">{{$t('common.safeCenter.text11')}}</view>
				<view class="btn-box">
					<view class="btn cancel-btn" @click="cancel">{{$t('common.safeCenter.text12')}}</view>
					<view class="btn confirm-btn" @click="confirm">{{$t('common.safeCenter.text13')}}</view>
				</view>
			</view>
		</uni-popup>

		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		mySecurityCenter
	} from "@/utils/lottery/mine";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Header from '@/components/common/header/index.vue';
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			NavBar,
			Header,
			imageSvgUrl
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "安全中心",
				headerStyle: {
					backgroundColor: "#BFE0FF"
				},
				checked: false,
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040"
				},
				msg: "",
				init: {},
				winHeight: 0
			}
		},

		onLoad(option) {
			uni.$on('emitParams', data => {
				this.msg = data.msg
			})
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onShow() {
			if (this.msg) {
				pop(this.msg, 2000)
				this.msg = ''
				//逻辑设计就有问题 最偷懒的改法 请在当前页面处理完成之后 通知其它区域的信息清空MSG避免重复显示提示
				uni.$emit('emitParams', {
					msg: null
				})
			}
			this.getInit()
			this.$nativeBridge.setStatusBarColor('#BFE0FF')
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			changeConfirm(e) {},
			back() {
				uni.redirectTo({
					url: "/pages/common/userCenter/wallet/index"
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			switchChange(e) {
				//#ifdef H5
				this.checked = e
				if (e) {
					this.$refs.confirm.open()
				}
				//#endif
				//#ifdef APP-PLUS

				//#endif
			},
			updateSafe() {
				//#ifdef H5
				this.$refs.confirm.open()
				//#endif
				//#ifdef APP-PLUS

				//#endif
			},
			cancel() {
				this.$refs.confirm.close()
				this.checked = false
			},
			confirm() {
				uni.navigateTo({
					url: "/pages/common/userCenter/downloadPage",
				})
			},
			getInit() {
				mySecurityCenter().then(res => {
					this.init = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			setPinCode() {
				if (this.init.isBindPinCode == 1) {
					uni.navigateTo({
						url: "/pages/common/userCenter/pwd/update_pwd",
					})
				} else {
					uni.navigateTo({
						url: "/pages/common/userCenter/pwd/set_pwd",
					})
				}
			},
			setMobile() {
				if (this.init.isBindMobile == 1) {
					uni.navigateTo({
						url: "/pages/common/setting/upMobile",
					})
				} else {
					uni.navigateTo({
						url: "/pages/common/setting/setMobile",
					})
				}
			},
			setPwd() {
				uni.navigateTo({
					url: "/pages/common/setting/setPwd",
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.safe-box {

		padding-bottom: 50rpx;

		::v-deep .header {
			background: #BFE0FF !important;
			border-radius: 0 !important;
		}

		.back-icon {
			width: 24rpx;
			height: 42rpx;
			margin-left: 10rpx;
		}

		.img-box {
			height: 580rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: linear-gradient(180deg, #BFE0FF 0%, rgba(191, 224, 255, 0.1) 100%);

			image {
				width: 320rpx;
				height: 352rpx;
			}

			.title {
				margin-top: 62rpx;
				font-size: 30rpx;
				color: #404040;
			}
		}

		.list-row {
			background: #FFFFFF;
			border-radius: 24rpx;

			.list-item {
				display: flex;
				height: 100rpx;
				align-items: center;
				margin: 0 28rpx;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				&.list-item:last-of-type {
					border: none;
				}

				.left {
					width: 50%;
					display: flex;

					image {
						height: 40rpx;
						width: 40rpx;
					}

					.title {
						margin-left: 20rpx;
						font-weight: 400;
						font-size: 30rpx;
						color: #404040;
					}
				}

				.right {
					width: 50%;
					display: flex;
					justify-content: flex-end;

					.title {
						margin-right: 10rpx;
						font-size: 28rpx;
						color: #404040;
						display: flex;
						align-items: center;
					}

					.custom-switch {
						width: 84rpx;
						height: 48rpx;
					}
				}
			}
		}

		.confirm-box {
			width: 600rpx;
			height: 340rpx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			border-radius: 24rpx;

			.head-box {
				height: 108rpx;
				font-size: 34rpx;
				text-align: center;
				color: #404040;
				display: grid;
				place-items: center;
			}

			.title {
				flex: 1;
				display: grid;
				align-items: flex-start;
				justify-content: center;
				font-size: 30rpx;
				color: #404040;
				line-height: 56rpx;
				padding-top: 26rpx;
			}

			.btn-box {
				border-top: 1px solid var(--theme-auxiliary-color-default);
				height: 88rpx;
				display: grid;
				grid-template-columns: repeat(2, 1fr);

				.btn {
					display: grid;
					place-content: center;
					font-size: 34rpx;
				}

				.btn+.btn {
					border-left: 1px solid var(--theme-auxiliary-color-default);
				}

				.cancel-btn {
					color: #404040;
				}

				.confirm-btn {
					color: var(--theme-color);
				}
			}
		}
	}
</style>
