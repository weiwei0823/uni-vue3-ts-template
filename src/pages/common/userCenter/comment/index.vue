<template>
	<view class="comment-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="$t('pages.common.userCenter.comment.index.text1')" isFixed />
		<view class="comment-box-body">
			<view class="tab">
				<view v-for="(item, index) in tabArr" :key="index"
					:class="item.value === activeTab.value ? 'active-tab-item' : ''" class="tab-item"
					@click="handleTab(item)">
					{{ item.label }}
				</view>
			</view>
			<view class="content">
<!--				<view v-if="loading" class="loading">-->
<!--					<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>-->
<!--					<view :style="pageLoadingConfig['text_style']">-->
<!--						{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}-->
<!--					</view>-->
<!--				</view>-->
				<LuntanLoading class="loading" v-if="loading" />

				<scroll-view :style="{height:`calc(${uWindowHeight}px - 196rpx)`}" scroll-y="true"
					v-else-if="this.list.length > 0" class="list-box">
					<template>
						<view v-for="(item, index) in list" :key="index" class="list-item" @click="toDetail(item)">
							<view class="top">
								<view class="img">
									<image style="width: 68rpx; height: 68rpx; border-radius: 14rpx"
										:src="item.headPic">
									</image>
								</view>
								<view class="info">
									<view class="username">{{ item.username }}</view>
									<view class="createTime">{{ item.createTime }}</view>
								</view>
							</view>
							<view class="bottom" @click="handleTo(item)">
								<view class="qs">
									<uni-row>
										<uni-col span="18">
											<view class="label">{{ item.title }}</view>
										</uni-col>
										<uni-col span="6">
											<view class="tags">
												<image class="img" :src="`/static/img/menu/${item.lotteryType}.png`"></image>
												<view class="txt">
													{{ getLotteryType(item.lotteryType) }}
												</view>
											</view>
										</uni-col>
									</uni-row>
								</view>

								<view class="comment-list">
									<view v-for="(commentItem, commentIndex) in item.commentList" :key="commentIndex"
										class="comment-list-item">
										<view class="info">
											<image
												style="width: 48rpx; height: 48rpx; border-radius: 12rpx;margin-right: 12rpx"
												:src="commentItem.headPic"></image>
											<view class="username">{{ commentItem.username }}</view>
											<view class="create-time">{{ commentItem.createTime }}</view>
										</view>
										<view class="content">
											{{ commentItem.content }}
										</view>
									</view>
								</view>

							</view>
						</view>

					</template>
				</scroll-view>
				<empty style="height: calc(var(--vh) - 200rpx);" v-else> </empty>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Empty from "@/components/common/empty/empty.vue";
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import {
		myComment
	} from "@/utils/comment/index.js";
	export default {
		components: {
			AlertInjectLayer,
			Empty,
			Header
		},
		props: {},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				activeTab: {
					label: this.$t("pages.common.userCenter.comment.index.text2"),
					value: 2,
				},
				list: [],
				page: {
					pageSize: 10,
					pageNum: 1
				},
				over: false,
				tabArr: [{
						label: this.$t("pages.common.userCenter.comment.index.text2"),
						value: 2,
					},
					{
						label: this.$t("pages.common.userCenter.comment.index.text3"),
						value: 8,
					},
					{
						label: this.$t("pages.common.userCenter.comment.index.text4"),
						value: 3,
					},
					{
						label: this.$t("pages.common.userCenter.comment.index.text5"),
						value: 4,
					},
					{
						label: this.$t("pages.common.userCenter.comment.index.text6"),
						value: 1,
					},
				],
				loading: false
			};
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		onLoad() {
			this.myComment();
		},
		onReachBottom() {
			if (this.over === false) {
				this.page.pageNum++
				this.myComment()
			} else {
				return
			}
		},
		methods: {
			getLotteryType(type) {
				switch (type) {
					case 1:
						return this.$t('pages.common.userCenter.homepage.hongkong');
					case 2:
						return this.$t('pages.common.userCenter.homepage.australia');
					case 3:
						return this.$t('pages.common.userCenter.homepage.taiwan');
					case 4:
						return this.$t('pages.common.userCenter.homepage.new')
          case 5:
            return this.$t('pages.common.userCenter.homepage.happy8')
				}
			},
			getTypeIcon(type) {
				switch (type) {
					case 1:
						return "/static/img/menu/act-2.png"
					case 2:
						return "/static/img/menu/act-1.png"
					case 3:
						return "/static/img/menu/act-3.png"
					case 4:
						return "/static/img/menu/act-4.png"
          case 5:
            return "/static/img/menu/act-5.png"
				}
			},
			getClass(type) {
				switch (type) {
					case 1:
						return "tag hk"
					case 2:
						return "tag mo"
					case 3:
						return "tag tw"
					case 4:
						return "tag sn"
				}
			},
			handleTab(item) {
				if (this.activeTab === item) {
					return false;
				}
				this.activeTab = item;
				this.myComment(true);
			},
			back() {
				uni.navigateBack();
			},
			handleTo(item) {},
			myComment(reload) {
				this.loading = true
				myComment({
					type: this.activeTab.value,
					pageSize: this.page.pageSize,
					pageNum: this.page.pageNum
				}).then((res) => {
					if (res.code === 200) {
						if (res.result.records.length < 10) {
							this.over = true
						}
						this.list = res.result.records
						this.loading = false
					}
				});
			},
			toDetail(item) {
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, item
					.lotteryType);
				if (this.activeTab.value == 1) {
					let url = `/pages/luntan/liuhePicture/detail?id=${item.relatedId}&createTime=${item.createTime}`
					uni.navigateTo({
						url: url,
					})
				} else if (this.activeTab.value == 8) {
					let url = `/pages/luntan/humorousGuessing/index?id=${item.relatedId}&createTime=${item.createTime}`
					uni.navigateTo({
						url: url,
					})
				} else {
					let url = '/pages/luntan/masterForum/detail?id=' + item.relatedId + '&type=' + this.activeTab.value+`&createTime=${item.createTime}`;
					uni.navigateTo({
						url: url,
					})
				}
			},
		},
	};
</script>

<style lang='scss' scoped>
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

	/deep/ .header {
		border-radius: 0px !important;
		top: 0px !important;
		border: none !important;
	}

	.list-box {
		border-radius: 24rpx;
		overflow: hidden;
	}

	.list-item:first-child {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
	}

	.list-item:last-child {
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
	}

	.list-item {
		display: flex;
		flex-direction: column;
		padding: 28rpx;
		background-color: #fff;
		position: relative;

		&::after {
			position: absolute;
			box-sizing: border-box;
			content: " ";
			pointer-events: none;
			right: 16px;
			bottom: 0;
			left: 16px;
			border-bottom: 1px solid #ebedf0;
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
		}

		&>.top {
			display: flex;
			align-items: center;
			height: 74rpx;

			&>.img {
				width: 68rpx;
				height: 68rpx;
				border-radius: 14rpx;
				margin-right: 20rpx;
			}

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
		}

		&>.bottom {
			display: flex;
			flex-direction: column;

			&>.qs {
				// display: flex;
				// align-items: center;
				// justify-content: space-between;
				margin: 18rpx 0;
				height: 64rpx;
				line-height: 64rpx;

				.label {
					color: #404040;
					font-size: 32rpx;
					font-weight: 600;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}


				.tags {
					width: 160rpx;
					height: 64rpx;
					border-radius: 8rpx;
					padding: 10rpx 0rpx 10px 20rpx;
					box-sizing: border-box;
					background: var(--theme-auxiliary-color-default);
					display: flex;

					.img{
						width: 44rpx;
						height: 44rpx;
					}

					.txt {
            width: 100rpx;
						line-height: 44rpx !important;
						//margin-left: 20rpx;
						font-size: 28rpx;
            text-align: center;
						color: #404040;
					}
				}

			}

			&>.comment-list {
				background: var(--theme-auxiliary-color-default);
				padding: 14rpx 30rpx;
				border-radius: 16rpx;

				&>.comment-list-item {
					display: flex;
					flex-direction: column;
					margin-bottom: 14rpx;

					&>.info {
						display: flex;
						height: 50rpx;
						align-items: center;
						font-size: 24rpx;

						&>.username {
							color: #A1A1A1;
							margin-right: 12rpx;
						}

						&>.create-time {
							color: #404040;
							flex: 1;
							text-align: right;
						}
					}

					&>.content {
						margin-top: 20rpx;
						line-height: 40rpx;
						font-size: 28rpx;
						font-weight: 600;
						/*padding: 0 58rpx;*/
						width: 100%;
						text-align: left;
						word-break: break-all;
					}
				}
			}
		}
	}

	.comment-box-body {
		width: 100%;
		height: calc(100% - 58px);
		position: absolute;
		display: flex;
		flex-direction: column;

		&::before {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			content: " ";
			pointer-events: none;
			top: 0;
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
		}

		&>.tab {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			border-radius: 0px 0px 24rpx 24rpx;
			padding: 0 28rpx;

			.active-tab-item::after {
				content: "";
				display: block;
				width: 36rpx;
				height: 6rpx;
				background: var(--theme-color);
				border-top-left-radius: 6rpx;
				border-top-right-radius: 6rpx;
				position: absolute;
				bottom: 0rpx;
				left: calc(50% - 18rpx);
			}

			&>.tab-item {
				height: 88rpx;
				line-height: 88rpx;
				font-size: 28rpx;
				text-align: center;
				position: relative;
				font-size: 30rpx;
			}

			.active-tab-item {
				color: var(--theme-color);
				font-weight: 500;
				font-size: 34rpx;
			}
		}

		&>.content {
			margin-top: 20rpx;
			border-radius: 24rpx;
			/*background: white;*/
			/*overflow: hidden;*/
		}
	}
</style>
