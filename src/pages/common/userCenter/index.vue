<template>
	<view class="home-my pc-max-width" :style="{
		position: `fixed`, height: `${uWindowHeight}px`, width: '100%',
		paddingTop: statusBarH
	}" :class="['theme-' + themeColor.name]">
		<view class="status-bar-height" :style="{ height: statusBarH }"></view>
		<!-- 普通弹窗 -->

		<AccountMess :isLogin="isLogin" :isFixed="true" />
		<!-- paddingBottom:'124rpx', -->
		<scroll-view scroll-y="true"
			:style="{ height: `calc(${uWindowHeight}px - 110rpx - 100rpx)`, marginTop: '148rpx', boxSizing: 'border-box', backgroundColor: '#fff', borderTopLeftRadius: '24rpx', borderTopRightRadius: '24rpx', overflow: 'hidden' }">
			<view class="content">
				<view class="content_blance">
					<view class="content_blance_top">
						<view class="content_blance_top-li">
							<view class="content_blance_top-li-left" v-if="isLogin">
								<view>
									{{ $t('pages.common.userCenter.index.amount') }}：
								</view>
								<view class="number" v-if="isEnd && userInfo.coin > 1000">
									{{ parseFloat(userInfo.coin).toLocaleString(undefined, {
										'minimumFractionDigits': 2, 'maximumFractionDigits': 2
									}) }}
								</view>
								<u-count-to :class="{ 'anroidCoin': isAndroid }" class="number" :decimals="2" :start-val="0"
									:end-val="userInfo.coin" @end="isEnd = true" v-else></u-count-to>
							</view>
							<view class="content_blance_top-li-left" v-else>
								{{ $t('pages.common.userCenter.index.amount') }}：0.00

							</view>
							<view class="content_blance_top-li-right" @click="duihuan">
								<image src="@/static/img/common/userCenter/transaction.png" mode=""></image>
								{{ $t('pages.common.userCenter.index.exchange') }}
							</view>
						</view>
						<view class="content_blance_top-li" style="margin-top: 20rpx;" v-if="isLogin">
							<view class="content_blance_top-li-left">
								{{ $t('pages.common.userCenter.index.goldCoin') }}：
								<text class="number" style="color: #f1cf78;">{{ parseInt(totalGold) || "0.00" }}</text>
							</view>
						</view>
						<view class="content_blance_top-li" style="margin-top: 20rpx;" v-else>
							<view class="content_blance_top-li-left">
								{{ $t('pages.common.userCenter.index.goldCoin') }}：<text class="number"
									style="color: #F1CF78!important;">0.00</text>
							</view>
						</view>
						<view class="content-blance-line" />
					</view>


					<view class="content_blance_bottom">
						<view class="content_blance_bottom-btn" @click="toUrl('/pages/common/pay/index')">
							<image src="@/static/img/common/userCenter/cz.png" mode=""></image>
							{{ $t('pages.common.userCenter.index.recharge') }}
						</view>
						<view class="content_blance_bottom-btn" @click="withdraw('/pages/common/withdraw/index')">
							<image src="@/static/img/common/userCenter/qk.png" mode=""></image>
							{{ $t('pages.common.userCenter.index.withdraw') }}
						</view>
						<view class="content_blance_bottom-btn" @click="withdraw('/pages/common/withdraw/mtzc')">
							<image src="@/static/img/common/userCenter/mtzc.png" mode=""></image>
							{{ $t('pages.common.userCenter.index.freeCharge') }}
						</view>
					</view>
				</view>

				<view class="body-middld">
					<view class="box-center">
						<view class="title">{{ $t('pages.common.userCenter.index.essentialTools') }}
						</view>
						<view class="box-center-content">
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/spokesperson/apply')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-1.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.applyForSpokesperson') }}
								</view>
							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/liuhe/activity/index')">
								<view class="box-center-content-item-img">
									<image mode="widthFix" src="@/static/img/common/userCenter/icon-2.png" />
									<label class="badge">4</label>
								</view>
								<view class="text">
									{{ $t('pages.common.userCenter.index.activityCenter') }}
								</view>

							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/invite')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-3.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.inviteFriends') }}</view>
							</view>

							<!-- <view class="box-center-content-item"
							@click="toUrl('/pages/common/userCenter/reports/reports', [`${$config.enumMgr.STATION.ALL}`, `${$config.enumMgr.STATION.LUNTAN}`])">

							<view class="box-center-content-item-img">
								<image src="@/static/img/common/userCenter/icon-4.png" />
							</view>
							<view class="text">{{ $t('pages.common.userCenter.index.monthlyReport') }}</view>

						</view> -->
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/level/level')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-5.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.userLevel') }}</view>
							</view>

						</view>
					</view>
					<view class="advert-img" @click="toUrlSign('/pages/luntan/toolBox/vector')">
						<image src="@/static/img/common/userCenter/signBanner.png" mode="widthFix" />
					</view>

					<view class="box-center">
						<view class="title">{{ $t('pages.common.userCenter.index.myChannel') }}</view>
						<view class="box-center-content">
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/wallet/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-6.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.myWallet') }}</view>
							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/homepage/homepage')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-7.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.myHomepage') }}</view>
							</view>

							<!-- <view class="box-center-content-item"
							@click="toUrl('/pages/common/userCenter/promotion/promotion', [`${$config.enumMgr.STATION.ALL}`, `${$config.enumMgr.STATION.LUNTAN}`])">
							<view class="box-center-content-item-img">
								<image src="@/static/img/common/userCenter/icon-8.png" />
							</view>
							<view class="text">{{ $t('pages.common.userCenter.index.myPromotion') }}</view>
						</view> -->
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/collection/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-9.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.myCollection') }}</view>
							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/comment/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-10.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.myComment') }}</view>
							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/mycare/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-11.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.myFollow') }}</view>
							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/fans/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-12.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.myFans') }}</view>

							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/like/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-13.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.myLikes') }}</view>

							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/backroom/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-14.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.littleBlackHouse') }}</view>
							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/mybackroomuser/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-15.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.blacklist') }}</view>

							</view>
						</view>
					</view>
					<view class="advert-img" @click="toUrl('/pages/common/userCenter/spokesperson/apply')">
						<image src="@/static/img/common/userCenter/applyBanner.png" mode="widthFix" />
					</view>


					<view class="box-center">
						<view class="title">{{ $t('pages.common.userCenter.index.platformInformation') }}</view>
						<view class="box-center-content">
							<view class="box-center-content-item" @click="toUrl('/pages/liuhe/notice/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-16.png" />
									<label class="badge-notext"></label>
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.inStationInformation') }}
								</view>

							</view>
							<view class="box-center-content-item" @click="toUrl2('/pages/common/userCenter/service/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-17.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.contactCustomerService') }}
								</view>
							</view>
							<!-- <view class="box-center-content-item"
							@click="toUrl('/pages/common/userCenter/setting/aboutUs')">
							<view class="box-center-content-item-img">
								<image src="@/static/img/common/userCenter/icon-18.png" />
							</view>
							<view class="text">{{ $t('pages.common.userCenter.index.aboutUs') }}</view>
						</view> -->
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/feedback/index?type=2')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-18.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.feedback') }}</view>
							</view>
							<view class="box-center-content-item" @click="toUrl('/pages/common/userCenter/reportRecord/index')">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-19.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.reportRecord') }}</view>

							</view>
							<view class="box-center-content-item" @click="clearCache">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-20.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.clearCache') }}</view>
							</view>
							<view class="box-center-content-item" @click="openNewWindow('/#/pages/common/userCenter/downloadPage')">
								<!-- <uni-link href=""
								text="/pages/common/userCenter/downloadPage" showUnderLine="false"> -->
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-21.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.downloadAPP') }}</view>

								<!-- </uni-link> -->

							</view>

							<view class="box-center-content-item" @click="isShow = true">
								<view class="box-center-content-item-img">
									<image src="@/static/img/common/userCenter/icon-22.png" />
								</view>
								<view class="text">{{ $t('pages.common.userCenter.index.platformSetting') }}</view>
							</view>
						</view>
					</view>

				</view>


			</view>
			<view class="vip-box van-overlay" style="display: none">
				<view class="vip-wrapper">
					<view class="block">
						<view class="t-b">
							<text>{{ $t('pages.common.userCenter.index.VIPPrivileges2') }}</text>
						</view>
						<view class="text">
							<p>1.{{ $t('pages.common.userCenter.index.forumNicknameToRed2') }}</p>
							<view>
								2.{{ $t('pages.common.userCenter.index.postExemptFromReviewProcess') }}<br />
								3.{{ $t('pages.common.userCenter.index.doubleRewardForGrowthValue2') }}<br />
								4.{{ $t('pages.common.userCenter.index.purchaseAnnualVIPServiceForRenameCard2') }}<br />
							</view>
						</view>
						<view class="l-r-btn">
							<text>{{ $t('pages.common.userCenter.index.oneMonth10Yuan2') }}</text>
							<text>{{ $t('pages.common.userCenter.index.oneYear100Yuan2') }}</text>
						</view>
						<view class="close">
							<i class="van-icon van-icon-close" style="font-size: 32px"><!----></i>
						</view>
					</view>
				</view>
			</view>
			<!--设置平台-->
			<!--底部-->
			<view v-if="$store.state.appInfoStore.configs && $store.state.appInfoStore.configs.isDebug" class="version-code"
				@click="testClick">
				{{ $store.state.appInfoStore.configs.version_dev }}
			</view>
			<view style="height: 52px;width:100%;">

			</view>
		</scroll-view>
		<set-lottery ref="setLottery" @showLottery="showLottery" v-show="isShow" :isShow="isShow"></set-lottery>
		<view style="height: 52px">
			<tab-bar :current="'4'"></tab-bar>
		</view>
		<uni-popup ref="withdraw" type="center" background-color="#fff">
			<view class="confirm-box">
				<view class="title">{{ $t('pages.common.userCenter.index.prompt') }}</view>
				<view class="notice">
					<text>{{ $t('pages.common.userCenter.index.youHaveNotSetTheFundPassword') }}</text>
					<text>{{ $t('pages.common.userCenter.index.withdrawalRequiresSettingTheFundPassword') }}</text>
				</view>
				<view class="btn-box">
					<view class="cancel-btn" @click="cancel">{{ $t('pages.common.userCenter.index.cancel') }}</view>
					<view class="confirm-btn" @click="confirm">{{ $t('pages.common.userCenter.index.confirm') }}
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup" type="center">
			<view class="block">
				<view class="t-b">
					<text>{{ $t('pages.common.userCenter.index.VIPPrivileges') }}</text>
				</view>
				<view class="text">
					<view style="color: rgb(255, 69, 69);">
						1.{{ $t('pages.common.userCenter.index.forumNicknameToRed') }}
					</view>
					<view style="color: rgb(161, 80, 12);">
						2.{{ $t('pages.common.userCenter.index.viewExpertStatistics') }}
					</view>
					<view style="color: rgb(161, 80, 12);">
						3.{{ $t('pages.common.userCenter.index.doubleRewardForGrowthValue') }}</view>
					<view style="color: rgb(161, 80, 12);">
						4.{{ $t('pages.common.userCenter.index.purchaseAnnualVIPServiceForRenameCard') }}</view>
				</view>
				<view class="l-r-btn">
					<text @click="chargeVip">{{ $t('pages.common.userCenter.index.oneMonth10Yuan') }}</text>
					<text @click="chargeVip">{{ $t('pages.common.userCenter.index.oneYear100Yuan') }}</text>
				</view>
				<view class="close"><i class="van-icon van-icon-close" style="font-size: 32px;">
						<!---->
					</i></view>
			</view>
		</uni-popup>
		<u-popup ref="confirm" mode="center" border-radius="24">
			<view class="confirm-clearCache-box">
				<view class="title">{{ $t(`common.tip`) }}</view>
				<view class="notice">
					<text>{{ $t(`common.setting.clear`) }}</text>
				</view>
				<view class="btn-box">
					<view class="btn cancel-btn" @click="cancleClearCache">{{ $t(`common.cancel`) }}</view>
					<view class="btn confirm-btn" @click="comfirmClearCache">{{ $t(`common.ok`) }}</view>
				</view>
			</view>
		</u-popup>
		<!-- <ColorSwitch /> -->
		<AlertInjectLayer />
	</view>
</template>

<script>
import {
	details
} from "@/utils/user/gold.js";
import TabBar from "@/components/common/tabbar/TabBar";
import SetLottery from "@/components/common/setLottery/setLottery";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';
import ColorSwitch from '@/components/common/colorSwitch/index.vue';

import {
	aboutUs
} from "@/utils/user/index.js";
import {
	init,
	bindStatus
} from "@/utils/lottery/mine";
import Playing from "@/utils/common/playing";
import defaultTemplate from "@/utils/defaultTemplate";
import AccountMess from "@/components/common/userCenter/account-mess.vue"
export default {
	name: "index",
	components: {
		AlertInjectLayer,
		TabBar,
		SetLottery,
		AccountMess,
		ColorSwitch
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	computed: {
		...mapGetters(["themeColor", "userInfo", "uWindowHeight"]),
	},
	data() {
		return {
			totalGold: 0,
			isEnd: false,
			detailLogo: '@/static/img/user/Frame21.png',
			playing: new Playing(),
			isLogin: false,
			isShow: false,

			status: 0,
			statusBarH: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			testTotalClick: 0,
			isAndroid: false
		}
	},
	onLoad() {
		let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG)
		try {
			configData.forEach((item, index) => {
				if (item.type == 24) {
					this.detailLogo = item.url
					throw Error();
				}
			})
		} catch (err) {
			console.log(err)
		}
	},
	async onShow() {
		this.isAndroid = (uni.getSystemInfoSync().platform === 'android');
		this.$nativeBridge.setStatusBarColor(this.themeColor.themeAuxiliaryColorDefault)
		let that = this;
		uni.hideTabBar();
		uni.setNavigationBarTitle({
			title: this.$t('pages.common.userCenter.index.my')
		});
		this.isLogin = global.isLogin()
		if (this.isLogin) {
			this.$store.dispatch("updateUserInfoFromServer")
		}
		// this.getCommonData()
		this.getInit()

		if (this.isLogin) {
			const res = await details();
			this.totalGold = res.result?.totalGold;
		}
	},
	onHide() {
		this.$nativeBridge.setStatusBarColor('#ffffff')
	},
	watch: {
		isShow(v) {
			if (v) {
				this.$nativeBridge.setStatusBarColor('#666666', true)
			} else {
				this.$nativeBridge.setStatusBarColor('#ffffff')
			}
		},
		userInfo(v) {
			this.isLogin = global.isLogin();
		}
	},

	methods: {
		setAmount(num) {
			return this.playing.setAmount(num, 2, ".")
		},
		async getInit() {
			if (this.isLogin) {
				await bindStatus().then(res => {
					if (res.code == 200) {
						this.status = res.result.status
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		logout() {
			this.isLogin = false
		},
		//获取config数据
		// getCommonData() {
		// 	aboutUs().then(res => {
		// 		res.result.constants.forEach(element => {
		// 			switch (element.type) {
		// 				case "1":
		// 					break;
		// 				case "2":
		// 					break;
		// 				case "3":
		// 					this.qrcodeImg = element.url
		// 					break;
		// 				case "4":
		// 				case "5":
		// 				case "6":
		// 					this.downloadUrl = element.url
		// 					break;
		// 			}
		// 		});
		// 	})
		// },
		openNewWindow(url) {
			this.$nativeBridge.openUrl(url)
		},


		//复制邀请码



		openVip() {
			this.$refs.popup.open()
		},
		chargeVip() {
			this.$refs.popup.close()
			uni.showToast({
				title: this.$t('pages.common.userCenter.index.exchangeSuccessBeforePurchaseVIP'),
				icon: "none"
			})
		},
		withdraw(url) {
			this.isLogin = global.isLogin()
			if (!this.isLogin || ['sign', 'demo'].includes(this.userInfo.userType)) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return;
			}
			if (this.status == 2) {
				uni.$emit('showPop', {
					refName: 'AlertMsg',
					data: {
						title: this.$t('pages.common.userCenter.index.prompt'),
						content: this.$t('pages.common.userCenter.index.youHaveNotSetTheFundPassword2')
					},
					confirm: () => {
						uni.navigateTo({
							url: "/pages/common/userCenter/pwd/set_pwd"
						})
					},
				})
				return false
			} else if (this.status == 3) {
				uni.navigateTo({
					url: "/pages/common/userCenter/bank/bind"
				})
				return false
			} else if (this.status == 0) {
				return false
			}
			uni.navigateTo({
				url: url
			})
		},
		cancel() {
			this.$refs.withdraw.close()
		},
		confirm() {
			this.cancel()
			uni.navigateTo({
				url: "/pages/common/userCenter/pwd/set_pwd"
			})
		},
		toUrlSign(url) {
			if (!isLogin() || this.userInfo.userType === "demo") {
				uni.navigateTo({
					url: "/pages/common/fastreg",
				});
				return
			}
			uni.navigateTo({
				url: url
			})
		},
		toUrl(url, popArr = []) {
			let isProEnv = !this.$config.isDebug;
			if (popArr.includes(this.$config.station)) {
				pop(this.$t('pages.common.userCenter.index.pleaseExpect'));
				return
			}
			if (!url) {
				pop(this.$t('pages.common.userCenter.index.pleaseExpect'));
				return
			}


			this.isLogin = global.isLogin()
			if (!this.isLogin) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
			} else {
				if (['sign', 'demo'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false
				}
				uni.navigateTo({
					url: url
				})
			}
		},
		toUrl2(url) {
			uni.navigateTo({
				url: url
			})
		},

		qidai() {
			// pop(this.$t('pages.common.userCenter.index.pleaseExpect'), 2000)
			pop(this.$t('pages.common.userCenter.index.pleaseExpect'), 2000)
		},
		duihuan() {
			if (!isLogin() || this.userInfo?.userType === "demo") {
				uni.$emit("showPop", {
					refName: "AlertMessage",
				});
				return;
			}
			if (this.userInfo?.userType === "sign") {
				uni.navigateTo({
					url: "/pages/common/supplement",
				});
				return;
			}
			uni.navigateTo({
				url: "/pages/luntan/toolBox/frame",
			});
		},
		//清除缓存
		clearCache() {
			// // #ifdef APP-PLUS
			// pop(this.$t('pages.common.userCenter.index.clearSuccess'))
			// // #endif
			// // #ifdef H5
			// alert(this.$t('pages.common.userCenter.index.clearSuccess'))
			// // #endif
			this.$nativeBridge.setStatusBarColor('#666666', true)
			this.$refs.confirm.open();


		},
		cancleClearCache() {
			this.$nativeBridge.setStatusBarColor('#666666', true)
			this.$refs.confirm.close();
		},
		comfirmClearCache() {
			this.$nativeBridge.setStatusBarColor('#666666', true)
			this.$refs.confirm.close();
			//#ifdef H5
			let that = this;
			setTimeout(function () {
				that.$config.clearStorage(false);
			}, 2000);
			//#endif
			// #ifdef APP-PLUS
			var self = this;
			//使用plus.cache.clear 清除应用中的缓存数据
			plus.cache.clear();
			// #endif
			this.$refs.confirm.close();
			pop(this.$t("common.setting.clearSuccess"), 2000)
		},


		cancelTheme() {
			this.$refs.confirmTheme.close();
		},
		//显示
		showLottery() {
			this.isShow = false
		},
		testClick() {
			this.testTotalClick++;
			if (this.testTotalClick >= 3) {
				this.testTotalClick = 0;
				uni.navigateTo({
					url: "/pages/luntan/debug/logs/logs"
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.anroidCoin {
	// margin-top: 20rpx;
}

.confirm-box {
	height: 339rpx;
	width: 540rpx;
	border-radius: 10rpx;
	padding: 20rpx 54rpx 20rpx 54rpx;

	.title {
		height: 80rpx;
		font-weight: 400;
		font-size: 32rpx;
		line-height: 80rpx;
		text-align: center;
		color: #9A9A9A;
		border-bottom: 2rpx solid #E6E6E6;
	}

	.notice {
		height: 160rpx;
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		color: #404040;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.btn-box {
		display: flex;
		color: #FFFFFF;
		font-weight: 400;
		font-size: 26rpx;

		.cancel-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60rpx;
			width: 200rpx;
			border-radius: 264rpx;
			padding: 10rpx 74rpx;
			background: #8CB2C9;
			margin-right: 20rpx;
		}

		.confirm-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60rpx;
			width: 200rpx;
			border-radius: 264rpx;
			padding: 10rpx 74rpx;
			background: #FF9900;
			margin-left: 20rpx;
		}
	}
}



.home-my {
	// padding-bottom: 250rpx;
	width: 100%;
	max-width: 960rpx;
	margin: auto;
	// background: #fff;

	* {
		box-sizing: border-box;
	}

	// new

	.content {
		// 148 176
		width: 100%;
		// padding: 28rpx 28rpx 20rpx 28rpx;
		padding: 28rpx 28rpx 20rpx 28rpx;
		background-color: #fff;
		// border-radius: 24rpx;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		// margin-top: -30rpx;

		.content_blance {
			// height: 228rpx;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background: linear-gradient(180deg, var(--theme-color) 0%, var(--theme-color) 100%);
			padding: 20rpx;

			.content_blance_top-li {
				display: flex;
				justify-content: space-between;

				.content_blance_top-li-left {
					color: #FFF;

					font-size: 30rpx;
					font-weight: 500;
					display: flex;
					align-items: center;

					.number {
						color: #FFD43D !important;
						font-family: MiSans !important;
						font-size: 30rpx !important;
						font-weight: 500 !important;
						white-space: nowrap !important;

					}
				}

				.content_blance_top-li-right {

					color: #F1CF78;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-weight: 500;

					image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 20rpx;
					}
				}
			}

			.content-blance-line {
				width: 100%;
				border-top: 2rpx dashed rgba(255, 255, 255, .3);
				margin-top: 20rpx;
			}

			.content_blance_bottom {
				display: flex;
				justify-content: space-between;

				.content_blance_bottom-btn {
					&:last-child {
						width: 238rpx;
					}

					margin-top: 20rpx;
					width: 188rpx;
					height: 88rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFF;
					text-align: center;

					font-size: 30rpx;
					font-weight: 500;
					border-radius: 24rpx;
					background: rgba(255, 255, 255, 0.10);

					image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}


	.box-center {
		margin-top: 41rpx;

		.title {
			display: flex;
			align-items: center;
			color: #404040;

			font-size: 34rpx;
			font-weight: 600;

			&::before {
				content: '';
				width: 8rpx;
				height: 24rpx;
				border-radius: 6rpx;
				background: var(--theme-color);
				display: block;
				margin-right: 14rpx;

			}
		}

		.box-center-content {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 20rpx 0;
			padding-top: 20rpx;

			.box-center-content-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.text {
					color: #404040;
					text-align: center;

					font-size: 28rpx;
					font-weight: 400;
					margin-top: 10rpx;
				}



				.box-center-content-item-img {
					width: 48rpx;
					height: 48rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
					}

					.badge {
						position: absolute;
						top: -20rpx;
						right: -22rpx;
						background: red;
						color: #fff;
						font-size: 24rpx;
						border-radius: 50%;
						min-width: 32rpx;
						height: 32rpx;
						text-align: center;
						line-height: 32rpx;
					}

					.badge-notext {
						position: absolute;
						top: -10rpx;
						right: -18rpx;
						background: red;
						border-radius: 50%;
						min-width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}


	}

	.advert-img {
		width: 100%;
		margin-top: 20rpx;

		image {
			width: 100%;
		}
	}

	.status-bar-height {
		background-color: var(--theme-color);
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.block {
		width: 580rpx;
		height: 580rpx;
		background-image: url(@/static/img/user/vipImg.png);
		background-size: 100% 100%;
		position: relative;

		.t-b {
			position: absolute;
			right: 86rpx;
			top: 180rpx;

			text {
				width: 132rpx;
				height: 60rpx;
				background: #a1500c;
				border-radius: 30rpx;
				color: #fee2c7;
				text-align: center;
				line-height: 60rpx;
				display: inline-block;
				font-weight: 600;
			}
		}

		.text {
			position: absolute;
			font-size: 24rpx;
			top: 180rpx;
			margin-left: 106rpx;
			line-height: 44rpx;
		}

		.l-r-btn {
			position: absolute;
			bottom: 40rpx;
			width: 100%;
			text-align: center;

			text {
				width: 200rpx;
				height: 84rpx;
				background: #ffe2c6;
				border-radius: 42rpx;
				border: 0.02rem solid #979797;
				color: #a1500c;
				font-size: 32rpx;
				line-height: 84rpx;
				display: inline-block;
				margin-left: 40rpx;
			}
		}

		.close {
			text-align: center;
			font-size: 24rpx;
			color: #a9a9a9;
			position: absolute;
			bottom: -100rpx;
			left: 50%;
			margin-left: -32rpx;
		}
	}


}





.version-code {
	text-align: center;
	font-size: 16px;
	color: #9A9A9A;
	position: relative;
	padding-top: 20rpx;
	padding-bottom: 60rpx;
	// top: 93rpx;
}

.confirm-clearCache-box {
	width: 600rpx;
	height: 340rpx;
	background: #FFFFFF;
	display: flex;
	flex-direction: column;

	.title {
		height: 108rpx;
		font-size: 34rpx;
		text-align: center;
		color: #404040;
		display: grid;
		place-items: center;
	}

	.notice {
		flex: 1;
		display: grid;
		align-items: flex-start;
		justify-content: center;
		font-size: 30rpx;
		color: #404040;
		line-height: 56rpx;
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
</style>
