<template>
	<u-popup v-model="show" mode="center" border-radius="10" :z-index="zIndex" @open="handleOpen" @close="handleClose">
		<view class="confirm-box" :class="['theme-' + themeColor.name]">
			<view class="title">
				{{$t("components.common.alert.alertboxs.AlertSetFundPassword.text1")}}
			</view>
			<view class="notice">
				<view>
					{{$t("components.common.alert.alertboxs.AlertSetFundPassword.text2")}}

				</view>
				<view>
					{{$t("components.common.alert.alertboxs.AlertSetFundPassword.text3")}}

				</view>
			</view>
			<view class="btn-box">
				<view class="btn cancel-btn" @click="close"> {{$t("common.cancel")}}</view>
				<view class="btn confirm-btn" @click="confirm">{{$t("common.ok")}}</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import {mapState} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "Logout",
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
				callback: null,
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ['themeColor']),
		},
		methods: {
			open(data, {
				callback
			}) {
				this.show = true
				this.callback = callback
			},
			close() {
				this.show = false
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
			confirm() {
				this.close()
				uni.navigateTo({
					url: "/pages/common/userCenter/pwd/set_pwd"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.confirm-box {
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
			padding: 0 42rpx;
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
