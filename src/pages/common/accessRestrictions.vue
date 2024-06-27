<template>
	<view class="access-restrictions" :class="['theme-' + themeColor.name]">
		<image class="header" mode="widthFix" src="@/static/img/common/accessRestrictions/header.png" />
		<view class="item">
			<view class="title">访问限制</view>
			<view class="en-title">ACCESS RESTRICTED</view>
		</view>
		<view class="item ip-host">
			<view class="ip">IP: {{ ip }}</view>
			<view class="host">Host: {{ host }}</view>
		</view>
		<view class="item text">尊敬的用户，根据我们使用条款和当地法规，当前功能在您所属的地区不可用。</view>
		<view class="btn">
			<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M22.5 18.9667V12.9667C22.5 7.44383 18.0228 2.96667 12.5 2.96667C6.97715 2.96667 2.5 7.44383 2.5 12.9667V18.9667H0.5V12.9667C0.5 6.33926 5.87258 0.966675 12.5 0.966675C19.1274 0.966675 24.5 6.33926 24.5 12.9667V18.9667H22.5Z"
					fill="white" />
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M12.5 5.96664C12.5 6.51892 12.9511 6.9579 13.4958 7.0489C16.3356 7.52325 18.5 9.99218 18.5 12.9666C18.5 13.5189 18.9477 13.9666 19.5 13.9666C20.0523 13.9666 20.5 13.5189 20.5 12.9666C20.5 8.88634 17.4453 5.5195 13.498 5.02828C12.95 4.96008 12.5 5.41435 12.5 5.96664Z"
					fill="white" />
				<rect x="1.5" y="16.9667" width="6" height="7" rx="1" stroke="white" stroke-width="2" />
				<rect x="17.4961" y="16.9667" width="6" height="7" rx="1" stroke="white" stroke-width="2" />
			</svg>
			<view class="text" @click="kefu">联系客服</view>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		data() {
			return {
				ip: ''
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			host() {
				return location.host
			}
		},
		mounted() {

			uni.$emit("on_page_mounted", this)

			uni.request({
				url: 'https://ipapi.co/json/',
				method: 'POST',
				success: (res) => {
					this.ip = res.data?.ip || ''
				}
			})
		},
		methods: {
			kefu() {
				uni.navigateTo({
					url: '/pages/common/userCenter/service/index'
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.access-restrictions {
		display: flex;
		flex-direction: column;
		padding: 262rpx 75rpx 0;
		height: 100vh;
		background: #ffffff;

		.header {
			width: 600rpx;
		}

		.item {
			margin-top: 20rpx;
			text-align: center;

			.title {
				color: #404040;
				font-size: 48rpx;
				font-weight: 600;
			}

			.en-title {
				color: #A1A1A1;
				font-size: 30rpx;
			}
		}

		.ip-host {
			color: var(--theme-color);
			font-size: 30rpx;
		}

		.text {
			color: #A1A1A1;
			font-size: 30rpx;
			padding: 0 20rpx;
		}

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			background: var(--theme-color);
			border-radius: 16rpx;
			margin-top: 40rpx;
			height: 88rpx;

			.text {
				margin-left: 20rpx;
				color: #fff;
				font-size: 34rpx;
			}
		}
	}
</style>
