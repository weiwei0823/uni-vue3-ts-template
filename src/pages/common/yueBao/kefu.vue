<template>
	<view class="yeb-kefu pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }">
		<Header :title="title" isFixed :headerInnerStyle="{borderRadius:0, background: '#BFE0FF'}" />
		<view class="kefu-header">
			<view class="left">
				<view class="title">Hi,{{ userInfo.nickname }}</view>
				<view class="text">{{ $t('pages.common.userCenter.yueBao.kefu.Welcome') }}</view>
			</view>
			<image class="img" src="@/static/img/liuhe/help/roboto 1.png"></image>
		</view>
		<view :enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="content-box">
				<view class="content">
					<view class="title">{{ $t('pages.common.userCenter.yueBao.kefu.FAQ') }}</view>
					<scroll-view scroll-y class="items pc-max-width"
						:style="{height:`calc(${winHeight}px - 88rpx - 500rpx)`}">
						<view class="item" v-for="(item, index) in list" :key="index" @click="detail(item)">
							<view class="text">{{ item.title }}</view>
							<svg style="flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="8" height="14"
								viewBox="0 0 8 14" fill="none">
								<path d="M1.5 1.76562L7 7.26562L1.5 12.7656" stroke="#A1A1A1" stroke-width="2"
									stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</view>
						<view v-if="loading" class="loading">
							<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
							<view :style="pageLoadingConfig['text_style']">
								{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
							</view>
						</view>
						<empty style="height: 100%;" v-else-if="!list.length"></empty>
					</scroll-view>
				</view>
			</view>
		</view>
		<u-button class="btn" @click="goToUrl('/pages/common/userCenter/service/index')">{{
			$t('pages.common.userCenter.yueBao.kefu.Contact') }}</u-button>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import Empty from '@/components/common/empty/empty'
	import {
		helps
	} from "@/utils/lottery/help";
	import defaultTemplate from "@/utils/defaultTemplate";
  import useAppInfoStore from "@/store/modules/appInfoStore";

	export default {
		components: {
			Header,
			Empty
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.yueBao.kefu.ServiceCenter'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				list: [],
				userInfo: {},
				winHeight: 0,
				loading: false,
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad() {
			this.getList()
			this.userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
		},
		methods: {
			getList() {
				this.loading = true
				helps('6').then(res => {
					if (res.code == 200) {
						const list = defaultTemplate([{
							id: '',
							title: '',
						}], res.result)
						this.list = list
						this.loading = false
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			detail(item) {
				let url = '/pages/liuhe/help/detail?id=' + item.id
				uni.navigateTo({
					url: url
				})
			},
			goToUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.yeb-kefu {
		height: var(--vh);
		background: var(--theme-auxiliary-color-default);

		::v-deep .header {
			background: #BFE0FF;
			border-radius: 0;
		}

		.kefu-header {
			background: linear-gradient(180deg, #BFE0FF 0%, rgba(191, 224, 255, 0.00) 100%);
			height: 214rpx;
			padding: 0 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: -4rpx;

			.left {

				.title {
					font-size: 30rpx;
					color: #404040;
				}

				.text {
					font-size: 28rpx;
					color: #404040;
					margin-top: 10rpx;
				}
			}

			.img {
				width: 160rpx;
				height: 214rpx;
				flex-shrink: 0;
			}
		}

		.content-box {
			.loading {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				image {
					width: 100rpx;
					height: 100rpx;
				}
			}

			.content {
				background: #FFFFFF;
				margin-top: 20rpx;
				border-radius: 24rpx;

				.title {
					font-size: 34rpx;
					color: #404040;
					padding: 20rpx 28rpx;
					height: 88rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;

					&::before {
						content: '';
						width: 6rpx;
						height: 24rpx;
						background: var(--theme-color);
						border-radius: 6rpx;
						margin-right: 20rpx;
					}
				}

				.items {

					.item {
						padding: 20rpx 28rpx;
						height: 96rpx;
						box-sizing: border-box;
						border-top: 1px solid var(--theme-auxiliary-color-default);
						font-size: 30rpx;
						color: #404040;
						display: flex;
						align-items: center;
						justify-content: space-between;
						overflow: hidden;

						.text {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}

		.btn {
			display: grid;
			place-content: center;
			width: 694rpx;
			height: 88rpx;
			border-radius: 16rpx;
			background: var(--theme-color);
			color: #FFF;
			font-size: 34rpx;
			margin-top: 60rpx;
		}
	}
</style>
