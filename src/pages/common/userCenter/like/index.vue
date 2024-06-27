<template>
	<view class="my-like" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="tab-box">
			<view class="tab">
				<view v-for="(item, index) in tabArr" :key="index"
					:class="item.value === activeTab.value ? 'active-tab-item' : ''" class="tab-item"
					@click="handleTab(item)">
					{{ item.label }}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="like-body">
			<LuntanLoading class="loading" v-if="loading" />
			<view class="my-like-list" v-else-if="records.length > 0">
				<view class="my-like-list-item" v-for="(item, index) in records" @click="pictureDetail(item)">
					<view class="top">
						<uni-row>
							<uni-col :span="3">
								<!--								<view class="avatar">-->
								<!--									<image :src='item.headPic' />-->
								<!--								</view>-->
								<avatar-box class="avatar" :size="68" :radius="16"
									:avatar-url="item.headPic"></avatar-box>
							</uni-col>
							<uni-col :span="21">
								<view class="info">
									<view class="name">{{ item.username }}</view>
									<view class="date">{{ item.createTime }}</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
					<view class="bottom">
						<uni-row>
							<uni-col :span="12">
								<view class="img-title">
									{{ item.title ? item.title : $t("pages.common.userCenter.like.text1") }}
								</view>
							</uni-col>
							<uni-col :span="12" class="tags-flex">
								<view class="tags">
									<image class="flag" :use-theme-color="false" :src="getTypeIcon(item.lotteryType)"
										style="width: 44rpx;height: 44rpx" />
									<view class="txt">
										{{ getLotteryType(item.lotteryType) }}
									</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</view>
			</view>
			<empty style="height: 100%;" v-else> </empty>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		myThumbUp
	} from "@/utils/user";
	import Empty from "@/components/common/empty/empty.vue";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "like",
		components: {
			AlertInjectLayer,
			Header,
			Empty
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.like.text2'),
				activeTab: {
					label: this.$t('pages.common.userCenter.like.text3'),
					value: 2,
				},
				page: {
					pageSize: 10,
					pageNum: 1
				},
				over: false,
				records: [

				],
				tabArr: [{
						label: this.$t('pages.common.userCenter.like.text4'),
						value: 2,
					},
					{
						label: this.$t('pages.common.userCenter.like.text5'),
						value: 8,
					},
					{
						label: this.$t('pages.common.userCenter.like.text6'),
						value: 3,
					},
					{
						label: this.$t('pages.common.userCenter.like.text7'),
						value: 4,
					},
					{
						label: this.$t('pages.common.userCenter.like.text8'),
						value: 1,
					},
				],
			}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),

		},
		onLoad() {
			this.getMyThumbUp()
		},
		onReachBottom() {
			if (this.over === false) {
				this.page.pageNum++
				this.getMyThumbUp()
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
						return "@/static/img/menu/2.png"
					case 2:
						return "@/static/img/menu/1.png"
					case 3:
						return "@/static/img/menu/3.png"
					case 4:
						return "@/static/img/menu/4.png"
          case 5:
            return "@/static/img/menu/5.png"
				}
			},
			getClass(type) {
				switch (type) {
					case 1:
						return "lottery-type hk"
					case 2:
						return "lottery-type mo"
					case 3:
						return "lottery-type tw"
					case 4:
						return "lottery-type sg"
				}
			},
			//图库详情
			pictureDetail(item) {
				// uni.setStorageSync('lotteryType', item.lotteryType);
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, item
					.lotteryType);
				if (item.type == 1) {
					let url = '/pages/luntan/liuhePicture/detail?id=' + item.relatedId
					uni.navigateTo({
						url: url,
					})
				} else if (item.type == 8) {
					let url = '/pages/luntan/humorousGuessing/index?id=' + item.relatedId
					uni.navigateTo({
						url: url,
					})
				} else {
					let url = '/pages/luntan/masterForum/detail?id=' + item.relatedId + '&type=' + item.type;
					uni.navigateTo({
						url: url,
					})
				}
			},
			//获取我的点赞
			getMyThumbUp() {
				this.loading = true
				myThumbUp({
					type: this.activeTab.value,
					pageNum: this.page.pageNum,
					pageSize: this.page.pageSize
				}).then(res => {
					this.loading = false
					if (res.result.records.length < 10) {
						this.over = true
					}
					this.records = this.records.concat(res.result.records)
				})
			},
			handleTab(item) {
				if (this.activeTab === item) {
					return false;
				}
				this.records = [];
				this.page.pageNum = 1
				this.activeTab = item;
				this.getMyThumbUp()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	::v-deep .header {
		border-radius: 0px !important;
		top: 0px !important;
		border: none !important;
	}

	.my-like {
		background-color: var(--theme-auxiliary-color-default);
		height: var(--vh);
	}

	.tab-box {
		position: relative;
		height: 100rpx;

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
	}

	.like-body {
		width: 100%;
		height: calc(var(--vh) - 188rpx + var(--safe-area-inset-bottom));
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 2rpx 0;
		border-radius: 24rpx;
		overflow: hidden;

		// background-color: #fff;
		&::before {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			content: " ";
			pointer-events: none;
			top: 0;
			left: 0;
			// border-top: 1px solid #ebedf0;
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
		}


		&>.content {
			flex: 1;
		}

		.my-like-list {
			background-color: #fff;
			border-radius: 24rpx;
			overflow: hidden;

			.my-like-list-item:not(:last-child) {

				/*border-bottom: 1px solid #ebedf0;*/
				&::after {
					position: absolute;
					box-sizing: border-box;
					content: " ";
					pointer-events: none;
					right: 16px;
					bottom: 0;
					left: 16px;
					border-bottom: 1px solid #ebedf0;
					transform: scaleY(.5);
				}
			}


			.my-like-list-item {
				padding: 20rpx 28rpx;
				color: #323233;
				position: relative;

				.top {
					height: 68rpx;

					.avatar {
						height: 68rpx;
						width: 68rpx;

						image {
							height: 68rpx;
							width: 68rpx;
							border-radius: 16rpx;
						}
					}

					.info {
						height: 68rpx;
						font-size: 24rpx;

						.name {
							line-height: 34rpx;
						}

						.date {
							line-height: 34rpx;
							font-size: 24rpx;
							line-height: 34rpx;
							color: #404040;
						}
					}
				}

				.bottom {
					margin-top: 20rpx;
					color: #404040;
					height: 64rpx;
					line-height: 64rpx;
					font-size: 32rpx;

					.img-title {
						// display: -webkit-box;
						color: #404040;
						line-height: 64rpx;
						font-size: 32rpx;
						font-weight: 600;
						color: #404040;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						// -webkit-box-orient: vertical;
						// width: 100%;
					}

					.tags-flex {
						display: flex;
						justify-content: end;
						justify-content: flex-end;
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
			}
		}
	}
</style>
