<template>
	<view class="yeb-out" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="out-header">
			<view class="title">
				<view class="img">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M12.9168 21.5568C13.6769 21.4848 14.4 22.0413 14.4 22.8048C14.4 23.3606 14.0091 23.8456 13.4574 23.9124C12.9797 23.9702 12.4933 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 12.1916 23.9955 12.3821 23.9866 12.5715C23.9589 13.1622 23.4526 13.6 22.8613 13.6C22.1319 13.6 21.5818 12.9426 21.5977 12.2133C21.5992 12.1424 21.6 12.0713 21.6 12C21.6 6.69807 17.3019 2.4 12 2.4C6.69807 2.4 2.4 6.69807 2.4 12C2.4 17.3019 6.69807 21.6 12 21.6C12.3092 21.6 12.615 21.5854 12.9168 21.5568ZM14.6117 12.4228C15.1574 12.4228 15.5999 12.8579 15.5999 13.3955C15.5999 13.9322 15.1574 14.3682 14.6117 14.3682H12.6352V15.5841C12.6352 16.2557 12.0823 16.8 11.3999 16.8C10.7176 16.8 10.1646 16.2557 10.1646 15.5841V14.3682H8.1882C7.64243 14.3682 7.2 13.9322 7.2 13.3955C7.2 12.8578 7.64245 12.4228 8.1882 12.4228H10.1646V11.4501H8.1882C7.64243 11.4501 7.2 11.0141 7.2 10.4774C7.2 9.9398 7.64245 9.5047 8.1882 9.5047H10.1646V9.43817L7.97155 7.27996C7.58288 6.89714 7.58288 6.27688 7.97155 5.89451C8.36021 5.51213 8.99017 5.51216 9.37886 5.89451L11.3833 7.86698L13.3956 5.8864C13.7842 5.50453 14.4142 5.50453 14.8028 5.8864C15.1915 6.2692 15.1915 6.88954 14.8028 7.27186L12.6353 9.40538V9.50467H14.6118C15.1575 9.50467 15.6 9.93978 15.6 10.4774C15.6 11.0142 15.1575 11.4501 14.6118 11.4501H12.6353V12.4228L14.6117 12.4228ZM14 18.5L19.1033 22V20.25H24V16.75H19.1033V15L14 18.5Z"
							:fill="themeColor.themeColor" />
					</svg>
				</view>
				<view class="text">{{ $t('pages.common.userCenter.yueBao.enter.TransferAmount') }}{{ totalAmount }}
				</view>
				<view class="tips">
					<svg @click="handleTipsShow" width="22" height="22" viewBox="0 0 22 22" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M11.5457 13.2594L11.7144 5.75938C11.7238 5.55313 11.5457 5.375 11.3394 5.375H10.2426C10.0269 5.375 9.85818 5.55313 9.86756 5.75938L10.0363 13.2594C10.0457 13.4656 10.2051 13.625 10.4113 13.625H11.1613C11.3676 13.625 11.5363 13.4656 11.5457 13.2594Z"
							:fill="themeColor.themeColor" />
						<path opacity="0.2"
							d="M10.9977 9.6868C11.0258 9.50868 10.9508 7.23055 10.9508 7.23055C10.9508 7.23055 10.9602 6.90243 10.6883 6.8743C10.4258 6.84618 10.332 7.08993 10.332 7.25868C10.332 7.42743 10.3695 9.2743 10.3883 9.44305C10.3977 9.6118 10.5664 9.78993 10.7258 9.8368C10.8852 9.88368 10.9789 9.81805 10.9977 9.6868Z"
							fill="white" />
						<path opacity="0.2"
							d="M10.5867 6.56504C10.7576 6.56504 10.8961 6.42653 10.8961 6.25566C10.8961 6.0848 10.7576 5.94629 10.5867 5.94629C10.4159 5.94629 10.2773 6.0848 10.2773 6.25566C10.2773 6.42653 10.4159 6.56504 10.5867 6.56504Z"
							fill="white" />
						<path
							d="M11.0078 16.625C11.6291 16.625 12.1328 16.1213 12.1328 15.5C12.1328 14.8787 11.6291 14.375 11.0078 14.375C10.3865 14.375 9.88281 14.8787 9.88281 15.5C9.88281 16.1213 10.3865 16.625 11.0078 16.625Z"
							:fill="themeColor.themeColor" />
						<path
							d="M10.8484 16.4654C11.3817 16.4654 11.8141 16.0331 11.8141 15.4998C11.8141 14.9665 11.3817 14.5342 10.8484 14.5342C10.3151 14.5342 9.88281 14.9665 9.88281 15.4998C9.88281 16.0331 10.3151 16.4654 10.8484 16.4654Z"
							:fill="themeColor.themeColor" />
						<path opacity="0.2"
							d="M10.2937 15.1626C10.4062 14.9939 10.6499 14.8532 10.9031 14.8157C10.9687 14.8064 11.0249 14.8064 11.0812 14.8251C11.1187 14.8439 11.1562 14.8814 11.1281 14.9189C11.1093 14.9564 11.0624 14.9657 11.0249 14.9751C10.7906 15.0407 10.5749 15.2001 10.4437 15.3876C10.3968 15.4626 10.3124 15.6595 10.2187 15.6126C10.1249 15.547 10.1531 15.3689 10.2937 15.1626Z"
							fill="white" />
						<path
							d="M11.7398 5.375H11.3367C11.5523 5.375 11.7211 5.55313 11.7117 5.75938L11.543 13.2594C11.5336 13.4656 11.3742 13.625 11.168 13.625H11.5617C11.768 13.625 11.9367 13.4656 11.9367 13.2594L12.1055 5.75938C12.1242 5.55313 11.9461 5.375 11.7398 5.375Z"
							:fill="themeColor.themeColor" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M11 20.35C16.1639 20.35 20.35 16.1639 20.35 11C20.35 5.83614 16.1639 1.65 11 1.65C5.83614 1.65 1.65 5.83614 1.65 11C1.65 16.1639 5.83614 20.35 11 20.35ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z"
							:fill="themeColor.themeColor" />
					</svg>
				</view>
			</view>
			<view class="line"></view>
			<view class="tip">{{ $t('pages.common.userCenter.yueBao.enter.EstimatedEarningsTime') }}</view>
		</view>
		<view class="content">
			<view class="title">{{ $t('pages.common.userCenter.yueBao.enter.EnterableAmount') }}</view>
			<view class="input-box" :class="{ isFocus }">
				<input class="input" type="number" @input="blur" v-model="money"
					:placeholder="$t('pages.common.userCenter.yueBao.enter.EnterAmountPlaceholder')"
					@focus="isFocus = true" @blur="isFocus = false" />
				<view class="all" @click="inputAll">{{ $t('pages.common.userCenter.yueBao.enter.TransferAll') }}</view>
			</view>
		</view>
		<u-button :disabled="disabled" class="btn" hover-class="btn-hover" @click="confrim">{{
			$t('pages.common.userCenter.yueBao.enter.ConfirmTransfer') }}</u-button>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import oneInput from '@/components/myp-one/myp-one'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import {
		getRollInAmount,
		rollIn
	} from '@/utils/yeb'
	import defaultTemplate from "@/utils/defaultTemplate";
	export default {
		components: {
			Header,
			oneInput,
			AlertInjectLayer
		},
		data() {
			return {
				title: this.$t('pages.common.userCenter.yueBao.enter.Transfer'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				totalAmount: 0.00,
				money: '',
				pinCode: '',
				isFocus: false
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor"]),
			disabled() {
				return !this.money || this.money <= 0
			}
		},
		onLoad() {
			this.getRollInAmountData()
		},
		methods: {
			async getRollInAmountData() {
				const res = await getRollInAmount()
				const {
					result
				} = defaultTemplate({
					result: 0
				}, res)
				this.totalAmount = result
			},
			toUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			closed() {
				this.$refs.popup.close()
			},
			blur(e) {
				if (parseFloat(e.detail.value) > parseFloat(this.totalAmount)) {
					setTimeout(() => {
						this.inputAll()
					});
				}
			},
			inputAll() {
				this.money = this.totalAmount
			},
			async confrim() {
				const res = await rollIn({
					amount: this.money,
					pinCode: this.pinCode
				})
				if (res.code == 200) {
					uni.redirectTo({
						url: '/pages/common/yueBao/success?title=' + this.$t(
							'pages.common.userCenter.yueBao.enter.Import')
					})
				} else {
					pop(res.message, 2000)
				}
			},
			handleTipsShow() {
				uni.$emit('showPop', {
					refName: 'AlertMsg',
					data: {
						title: '温馨提示',
						content: '金额满足打码量才能转入',
						hideClose: true,
						confirmText: '我知道了！'
					},
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.yeb-out {
		background: var(--theme-auxiliary-color-default);
		height: var(--vh);

		.out-header {
			margin-top: 20rpx;
			padding: 20rpx 28rpx;
			height: 182rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background: #fff;
			border-radius: 24rpx;

			.title {
				display: flex;
				align-items: center;

				.img {
					width: 68rpx;
					height: 68rpx;
					border-radius: 24rpx;
					background: var(--theme-auxiliary-color-default);
					display: grid;
					place-content: center;
					margin-right: 20rpx;
				}

				.text {
					font-size: 30rpx;
					color: #404040;
				}

				.tips {
					flex: 1;
					display: flex;
					justify-content: flex-end;
				}
			}

			.line {
				width: 100%;
				height: 0;
				border-bottom: 1px dashed var(--theme-auxiliary-color-default);
			}

			.tip {
				font-size: 26rpx;
				color: var(--theme-auxiliary-color-remind);
			}
		}

		.content {
			background: #fff;
			margin-top: 20rpx;
			padding: 20rpx 28rpx;
			border-radius: 24rpx;

			.title {
				font-size: 34rpx;
				color: var(--theme-color);
				display: flex;
				align-items: center;

				&::before {
					content: '';
					width: 6rpx;
					height: 24rpx;
					background: var(--theme-color);
					margin-right: 20rpx;
					border-radius: 6rpx;
				}
			}

			.input-box {
				display: flex;
				align-items: center;
				height: 96rpx;
				box-sizing: border-box;
				padding: 20rpx;
				border-radius: 16rpx;
				border: 1px solid var(--theme-auxiliary-color-default);
				margin-top: 20rpx;

				.input {
					flex: 1;
					color: #000000;
					font-size: 28rpx;

					&::placeholder {
						font-size: 32rpx;
						color: #CCCCCC;
					}
				}

				.all {
					font-size: 30rpx;
					color: var(--theme-color);
				}
			}

			.isFocus {
				border: 1px solid var(--theme-color);
			}
		}

		.btn {
			background: var(--theme-color);
			color: #fff;
			border: unset;
			height: 90rpx;
			margin: 60rpx 28rpx;
			border-radius: 16rpx;
		}

		.btn-hover {
			color: #fff;
		}

		::v-deep .u-btn--default--disabled {
			background: #A1A1A1;
		}

	}
</style>
