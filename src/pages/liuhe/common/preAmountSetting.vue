<template>
	<uni-popup ref="popup" type="bottom" :class="['theme-' + themeColor.name]">
		<view class="msg-box">
			<view class="header">
				<view class="cancel" @click="close">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M1.0649 13.7929C0.674377 14.1834 0.674376 14.8166 1.0649 15.2071C1.45543 15.5976 2.08859 15.5976 2.47911 15.2071L7.85795 9.82825L13.3788 15.3491C13.7694 15.7397 14.4025 15.7397 14.793 15.3491C15.1836 14.9586 15.1836 14.3254 14.793 13.9349L9.27216 8.41403L15.207 2.47916C15.5976 2.08863 15.5976 1.45547 15.207 1.06494C14.8165 0.674421 14.1833 0.674421 13.7928 1.06495L7.85795 6.99982L2.06513 1.207C1.6746 0.816474 1.04144 0.816473 0.650912 1.207C0.260388 1.59752 0.260388 2.23069 0.650912 2.62121L6.44373 8.41403L1.0649 13.7929Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<view class="title">
					{{ $t('pages.liuhe.common.buy.Default') }}
				</view>
				<view class="submit" @click="setValue" :style="setStyle()">
					{{ $t('pages.liuhe.common.buy.ConfirmChanges') }}
				</view>
			</view>
			<view class="content">
				<uni-forms ref="baseForm" :modelValue="baseFormData">
					<uni-forms-item required :label-width="90">
						<view slot="label" class="pre-amount">{{ $t('pages.liuhe.common.buy.defaultAmount') }}1</view>
						<uni-easyinput maxlength="6" type="number" v-model="baseFormData.amount1" :clearable="false"
							:styles="setImputStyle()" :placeholder="$t('pages.liuhe.common.buy.defaultAmount')" />
					</uni-forms-item>
					<uni-forms-item required :label-width="90">
						<view slot="label" class="pre-amount">{{ $t('pages.liuhe.common.buy.defaultAmount') }}2</view>
						<uni-easyinput maxlength="6" :clearable="false" type="number" v-model="baseFormData.amount2"
							:placeholder="$t('pages.liuhe.common.buy.defaultAmount')" />
					</uni-forms-item>
					<uni-forms-item required :label-width="90">
						<view slot="label" class="pre-amount">{{ $t('pages.liuhe.common.buy.defaultAmount') }}3</view>
						<uni-easyinput maxlength="6" :clearable="false" type="number" v-model="baseFormData.amount3"
							:placeholder="$t('pages.liuhe.common.buy.defaultAmount')" />
					</uni-forms-item>
					<uni-forms-item required :label-width="90">
						<view slot="label" class="pre-amount">{{ $t('pages.liuhe.common.buy.defaultAmount') }}4</view>
						<uni-easyinput maxlength="6" :clearable="false" type="number" v-model="baseFormData.amount4"
							:placeholder="$t('pages.liuhe.common.buy.defaultAmount')" />
					</uni-forms-item>
					<uni-forms-item :label-width="90">
						<view slot="label" class="pre-amount">{{ $t('pages.liuhe.common.buy.defaultAmount') }}5</view>
						<uni-easyinput maxlength="6" :clearable="false" type="number" v-model="baseFormData.amount5"
							:placeholder="$t('pages.liuhe.common.buy.defaultAmount')" />
					</uni-forms-item>
					<view class="dividing-line"></view>
					<uni-forms-item :label-width="90">
						<view slot="label" class="pre-amount">{{ $t('pages.liuhe.common.buy.DefaultMultiple') }}1</view>
						<uni-easyinput maxlength="2" :clearable="false" type="number" v-model="baseFormData.multiple1"
							:placeholder="$t('pages.liuhe.common.buy.DefaultMultiple')" />
					</uni-forms-item>
					<uni-forms-item :label-width="90">
						<view slot="label" class="pre-amount">{{ $t('pages.liuhe.common.buy.DefaultMultiple') }}2</view>
						<uni-easyinput maxlength="2" :clearable="false" type="number" v-model="baseFormData.multiple2"
							:placeholder="$t('pages.liuhe.common.buy.DefaultMultiple')" />
					</uni-forms-item>

				</uni-forms>
			</view>
		</view>
	</uni-popup>

</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					amount1: 5,
					amount2: 10,
					amount3: 50,
					amount4: 100,
					amount5: 500,
					multiple1: 2,
					multiple2: 3
				},
			}
		},
		computed: {
			...mapGetters(['orderList', "themeColor"]),
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			setStyle() {
				return {
					color: this.themeColor.themeColor
				}
			},
			setImputStyle() {
				return {
					backgroundColor: this.themeColor.themeAuxiliaryColorDefault
				}
			},
			close() {
				this.$refs.popup.close()
			},
			setValue() {
				this.$emit("setValue", [this.baseFormData.amount1, this.baseFormData.amount2, this.baseFormData.amount3,
					this
					.baseFormData.amount4, this.baseFormData.amount5,
				])
				this.close()
			},
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .content-box{
		width: 100% !important;
	}
	::v-deep .uni-popup .content-box {
		background-color: transparent !important;
		z-index: 10;
		border-radius: 40rpx 40rpx 0 0 !important;

		.uni-popup__wrapper {
			border-radius: 40rpx 40rpx 0 0 !important;
		}
	}

	::v-deep .msg-box .uni-easyinput .uni-easyinput__content {
		border: none;
		background-color: var(--theme-auxiliary-color-default) !important;
		border-radius: 16rpx;
		height: 80rpx;
		width: 536rpx;
		text-align: center;

	}

	::v-deep .msg-box .uni-easyinput .uni-easyinput__content .uni-input-input {
		color: #404040;
		font-weight: 500;
		font-size: 34rpx;
	}

	.msg-box {
		// background: #FFFFFF;
		width: 100%;
		//height: 464rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		border-radius: 40rpx 40rpx 0px 0px;

		.header {
			width: 100%;
			height: 88rpx;
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			border-radius: 40rpx 40rpx 0 0;
			background: var(--theme-auxiliary-color-default);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.cancel {
				flex: 1;
			}

			.title {
				flex: 1;
				color: #404040;
				text-align: center;

				font-size: 34rpx;
				font-weight: 500;
			}

			.submit {
				flex: 1;
				text-align: center;

				font-size: 30rpx;
				font-weight: 400;
				text-align: right;
			}
		}

		.content {
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			font-size: 29rpx;
			line-height: 41rpx;
			letter-spacing: -0.01em;
			color: #404040;
			flex: none;
			order: 0;
			flex-grow: 0;
			text-align: left;
			background-color: #fff;

			.pre-amount {
				color: #404040;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 20rpx;
			}

			.dividing-line {
				background-color: #E6E6E6;
				height: 2rpx;
				margin: 30rpx 0 30rpx 0;
				display: none;
			}
		}

		.footer {
			height: 60rpx;

			.btn-group {
				display: flex;
				justify-content: center;
				align-items: center;

				.btn-group-btn {
					width: 200rpx;
					height: 60rpx;
					border-radius: 264rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 60rpx;
					font-size: 26rpx;
					letter-spacing: -1rpx;
				}

				.cancel {
					background: #8CB2C9;
				}

				.confirm {
					background: #FF9900;
				}
			}

		}
	}
</style>
