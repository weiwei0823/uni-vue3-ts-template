<template>
	<view class="backroom-box pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }"
		:class="['theme-' + themeColor.name]">
		<Header :title="$t('pages.common.userCenter.backroom.text1')" is-back isFixed>
			<view v-if="this.list.length > 0" class="right-search" slot="right" @click="handleToSearch" type="search">
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M15.6218 15.6218C12.0481 19.1955 6.25396 19.1955 2.68027 15.6218C-0.893423 12.0481 -0.893424 6.25396 2.68027 2.68027C6.25396 -0.893423 12.0481 -0.893423 15.6218 2.68027C19.1955 6.25396 19.1955 12.0481 15.6218 15.6218ZM13.4649 13.4648C11.0824 15.8473 7.21967 15.8473 4.83721 13.4648C2.45475 11.0824 2.45475 7.21964 4.83721 4.83718C7.21967 2.45472 11.0824 2.45472 13.4649 4.83718C15.8473 7.21964 15.8473 11.0824 13.4649 13.4648ZM19.3964 17.2395C18.8007 16.6438 17.8351 16.6438 17.2394 17.2395C16.6438 17.8351 16.6438 18.8008 17.2394 19.3964L19.3964 21.5533C19.992 22.1489 20.9577 22.1489 21.5533 21.5533C22.1489 20.9577 22.1489 19.992 21.5533 19.3964L19.3964 17.2395Z"
						fill="#A1A1A1" />
				</svg>
			</view>
		</Header>
		<scroll-view scroll-y class="scroll-y" :style="{height:`calc(${winHeight}px - 88rpx)`}" :enhanced="true"
			:bounces="false" :show-scrollbar="false">
			<view class="backroom-box-body">
				<view class="userinfo">
					<view class="user">
						<view class="img">
							<image style="width: 100rpx;height: 100rpx"
								:src="userinfo.headImgUrl ? userinfo.headImgUrl : '/static/img/user/Frame21.png'">
							</image>
						</view>
						<view class="right-info">
							<view class="name">{{ userinfo.nickname }}</view>
							<view class="count">

								{{$t("pages.common.userCenter.backroom.text2")}}
								<text v-if="times == 0">{{$t("pages.common.userCenter.backroom.text3")}}</text>
								<text v-else
									style="color: red;">{{$t("pages.common.userCenter.backroom.text4")}}{{ times }}{{$t("pages.common.userCenter.backroom.text5")}}</text>
							</view>
						</view>
					</view>
					<view class="tips">
						{{ times == 0 ? $t("pages.common.userCenter.backroom.text6") : $t("pages.common.userCenter.backroom.text7") }}
						{{ setRes }}
					</view>
				</view>
				<view class="tipsimg">
					<view class="tips-show">
						<view class="mark-dot">
							<image src="@/static/img/Mask-group.png"></image>
						</view>
						<view class="tips-container">
							<view class="tips-show-text1">{{$t("pages.common.userCenter.backroom.text19")}}</view>
							<view class="tips-show-text2">{{$t("pages.common.userCenter.backroom.text20")}}</view>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="content-tips">
						<view class="tips-text">{{$t("pages.common.userCenter.backroom.text21")}}</view>
						<view class="tips-text">{{$t("pages.common.userCenter.backroom.text22")}}</view>
						<view class="bj-img">
							<view class="bj-img-item" v-for="(item, i) in bgList" :key="i">
								<view class="black-dot"></view>
								<view class="black-dot-img">
									<image :src="item.src"></image>
								</view>
								<view class="black-dot"></view>
							</view>
						</view>
					</view>
					<scroll-view scroll-y class="list-box">
						<template v-if="this.list.length > 0">
							<view v-for="(item, index) in list" :key="index" class="list-item">
								<view class="top">
									<view class="img">
										<image style="width: 84rpx; height: 84rpx; border-radius: 50%"
											:src="item.headPic">
										</image>
									</view>
									<view class="info">
										<view class="username">{{ item.nickname }}</view>
										<view class="createTime">{{ item.createTime }}</view>
									</view>
									<view class="count">
										<view class="menu" @click="toDetail(item)">
											{{$t("pages.common.userCenter.backroom.text8")}}{{ item.punishTime }}
											{{$t("pages.common.userCenter.backroom.text9")}}
										</view>
									</view>
								</view>
								<view class="bottom">
									<view class="content">
										<view class="reason"><text class="title">

												{{$t("pages.common.userCenter.backroom.text10")}}</text>{{ item.reason }}
										</view>
										<view class="result">
											<text class="title">{{$t("pages.common.userCenter.backroom.text11")}}</text>
											<text v-if="item.punishDay > 0"
												style="color: red;">{{$t("pages.common.userCenter.backroom.text12")}}{{ item.punishDay }}{{$t("pages.common.userCenter.backroom.text13")}}</text>
											<text v-else style="color: #000;font-weight: bold;">
												{{$t("pages.common.userCenter.backroom.text14")}}
											</text>
										</view>
										<view v-if="item.punishDay > 0" class="result">
											<text
												class="title">{{$t("pages.common.userCenter.backroom.text15")}}</text>{{ item.endTime }}
										</view>
									</view>
									<view class="tag">
										<image src="/static/img/wg.png"></image>
									</view>
								</view>
							</view>
							<uni-load-more color="#A1A1A1" :status="status" @clickLoadMore="loadMore"
								:contentText="contentText"></uni-load-more>
						</template>
						<empty v-else :custom-style="{marginTop:0,height:'100%'}"> </empty>
					</scroll-view>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import empty from "@/components/common/empty/empty.vue";
	import {
		info,
		punish
	} from '@/utils/user';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			AlertInjectLayer,
			Header,
			empty
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				userinfo: {},
				list: [],
				pageNum: 1,
				status: 'more', //more, loading, no-more
				setRes: '',
				contentText: {
					contentdown: this.$t("pages.common.userCenter.backroom.text16"),
					contentrefresh: this.$t("pages.common.userCenter.backroom.text17"),
					contentnomore: this.$t("pages.common.userCenter.backroom.text18")
				},
				times: 0,
				winHeight: 0,
				bgList: [{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					},
					{
						src: require('./../../../../static/img/Rectangle9364.png')
					}
				]
			};
		},
		computed: {
			...mapGetters(["themeColor"]),
		},
		onLoad() {
			this.getUserinfo();
			this.getList();
		},
		onReachBottom() {
			if (this.status === "no-more") {
				return
			}
			this.loadMore()
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/common/userCenter/backroom/detail?id=' + item.userId
				});
			},
			loadMore() {
				this.pageNum++
				this.userId = ""
				this.getList()
			},
			getUserinfo() {
				info().then(res => {
					if (res.code === 200) {
						this.userinfo = res.result;
						punish({
							pageNum: 1,
							userId: res.result.id
						}).then(data => {
							if (data.code === 200) {
								this.times = data.result.records.length;
								let userPunishDay = data.result.records[data.result.records.length - 1]
									.punishDay;
								if (userPunishDay > 0) {
									this.setRes =
										`${this.$t("pages.common.userCenter.backroom.text12")}${userPunishDay}${this.$t("pages.common.userCenter.backroom.text13")}`
								} else {
									this.setRes = this.$t("pages.common.userCenter.backroom.text14")
								}
							}
						})
					}
				})
			},
			getList() {
				punish({
					pageNum: this.pageNum,
					userId: this.userId
				}).then(res => {
					if (res.code === 200) {
						this.list = this.list.concat(res.result.records)
						if (res.result.records.length === 0) {
							this.status = "no-more"
						}
					}
				})
			},
			handleToSearch() {
				uni.navigateTo({
					url: '/pages/common/userCenter/backroom/search'
				})
			}
		},
	};
</script>

<style lang="scss">
	/deep/ .uni-scroll-view-content{
		display: flex;
	}

	.backroom-box {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.right-search {
			text-align: right;
		}


		.backroom-box-body {
			width: 100%;
			// height: calc(100%);
			//   position: absolute;
			display: flex;
			flex-direction: column;

			.userinfo {
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: #fff;
				padding: 20rpx 28rpx;
				border-radius: 24rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				width: 100%;
				margin-top: 20rpx;
				margin-bottom: 20rpx;

				.user {
					display: flex;
					padding: 0 0 20rpx 0;

					.img {
						width: 100rpx;
						height: 100rpx;
						border-radius: 30rpx;
						overflow: hidden;
					}

					.right-info {
						margin-left: 20rpx;

						.name {
							color: var(--theme-color);

							font-size: 30rpx;
							font-weight: 500;
							margin-top: 13rpx;
						}

						.count {
							color: #404040;

							font-size: 26rpx;
							font-weight: 500;
						}
					}
				}


				&>.tips {
					margin-top: 8rpx;
					// width: 630rpx;
					width: 100%;
					height: 100rpx;
					background: #fff;
					box-shadow: inset 0 2rpx 0 #ededed;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #404040;

					font-size: 28rpx;
					font-weight: 400;
					padding: 20rpx 0 0 0;
				}
			}

			&>.content {
				flex: 1;
				// height: 0;
				background-color: #000;
				padding: 24rpx 28rpx 28rpx 28rpx;
				display: flex;
				flex-direction: column;

				.content-tips {
					width: 100%;
					height: 162rpx;
					border-radius: 24rpx;
					border: 4rpx solid rgba(192, 192, 192, 0.00);
					background: var(--theme-auxiliary-color-default);
					box-sizing: border-box;
					padding: 20rpx 0;
					position: relative;

					.tips-text {
						width: 100%;
						text-align: center;
						color: #404040;
						text-align: center;

						font-size: 32rpx;
						font-weight: 400;
						line-height: 40rpx;
					}

					.bj-img {
						position: absolute;
						width: 100%;
						height: 108rpx;
						background-color: transparent;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 60rpx;
						box-sizing: border-box;
						bottom: -70rpx;

						.bj-img-item {
							width: 32rpx;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: center;
							position: relative;

							.black-dot {
								width: 32rpx;
								height: 32rpx;
								background-color: #000000;
								border-radius: 50%;
								background-image: url('@/static/img/circle.png');
								background-repeat: no-repeat;
								background-size: 100% 100%;
								background-position: center;
							}

							.black-dot-img {
								width: 12rpx;
								height: 78rpx;
								position: absolute;
								top: 14rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}

				.list-box {
					margin-top: 20rpx;
					display: flex;
					flex-direction: column;
					padding: 68rpx 20rpx 20rpx 20rpx;
					border-radius: 24rpx;
					border: 4rpx solid rgba(192, 192, 192, 0.00);
					background: var(--theme-auxiliary-color-default);
					box-sizing: border-box;
					flex: 1;
					height: auto;

					.list-item {
						display: flex;
						flex-direction: column;
						padding: 20rpx;
						border-radius: 20rpx;
						border: 4rpx solid rgba(192, 192, 192, 0.00);
						background: #FFFFFF;
						margin-top: 20rpx;

						&>.top {
							display: flex;
							align-items: center;
							height: 84rpx;
							gap: 0 20rpx;
							margin-bottom: 20rpx;

							&>.info {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								height: 100%;

								.username {
									font-size: 28rpx;
									color: #404040;
								}

								.createTime {
									font-size: 24rpx;
									color: #888;
								}
							}

							&>.count {
								flex: 1;
								display: flex;
								align-items: center;
								justify-content: end;

								&>.menu {
									display: flex;
									height: 40rpx;
									padding: 0px 6rpx;
									align-items: center;
									gap: 20rpx;
									box-sizing: border-box;
									border-radius: 8rpx;
									background: var(--theme-auxiliary-color-default);
									color: var(--theme-auxiliary-color-remind);

									font-size: 28rpx;
									font-weight: 500;
								}
							}
						}

						&>.bottom {
							display: flex;
							justify-content: space-between;
							align-items: center;

							&>.content {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								font-size: 28rpx;
								color: #000;
								min-height: 88rpx;
								max-width: 460rpx;

								& .title {
									color: #404040;

									font-size: 28rpx;
									font-weight: 400;
								}
							}

							&>.tag {
								width: 132rpx;
								height: 96rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}
			}

			.tipsimg {
				width: 100%;
				background-color: #fff;
				height: 392rpx;
				background-image: url('@/static/img/blackroomimg.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-position: center;
				position: relative;
				border: none;
				border-radius: 24rpx 24rpx 0 0;

				.tips-show {
					position: absolute;
					top: 100rpx;
					left: 26rpx;
					width: 308rpx;
					height: 218rpx;
					background-image: url('@/static/img/Vector.png');
					background-repeat: no-repeat;
					background-size: 100%;
					background-position: center;
					display: flex;
					align-items: center;
					justify-content: center;

					.mark-dot {
						width: 284rpx;
						height: 200rpx;
						position: absolute;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.tips-container {
						.tips-show-text1 {
							color: var(--theme-auxiliary-color-remind);
							text-align: center;
							font-size: 44rpx;
							font-weight: 400;
							line-height: 25px;
							/* 113.636% */
						}

						.tips-show-text2 {
							color: #000;
							font-size: 44rpx;
							font-weight: 400;
							line-height: 25px;
							text-align: center;
						}
					}
				}

				image {
					width: 100%;
				}
			}
		}
	}
</style>
