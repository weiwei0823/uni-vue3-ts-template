<template>
	<view class="slide" :class="{ fail: verifyState.fail }">
		<view class="title">{{ $t("components.common.alert.alertboxs.verify.Slide.text1") }}</view>
		<view class="tc" ref="tc"></view>
	</view>
</template>
<script>
import '@/static/js/Tcaptcha.min';

export default {
	data() {
		return {
			captcha: null,
			verifyState: {
				show: false,
				success: false,
				fail: false,
				status: ''
			},
		}
	},
	mounted() {
		this.captcha = new TencentCaptcha(this.$refs.tc.$el, '192136639', (res) => {
			res.ret === 0 && this.$emit('success', res)
		}, { needFeedBack: false, type: 'embed',fwidth:"100px" });
		this.captcha.show();
	},
	methods: {
		loadData() {
			this.captcha.refresh();
		},
	},
	beforeDestroy() {
		this.captcha.destroy();
	},
}
</script>

<style lang="scss" scoped>
.slide {
	.title {
		color: #444;
		text-align: center;
		font-size: 34rpx;
		margin-bottom: 40rpx;
	}

	.tc {
		transform: scale(1.05);
		display: flex;
		justify-content: center;
		height: 480rpx;
	}

	/deep/ #tcaptcha_transform_dy{
		width: 100% !important;
		height: 100% !important;
	}
}
</style>
