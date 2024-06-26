<template>
	<view class="kf-box" :style="{ marginTop: safeHeight }">
		<nav-bar :title="$t('pages.service.kefu')" is-back></nav-bar>
		<view class="kf-box-body">
			<view class="tips">
				<view class="img">
					<image style="width: 100%;height: 100%;" src="/static/img/kefu.png"></image>
				</view>
				<view class="text">
					<view class="pro">
						{{$t("pages.common.userCenter.service.luntan.text1")}}
					</view>
					<view class="time">
						{{$t("pages.common.userCenter.service.luntan.text2")}}
					</view>
				</view>
			</view>
			<view class="menus">
				<button v-for="(item, index) in qqList"
					style="background: #fff;font-size: 30rpx;width: 100%;height: 88rpx;line-height: 88rpx;display: flex; align-items: center; justify-content: center;"
					type="success" @click="handleQq">
					<image style="height: 40rpx;width: 40rpx;margin-right: 10rpx;" src="/static/img/qq.png"></image>
					{{$t("pages.common.userCenter.service.luntan.text3")}}{{ index + 1 }}
				</button>
				<uni-link :href="serviceUrl" :text="$t('pages.common.userCenter.service.luntan.text4')"
					showUnderLine="false" color="#fff"><button
						style="background: var(--theme-color);color: #fff;font-size: 30rpx;width: 100%;height: 88rpx;line-height: 88rpx;;display: flex; align-items: center; justify-content: center;"
						type="default" @click="handleZx">
						<image style="height: 40rpx;width: 40rpx;margin-right: 10rpx;" src="/static/img/kf.png"></image>
						{{$t("pages.common.userCenter.service.luntan.text4")}}
					</button></uni-link>

			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar.vue";
	import {
		aboutUs
	} from "@/utils/user";
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				qqList: [],
				serviceUrl: ""
			}
		},
		mounted() {
			this.getUrl()

			uni.$emit("on_page_mounted", this)

		},

		methods: {
			async getUrl() {
				const res = await aboutUs()
				const data = res.result.constants?.find(item => item.type === '1')
				if (data) {
					this.serviceUrl = data.url;
					this.qqList = data.qqList;
				}
			},
			handleQq() {
				console.log('点击QQ客服按钮');
			},
			handleZx() {
				console.log('点击在线客服按钮');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.kf-box-body {
		width: 100%;
		height: calc(100% - 58px);
		position: absolute;
		display: flex;
		flex-direction: column;
		background: #fff;

		&::before {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			content: " ";
			pointer-events: none;
			top: 0;
			left: 0;
			border-top: 1px solid #ebedf0;
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
		}

		&>.tips {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 26rpx 26rpx 80rpx 26rpx;
			height: 360rpx;
			position: relative;
			box-sizing: border-box;

			&>.img {
				width: 33.3333%;
				display: flex;
				height: 100%;
			}

			&>.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 100%;

				&>.pro {
					padding: 40rpx 0 20rpx 0;
					font-size: 60rpx;
					font-weight: 500;
					color: #000;
					line-height: 84rpx;
				}

				&>.time {
					font-size: 36rpx;
					color: #888;
					line-height: 50rpx;
				}
			}
		}

		&>.menus {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 52rpx 0;
			padding: 56rpx;
			box-sizing: border-box;
		}
	}
</style>