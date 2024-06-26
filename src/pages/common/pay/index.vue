<template>
	<view class="pay-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<new-loading></new-loading>
		<Header :title="title">
			<block slot="right">
				<view class="kefu" @click="goToUrl('/pages/common/userCenter/service/index')">
					{{ $t('pages.common.userCenter.pay.index.ContactCustomerService') }}
				</view>
			</block>
		</Header>
		<scroll-view :style="{height: `calc(${uWindowHeight}px - ${isApp?110:110}rpx)`}" scroll-y="true" class="content"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="pay_list">
				<view class="notice">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<g clip-path="url(#clip0_104_78269)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M5.26661 6.23834C8.90459 5.94223 16.5613 4.76623 18.0842 2.43116C19.9878 -0.487689 23.2873 0.781373 23.7315 5.03273C24.0897 8.46121 24.0893 12.3119 23.7315 15.7367C23.2873 19.988 19.9878 21.2571 18.0842 18.3383C16.5613 16.0032 8.90459 14.8272 5.26661 14.5311V6.23834ZM8.56616 22.7165C8.30015 22.3914 7.81386 21.6945 7.27402 20.921C6.65492 20.0338 5.9654 19.0457 5.45696 18.4017C4.88588 17.6436 4.50516 16.7519 5.45696 16.7519C6.40875 16.7519 7.93163 17.323 9.51796 18.8459C11.1043 20.3688 12.3099 22.7165 11.8023 23.0972C11.2946 23.478 9.13724 23.4145 8.56616 22.7165ZM3.68028 6.28216C1.64772 6.28216 0 7.92988 0 9.96244V10.597C0 12.6295 1.64772 14.2773 3.68028 14.2773V6.28216Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_104_78269">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<view class="notice-bar">
						<u-notice-bar mode="horizontal" color="#A1A1A1" :list="noticeInfoTexts"
							:volume-icon="false"></u-notice-bar>
					</view>
				</view>
				<view class="pay_list_items">
					<view class="pay_list_items_item" @click="payItemClick(item)" :key="key"
						v-for="(item, key) in payGroupList" :class="{activePay: item.id === activePay.id }">
						<image :src="item.img" class="icon"></image>
						<view class="text">
							{{ item.groupName }}
						</view>
						<svg v-if="item.id === activePay.id" class="pay_item_selected"
							xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M0.800781 23.1995H15.2015C19.6198 23.1995 23.2015 19.6178 23.2015 15.1995V0.798828L0.800781 23.1995Z"
								:fill="themeColor.themeColor" />
							<path
								d="M16.2302 17.6907L12.9492 14.2729L13.7905 13.5822L15.6877 15.1058C16.4656 14.1598 18.1917 12.2809 20.5733 10.7871L20.7736 11.2609C18.5875 13.3163 16.798 16.2114 16.2302 17.6907Z"
								fill="white" />
						</svg>


						<image v-if="item.hotType == 1" class="pay_item_hot" src="/static/img/pay/hot.png" />
						<!-- <image v-if="item.hotType ==2" class="pay_item_hot" src="/static/img/pay/recommend.png" /> -->
						<svg v-if="item.hotType == 2" class="pay_item_hot" width="37" height="14" viewBox="0 0 37 14"
							fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M36.1641 8.21797C36.1641 7.24276 36.1641 6.75516 36.1155 6.34521C35.7351 3.13112 33.2009 0.596901 29.9868 0.21649C29.5769 0.167969 29.0893 0.167969 28.1141 0.167969H0.164066C6.23008 0.167969 9.02265 3.81487 10.2374 9.03574C10.4704 10.0373 10.5869 10.5382 10.6612 10.7554C11.3071 12.6458 12.5278 13.615 14.5154 13.8158C14.7438 13.8389 15.0919 13.8389 15.788 13.8389H36.1641V8.21797Z"
								fill="url(#paint0_linear_25392_77728)" />
							<path
								d="M22.7161 10.06V10.724H19.0681V11.212H18.3401V6.81997C18.2067 7.01197 18.0867 7.1773 17.9801 7.31597L17.6121 6.58797C17.9054 6.18264 18.1561 5.7613 18.3641 5.32397C18.5721 4.8813 18.7507 4.39864 18.9001 3.87597L19.6441 4.01197C19.5054 4.43864 19.3721 4.80664 19.2441 5.11597H20.6361C20.4974 4.6893 20.3801 4.3453 20.2841 4.08397L20.9641 3.89997C21.1561 4.42797 21.2974 4.8333 21.3881 5.11597H22.6441V5.78797H21.1561V6.73997H22.5241V7.39597H21.1561V8.34797H22.5241V9.01197H21.1561V10.06H22.7161ZM17.8841 7.52397L17.9321 7.90797L17.6521 7.99597C17.6094 8.01197 17.4681 8.05997 17.2281 8.13997V10.268C17.2281 10.492 17.1987 10.6626 17.1401 10.78C17.0867 10.9026 16.9934 10.988 16.8601 11.036C16.7321 11.084 16.5454 11.108 16.3001 11.108H15.7641L15.6201 10.356H16.1001C16.2654 10.356 16.3721 10.3373 16.4201 10.3C16.4734 10.2573 16.5001 10.1586 16.5001 10.004V8.38797L15.7241 8.65997L15.5721 7.87597C15.8067 7.81197 16.1161 7.71597 16.5001 7.58797V5.97997H15.6921V5.23597H16.5001V3.92397H17.2281V5.23597H17.8841V5.97997H17.2281V7.33997L17.8281 7.12397L17.8841 7.52397ZM19.0681 6.73997H20.4281V5.78797H19.0681V6.73997ZM19.0681 8.34797H20.4281V7.39597H19.0681V8.34797ZM20.4281 9.01197H19.0681V10.06H20.4281V9.01197ZM26.3241 6.66797C26.1107 7.0413 25.8467 7.41464 25.5321 7.78797V11.204H24.7801V8.57197C24.4867 8.83864 24.1561 9.1133 23.7881 9.39597L23.5161 8.59597C24.3054 8.04664 24.9561 7.40397 25.4681 6.66797H23.7401V6.00397H25.8681C25.9214 5.90797 25.9907 5.76397 26.0761 5.57197H25.5161V5.13997H23.6921V4.46797H25.5161V3.86797H26.2521V4.46797H28.1401V3.86797H28.8681V4.46797H30.6601V5.13997H28.8681V5.63597H28.1401V5.13997H26.2521V5.50797L26.8521 5.64397L26.6841 6.00397H30.6761V6.66797H26.3241ZM30.7241 8.73997V9.38797H28.8601V10.212C28.8601 10.4573 28.8281 10.644 28.7641 10.772C28.7054 10.9053 28.6014 10.9986 28.4521 11.052C28.3027 11.1053 28.0841 11.132 27.7961 11.132H26.8521L26.7161 10.476H27.5481C27.7667 10.476 27.9161 10.4466 27.9961 10.388C28.0761 10.324 28.1161 10.2093 28.1161 10.044V9.38797H25.9481V8.73997H28.1161V8.53197L29.1721 7.85197H26.4121V7.21997H30.3721V7.80397L28.8601 8.73197V8.73997H30.7241Z"
								fill="white" />
							<defs>
								<linearGradient id="paint0_linear_25392_77728" x1="2.49805" y1="7" x2="35.998" y2="7"
									gradientUnits="userSpaceOnUse">
									<stop :stop-color="themeColor.linearEndColor" />
									<stop offset="1" :stop-color="themeColor.linearBeginColor" />
								</linearGradient>
							</defs>
						</svg>


					</view>
				</view>
			</view>
			<view class="pay_list mt10" v-if="payList.length">
				<view class="title">选择充值方式</view>
				<view class="pay-lists" @click="payClick(val)" v-for="(val, key) in payList">
					<view class="left" style="width: 100%;">
						<view class="logo">
							<image class="logo_img" :src="val.logoMobile" mode="widthFix" />
						</view>
						<view style="flex: 1; max-width: 470rpx;">
							<view class="name">
                {{ val.title }}
                <span class="pay-limit"> 金额：¥ {{val.singleMinLimit}} - {{val.singleMaxLimit}} </span>
              </view>
							<view class="remark" :style="{width:val.discountRatio?'470rpx':'580rpx'}">{{ val.remark }}</view>
						</view>
						<view class="ratio" v-if="val.discountRatio">送{{ val.discountRatio }}%
						</view>
					</view>
					<view class="right">

						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
							<path d="M1.5 1.5L7 7L1.5 12.5" stroke="#AFAFAF" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</view>
				</view>
			</view>
			<Empty v-else-if="!loading"></Empty>
		</scroll-view>
		<uni-popup ref="popupNew" type="right">
			<view class="type-box">
				<Header :title="popupNewTitle" :isBack="false" showBack @back="onClickNewPay" />
				<bankMoney v-if="activePayList.type == 1" @closePay="closePay" :info="activePayList" />
				<Money v-else-if="activePayList.type == 3" @closePay="closePay" :info="activePayList" />
				<mkMoney v-else-if="activePayList.type == 4" @closePay="closePay" :info="activePayList" />
				<walletMoney
					v-else-if="activePayList.type && activePayList.type != 1 && activePayList.type != 3 && activePayList.type != 4"
					@closePay="closePay" :info="activePayList" />
			</view>
		</uni-popup>

		<uni-popup ref="popup" type="bottom">
			<view class="type-box">
				<view class="header-box">
					<view class="title">
						{{ $t('pages.common.userCenter.pay.index.SelectPaymentMethod') }}
					</view>
				</view>
				<scroll-view :scroll-top="scrollTop" @scroll="scroll" scroll-y="true" class="scroll-Y">
					<view class="type-list">
						<uni-list class="list-row">
							<template :clickable="true" v-for="(val, key) in payList">
								<uni-list-item class="list-item" :clickable="true" @click="onClick(2, val)">
									<template v-slot:header>
										<view class="slot-box">
											<image class="slot-image" :src="val.logoMobile"></image>
										</view>
									</template>
									<!-- 自定义 body -->
									<template v-slot:body>
										<view class="slot-center">
											<text class="slot-text">{{ val.title }}</text>
											<view class="note">{{ val.remark }}</view>
										</view>
									</template>
								</uni-list-item>
								<u-line :color="themeColor.themeAuxiliaryColorDefault" length="calc(100% - 28rpx)"
									style="margin: 0 auto;" v-if="key < payList.length - 1" />
							</template>
						</uni-list>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<AlertInjectLayer />
	</view>
</template>

<script>
	import Empty from '@/components/common/empty/empty'
	import Header from "@/components/common/header"
	import NavBar from "@/components/common/navBar/navBar";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import Money from "./common/money";
	import bankMoney from "./common/bankMoney";
	import walletMoney from "./common/walletMoney";
	import mkMoney from "./common/mkMoney";
	import {
		getRechargeGroup,
		getRechargeType,
		getRechargeGroupV2
	} from "@/utils/lottery/mine";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';


	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			Money,
			bankMoney,
			walletMoney,
			Header,
			mkMoney,
			Empty
		},
		data() {
			return {
				svgData: `<svg width="80" height="53" viewBox="0 0 80 53" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_25392_77705)"><rect x="0.164062" y="0.167969" width="79" height="52" rx="8" fill="url(#paint0_linear_25392_77705)"/><g filter="url(#filter0_f_25392_77705)"><rect x="0.664062" y="0.667969" width="78" height="51" rx="7.5" stroke="white"/></g></g><rect x="0.664062" y="0.667969" width="78" height="51" rx="7.5" stroke="#07C160"/><defs><filter id="filter0_f_25392_77705" x="-2.83594" y="-2.83203" width="85" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_25392_77705"/></filter><linearGradient id="paint0_linear_25392_77705" x1="39.6641" y1="0.167969" x2="39.6641" y2="52.168" gradientUnits="userSpaceOnUse"><stop stop-color="#F9FFFC"/><stop offset="1" stop-color="#D7FFEA"/></linearGradient><clipPath id="clip0_25392_77705"><rect x="0.164062" y="0.167969" width="79" height="52" rx="8" fill="white"/></clipPath></defs></svg>`,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.pay.index.Recharge'),
				headerStyle: {
					backgroundColor: "#fff",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040",
					'font-weight': 600
				},
				payGroup: [],
				payList: [],
				payInfo: {},
				type: 1,
				scrollTop: 0,
				noticeInfoTexts: [],
				payGroupList: [],
				payKey: 1,
				activePay: {},
				activePayList: {},
				itemKey: 1,
				loading: true,
				popupNewTitle: '',
				isApp: false
			}
		},
		onLoad() {
			// this.rechargeGroup()
			this.rechargeGroupV2()

			// let res = this.svgToUrl(this.svgData);
			// this.svgData = res;

		},
		mounted() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
			svgBackGround() {
				return this.svgToUrl(this.svgData);
			}
		},
		methods: {
			svgToUrl(url) {
				var encoded = url
					// .replace(/#07C160/g, "#1592FF")
					// .replace(/#F9FFFC/g, "#F6FBFF")
					// .replace(/#D7FFEA/g, "#D7ECFF")
					.replace(/#D7FFEA/g, this.themeColor.themeColor)
					.replace(/#07C160/g, this.themeColor.themeColor)
					.replace(/#F9FFFC/g, this.themeColor.linearGradientStart)
					.replace(/#D7FFEA/g, this.themeColor.linearGradientEnd)
					.replace(/<!--(.*)-->/g, "")
					.replace(/[\r\n]/g, " ")
					.replace(/"/g, `'`)
					.replace(/%/g, "%25")
					.replace(/&/g, "%26")
					.replace(/#/g, "%23")
					.replace(/{/g, "%7B")
					.replace(/}/g, "%7D")
					.replace(/</g, "%3C")
					.replace(/>/g, "%3E")

				// .replace(/#07C160/g, this.themeColor.themeColor)
				// .replace(/#F9FFFC/g, this.themeColor.linearGradientStart)
				// .replace(/#D7FFEA/g, this.themeColor.linearGradientEnd);

				let res = '"' + `data:image/svg+xml,${encoded}` + '"'; //需要在字符串前后加上一对引号（非常关键！）

				return res;
			},

			payClick(val) {
				this.activePayList = val
				this.popupNewTitle = val.title
				this.$refs.popupNew.open()
			},
			onClickNewPay() {
				this.payKey = this.payKey + 1
				this.$refs.popupNew.close()
			},
			payItemClick(item) {
				this.rechargeType(item);
				this.payKey = this.payKey + 1
			},
			rechargeType(item) {
				let prams = {
					groupId: item.id
				};
				// uni.showLoading()
				this.$store.commit("SWITCH_LOADING",true)
				this.loading = true
        let _this=this;
				getRechargeType(prams).then(res => {
          _this.$requestCache.bindLastCacheUpdateApiCallBack(res,(netResp)=>{
            _this.payList = netResp.result
            _this.activePayList = netResp.result[0] ?? {}
            _this.loading = false
            _this.activePay = item;
          },this)
					this.payList = res.result
					this.activePayList = res.result[0] ?? {}
					// uni.hideLoading()
					this.loading = false
					this.$store.commit("SWITCH_LOADING",false)
					this.activePay = item;
				}).catch(err => {
					console.log(err)
				})
			},
			rechargeGroupV2() {
				let _this=this;
        getRechargeGroupV2().then(res => {
          _this.$requestCache.bindLastCacheUpdateApiCallBack(res,_this.bindRechargeGroupV2Response,_this);
					_this.bindRechargeGroupV2Response(res);
				}).catch(err => {
					console.log(err)
				})
			},
      bindRechargeGroupV2Response(res){
        console.log("bindRechargeGroupV2Response",res);
        const {
          noticeList,
          payGroupList
        } = res.result;
        this.payGroupList = payGroupList || [];
				if(payGroupList && payGroupList.length !==0) {
					this.payItemClick(payGroupList[0]);
				}
				try {
					this.noticeInfoTexts = noticeList?.map(item => item?.noticeContent?.replace(/\n/g, "")) || [];
				} catch (error) {
					console.error(error);
				}
      },
			goToUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			backPage() {
				backPage()
			},
			scroll(e) {},
			onClick(type, val) {
				if (type == 1) {
					this.payList = []
					this.rechargeType(val.id)
					this.$refs.popup.open()
				} else if (type == 2) {
					this.payInfo = val
					this.$refs.pay.open()
					this.$refs.popup.close()
				}
			},
			closePay() {
				this.$refs.pay.close()
			},
			closePop() {
				this.$refs.popup.close()
			},
			rechargeGroup() {
				getRechargeGroup().then(res => {
					this.payGroup = res.result
				}).catch(err => {
					console.log(err)
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .empty-box {
		height: calc(var(--vh) - 524rpx);
	}

	/deep/ .bank-div {
		max-width: 480px !important;
		// height: calc(var(--vh) - 100rpx) !important;
		margin: 0 auto;
	}

	.mt10 {
		margin-top: 20rpx;
	}

	.title {
		display: flex;
		align-items: center;
		color: #404040;

		font-size: 34rpx;
		font-weight: 500;

		&::before {
			content: '';
			width: 6rpx;
			height: 24rpx;
			border-radius: 6rpx;
			background: var(--theme-color);
			display: block;
			margin-right: 16rpx;

		}
	}

	.pay_list {
		border-radius: 24rpx;
		background-color: #FFF;
		padding: 20rpx 28rpx;



		.notice {
			background: #FFF;
			// height: 88rpx;
			display: flex;
			align-items: center;

			/deep/ .fiterIcon {
				min-width: 48rpx;
			}

			/deep/ .u-notice-bar {
				padding: 0 0 0 20rpx !important;
			}

			.icon {
				flex-shrink: 0;
				width: 48rpx;
				height: 48rpx;
			}

			.notice-bar {
				flex: 1;
				width: calc(100% - 48rpx);
			}



		}

		.pay_list_items {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 0 21rpx;

			.pay_list_items_item {
				border-radius: 16rpx;
				border: 1px solid transparent;
				background-image: url('/static/img/pay/item-bg.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				display: flex;
				width: 158rpx;
				height: 104rpx;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 4rpx;
				flex-shrink: 0;
				margin-top: 20rpx;
				position: relative;

				.pay_item_selected {
					position: absolute;
					bottom: -1px;
					right: -1px;
					width: 44rpx;
					height: 44rpx;
				}

				.pay_item_hot {
					position: absolute;
					top: -1px;
					right: -1px;
					width: 72rpx;
					height: 28rpx;
				}

				.text {
					color: var(--theme-font-default-deep-color);
					font-family: MiSans;
					text-align: center;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 10rpx;
					box-sizing: border-box;
				}

				.icon {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.activePay {
				background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
				border: 1px solid var(--theme-color)
			}
		}
	}

	.pay-lists {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: 1px solid #F4F4F4;
		height: 116rpx;
		box-sizing: border-box;

		&:last-child {
			border-bottom: none;
			padding-bottom: 0;
			height: 96rpx;
		}

		.left {
			display: flex;
			align-items: center;

			.name {
				color: var(--theme-font-default-deep-color);
				font-family: MiSans;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				overflow: hidden;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 580rpx;
				display: block;
        .pay-limit{
          color: #EC3232;
          margin-left: 10rpx;
          font-size: 24rpx;
        }
			}

			.remark {
				color: var(--theme-font-default-shallow-color);
				font-family: MiSans;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 580rpx;
				display: block;
			}
		}

		.logo {
			width: 68rpx;
			min-width: 68rpx;
			height: 68rpx;
			border-radius: 24rpx;
			background: #F4F4F4;
			justify-content: center;
			align-items: center;
			display: flex;
			margin-right: 20rpx;

			.logo_img {
				max-width: 56rpx;
				max-height: 56rpx;

			}
		}
	}



	.ratio {
		height: 48rpx;
		line-height: 48rpx;
		background: url('/static/img/index/Vector.png');
		color: #fff;
		background-size: 100% 100%;
		padding: 4rpx 10rpx 4rpx 16rpx;
		font-size: 24rpx;
		margin: 0 10rpx;
		white-space: nowrap;
	}

	.content {
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
		// height: calc(var(--vh) - 110rpx);
	}

	/deep/ .uni-icon-wrapper {
		padding: 0;
	}

	/deep/ .uni-list--border:after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e5e5e5;
		width: 94%;
		margin: 0 auto;
	}

	.pay-box {
		display: flex;
		flex-direction: column;
		background: #F6F6F6;

		.kefu {
			font-weight: 500;
			font-size: 30rpx;
			line-height: 39rpx;
			color: #404040;
			text-align: right;
		}

		.list-box {
			.list-row {
				background: #F6F6F6;

				.list-item {
					display: flex;
					border-radius: 24rpx;
					background: #FFF;
					// margin-top: 20rpx;
					margin-bottom: 20rpx;
					background: #FFFFFF;
					height: 128rpx;
					padding: 10px 14px;
					padding-left: 0;
					align-items: center;
					gap: 66rpx;
					box-sizing: border-box;

					/deep/ .uni-icon-wrapper {
						font-size: 40rpx !important;
						color: #404040 !important
					}

					.slot-box {
						display: flex;
						align-items: center;

						.slot-image {
							height: 68rpx;
							width: 68rpx;
						}
					}

					.slot-text {
						font-weight: 400;
						font-size: 32rpx;
						line-height: 45rpx;
						display: flex;
						align-items: center;
						color: #404040;
						margin-left: 18rpx;
					}
				}
			}
		}

		.scroll-Y {
			height: calc(80vh - 76rpx);
		}

		.type-box {
			overflow: hidden;
			margin: auto;
			background: var(--theme-auxiliary-color-default);
			width: 100%;
			height: 100%;

			.header-box {
				height: 88rpx;
				width: 100%;
				max-width: 480px;
				display: flex;
				align-items: center;
				background-color: var(--theme-auxiliary-color-default);
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;

				.title {
					width: 100%;
					text-align: center;
					font-weight: 500;
					font-size: 34rpx;

					line-height: 36rpx;
					color: #404040;
				}

				.title2 {
					width: 100%;
					text-align: center;
					font-weight: 500;
					font-size: 34rpx;

					line-height: 36rpx;
					color: #404040;
				}

				.icon {
					image {
						height: 40rpx;
						width: 53rpx;
						border-radius: 5px;
					}
				}
			}

			.type-list {
				.list-row {
					.list-item {
						height: 154rpx;

						.slot-box {
							display: flex;
							align-items: center;

							.slot-image {
								height: 68rpx;
								width: 68rpx;
							}
						}

						.slot-center {
							margin-left: 18rpx;
							flex: 1;

							.slot-text {
								font-weight: 400;
								font-size: 28rpx;
								line-height: 45rpx;
								color: #404040;
							}

							.note {
								font-size: 24rpx;
								color: #A1A1A1;

							}
						}
					}
				}
			}
		}
	}

	/deep/ .uni-list-item__container {
		align-items: center;
	}

	/deep/ .uni-list--border-top {
		display: none;
	}

	/deep/ .uni-list--border {
		display: none;
	}

	/deep/ .header {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;

		.uni-navbar__header {
			padding: 0 28rpx;
		}
	}
</style>
