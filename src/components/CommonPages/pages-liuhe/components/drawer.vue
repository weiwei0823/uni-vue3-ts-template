<template>
	<view name="drawer" class="scroll-view-box header-draw" :class="['theme-' + themeColor.name]">
		<view :class="isLogin ? 'user-info-box' : 'user-info-box whiteBg'">
			<!-- <image class="logo" v-if="!isLogin" src="/static/imgs-liuhe/menu/logo.png"></image> -->
			<imageSvgUrl class="logo" :width="268" :height="60" v-if="!isLogin" :url="logo"
				replaceThemeTargetColor="#07C160"></imageSvgUrl>
			<view class="user-box" v-if="isLogin">
				<view class="avatar">
					<image :src="isLogin
						? $store.state.appInfoStore.userInfo.headImgUrl
						: '/static/img/user/touxiang.png'
						"></image>
					<view class="vip" v-if="userInfo.userType !== 'demo'">
						<image src="/static/imgs-liuhe/menu/subtract.png"></image>
						<text>VIP{{ vipLevel }}</text>
					</view>
				</view>
				<view class="user-info">
					<view class="nickname">
						{{ $t("components.CommonPages.pages-liuhe.components.drawer.text1") }}
						<view v-if="!isEdit">
							<text>{{ nickname }}</text>
							<image v-if="userInfo.userType !== 'demo'" @click="
								nickname = userInfo.nickname;
							isEdit = !isEdit;
							" style="cursor: pointer" src="/static/imgs-liuhe/menu/edit_files.png"></image>
						</view>
						<input v-else class="uni-input" autofocus v-model="nickname" @confirm="confirmEditName"
							@input="onInput" />
					</view>
					<view class="money-box">
						<view class="money-desc"> {{ $t("components.CommonPages.pages-liuhe.components.drawer.text2") }}
						</view>
						<view class="money-text" v-if="isLogin">
							<text style="marginRight: 8rpx">¥</text>
							<view class="balance-number" v-if="balanceEnd &&
								$store.state.appInfoStore.userInfo.userBalance > 1000
								">
								{{
									parseFloat(
										$store.state.appInfoStore.userInfo.userBalance
									).toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})
								}}
							</view>
							<u-count-to class="balance-number" :decimals="2"
								:end-val="$store.state.appInfoStore.userInfo.userBalance" v-else></u-count-to>
							<image class="refresh" :src="`/static/imgs-liuhe/menu/refresh.png`" :class="{ loading }"
								@click="freshUserBanlance"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="list-box" :style="{height:`calc(${uWindowHeight}px - ${isApp?100:150}rpx)`}">
			<uni-list>
				<!-- :thumb="item.icon" -->
				<uni-list-item :border="false" clickable v-for="(item, index) in showMenuList" :key="item.title"
					:title="item.title" @click="handleJump($event, item)"
					:class="isLogin ? (index % 2 !== 0 ? 'list-item-odd' : '') : (index % 2 !== 0 ? '' : 'list-item-odd')">
					<template v-slot:header>
						<imageSvgUrl :width="46" :height="46" :url="item.icon" replaceThemeTargetColor="#07C160">
						</imageSvgUrl>
					</template>

				</uni-list-item>
				<view class="list-item list-item-odd">
					<view class="left">
						<imageSvgUrl style="margin-right:30rpx;" :width="46" :height="46"
							url="/static/imgs-liuhe/menu/svgs/10.svg" replaceThemeTargetColor="#07C160">
						</imageSvgUrl>
						<view class="title" style="font-size: 30rpx;">
							{{ $t("common.setting.list4") }}
						</view>
					</view>
					<view class="right">
						<view class="custom-switch" v-if="hand" @click="switchHand(false)">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 28" fill="none">
								<rect width="49" height="28" rx="14" transform="matrix(-1 0 0 1 49 0)"
									:fill="themeColor.themeColor" />
								<circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 47 2)" fill="white" />
							</svg>
						</view>
						<view class="custom-switch" v-else @click="switchHand(true)">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 28" fill="none">
								<rect width="49" height="28" rx="14" transform="matrix(-1 0 0 1 49 0)" fill="#DFDFDF" />
								<circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 26 2)" fill="white" />
							</svg>
						</view>
					</view>
				</view>
				<view class="list-item" v-if="isLogin">
					<view class="left" style="justify-content: center;">
						<view class="exit-btn" @click="loginOut">
							<imageSvgUrl style="margin-right:30rpx;" :width="46" :height="46"
								url="/static/imgs-liuhe/menu/svgs/11.svg" replaceThemeTargetColor="#a0aaa5">
							</imageSvgUrl>
							<view class="title" style="color:#a0aaa5;">
								{{ $t("components.CommonPages.pages-liuhe.components.drawer.text16") }}
							</view>
						</view>
					</view>
				</view>
			</uni-list>
		</scroll-view>

	</view>
</template>

<script>
import {updateUsername} from "@/utils/user/index";
import {bindStatus} from "@/utils/lottery/mine";
import {mapGetters} from 'pinia';
import {logout} from "@/utils/common/index";
import {limitstr} from "@/utils/function";
import imageSvgUrl from '@/components/common/imageSvgUrl'

export default {
		components: {
			imageSvgUrl
		},
		data() {
			return {
				isApp: false,
				hand: false,
				isEdit: false,
				nickname: "",
				nicknameInputVal: "",
				loading: false,
				balanceEnd: false,
				menuList: [{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text3"),
						icon: "/static/imgs-liuhe/menu/svgs/12.svg",
						url: "/pages/common/login",
						code: "login"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text4"),
						icon: "/static/imgs-liuhe/menu/svgs/13.svg",
						url: "/pages/common/reg",
						code: "register"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text5"),
						icon: "/static/imgs-liuhe/menu/svgs/14.svg",
						url: "/pages/liuhe/home/index?isTest=1",
						demo: true,
						code: "demo"
					},
					// {
					//     title:'APP下载',
					//     icon:'/static/imgs-liuhe/menu/app_download.png',
					//     url:'/pages/common/userCenter/downloadPage',
					//     login: true,
					//     code: "download"
					// },
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text6"),
						icon: "/static/imgs-liuhe/menu/svgs/1.svg",
						url: "/pages/common/userCenter/service/index",
						show: true,
						code: "customer"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text7"),
						icon: "/static/imgs-liuhe/menu/svgs/2.svg",
						url: "/pages/common/pay/index",
						show: true,
						islogin: true,
						code: "pay"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text8"),
						icon: "/static/imgs-liuhe/menu/svgs/3.svg",
						url: "/pages/common/withdraw/index",
						show: true,
						islogin: true,
						code: "withdraw"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text9"),
						icon: "/static/imgs-liuhe/menu/svgs/4.svg",
						url: "/pages/common/promoteEarn/index",
						show: true,
						islogin: true,
						closeMsg: this.$t("components.CommonPages.pages-liuhe.components.drawer.text10"),
						code: "agency"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text11"),
						icon: "/static/imgs-liuhe/menu/svgs/5.svg",
						url: "/pages/liuhe/game_hall",
						mouduleId: 5,
						show: true,
						code: "game"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text12"),
						icon: "/static/imgs-liuhe/menu/svgs/6.svg",
						url: "/pages/liuhe/game_hall",
						mouduleId: 3,
						show: true,
						code: "chess"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text13"),
						icon: "/static/imgs-liuhe/menu/svgs/7.svg",
						url: "/pages/liuhe/game_hall",
						mouduleId: 6,
						show: true,
						code: "fishing"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text14"),
						icon: "/static/imgs-liuhe/menu/svgs/8.svg",
						url: "/pages/liuhe/game_hall",
						mouduleId: 4,
						show: true,
						code: "video"
					},
					{
						title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text15"),
						icon: "/static/imgs-liuhe/menu/svgs/9.svg",
						url: "/pages/liuhe/game_hall",
						mouduleId: 7,
						show: true,
						code: "sport"
					},
					// {
					// 	title: this.$t("components.CommonPages.pages-liuhe.components.drawer.text16"),
					// 	icon: "/static/imgs-liuhe/menu/logout.png",
					// 	url: "/pages/common/login",
					// 	show: true,
					// 	code: "loginOut",
					// },
				],
			};
		},
		mounted() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			let doInitUserMsg = this.isLogin;
			doInitUserMsg && this.getInit();
			this.$store.dispatch("updateUserInfoLiuheVip");
			this.hand = uni.getStorageSync("isHand") || false;
			// let that = this;
			// uni.$off("update_hall_selector")
			// let memIdToTabDictions = null;
			// uni.$on("update_hall_selector", function(id) {
			// 	if (!memIdToTabDictions && that.tabsList) {
			// 		memIdToTabDictions = {};
			// 		for (let tabIndex in that.tabsList) {
			// 			let tab = that.tabsList[tabIndex];
			// 			memIdToTabDictions[tab.id] = tab
			// 		}
			// 	}
			// 	if (!memIdToTabDictions) return pop(this.$t(
			// 		"components.CommonPages.pages-liuhe.components.categorysSwiper.text1"));
			// 	let jumpTab = memIdToTabDictions[id];
			// 	let index = that.tabsList.indexOf(jumpTab);
			// 	if (index == -1) return pop(this.$t(
			// 		"components.CommonPages.pages-liuhe.components.categorysSwiper.text2"))
			// 	that.swiperCurrent = index;
			// 	that.current = index;
			// 	that.newGetList(index);
			// })
		},
		computed: {
			...mapGetters(['userInfo', 'themeColor', "uWindowHeight"]),

			theme() {
				return getApp().globalData.themeMap[this.$config.station];
			},
			//是否登录
			isLogin() {
				return this.userInfo != null;
			},
			//显示VIP等几（INT）
			vipLevel() {
				if (this.$config.compriseLiuheStation()) {
					return this.userInfo && this.userInfo.liuheVipSpeedInfo ? parseInt(this.userInfo.liuheVipSpeedInfo
						.level) : 0;
				} else {
					return this.userInfo ? parseInt(this.userInfo.userLevel) : 0;
				}
			},
			logo() {
				return this.$store?.state?.appInfoStore?.contantsConfigs?.filter(item => item.type == '26')[0].url
			},

			showMenuList() {

				if (this.userInfo && this.userInfo.userType !== "demo") {
					//登录后
					this.nickname = this.userInfo.nickname;
					return this.menuList.filter((item) => item.show);
				} else if (this.userInfo && this.userInfo.userType === "demo") {
					//试玩
					this.nickname = this.userInfo.userName;
					return this.menuList.filter((item) => !item.demo && item.code != 'loginOut');
				} else {
					//未登录

					return this.menuList.filter((item) => item.code != 'loginOut');
				}
			}
		},
		methods: {
			loginOut() {
				logout().then((res) => {
					if (res.code === 200) {
						this.$store.dispatch("userLoginOut");
						uni.reLaunch({
							url: "/pages/liuhe/home/index"
						})
					} else {
						uni.showToast({
							title: this.$t("common.setting.logoutfaild"),
							duration: 2000,
							icon: "none",
						});
					}
				});
			},
			switchHand(e) {
				this.hand = e;
				uni.setStorageSync("isHand", this.hand);
			},
			async getInit() {
				const res = await bindStatus();
				this.status = res.result?.status || 0;
			},
			handleJump(event, item) {
				// TODO  这里有个建议优化点，点击自动缩入菜单 预留配置 ，实现可以手动控制关闭的方式。有些按钮如果触发关联事件失败 不自动关闭
				// 例如下发控制暂未开发 体验不是很好
				if (item.closed) {
					return pop(item.closeMsg || this.$t("components.CommonPages.pages-liuhe.components.drawer.text17"));
				}

				//点击试玩
				if (item.code === "demo") {
					this.testLogin();
					return;
				}

				if (!isLogin() && item.islogin) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return;
				}

				if (this.isTestUser(item)) return;
				//2: 无资金密码 3: 没绑定银行卡
				if (this.status == 2 && ["withdraw"].includes(item.code)) {
					uni.$emit("showPop", {
						refName: "SetFundPassword"
					});
					return;
				} else if (this.status == 3 && ["withdraw"].includes(item.code)) {
					uni.navigateTo({
						url: "/pages/common/userCenter/bank/bind",
					});
					return;
				}

				if (item.mouduleId) {
					// uni.setStorageSync("moduleIndex", item.mouduleId);
					// uni.switchTab({
					//   url: item.url,
					// });

					if(documentExistElementById("category_swiper_scroll")){
						uni.$emit("update_hall_selector", item.mouduleId);
						this.$emit("close");
					}else {
						let that = this;
						uni.navigateTo({
							url: item.url,
							events:{
								onGameHallInitedSuccess:()=>{
                  // 延迟一会在执行
                  setTimeout(() => {
                    uni.$emit("update_hall_selector", item.mouduleId);
                  }, 1000);
									that.$emit("close");
								}
							}
						});
					}



					// uni.navigateTo({
					// 	url: item.url + `?id=${item.mouduleId}`
					// })
					// setTimeout(()=>{
					// uni.$emit("update_hall_selector", item.mouduleId);

					// },1000)
					// uni.switchTab({
					// 	url: item.url,
					// });

					// uni.reLaunch({ url: item.url })
					return;
				}
				// 退出
				if (item.code === "loginOut") {
					logout().then((res) => {
						if (res.code === 200) {
							this.$store.dispatch("userLoginOut");
							this.$emit("close");
							//backPage(true);
						} else {
							uni.showToast({
								title: this.$t(
									"components.CommonPages.pages-liuhe.components.drawer.text18"),
								duration: 2000,
								icon: "none",
							});
						}
					});
					return
				}
				console.log(item)
				uni.navigateTo({
					url: item.url,
				});
			},
			//判断是否试玩登录
			isTestUser(item) {
				if (this.userInfo && ['sign','demo'].includes(this.userInfo.userType) && ["充值", "提现", "代理"].includes(item.title)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage',
						data: 'demo'
					})
					return true;
				}
				return false;
			},
			confirmEditName(event) {
				if (event.detail.value == "") {
					pop(this.$t("components.CommonPages.pages-liuhe.components.drawer.text20"), 2000);
					return false;
				}
				updateUsername({
					uname: event.detail.value
				}).then((res) => {
					if (res.code === 200) {
						uni.$emit("setSucc", {
							msg: this.$t("components.CommonPages.pages-liuhe.components.drawer.text19"),
						});
						this.nickname = event.detail.value;
						this.$store.dispatch("updateUserInfoProperties", {
							nickname: this.nickname
						})
					} else if (res.code === 500) {
						uni.showToast({
							title: res.message,
							icon: "none",
						});
					}
				});
				this.isEdit = false;
			},
			testLogin() {
				// // 预留res 判断登录失败情况
				this.$store.dispatch("doUserLoginDemo").then((res) => {
					uni.reLaunch({
						url: this.$route.path + "?isTest=1",
					});
				}).catch((err) => {
					pop(err.message, 2000)
				});
			},
			goto(url, isTestPop) {
				if (
					isTestPop && ['sign','demo'].includes(this.$store.state.appInfoStore.userInfo.userType)
				) {
					uni.$emit("showPop", {
						refName: "AlertTestMsg"
					});
					return false;
				}
				uni.navigateTo({
					url,
				});
			},
			showDrawer() {
				this.$refs.showLeft.open();
				this.isEdit = false;
			},
			closeDrawer() {
				this.$refs.showLeft.close();
			},
			async freshUserBanlance() {

				this.isEnd1 = false
				this.loading = true
				await this.$store.dispatch("appInfoStoreInit");
				setTimeout(() => {
					this.loading = false;
				}, 2000);
			},

			onInput() {
				this.$nextTick(function() {
					this.nickname = limitstr(this.nickname, 18);
				})
			}
		},
	};
</script>
<style lang="scss" scoped>
	::v-deep .uni-list-item__content-title {
		font-size: 30rpx;
		padding-left: 30rpx;
	}

	.scroll-view-box {
		height: 100%;

		.list-box {
			height: calc(var(--vh) - 150rpx);
		}

		.user-info-box {
			background: var(--theme-auxiliary-color-default);
			padding: 36rpx 4rpx 28rpx 28rpx;

			.logo {
				width: 268rpx;
				height: 60rpx;
			}

			.user-box {
				display: flex;

				.avatar {
					margin-right: 24rpx;
					position: relative;
					height: 96rpx;
					width: 96rpx;
					overflow: hidden;
					border-radius: 26rpx;

					image {
						height: 96rpx;
						width: 96rpx;
						border-radius: 26rpx;
					}

					.vip {
						position: absolute;
						bottom: 0;
						right: -6rpx;
						height: 34.4rpx;

						image {
							width: 96rpx;
							height: 34.4rpx;
						}

						text {
							position: absolute;
							left: 30rpx;
							top: 0rpx;
							color: #fff;
							font-size: 24rpx;
						}
					}
				}

				.user-info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.nickname {
						font-weight: 400;
						font-size: 28rpx;
						color: #404040;
						display: flex;
						align-items: center;
						line-height: 1;

						text {
							display: inline-block;
							max-width: 160rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.uni-input {
							text-align: left;
							font-size: 28rpx;
							width: auto;
							max-width: 240rpx;
							border: none;
							border-bottom: 1px solid #ddd;
						}

						image {
							height: 30rpx;
							width: 30rpx;
							margin-left: 15rpx;
							position: relative;
							top: 3rpx;
						}
					}

					.money-box {
						display: flex;
						flex-direction: row;
						font-weight: 600;

						.money-text {
							display: block;
							height: 60rpx;
							line-height: 60rpx;
							position: relative;
							font-weight: bold;
							font-size: 34rpx !important;
							color: #FFD43D;
							overflow: auto;

							.balance-number {
								display: inline-block;
								//background-image: -webkit-linear-gradient(left,
								//		#d1b05b,
								//		#e3cd7c,
								//		#d1b05b);
								//-webkit-background-clip: text;
								//-webkit-text-fill-color: transparent;
								font-size: 34rpx !important;
								font-weight: 600 !important;
								margin-right: 10rpx;
							}

							.refresh {
								display: inline-block;
								width: 40rpx;
								height: 40rpx;
								margin-top: 0rpx;
								top: 8rpx;
							}

							.loading {
								animation: rotation 3s infinite linear;
							}

							@keyframes rotation {
								from {
									transform: rotate(0deg);
								}

								to {
									transform: rotate(360deg);
								}
							}
						}

						.money-desc {
							font-weight: 500;
							font-size: 28rpx;
							line-height: 34rpx;
							display: flex;
							align-items: center;
							text-align: center;
							color: #404040;
						}
					}
				}
			}

			&.whiteBg {
				background: #fff;
			}
		}

		.list-item-odd {
			background: var(--theme-auxiliary-color-default) !important;

			::v-deep .uni-switch-input {
				&::before {
					background-color: #DFDFDF !important;
				}
			}

		}

		.list-item {
			display: flex;
			align-items: center;
			padding: 30rpx;

			.left {
				display: flex;
				align-items: center;
				flex: 1;
			}

			.custom-switch {
				width: 84rpx;
				height: 48rpx;
			}
		}
	}

	.exit-btn {
		width: 506rpx;
		height: 88rpx;
		border: 2rpx solid var(--theme-auxiliary-color-default);
		border-radius: 24rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
	}
</style>
