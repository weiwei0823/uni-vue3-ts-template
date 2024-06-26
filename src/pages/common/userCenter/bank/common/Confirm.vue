<template>
	<view class="bank-div" :style="{ height: `${uWindowHeight}px` }">
		<view class="bank" :style="{ marginTop: safeHeight, height: `${uWindowHeight}px` }">
			<Header :title="title" />
			<view>
				<view class="title">
					<image class="tan" src="/static/imgs-liuhe/bank/warning.png"></image>
					{{ $t('pages.common.userCenter.bank.common.ConfirmBankCard') }}
				</view>
				<uni-list class="list-box">
					<uni-list-item class="list-item" thumb-size="base">
						<template v-slot:header>
							<view class="slot-box">
								<image class="slot-image" :src="data.logoMobile" mode="widthFix">
								</image>
							</view>
						</template>
						<template v-slot:body>
							<text class="slot-text">{{ data.name }}
								<view class="slot-desc">{{ formData.bankNumber }}</view>
							</text>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="next-box">
				<view class="next-btn" @click="actionFrom">{{ $t('pages.common.userCenter.bank.common.Confirm') }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import NavBar from "@/components/common/navBar/navBar";
import Header from '@/components/common/header/index.vue';
import {
	mapGetters
} from 'pinia';
import {
	addBankCard
} from "@/utils/lottery/mine";
export default {
	name: "Confirm",
	components: {
		NavBar,
		Header
	},
	props: {
		data: {
			type: Object,
			default: () => {
				return {}
			},
		},
		formData: {
			type: Object,
			default: () => {
				return {}
			},
		}
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight"]),
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t('pages.common.userCenter.bank.common.ConfirmBankCardTitle'),
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
			isAction: false
		}
	},
	methods: {
		back() {
			this.$emit('closeNext');
		},
		backIndex() {
			this.$emit("backIndex");
		},
		actionFrom() {
			if (this.isAction == true) {
				pop(this.$t('pages.common.userCenter.bank.common.DoNotSubmitRepeatedly'), 2000)
				this.back()
				return false
			}
			this.isAction = true
			let prams = this.formData
			console.log(prams)
			prams.bankNumber = prams.bankNumber.replace(/\s+/g, '');
			addBankCard(prams).then(res => {
				if (res.code == 200) {
					this.isAction = true
					/*pop("添加成功",2000)*/
					this.$emit("backIndex");
					/*uni.navigateTo({
						url:"/pages/common/userCenter/bank/index"
					})*/
				} else {
					pop(res.message, 2000)
					return false
				}
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.bank-div {
	width: 100vw;
	position: relative;
}

.bank {

	width: 100vw;
	max-width: 480px;
	margin: auto;
	height: 100vh;
	background: var(--theme-auxiliary-color-default);

	.title {
		color: #A1A1A1;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		padding: 22rpx 28rpx;

		.tan {
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
		}
	}

	::v-deep .uni-list-item__container {
		padding: 40rpx 28rpx;
	}

	.list-box {
		border-radius: 24rpx;
		overflow: hidden;

		.list-item {
			padding: 0rpx 0;
			height: 148rpx;

			.slot-box {
				display: flex;
				align-items: center;

				.slot-image {
					height: 68rpx;
					width: 68rpx;
				}
			}

			.slot-text {
				color: #404040;
				font-size: 28rpx;
				margin-left: 20rpx;
				font-weight: 400;
				display: flex;
				align-items: center;

				.slot-desc {
					color: #3E4347;
					font-size: 24rpx;
					font-weight: 500;
				}
			}
		}
	}

	.next-box {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;

		.next-btn {
			width: 694rpx;
			height: 88rpx;
			background: var(--theme-color);
			border-radius: 16rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.ok {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-bottom: 100rpx;

		.img {
			image {
				height: 250rpx;
				width: 250rpx;
				border-radius: 0px;
			}
		}

		.msg {
			font-weight: 400;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #666666;
		}
	}
}

::v-deep .header {
	border-radius: 0 0 20rpx 20rpx;
	overflow: hidden;
}
</style>
