<template>
	<view class="help" :style="{ marginTop: safeHeight, height:`${uWindowHeight}px`,position: `fixed` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<scroll-view scroll-y="true" class="content" :enhanced="true" :bounces="false" :show-scrollbar="false"
			:style="{height:`calc(${uWindowHeight}px - 88rpx - ${126}rpx - var(--safe-area-inset-bottom))`, width:'100vw'}">
			<view class="detail">
				<view class="title-t" :style="{ '--theme-color': themeColor.themeColor }">
					{{ $t('pages.liuhe.help.index.faq') }}
				</view>
				<view class="item" v-for="(item, index) in hotQuestions" @click="detail(item)">
					<view class="slot-text">{{ item.title }}</view>
					<view class="icon-box">
						<uni-icons type="right" color="#A1A1A1" style="font-size: 40rpx"></uni-icons>
					</view>
				</view>

			</view>
			<view class="detail">
				<view class="title-t" :style="{ '--theme-color': themeColor.themeColor }">
					{{ $t('pages.liuhe.help.index.problemCategories') }}
				</view>
				<view class="item" v-for="(item, index) in questionCategories" @click="list(item, false)">
					<view class="slot-text">{{ item.name }}</view>
					<view class="icon-box">
						<uni-icons type="right" color="#A1A1A1" style="font-size: 40rpx"></uni-icons>
					</view>
				</view>
			</view>
			<view class="" style="height:20rpx;width:100%;">

			</view>
		</scroll-view>

		<view class="footer-box ">
			<view class="footer pc-max-width">
				<view class="ts" :style="{ 'borderColor': themeColor.themeColor }"
					@click="toUrl('/pages/common/userCenter/feedback/index')">
					<!-- <image src="@/static/img/liuhe/help/ts_n.png"></image> -->
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M19.5 2H5.5C4.39543 2 3.5 2.89543 3.5 4V20C3.5 21.1046 4.39543 22 5.5 22H7.5C8.05228 22 8.5 22.4477 8.5 23C8.5 23.5523 8.05228 24 7.5 24H5.5C3.29086 24 1.5 22.2091 1.5 20V4C1.5 1.79086 3.29086 0 5.5 0H19.5C21.7091 0 23.5 1.79086 23.5 4V7C23.5 7.55228 23.0523 8 22.5 8C21.9477 8 21.5 7.55228 21.5 7V4C21.5 2.89543 20.6046 2 19.5 2ZM5.5 6C4.94772 6 4.5 6.44772 4.5 7C4.5 7.55228 4.94772 8 5.5 8H9.5C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6H5.5ZM5.5 16C4.94772 16 4.5 16.4477 4.5 17C4.5 17.5523 4.94772 18 5.5 18H9.5C10.0523 18 10.5 17.5523 10.5 17C10.5 16.4477 10.0523 16 9.5 16H5.5ZM4.5 12C4.5 11.4477 4.94772 11 5.5 11H8C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13H5.5C4.94772 13 4.5 12.5523 4.5 12ZM23.5 10C23.5 10.5523 23.0523 11 22.5 11C21.9477 11 21.5 10.5523 21.5 10C21.5 9.44771 21.9477 9 22.5 9C23.0523 9 23.5 9.44771 23.5 10ZM24.4999 18C24.4999 21.3137 21.8136 24 18.4999 24C15.1862 24 12.4999 21.3137 12.4999 18C12.4999 14.6863 15.1862 12 18.4999 12C21.8136 12 24.4999 14.6863 24.4999 18ZM16.7499 16.191C16.9166 16.2118 17.0103 16.2847 17.0312 16.4097V14.6285C17.052 14.3993 17.2083 14.2743 17.4999 14.2535C17.7708 14.2743 17.9166 14.3993 17.9374 14.6285V15.4097C18.2499 15.2014 18.5728 14.9306 18.9062 14.5972C19.1353 14.3472 19.3124 14.2326 19.4374 14.2535C19.6874 14.2535 19.8333 14.3576 19.8749 14.566H21.4999C21.9374 14.566 22.1353 14.7535 22.0937 15.1285C21.9478 16.7535 20.9791 17.6806 19.1874 17.9097L19.1562 18.2847H21.7812C22.0312 18.3056 22.1666 18.4618 22.1874 18.7535C22.1666 19.0451 22.0312 19.2014 21.7812 19.2222H19.3749C19.7708 19.7847 20.4895 20.2326 21.5312 20.566C21.552 20.566 21.5937 20.5764 21.6562 20.5972C21.9687 20.6806 22.1353 20.7639 22.1562 20.8472C22.2603 21.2431 22.1145 21.4722 21.7187 21.5347C20.4687 21.3264 19.427 20.7326 18.5937 19.7535C17.9062 20.6493 16.8853 21.2326 15.5312 21.5035C15.2187 21.5451 15.0208 21.441 14.9374 21.191C14.8958 20.8993 15.0103 20.7222 15.2812 20.6597C15.302 20.6597 15.3541 20.6493 15.4374 20.6285C16.5624 20.3576 17.3749 19.8889 17.8749 19.2222H15.3749C15.1249 19.2014 14.9895 19.0451 14.9687 18.7535C14.9895 18.4618 15.1249 18.3056 15.3749 18.2847H18.1874C18.2291 18.1389 18.2499 17.9722 18.2499 17.7847C18.0416 17.5139 18.1041 17.2951 18.4374 17.1285C18.4999 17.1076 18.6145 17.0868 18.7812 17.066C19.177 17.0243 19.4999 16.9618 19.7499 16.8785C19.5624 16.941 19.3853 16.8993 19.2187 16.7535C19.0312 16.566 18.8958 16.4097 18.8124 16.2847C18.7083 16.1181 18.7083 15.9722 18.8124 15.8472C18.3541 16.1597 18.0624 16.1806 17.9374 15.9097V17.5347C17.9166 17.7639 17.7708 17.8889 17.4999 17.9097C17.2083 17.8889 17.052 17.7639 17.0312 17.5347V16.8785C16.5312 17.2535 16.0312 17.5243 15.5312 17.691C15.2395 17.7743 15.0416 17.7014 14.9374 17.4722C14.8541 17.2222 14.9478 17.0347 15.2187 16.9097C15.5103 16.8056 15.8437 16.6389 16.2187 16.4097C16.4687 16.2639 16.6458 16.191 16.7499 16.191ZM21.0312 15.566C21.0312 15.5035 20.9999 15.4722 20.9374 15.4722H19.3124L18.9687 15.7222C19.1145 15.6181 19.2916 15.6597 19.4999 15.8472L19.6249 15.9722C19.7708 16.0972 19.8749 16.2118 19.9374 16.316C20.0833 16.5243 20.0624 16.7014 19.8749 16.8472C20.5624 16.5556 20.9478 16.1285 21.0312 15.566ZM16.1562 15.9722C16.1145 15.9306 16.0416 15.8785 15.9374 15.816C15.6458 15.6076 15.3853 15.4306 15.1562 15.2847C14.9478 15.1389 14.9166 14.9514 15.0624 14.7222C15.2083 14.5139 15.4062 14.4618 15.6562 14.566C16.052 14.7535 16.3749 14.9826 16.6249 15.2535C16.8124 15.4618 16.8437 15.6597 16.7187 15.8472C16.552 16.0556 16.3645 16.0972 16.1562 15.9722Z"
							:fill="themeColor.themeColor" />
					</svg>
					<!-- <filterIcon src="@/static/img/liuhe/help/ts_n.png" :width="48" :height="48" /> -->
					<text class="text">{{ $t('pages.liuhe.help.index.rewardFeedback') }}</text>
				</view>
				<view class="kf"
					:style="{ 'background-color': themeColor.themeColor, 'borderColor': themeColor.themeColor }"
					@click="toUrl('/pages/common/userCenter/service/index')">
					<image src="@/static/img/liuhe/help/kf_n.png"></image>
					<text class="text">{{ $t('pages.liuhe.help.index.contactCustomerService') }}</text>
				</view>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		helps
	} from "@/utils/lottery/help";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Header from '@/components/common/header/index.vue';
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			Header
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.liuhe.help.index.faq'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				hotQuestions: [],
				questionCategories: [],
				winHeight: 0,
				isApp: false
			}
		},
		onLoad(option) {

			this.getList()
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			uni.onWindowResize(() => {

				this.winHeight = uni.getSystemInfoSync().windowHeight;
			})
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		},
		methods: {
			toUrl(url) {
				this.isLogin = global.isLogin()
				if (!this.isLogin) {
					uni.navigateTo({
						url: "/pages/common/login"
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}
			},
			getList() {
				helps().then(res => {
					if (res.code == 200) {
						this.hotQuestions = res.result.hotQuestions
						this.questionCategories = res.result.questionCategories.filter((item) => item.status === 1)
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// list(item) {

			// },
			detail(item) {
				let url = './detail?id=' + item.id
				uni.navigateTo({
					url: url
				})
			},
			list(item, bool) {
				let url =
					`./list?id=${item.id}&title=${bool ? this.$t('pages.liuhe.help.index.rulesExplanation') : (item.title || item.name)}`
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// height: 0;
		// flex: 1;
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		// overflow: hidden;
		// padding-bottom: 132rpx;
		max-width: 480px;
    //overflow: hidden;
	}

	.help {
		background: #F3F3F3;
		height: var(--vh);

		position: relative;
		display: flex;
		flex-direction: column;

		.focus {
			border: 1px solid var(--theme-color);
		}

		// .box-div {
		// 	.title {
		// 		padding: 14rpx 20rpx;
		// 		font-weight: 400;
		// 		font-size: 24rpx;
		// 		color: #444444;
		// 	}

		// 	.list-row {
		// 		.list-item {
		// 			height: 110rpx;
		// 			background: #fff;
		// 			display: flex;
		// 			justify-content: space-between;
		// 			align-items: center;
		// 			padding: 0 35rpx 0 40rpx;
		// 			border-bottom: 1px solid #DDDDDD;

		// 			.slot-text {
		// 				font-weight: 300;
		// 				font-size: 32rpx;
		// 				color: #404040;
		// 				white-space: nowrap;
		// 				overflow: hidden;
		// 				text-overflow: ellipsis;
		// 			}
		// 		}
		// 	}
		// }
		.title-t {
			font-weight: 500;
			font-size: 34rpx;
			color: #404040;
			display: flex;
			align-items: center;
			padding: 20rpx 28rpx;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);

			&::before {
				content: '';
				width: 6rpx;
				height: 24rpx;
				border-radius: 6rpx;
				background: var(--theme-color);
				display: block;
				margin-right: 20rpx;

			}
		}

		.detail {
			background: #FFFFFF;
			margin-top: 20rpx;
			box-sizing: border-box;
			border-radius: 24rpx;
			width: 100%;

			&:first-child {
				margin-top: 0;
			}

			.item {
				display: flex;
				justify-content: space-between;
				font-weight: 400;
				font-size: 30rpx;
				color: #6F737B;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);
				margin: 0 28rpx;
				height: 96rpx;
				align-items: center;
				// width: 100%;
				width: calc(100% - 40rpx);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				.slot-text {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.item:last-child {
				border: none;
			}
		}

		.footer-box {
			width: 100vw;

			.footer {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				position: fixed;
				bottom: 0rpx;
				width: 100%;
				background: #FFFFFF;
				padding: 20rpx 0;
				padding-bottom: calc(var(--safe-area-inset-bottom) + 20rpx ) ;

				.ts {
					border: 1px solid var(--theme-color);
					margin-left: 28rpx;

					.text {
						color: #404040;
					}
				}

				.kf {
					background-color: var(--theme-color);
					border: 1px solid var(--theme-color);
					margin-right: 28rpx;

					.text {
						color: #fff;
					}
				}

				.ts,
				.kf {
					display: flex;
					width: 338rpx;
					height: 88rpx;
					justify-content: center;
					align-items: center;
					border-radius: 16rpx;

					image {
						height: 48rpx;
						width: 48rpx;
						// margin-left: 10rpx;
					}

					.text {
						font-weight: 500;
						font-size: 28rpx;

						margin-left: 20rpx;


					}
				}


			}
		}
	}
</style>
