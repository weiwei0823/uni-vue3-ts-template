<template>
	<view class="mint-tab-container-item pc-max-width" :style="{ marginTop: safeHeight }"
		:class="['theme-' + themeColor.name]">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" show-scrollbar="true">
			<!--顶部导航栏-->
			<view class="header-box" style="height: 88rpx">
				<div class="header" style="height: 88rpx" :style="{ marginTop: safeHeight }">
					<view class="box-bg" style="height: 88rpx">
						<Header :title="info.pictureName || title" :isFixed="true">
							<block slot="right" height="44">
								<view class="rht rht2" @click="add">
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
										fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M11 2.75C10.4937 2.75 10.0833 3.16041 10.0833 3.66667V10.0833H3.66667C3.16041 10.0833 2.75 10.4937 2.75 11C2.75 11.5063 3.1604 11.9167 3.66667 11.9167H10.0833V18.3333C10.0833 18.8396 10.4937 19.25 11 19.25C11.5063 19.25 11.9167 18.8396 11.9167 18.3333V11.9167H18.3333C18.8396 11.9167 19.25 11.5063 19.25 11C19.25 10.4937 18.8396 10.0833 18.3333 10.0833H11.9167V3.66667C11.9167 3.16041 11.5063 2.75 11 2.75Z"
											:fill="themeColor.themeColor" />
									</svg>
									<span class="descs" style="display: block">
										{{ $t("pages.luntan.liuhePicture.tujie.publishIllustration") }}
									</span>
								</view>
							</block>
						</Header>
					</view>
				</div>
			</view>
			<!-- <view class="tab-div-bg pc-max-width" /> -->
			<!--tab选项卡-->

			<view class="tabs-bd pc-max-width">
				<view class="m-tabs">
					<view :class="isActive == 0 ? 'm-tabs-item act' : 'm-tabs-item'" @click="tab(0)">
						{{ $t("pages.luntan.liuhePicture.tujie.illustrationGroup") }}
					</view>
					<!--          <view :class="isActive == 1 ? 'm-tabs-item act' : 'm-tabs-item'" @click="tab(1)">竞猜小组</view>-->
				</view>
			</view>
			<!--图解区域-->
			<scroll-view scroll-y class="list-bd" v-if="list.length > 0" lower-threshold="100"
				scroll-with-animation="true" @scrolltolower="lower">
				<view role="feed" class="van-list">
					<ul v-if="isActive == 0" class="forum-list type12">
						<li v-for="(item, index) in list">
							<view class="van-row">
								<view class="van-col" style="width: 100%;">
									<view class="content" @click="details(item)">
										<view><span class="csize">{{ item.title }}</span></view>
										<view class="bsize">
											<view class="text van-multi-ellipsis--l3">
												{{ item.description }}
											</view>
										</view>
										<view class="footer">
											<image :src="item.headPic"></image>
											<span class="span">{{ item.username }}</span>
											<span>{{ item.updateTime }}</span>
										</view>
									</view>
								</view>
								<view class="van-col van-col--5"></view>
							</view>
						</li>
					</ul>
					<!---->
					<ul v-else class="forum-list type12">
						<view v-show="isActive == 1" class="jc-title-history">
							{{
								$t("pages.luntan.liuhePicture.tujie.clickToViewGuessRecords")
							}}
						</view>
						<li>
							<view class="heads van-row">
								<view class="van-col van-col--20">
									<view class="content">
										<view class="content-jc">
											<span class="content-jc-name">{{
												$t("pages.luntan.liuhePicture.tujie.guess")
											}}</span>
											<span class="csize">{{
												$t("pages.luntan.liuhePicture.tujie.guess2022320")
											}}</span>
										</view>
										<view class="bsize">
											<view class="text van-multi-ellipsis--l3">
												{{
													$t("pages.luntan.liuhePicture.tujie.specialAnimal")
												}}
											</view><!---->
										</view>
										<view class="footer">
											<image mode="widthFix"
												src="https://img.sycccf.com:4949/unite49files/user-small/2022/07/13/2035504/1657685476343-1657685415351122.jpeg">
											</image>
											<span class="span">{{
												$t("pages.luntan.liuhePicture.tujie.goldMiningInSea")
											}}</span>
											<span>2022-11-16 12:32</span>
										</view>
									</view>
								</view>
								<view class="van-col van-col--3">
									<view class="right">
										<image mode="widthFix" src="@/static/img/picture/yzj.png"></image>
									</view>
								</view>
							</view>
						</li>
					</ul>
					<view class="van-list__placeholder"></view>
				</view>
				<!-- <u-loadmore :status="status" /> -->
			</scroll-view>
			<LuntanLoading class="loading" v-else-if="loading" />
			<view class="list-bd empty-box" v-else>
				<empty></empty>
			</view>
			<!--底部-->
			<!-- <view style="height: 96rpx">
				<view class="tjxzBotom">
					<view class="item tz selected" @click="backPage">
						<span class="icons"></span>
						<span class="descs">{{
							$t("pages.luntan.liuhePicture.tujie.comment")
						}}</span>
					</view>
					<view class="item ckpl">
						<span class="icons"></span>
						<span class="descs">{{
							$t("pages.luntan.liuhePicture.tujie.viewIllustration")
						}}</span>
					</view>
					<view class="item sc" @click="collect">
						<uni-icons v-if="info.collect == 0" type="star" size="25" color="#888"></uni-icons>
						<uni-icons v-else type="star-filled" size="25" :color="themeColor.themeColor"></uni-icons>
						<span class="descs">{{
							$t("pages.luntan.liuhePicture.tujie.collect")
						}}</span>
					</view>
					<view class="item dz" @click="thumbUp">
						<uni-icons v-if="info.thumbUp == 0" type="hand-up" size="25" color="#888"></uni-icons>
						<uni-icons v-else type="hand-up-filled" size="25" :color="themeColor.themeColor"></uni-icons>
						<span class="descs">{{
							$t("pages.luntan.liuhePicture.tujie.like")
						}}</span>
					</view>
					<view class="item zf" @click="fenxiang">
						<span class="icons"></span>
						<span class="descs">{{
							$t("pages.luntan.liuhePicture.tujie.share")
						}}</span>
					</view>
					<view class="share"></view>
				</view>
			</view> -->
		</scroll-view>
		<!-- 分享 -->
		<uni-popup class="share" ref="share" type="share" safeArea backgroundColor="#fff">
			<share @closefx="closefx"></share>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index.vue";
	import Login from "@/components/common/login/Login";
	import Share from "@/components/common/share/Share";
	import {
		detail
	} from "@/utils/picture/index.js";
	import {
		listLatest
	} from "@/utils/forum/index.js";
	import {
		collect,
		thumbUp
	} from "@/utils/user/index.js";
	import Empty from "@/components/common/empty/empty";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "tujie",
		components: {
			Header,
			AlertInjectLayer,
			Login,
			Share,
			Empty,
		},
		data() {
			return {
				loading: true,
				status: 'loading',
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				scrollTop: 0,
				isActive: 0,
				pictureId: 0,
				pageNum: 1,
				pageSize: 10,
				title: "",
				info: {},
				isLoadMore: false,
				list: [],
				msg: "",
			};
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		onLoad(option) {
			this.pictureId = option.id;
			this.detail();
			uni.$on("emitParams", (data) => {
				this.msg = data.msg;
			});
		},
		onShow() {
			uni.hideTabBar();
			if (this.msg) {
				pop(this.msg, 2000);
				this.msg = "";
			}
		},
		methods: {
			backPage: function() {
				backPage();
			},
			add: function() {
				if (!isLogin()) {
					uni.$emit("showPop", {
						refName: "AlertMessage"
					});
					return false;
				}
				uni.navigateTo({
					url: "add?id=" + this.pictureId, // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			pictureFabu: function() {
				uni.navigateTo({
					url: "pictureFabu?pictureId=" + this.pictureId, // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			//tab切换
			tab: function(index) {
				this.isActive = index;
				this.pageNum = 1;
				this.list = [];
				if (index == 0) {
					this.listLatest();
				} else {}
			},
			details: function(item) {
				const that = this;
				uni.navigateTo({
					url: "/pages/luntan/masterForum/detail?id=" +
						item.articleId +
						"&type=" +
						item.type,
					success: function(res) {
						res.eventChannel.emit("argParams", {
							lotteryType: that.info.lotteryType,
						});
					},
				});
			},
			//加载更多
			lower: function(e) {
				if (this.status === 'nomore') {
					return
				}
				if (!this.isLoadMore) {
					//此处判断，上锁，防止重复请求
					this.isLoadMore = true;
					this.pageNum += 1;
					this.listLatest();
				}
			},
			//分享弹窗
			fenxiang: function() {
				this.$refs.share.open();
			},
			//关闭分享
			closefx: function() {
				this.$refs.share.close();
			},
			//详情
			async detail() {
				let prams = {
					pictureId: this.pictureId,
				};
				await detail(prams)
					.then((res) => {
						this.info = res.result;

						uni.setNavigationBarTitle({
							title: this.info.pictureName,
						});
						this.listLatest();
					})
					.catch((err) => {
						console.log(err);
					});
			},
			//图解列表
			listLatest: function() {
				let prams = {
					pictureId: this.pictureId,
					lotteryType: this.info.lotteryType,
					type: 12,
					sort: 0,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
				this.loading = true
				listLatest(prams)
					.then((res) => {
						this.loading = false
						if (!res.result.records.length) {
							this.status = 'nomore'
						}
						this.list.push(...res.result.records);
						this.isLoadMore = false;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			collect: function() {
				if (!isLogin()) {
					uni.$emit("showPop", {
						refName: "AlertMessage"
					});
					return false;
				}
				let prams = {
					relatedId: this.info.pictureTypeId,
					type: 1,
				};
				collect(prams)
					.then((res) => {
						if (res.code == 200) {
							this.info.collect = res.result;
							if (res.result == 1) {
								this.info.collectCount++;
							} else {
								this.info.collectCount--;
							}
						}
						pop(res.message, 2000);
					})
					.catch((err) => {
						console.log(err);
					});
			},
			//点赞接口
			thumbUp: function() {
				if (!isLogin()) {
					uni.$emit("showPop", {
						refName: "AlertMessage"
					});
					return false;
				}
				let prams = {
					relatedId: this.pictureId,
					type: 1,
					createTime: this.info.createTime,
				};
				thumbUp(prams)
					.then((res) => {
						pop(res.message, 2000);
						if (res.code == 200) {
							this.info.thumbUp = 1;
							this.info.thumbUpCount++;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style scoped>
	::v-deep .header {
		grid-template-columns: repeat(3, 30% 40% 30%);
		border-bottom: 0 !important;
	}

	.scroll-Y {
		height: var(--vh);
		background: var(--theme-auxiliary-color-default);
	}

	.header-box {
		height: 46px;
	}

	.header-box .header {
		position: fixed;
		top: 0;
		height: 46px;
		z-index: 1;
		border-bottom: 1px solid #ebedf0;
		width: 100%;
		max-width: 480px;
	}

	.rht span {
		height: 30rpx;
		line-height: 28rpx;
		font-size: 24rpx;
		color: var(--theme-color);
	}

	.rht {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.rht .descs {
		font-size: 30rpx;
		color: var(--theme-color);
		margin-left: 20rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.rht * {
		display: inline-block;
	}

	.rht1 .icons {
		background-image: url("@/static/img/picture/jc.png");
		background-size: 100% 100%;
		height: 32rpx;
		width: 32rpx;
	}

	.rht2 .icons {
		background-image: url("@/static/img/picture/pl.png");
		background-size: 100% 100%;
		height: 36rpx;
		width: 36rpx;

	}

	.tabs-bd {
		height: 80rpx;
		background: #fff;
		margin-top: 20rpx;
		border-radius: 24rpx;
		width: 100%;
	}

	.tabs-bd .m-tabs {
		color: #999;
		font-weight: 500;
		overflow: hidden;

	}

	.tabs-bd .m-tabs .m-tabs-item.act {
		border-radius: 40rpx;
		color: var(--theme-color);
	}

	.tabs-bd .m-tabs .m-tabs-item {
		float: left;
		line-height: 80rpx;
		width: 100%;
		text-align: center;
		font-size: 30rpx;
		position: relative;
	}

	.tabs-bd .m-tabs .m-tabs-item.act:after {
		content: "";
		position: absolute;
		width: 36rpx;
		height: 6rpx;
		background: var(--theme-color);
		border-radius: 6rpx 6rpx 0 0;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.list-bd {
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
		height: calc(var(--vh) - 210rpx);
	}

	.forum-list li {
		padding: 20rpx 28rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		display: flow-root;
	}

	.list-bd .type12 .csize {
		color: var(--theme-auxiliary-color-remind);
		font-size: 34rpx;

		font-weight: 600;
	}

	.list-bd .type12 .bsize {
		padding: 20rpx 0;
		display: block;
		font-size: 36rpx;
	}

	.forum-list li .text {
		font-size: 28rpx;
		color: #404040;
	}

	.van-multi-ellipsis--l3 {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.list-bd .type12 .jc-title-history {
		color: var(--theme-color);
		text-align: center;
		margin: 30rpx;
		font-weight: 700;
		font-size: 28rpx;
	}

	.list-bd .type12 .footer {
		display: flex;
		font-size: 26rpx;
		align-items: center;
		color: #A1A1A1;
		border-top: 1px solid var(--theme-auxiliary-color-default);
		padding-top: 20rpx;
	}

	.list-bd .type12 .footer image {
		width: 48rpx;
		height: 48rpx;
		border-radius: 16rpx;
		margin-right: 20rpx;
	}

	.list-bd .type12 .footer .span {
		flex: 1;
		color: #A1A1A1;
		font-size: 24rpx;
	}

	.forum-list li .heads {
		display: flex;
		justify-content: space-around;
		position: relative;
	}

	.list-bd .type12 .content-jc {
		display: flex;
		align-items: center;
	}

	.list-bd .type12 .content-jc .content-jc-name {
		background: var(--theme-color);
		font-size: 24rpx;
		color: #fff;
		border-radius: 10rpx;
		padding: 6rpx 10rpx;
		margin-right: 4rpx;
	}

	.list-bd .type12 .right image {
		width: 90rpx;
	}

	.tjxzBotom,
	.tjxzBotom .item {
		display: flex;
		align-items: center;
		height: 96rpx;
	}

	.tjxzBotom {
		position: fixed;
		width: 750rpx;
		max-width: 960rpx;
		bottom: 0;
		background: #f8f8f8;
		box-shadow: inset 0 2rpx 0 #ddd;

	}

	.tjxzBotom .item {
		width: 20%;
		flex-direction: column;
		justify-content: center;
	}

	.tjxzBotom,
	.tjxzBotom .item {
		display: flex;
		align-items: center;
		height: 96rpx;
	}

	.tjxzBotom .tz.selected .icons {
		background-image: url("@/static/img/picture/pinl.png");
	}

	.tjxzBotom .item .icons {
		background-size: 100% 100%;
		height: 50rpx;
		width: 50rpx;
	}

	.tjxzBotom .item span {
		display: inline-block;
		font-size: 24rpx;
		line-height: 28rpx;
	}

	.tjxzBotom .item span {
		display: inline-block;
		font-size: 24rpx;
		line-height: 28rpx;
	}

	.tjxzBotom .ckpl .icons {
		background-image: url("@/static/img/picture/tj.png");
	}

	.tjxzBotom .sc .icons {
		background-image: url("@/static/img/picture/sc.png");
	}

	.tjxzBotom .dz .icons {
		background-image: url("@/static/img/picture/dianzan.png");
	}

	.tjxzBotom .zf .icons {
		background-image: url("@/static/img/picture/zhuanfa.png");
	}
</style>

<style lang="scss" scoped>
	.mint-tab-container-item {
		background: var(--theme-auxiliary-color-default);
	}

	::v-deep .header {
		grid-template-columns: repeat(3, 30% 40% 30%) !important;

		.center {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.empty-box {
		padding: 0 26rpx;
		display: grid;
		place-content: center;

		::v-deep .empty-box {
			display: grid;
			place-content: center;
		}
	}
</style>
