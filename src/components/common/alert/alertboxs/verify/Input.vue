<template>
	<view class="input">
		<view class="title">
			{{ $t("components.common.alert.alertboxs.verify.Input.text1") }}
		</view>
		<image class="loading" src="@/static/img/loading_v1.gif" mode="heightFix" v-if="loading"></image>
		<image class="img" :src="imgUrl" v-else></image>
		<input class="code" v-model="code" :placeholder="$t('components.common.alert.alertboxs.verify.Input.text2')" />
		<u-button class="btn" @click="confirm">
			{{ $t("components.common.alert.alertboxs.verify.Input.text3") }}
		</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getMkCode,
		checkMkCode
	} from "@/utils/common/index.js";

	export default {
		props: {
			getCodeKey: String,
		},
		data() {
			return {
				verifyCode: "BZa4",
				code: "",
				loading: false,
				imgUrl: "@/static/img/loading_v1.gif",
			};
		},
		mounted() {
			this.getCode();
		},
		methods: {
			loadData() {
				this.getCode();
			},
			async confirm() {
				const res = await checkMkCode({
					type: 1,
					code: this.code
				})
				if (!res.result) {
					this.$refs.uToast.show({
						title: '验证码错误，请重新输入',
						'z-index': 99999,
					})
					return;
				}
				this.$emit("success", {
					code: 0,
					message: "",
					success: false,
					data: this.code,
				});
			},
			//获取验证码
			async getCode() {
				this.loading = true;
				const res = await getMkCode();
				if (res.code !== 200) {
					pop(res.message, 2000);
					return;
				}
				this.imgUrl = res.result.img;
				this.loading = false
			},
		},
	};
</script>
<style>
	.u-toast {
		font-size: 24rpx !important;
	}
</style>
<style lang="scss" scoped>
	.input {
		display: flex;
		flex-direction: column;
		// gap: 30rpx;
		align-items: center;

		.title {
			color: #444;
			text-align: center;
			font-size: 34rpx;
			margin-bottom: 40rpx;
		}

		.loading {
			height: 100rpx;
			padding: 50rpx 0;
			margin: 0 auto;
		}

		.img {
			width: 540rpx;
			height: 200rpx;
		}

		.code {
			width: 100%;
			height: 86rpx;
			display: flex;
			border-radius: 12rpx;
			border: 1rpx solid var(--theme-auxiliary-color-default);
			text-align: center;
			color: #000;
			font-size: 34rpx;
			background: #f3f3f3;
			caret-color: var(--theme-color);
			margin-top: 40rpx;
		}

		.btn {
			width: 100%;
			height: 86rpx;
			background: var(--theme-color);
			color: #fff;
			margin-top: 40rpx;
		}
	}
</style>
