<template>
	<view class="bank-div" name="mkMoney" :class="['theme-' + themeColor.name]"
		:style="{ height: `calc(${uWindowHeight}px - 100rpx)` }">
		<view class="money" :style="{ marginTop: safeHeight }">
			<!-- <Header :title="info.title" v-on:back="back" :showBack="true" :isBack="false" /> -->

			<!-- <NavBar :isBack="false" :title="info.title" :header-style="headerStyle"
				:bg-color="headerStyle.backgroundColor" :font-color="fontColor" :title-style="titleStyle">
				<block slot="left">
					<view class="" @click="back">
						<filterIcon src="/static/imgs-liuhe/activity/back.png" :width="24" :height="42" />
					</view>

				</block>
			</NavBar> -->
			<scroll-view :style="{ height: `calc(${uWindowHeight}px - ${isApp ? 0 : 110}rpx)` }" scroll-y="true"
				class="content" :enhanced="true" :bounces="false" :show-scrollbar="false">
				<z-paging class="paging" ref="paging" v-model="payList" :default-page-size="15" @query="queryPayList"
					:refresher-enabled="false" :hide-no-more-inside="true" :loading-more-enabled="true"
					:to-bottom-loading-more-enabled="true" :show-loading-more-no-more-view="false" :fixed="false"
					:hide-empty-view="false" :empty-view-center="true"
					:empty-view-text="$t('pages.luntan.masterForum.noData')"
					:empty-view-img="'/static/imgs-liuhe/activity/empty.png'"
					:empty-view-img-style="{ 'width': '400rpx', 'height': '400rpx' }">
					<view class="new-money-list">
						<view class="new-money-list-item" v-for="(item, index) in payList" :key="index">
							<view style="width: 300rpx;">
								<view class="pay-title">
									{{ item.merchantName }}
								</view>
							</view>
							<view class="pay-money">

								<text>总金额&nbsp; </text>
								￥{{ item.amount }}
							</view>
							<view class="pay-btn" @click="newPayMoney(item)">
								充值
							</view>
						</view>
					</view>
					<view class="hint">
						<view class="hint-box">
							<text class="hint-title"> {{ $t("pages.common.userCenter.pay.common.money.text4") }}：</text>
							<view class="content">
								{{ info.remark }}
							</view>
						</view>
					</view>
				</z-paging>
			</scroll-view>
			<uni-popup :mask-background-color="'rgba(0, 0, 0, 0.3)'" ref="confirm" type="center" background-color="#fff">
				<view class="confirm-box">
					<view class="title">{{ $t("pages.common.userCenter.pay.common.money.text4") }}</view>
					<view class="notice">
						{{ $t("pages.common.userCenter.pay.common.money.text5") }}
					</view>
					<view class="btn-box">
						<view class="cancel-btn" @click="cancel">{{ $t("common.cancel") }}</view>
						<view class="confirm-btn" @click="confirm">{{ $t("common.ok") }}</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup :mask-background-color="'rgba(0, 0, 0, 0.3)'" v-model="visibleShow" ref="payConfirm" type="center"
				background-color="#fff">

				<view class="payConfirm-box">
					<view class="close-img" @click="closePay">

						<filterIcon src="/static/img/common/close.png" :width="80" :height="80" />
					</view>
					<image class="rocket-img" src="/static/img/common/rocket.png" mode=""></image>
					<view class="payConfirm-box-title">
						存款订单等待支付中...
					</view>
					<view class="payConfirm-box-description">
						请在10分钟内完成支付后<br /> 点击完成存款
					</view>
					<view class="payConfirm-box-btn" @click="goUser">
						已完成存款
					</view>
					<view class="payConfirm-box-question" @click="haveQuestion">
						遇到问题未完成存款？
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import NavBar from "@/components/common/navBar/navBar";
import uniDrawer from "@/uni_modules/uni-drawer/components/uni-drawer/uni-drawer";
import {
	debounce,
	throttle
} from "@/utils/function";
import {
	incomeOnline,
	getPayList
} from "@/utils/lottery/mine";
import {
	mapGetters
} from 'pinia';
export default {
	name: "money",
	components: {
		NavBar,
		uniDrawer,
		Header
	},
	props: {
		info: {
			type: Object,
			default: () => {
				return {}
			},
		}
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t("pages.common.userCenter.pay.common.money.text6"),
			headerStyle: {
				backgroundColor: "#FFFFFF"
			},
			fontColor: "#2a2a2a",
			titleStyle: {
				color: "#404040"
			},
			placeholderStyle: "font-weight: 400;font-size: 28rpx;line-height: 45rpx; color: #A1A1A1;",
			money: "",
			moneyList: [],
			isAction: false,
			payList: [],
			payNo: "",
			pageNum: 1,
			openUrl: '',
			visibleShow: false
		}
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight"]),
	},
	mounted() {
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		uni.$emit("on_page_mounted", this)
		// this.$refs.payConfirm.open()
		// if (this.info.fixedAmount != null && this.info.fixedAmount.length > 0) {
		// 	this.moneyList = this.info.fixedAmount.split(",");
		// }
		this.fontColor = this.themeColor.themeColor;
		if (this.info.type == 4) {
			this.queryPayList();
		}
	},
	watch: {
		visibleShow(val) {
			if (val) {
				this.$nativeBridge.setStatusBarColor('#B2B2B2')

			} else {
				this.$nativeBridge.setStatusBarColor('#ffffff')
			}
		}
	},
	methods: {
		haveQuestion() {
			uni.navigateTo({
				url: '/pages/common/userCenter/service/index'
			})
		},
		goUser() {
			uni.switchTab({
				url: this.$config.station === 'ALL' ? '/pages/liuhe/home/index' : '/'
			})
		},
		closePay() {
			this.visibleShow = false
			this.$refs.payConfirm.close();

		},
		newPayMoney(item) {
			this.selectMoney(item);
			this.nextBtn();
		},
		async queryPayList(pageNo, pageSize = 15) {
			if (!pageNo) return;
			this.pageNum = pageNo;
			const obj = {
				merchantId: this.info.id,
				pageNo: this.pageNum,
				pageSize
			}

			const res = await getPayList(obj);

			this.$refs.paging?.complete(res.result);

			// this.$refs.paging.complete([{
			// 	merchantName: 'asd',
			// 	amount: '11'
			// }]);

			// this.payList = res.result;
		},
		back() {
			this.$emit('closePay');
		},
		onClick() {
			this.$refs.test.open()
		},
		selectMoney(item) {
			this.money = item.amount
			this.payNo = item.orderNo
			if (this.money > 0) {
				this.isAction = true
			} else {
				this.isAction = false
			}
		},
		moeny: throttle(function () {
			if (this.money >= this.info.singleMinLimit && this.money <= this.info.singleMaxLimit) {
				this.isAction = true
			} else {
				this.isAction = false
			}
		}, 500),
		async nextBtn() {
			if (this.isAction == false) {
				return false
			}
			let prams = {
				amount: this.money,
				id: this.info.id,
				isMark: this.info.type == 4,
				payNo: this.payNo
			};
			uni.showLoading({
				title: '加载中'
			})
			const res = await incomeOnline(prams)
			uni.hideLoading()
			if (res.code == 200) {
				this.$refs.confirm.open()
				// this.$nativeBridge.setStatusBarColor('#666666',true)
				this.$nativeBridge.setStatusBarColor('#B2B2B2')


				this.openUrl = res.result
			} else {
				pop(res.message, 2000)
			}
			this.$refs.paging.reload();
		},
		cancel() {
			this.$refs.confirm.close()
			this.$nativeBridge.setStatusBarColor('#fff')

		},
		confirm() {
			this.$refs.confirm.close()
			this.$nativeBridge.setStatusBarColor('#fff')

			if (browserPlatform() == browserPlatform.IOS) {
				window.open(this.openUrl)
			} else {
				this.$nativeBridge.openUrl(this.openUrl);
			}
			//#ifdef APP-PLUS
			plus.runtime.openURL(this.openUrl)
			//#endif
			// this.$nativeBridge.setStatusBarColor('#666666', true)
			this.visibleShow = true

			this.$refs.payConfirm.open();
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	height: 0;
	flex: 1;
	margin-top: 20rpx;
	overflow: hidden;
}

::v-deep .uni-navbar__header-container {
	.input-view {
		font-Size: 34rpx;
	}
}

.bank-div {
	width: 100vw;
}

.payConfirm-box {
	border-radius: 24rpx;
	overflow: hidden;
	background-color: #fff;
	width: 600rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 40rpx 0;
	position: relative;

	.close-img {
		position: absolute;
		top: 0rpx;
		right: 0;
	}

	.rocket-img {
		width: 520rpx;
		height: 520rpx;
	}

	.payConfirm-box-title {
		color: #3E4347;
		text-align: center;

		font-size: 40rpx;
		font-weight: 500;
	}

	.payConfirm-box-description {
		color: #c0c0c0;
		text-align: center;

		font-size: 30rpx;
		font-weight: 400;
		margin-top: 10rpx;
	}

	.payConfirm-box-btn {
		display: flex;
		width: 520rpx;
		height: 88rpx;
		justify-content: center;
		align-items: center;
		color: #FFF;
		text-align: center;

		font-size: 34rpx;
		font-weight: 400;
		background-color: var(--theme-color);
		border-radius: 16rpx;
		margin-top: 20rpx;
	}

	.payConfirm-box-question {
		color: var(--theme-color);
		text-align: center;

		font-size: 30rpx;
		font-weight: 400;
		margin-top: 20rpx;
	}
}

.money {
	display: flex;
	flex-direction: column;
	width: 100vw;
	max-width: 480px;
	margin: auto;
	height: 100%;
	background: var(--theme-auxiliary-color-default);

	.pay-box {
		.list-row {
			background: #F6F6F6;

			.list-item {
				height: 120rpx;
				/*margin-top: 10rpx;*/
				background: #FFFFFF;

				.slot-box {
					display: flex;
					align-items: center;

					.slot-image {
						height: 54rpx;
						width: 54rpx;
					}
				}

				.slot-text {
					font-weight: 500;
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

	.line {
		height: 10rpx;
		border-radius: 0px;
		background: #F6F6F6;
	}

	.input-item {
		width: 100%;
		padding: 0 28rpx 0 28rpx;

		.input-row {
			.uni-input {
				width: 93%;
				height: 96rpx;
				padding: 10rpx;
				background: #FFFFFF;
				text-align: left;
				border-radius: 16rpx;
				border: 1px solid var(--theme-auxiliary-color-default);
				box-sizing: border-box;
			}
		}
	}

	.input-amount {
		margin-top: 20rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		padding-bottom: 20rpx;

		.title {
			padding: 20rpx 28rpx;

			font-style: normal;
			font-weight: 600;
			font-size: 34rpx;
			color: #404040;
			display: flex;
			align-items: center;

			.line {
				width: 6rpx;
				height: 24rpx;
				background-color: var(--theme-color);
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}

		.list-div {
			.top-box {
				height: 130rpx;
				border-radius: 0px;
			}

			.list-row {
				// border-top: 2rpx solid #DDDDDD;
				display: flex;
				flex-wrap: wrap;
				padding: 20rpx;
				gap: 24rpx;

				.list-item {
					height: 100rpx;
					width: 30%;
					border-radius: 20rpx;
					background: #FFFFFF;
					border: 1px solid #E6E6E6;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.triangle {
						display: none;
					}

					.check {
						display: none;
					}
				}

				.actives {
					background: #FFFFFF;
					border: 1px solid var(--theme-color);
					position: relative;

					.triangle {
						display: block;
						position: absolute;
						right: 0;
						bottom: 0;
						width: 31px;
						height: 31px;
					}

					.check {
						display: block;
						position: absolute;
						right: 3px;
						bottom: 10px;
						width: 12px;
						height: 11px;
						z-index: 2;
					}
				}
			}
		}
	}


	.next-box {
		clear: both;
		margin-top: 40rpx;
		display: flex;
		justify-content: center;

		.next-btn {
			width: 705rpx;
			height: 90rpx;
			background: #C8C9CC;
			border-radius: 16rpx;
			font-weight: 500;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.active {
			width: 705rpx;
			background: var(--theme-color);
			border-radius: rpx;
			font-weight: 500;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.hint {
		display: flex;
		justify-content: center;
		// margin-top: 60rpx;
		padding: 20rpx 0;

		.hint-box {
			width: 100%;
			padding: 0 28rpx;

			.hint-title {
				font-weight: 500;
				font-size: 30rpx;
				line-height: 42rpx;
				text-align: center;
				color: var(--theme-auxiliary-color-remind);
			}

			.content {
				font-weight: 400;
				font-size: 26rpx;
				line-height: 34rpx;
				color: #A1A1A1;
				margin: 20rpx 6rpx 0 0;
				height: auto;
			}
		}
	}

	.confirm-box {
		height: 340rpx;
		width: 600rpx;
		border-radius: 24rpx;
		background: #fff;
		box-sizing: border-box;

		.title {
			height: 80rpx;
			font-weight: 400;
			font-size: 34rpx;
			line-height: 80rpx;
			text-align: center;

			color: #404040;
		}

		.notice {
			height: 160rpx;
			font-weight: 400;

			font-size: 30rpx;
			line-height: 140rpx;
			text-align: center;
			color: #404040;
		}

		.btn-box {
			display: flex;
			color: #FFFFFF;
			font-weight: 400;
			font-size: 26rpx;
			border-top: 1px solid var(--theme-auxiliary-color-default);
			justify-content: space-between;
			width: 100%;

			.cancel-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #404040;
				font-size: 34rpx;
				width: 100%;
				height: 88rpx;
				border-right: 1px solid var(--theme-auxiliary-color-default);
			}

			.confirm-btn {
				display: flex;
				width: 100%;
				height: 88rpx;
				font-size: 34rpx;
				align-items: center;
				justify-content: center;
				color: var(--theme-color);
			}
		}
	}
}

::v-deep .input-view {
	text-overflow: ellipsis;
	overflow: hidden;
}

.new-money-list-item {
	margin-top: 20rpx;
	background-color: #fff;
	padding: 34rpx 28rpx;
	border-radius: 24rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	&:first-child {
		margin-top: 0;
	}

	.pay-title {
		color: #3E4347;

		font-size: 30rpx;
		font-weight: 400;
		width: 190rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.pay-money {
		flex: 1;
		color: #3E4347;

		font-size: 34rpx;
		font-weight: 600;

		text {

			font-size: 28rpx;
			font-weight: 400;
		}
	}

	.pay-btn {
		background-color: var(--theme-color);
		display: flex;
		width: 136rpx;
		height: 60rpx;
		justify-content: center;
		align-items: center;
		color: #FFF;
		margin-left: 28rpx;

		font-size: 28rpx;
		font-weight: 400;
		border-radius: 16rpx;
	}
}
</style>
