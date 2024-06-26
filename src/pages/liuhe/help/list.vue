<template>
	<view class="help" :style="{ marginTop: safeHeight, height:`calc(${uWindowHeight}px)`}"
		:class="['theme-' + themeColor.name]">
		<!-- <NavBar :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor"
			:font-color="fontColor" :title-style="titleStyle">
		</NavBar> -->
		<Header :title="title" isFixed />
		<view v-if="loading" class=""
			style="background-color:#fff;display:flex;align-items: center; justify-content:center;color:#D8D8D8;margin-top:20rpx;">

			<image src="@/static/img/loading_v1.gif" :style="{ width: '100rpx', height: '100rpx',marginRight:'10rpx',}">
			</image> 加载中...
		</view>

		<scroll-view
			:style="{marginTop:`${!loading&&!isApp?20:0}rpx`, backgroundColor:'#fff',maxHeight:`calc(${uWindowHeight}px - ${isApp?0:88}rpx)`}"
			scroll-y="true" class="content" :enhanced="true" :bounces="false" :show-scrollbar="false">
			<Empty v-if="!list.length && !loading" />
			<view class="box-div" v-else>
				<view class="list-row">
					<view class="list-item" v-for="(item, index) in list" @click="detail(item)">
						<view class="slot-text">{{ item.title }}</view>
						<view class="icon-box">
							<uni-icons type="right" color="#C7C7CC" style="font-size: 40rpx"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="footer-box" v-if="title !== $t('pages.liuhe.help.index.rulesExplanation') && showFootMenu
			">
			<view class="footer">
				<view class="ts" @click="toUrl('/pages/common/userCenter/feedback/index')">
					<image src="/static/img/liuhe/help/ts.png"></image>
					<text class="text">有奖反馈</text>
				</view>
				<view class="kf" @click="toUrl('/pages/common/userCenter/service/index')">
					<image src="/static/img/liuhe/help/kf.png"></image>
					<text class="text">联系客服</text>
				</view>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		helps
	} from "@/utils/lottery/help";
	import Empty from "@/components/common/empty/empty";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import Header from "@/components/common/header/index.vue";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			Empty,
			NavBar,
			Header,
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(
					this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO
				).safeArea.top + "px",
				id: "",
				title: "帮助中心",
				headerStyle: {
					backgroundColor: "#1794FF",
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF",
				},
				list: [],
				loading: false,
				isApp: false
			};
		},
		mounted() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		onLoad(option) {
			this.id = option.id;
			this.title = option.title;
			this.showFootMenu = !!option.showMenu;
			this.getList();
		},
		methods: {
			toUrl(url) {
				this.isLogin = global.isLogin();
				if (!this.isLogin) {
					uni.navigateTo({
						url: "/pages/common/login",
					});
				} else {
					uni.navigateTo({
						url: url,
					});
				}
			},
			getList() {
				this.loading = true;
				helps(this.id)
					.then((res) => {
						if (res.code == 200) {
							this.list = res.result;
						} else {
							pop(res.message, 2000);
						}
						this.loading = false;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			detail(item) {
				let url = "./detail?id=" + item.id;
				uni.navigateTo({
					url: url,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		// height: 0;
		// flex: 1;
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 24rpx 24rpx;
		overflow: hidden;
	}

	.help {
		background: var(--theme-auxiliary-color-default);

		height: var(--vh);
		display: flex;
		flex-direction: column;

		/deep/ .input-view {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.box-div {
			// margin-top: 20rpx;

			.title {
				padding: 14rpx 20rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #444444;
			}

			.list-row {
				.list-item {
					height: 110rpx;
					background: #fff;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 35rpx 0 40rpx;
					border-bottom: 1px solid var(--theme-auxiliary-color-default);
					&:last-child{
						border-bottom:0;
					}
					.slot-text {
						font-weight: 300;
						font-size: 32rpx;
						color: #404040;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					// &:first-child {
					// 	border-top-left-radius: 24rpx;
					// 	border-top-right-radius: 24rpx;
					// }

					// &:last-child {
					// 	border-bottom-left-radius: 24rpx;
					// 	border-bottom-right-radius: 24rpx;
					// }
				}
			}
		}

		.footer-box {
			height: 110rpx;

			.footer {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				position: fixed;
				bottom: 0;
				width: 100%;
				max-width: 480px;
				height: 110rpx;
				background: #ffffff;

				.ts,
				.kf {
					display: flex;
					width: 50%;
					height: 100%;
					justify-content: center;
					align-items: center;

					image {
						height: 40rpx;
						width: 40rpx;
						margin-left: 10rpx;
					}

					.text {
						font-weight: 400;
						font-size: 32rpx;
						color: #404040;
						margin-left: 10rpx;
					}
				}

				.ts {
					border-right: 1px solid #efefef;
				}
			}
		}
	}
</style>
