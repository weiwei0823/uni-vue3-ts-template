<template>
	<view class="backroom-box" :class="['theme-' + themeColor.name]" :style="{ marginTop: safeHeight }">
		<Header :title="$t('pages.common.userCenter.mybackroomuser.text1')" isFixed />
		<view class="backroom-box-body">
			<view class="control-box">
				<view class="search">
					<uni-search-bar v-model="searchValue"
						:placeholder="$t('pages.common.userCenter.mybackroomuser.text2')" cancelButton="always"
						:cancelText="$t('pages.common.userCenter.mybackroomuser.text3')" radius="50" bg-color="#fff"
						@confirm="search" @cancel="search" @clear="clear">
						<template v-slot:searchIcon>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
									fill="#A1A1A1" />
							</svg>
						</template>
					</uni-search-bar>
				</view>
			</view>

			<z-paging style="background: var(--theme-auxiliary-color-default);margin-top: 20rpx;"
				:height="'calc( 100vh - 224rpx )'" ref="paging" v-model="list" @query="getListPaeg"
				:lower-threshold="10" :refresher-enabled="true" :hide-empty-view="false" :empty-view-center="true"
				:empty-view-text="$t('pages.luntan.masterForum.noData')" :hide-no-more-inside="true"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '170px' }"
				:empty-view-img-style="{ 'width': '443rpx', 'height': '443rpx' }"
				:empty-view-title-style="{ 'color': ' #D8D8D8', 'font-size': '32rpx', 'line-height': '44rpx', 'margin-top': '28rpx' }">
				<view v-for="(item, index) in list" :key="index" class="list-item">
					<!--					<view class="top">-->
					<!--						<view class="img">-->
					<!--							<image style="width: 100rpx; height: 100rpx; border-radius: 50%"-->
					<!--								   :src="item.headPic"></image>-->
					<!--						</view>-->
					<!--						<view class="info">-->
					<!--							<view class="username">{{ item.blockedUserName }}</view>-->
					<!--						</view>-->
					<!--						<view class="count">-->
					<!--							<view class="menu" @click="removeBlock(item)">-->
					<!--								{{$t('pages.common.userCenter.mybackroomuser.text4')}}</view>-->
					<!--						</view>-->
					<uni-row class="list-row">
						<uni-col :span="4" class="img-box">
							<image :src="item.headPic" @click="homepage(item)"></image>
						</uni-col>
						<uni-col class="text-box">
							<view class="text">{{ item.blockedUserName }}</view>
						</uni-col>
						<uni-col class="btn-box">
							<span class="cancel-care"
								@click="removeBlock(item)">{{ $t('pages.common.userCenter.mybackroomuser.text4') }}</span>
						</uni-col>
					</uni-row>
				</view>

			</z-paging>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import empty from "@/components/common/empty/empty.vue";
	import {
		listUserPunish,
		cancelBlock
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";

	export default {
		components: {
			AlertInjectLayer,
			Header,
			empty
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				list: [],
				searchValue: "",
				over: false,
				formData: {
					name: "",
					pageNum: 1
				}
			};
		},
		onLoad() {
			// this.getList();
		},

		methods: {
			getList() {
				listUserPunish(this.formData).then(res => {
					if (res.code === 200) {
						if (res.result.records.length < 10) {
							this.over = true
						}
						this.$refs.paging.complete(res.result.records);
					}
				})
			},
			removeBlock(item) {
				this.formData.pageNum = 1
				this.formData.name = ""
				this.list = []
				cancelBlock({
					blockedUserId: item.blockUserId
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
						this.getList()
					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}

				})
			},
			search(val) {},
			getListPaeg(pageNum) {
				this.getList()
				this.formData.pageNum = pageNum
			},
		},
	};
</script>

<style lang="scss">
	::v-deep .header {
		border-radius: 0px !important;
		top: 0px !important;
		border: none !important;
	}

	.list-item:first-child {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
	}

	.list-item:last-child {
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;

		:after {
			display: none;
		}
	}


	.list-item {
		width: 100%;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;

		.list-row {
			padding: 20rpx 28rpx;
			position: relative;
			display: flex;
			align-items: center;

			.img-box {
				width: 68rpx;
				height: 68rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
				}
			}

			.text-box {
				margin-left: 20rpx;
				flex: 1;

				.text {
					height: 68rpx;
					line-height: 68rpx;
					font-size: 28rpx;
					color: #404040;
					font-weight: 400;

				}
			}

			.btn-box {
				height: 68rpx;
				line-height: 68rpx;
				align-items: end;
				width: 152rpx;

				.cancel-care {
					display: inline-block;
					height: 58rpx;
					width: 152rpx;
					text-align: center;
					line-height: 58rpx;
					border-radius: 8rpx;
					background: var(--theme-color);
					font-size: 24rpx;
					color: white;
					font-weight: 400;
				}
			}

			:after {
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



		.list-item:first-child {
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
		}

		.list-item:last-child {
			border-bottom-left-radius: 24rpx;
			border-bottom-right-radius: 24rpx;
		}
	}

	.backroom-box-body {
		width: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;

		.control-box {
			background: white;
			padding: 20rpx 0rpx;
			border-bottom-left-radius: 24rpx;
			border-bottom-right-radius: 24rpx;
		}

		.search {
			width: 694rpx;
			height: 76rpx;
			margin-left: auto;
			margin-right: auto;
			background: var(--theme-auxiliary-color-default);
			border-radius: 16rpx;
			overflow: hidden;

			::v-deep .uni-searchbar {
				height: 76rpx;
				padding: 0px !important;

				.uni-searchbar__box {
					height: 100% !important;
					background-color: var(--theme-auxiliary-color-default) !important;
				}

				.uni-searchbar__box-icon-search .uni-icons {
					font-size: 40rpx !important;
					font-weight: bold;
				}

				.uni-searchbar__cancel {
					padding: 0rpx 20rpx !important;
					color: var(--theme-color);
					font-size: 30rpx;
				}
			}
		}

		&>.content {
			flex: 1;

			&>.list-box {
				display: flex;
				flex-direction: column;
				padding: 0 20rpx 20rpx 20rpx;
				gap: 20rpx 0;
			}
		}
	}
</style>
