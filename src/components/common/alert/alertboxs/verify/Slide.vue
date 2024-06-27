<template>
	<view class="slide" :class="{ fail: verifyState.fail }">
		<view class="title">{{ $t("components.common.alert.alertboxs.verify.Slide.text1") }}</view>
		<view class="tc" ref="tc"></view>
	</view>
</template>
<script>
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
      TCaptcha: "https://ssl.captcha.qq.com/TCaptcha.js"
		}
	},
  created() {
    this.createdScript(this.TCaptcha).then(() => {
      this.captcha = new TencentCaptcha(this.$refs.tc.$el, '192136639', (res) => {
        res.ret === 0 && this.$emit('success', res)
      }, { needFeedBack: false, type: 'embed',fwidth:"100px" });
      this.captcha.show();
    })
  },
	methods: {
		loadData() {
			this.captcha.refresh();
		},
    createdScript(url) {
      return new Promise((resolve, reject) => {
        // 创建script标签，引入外部文件
        let script = document.createElement('script')
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
        // 引入成功
        script.onload = function () {
          console.log('js资源已加载成功了');
          resolve();
        }
        // 引入失败
        script.onerror = function () {
          console.log('js资源加载失败了');
          reject();
        }
      });
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

	::v-deep #tcaptcha_transform_dy{
		width: 100% !important;
		height: 100% !important;
	}
}
</style>
