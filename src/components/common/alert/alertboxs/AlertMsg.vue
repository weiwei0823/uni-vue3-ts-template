<template>
	<u-popup v-model="show" mode="center" border-radius="24" :z-index="zIndex" @open="handleOpen" @close="handleClose">
		<view class="pop-box" :class="['theme-' + themeColor.name]">
			<view class="notice">{{ data.title }}</view>
			<view class="top">
				<text v-html="data.content" style="white-space: pre-wrap;"></text>
			</view>
			<view class="btn-box" :class="{ grid1: data.hideClose || data.hideConfirm }">
				<view class="btn forget" :style="data.closeTextStyle" @click="close" v-if="!data.hideClose">
					{{ data.closeText || '取消' }}
				</view>
				<view class="btn retry" :style="data.confirmTextStyle" @click="confirm" v-if="!data.hideConfirm">
					{{ data.confirmText || '确认' }}
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "Betting",
		props: {
			zIndex: {
				type: [Number, String],
				default: () => {
					return 10075
				}
			}
		},
		data() {
			return {
				show: false,
				args: {},
				data: {
					title: this.$t("pages.liuhe.common.text14"),
					content: '您还没有登录账号，<br/>是否立即<text style="color:var(--theme-color)">前往登录？</text>'
				},
			}
		},
		computed: {
			...mapGetters(['themeColor']),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
		},
		methods: {
			open(data, args) {
				this.show = true
				if (data) {
					this.data = data
				}
				this.args = args
				this.callback = args.callback
			},
			handleOpen() {
				this.$emit('open')
				this.callback && this.callback({
					type: 'open'
				})
			},
			handleClose() {
				this.$emit('close')
				this.callback && this.callback({
					type: 'close'
				})
			},
			async confirm() {
				this.$emit('confirm')
				if (this.args?.confirm) {
					await this.args.confirm()
				}
				this.show = false
			},
			async close() {
				if (this.args?.close) {
					await this.args.close()
				}
				this.show = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pop-box {
		width: 600rpx;
		height: 340rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.notice {
			height: 108rpx;
			font-size: 34rpx;
			text-align: center;
			color: #4d4d4d;
			display: grid;
			place-items: center;
			font-weight: 600;
		}

		.top {
			flex: 1;
			display: grid;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: #a1a1a1;
			line-height: 56rpx;
			padding: 0 42rpx;
			text-align: center;
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

			.forget {
				color: #a1a1a1;
			}

			.retry {
				color: var(--theme-color);
			}
		}

		.grid1 {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
