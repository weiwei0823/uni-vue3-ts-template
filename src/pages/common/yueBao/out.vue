<template>
	<view class="yeb-out" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="out-header">
			<view class="title">
				<view class="img">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M12.9168 21.5568C13.6769 21.4848 14.4 22.0413 14.4 22.8048C14.4 23.3606 14.0091 23.8456 13.4574 23.9124C12.9797 23.9702 12.4933 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 12.1916 23.9955 12.3821 23.9866 12.5715C23.9589 13.1622 23.4526 13.6 22.8613 13.6C22.1319 13.6 21.5818 12.9426 21.5977 12.2133C21.5992 12.1424 21.6 12.0713 21.6 12C21.6 6.69807 17.3019 2.4 12 2.4C6.69807 2.4 2.4 6.69807 2.4 12C2.4 17.3019 6.69807 21.6 12 21.6C12.3092 21.6 12.615 21.5854 12.9168 21.5568ZM14.6117 12.4228C15.1574 12.4228 15.5999 12.8579 15.5999 13.3955C15.5999 13.9322 15.1574 14.3682 14.6117 14.3682H12.6352V15.5841C12.6352 16.2557 12.0823 16.8 11.3999 16.8C10.7176 16.8 10.1646 16.2557 10.1646 15.5841V14.3682H8.1882C7.64243 14.3682 7.2 13.9322 7.2 13.3955C7.2 12.8578 7.64245 12.4228 8.1882 12.4228H10.1646V11.4501H8.1882C7.64243 11.4501 7.2 11.0141 7.2 10.4774C7.2 9.9398 7.64245 9.5047 8.1882 9.5047H10.1646V9.43817L7.97155 7.27996C7.58288 6.89714 7.58288 6.27688 7.97155 5.89451C8.36021 5.51213 8.99017 5.51216 9.37886 5.89451L11.3833 7.86698L13.3956 5.8864C13.7842 5.50453 14.4142 5.50453 14.8028 5.8864C15.1915 6.2692 15.1915 6.88954 14.8028 7.27186L12.6353 9.40538V9.50467H14.6118C15.1575 9.50467 15.6 9.93978 15.6 10.4774C15.6 11.0142 15.1575 11.4501 14.6118 11.4501H12.6353V12.4228L14.6117 12.4228ZM24 18.5L18.8967 22V20.25H14V16.75H18.8967V15L24 18.5Z"
							:fill="themeColor.themeColor" />
					</svg>
				</view>
				<view class="text">{{ $t('pages.common.userCenter.yueBao.out.AvailableAmount') }}{{ totalAmount }}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title">{{ $t('pages.common.userCenter.yueBao.out.AvailableAmountInCNY') }}</view>
			<view class="input-box" :class="{ isFocus }">
				<input class="input" type="number" @input="blur" v-model="money"
					:placeholder="$t('pages.common.userCenter.yueBao.out.EnterAmount')" @focus="isFocus = true"
					@blur="isFocus = false" />
				<view class="all" @click="inputAll">{{ $t('pages.common.userCenter.yueBao.out.All') }}</view>
			</view>
			<view class="tip">{{ $t('pages.common.userCenter.yueBao.out.AfterTransfer') }}</view>
		</view>
		<u-button :disabled="disabled" class="btn" hover-class="btn-hover"
			@click="confrim">{{ $t('pages.common.userCenter.yueBao.out.ConfirmTransfer') }}</u-button>

		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="pwd-box">
				<view class="top-box">
					<view class="title">{{ $t('pages.common.userCenter.yueBao.out.EnterPaymentPassword') }}</view>
					<view class="close" @click="closed">
						<uni-icons type="closeempty" style="color: #C6C6C6;" size="25"></uni-icons>
					</view>
				</view>
				<one-input v-model="pinCode" :maxlength="6" :isPwd="true" @finish="finishedOne" ref="hi" type="xin">
				</one-input>
				<view class="forget" @click="toUrl('/pages/common/userCenter/service/index')">
					{{ $t('pages.common.userCenter.yueBao.out.ForgetPassword') }}
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="err" type="center" :mask-click="false">
			<PopItem @close="close" :msg="msg"></PopItem>
		</uni-popup>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import oneInput from '@/components/myp-one/myp-one'
	import PopItem from "@/components/common/PopItem/PopItem";
	import {
		mapGetters
	} from 'pinia';
	import {
		rollOut
	} from '@/utils/yeb'
	export default {
		components: {
			Header,
			oneInput,
			PopItem
		},
		data() {
			return {
				title: this.$t('pages.common.userCenter.yueBao.out.TransferPrincipal'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				totalAmount: 12,
				money: '',
				pinCode: '',
				msg: '',
				isFocus: false
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(['themeColor']),
			disabled() {
				return !this.money || this.money <= 0
			}
		},
		onLoad(option) {
			this.totalAmount = option.totalAmount
		},
		methods: {
			toUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			closed() {
				this.$refs.popup.close()
			},
			blur(e) {
				if (Number(e.detail.value) > this.totalAmount) {
					setTimeout(() => {
						this.inputAll()
					});
				}
			},
			inputAll() {
				this.money = this.totalAmount
			},
			errPwd() {
				this.$refs.err.open()
			},
			close() {
				this.$refs.err.close()
			},
			async finishedOne() {
				this.$refs.popup.close()
				// @yt 从这里处理清空输入密码 ，下面提交的参数永远是空 移到参数接口赋值完成之后处理
				//this.pinCode = '';
				const res = await rollOut({
					amount: this.money,
					pinCode: this.pinCode
				})
				if (res.code == 200) {
					uni.redirectTo({
						url: '/pages/common/yueBao/success?title=' + this.$t(
							"pages.common.userCenter.yueBao.out.Export")
					})
				} else {
					this.errPwd()
					this.msg = res.message
				}
				this.pinCode = '';
			},
			confrim() {
				this.pinCode = '';
				this.$refs.popup.open()
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
			height: 144rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
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

			.tip {
				font-size: 26rpx;
				color: #404040;
				margin-top: 20rpx;
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

		/deep/ .u-btn--default--disabled {
			background: #A1A1A1;
		}

		.pwd-box {
			height: 270rpx;
			width: 684rpx;
			border-radius: 20rpx;
			background: #FFFFFF;

			.top-box {
				display: flex;
				height: 80rpx;
				margin-bottom: 16rpx;
				position: relative;

				.title {
					width: 100%;
					font-weight: 400;
					font-size: 30rpx;
					line-height: 30rpx;
					text-align: center;
					color: #404040;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.close {
					position: absolute;
					right: 20rpx;
					top: 10rpx;
				}
			}

			.forget {
				margin-top: 22rpx;
				font-weight: 400;
				font-size: 28rpx;
				line-height: 30rpx;
				text-align: center;
				color: var(--theme-color);
			}
		}
	}

	.uni-popup {
		z-index: 999;
	}
</style>
