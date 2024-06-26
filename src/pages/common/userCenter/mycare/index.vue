<template>
	<view class="care-box" :style="{ marginTop: safeHeight, height:`calc(${uWindowHeight}px)`}"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="control-box">
			<view class="search" v-if="userId == ''">
				<uni-search-bar bgColor="#f7f8fa" v-model="searchValue" :placeholder="searchTitle"
					:placeholder-style="'color:#A1A1A1'" cancelButton="always"
					:cancelText="$t('pages.common.userCenter.homepage.search')" @confirm="search" @cancel="search"
					@clear="clear">
					<template v-slot:searchIcon>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
								fill="#A1A1A1" />
						</svg>
					</template>
				</uni-search-bar>
			</view>
		</view>

		<LuntanLoading class="loading" v-if="loading" />
		<z-paging v-show="!loading" class="z-paging" :height="`calc(var(--vh) - 100rpx)`" ref="paging"
			v-model="dataList" @query="myConcern" :refresher-enabled="false" :hide-empty-view="false"
			:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:hide-no-more-inside="true" :empty-view-img="'/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-img-style="{ 'width': '443rpx', 'height': '443rpx' }"
			:empty-view-title-style="{ 'color': ' #D8D8D8', 'font-size': '32rpx', 'line-height': '44rpx', 'margin-top': '28rpx' }">
			<view class="list-box" v-if="!loading">
				<ul>
					<li class="list-item" v-for="(item, index) in dataList" :key="index">
						<uni-row class="list-row">
							<uni-col :span="4" class="img-box">
								<image :src="item.headPic" @click="homepage(item)"></image>
							</uni-col>
							<uni-col class="text-box">
								<view class="text" @click="homepage(item)">{{ item.username }}</view>
							</uni-col>
							<uni-col class="btn-box" v-if="userId == ''">
								<span class="cancel-care" @click="cancel(item, index)">{{
									$t('pages.common.userCenter.mycare.unfollow') }}</span>
							</uni-col>
						</uni-row>
					</li>
				</ul>
			</view>
		</z-paging>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		myConcern,
		concern
	} from "@/utils/user/index"
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			Header
		},
		data() {
			return {
				loading: true,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.mycare.myFollowing'),
				searchValue: "",
				userId: '',
				searchTitle: this.$t('pages.common.userCenter.homepage.search1'),
				dataList: [],
				pageNum: 1,
				pageSize: 10,
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(option) {
			if (option.userId) {
				this.title = this.$t('pages.common.userCenter.mycare.followingOfTa')
				this.userId = option.userId
			}
			// this.myConcern(1)
			// this.search();
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		methods: {
			//搜索
			search: function() {
				this.pageNum = 1
				this.$refs.paging.reload()
			},
			homepage: function(item) {
				uni.navigateTo({
					url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId
				})
			},
			//我的关注
			myConcern: function(pageNo, pageSize = 10) {
				this.loading = true
				this.pageNum = pageNo
				let prams = {
					userId: this.userId,
					name: this.searchValue,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}
				myConcern(prams).then(res => {
					this.loading = false
					let result = res.result.records;
					this.$refs.paging.complete(result);
				}).catch(err => {
					console.log(err)
				})
			},
			//取消关注
			cancel: function(item, index) {
				let prams = {
					userId: item.userId
				}
				concern(prams).then(res => {
					pop(res.message, 200)
					if (res.code == 200) {
						this.$delete(this.dataList, index)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	::v-deep .header {
		border-radius: 0px !important;
		top: 0px !important;
		border: none !important;
	}

	.care-box {
		width: 100%;
		height: var(--vh);
		position: absolute;
		display: flex;
		flex-direction: column;
		background: var(--theme-auxiliary-color-default);

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

		.z-paging {
			background: var(--theme-auxiliary-color-default);
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;
		}

		.list-box {
			.list-item:last-child:after {
				display: none;
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
							background: var(--theme-auxiliary-color-default);
							font-size: 24rpx;
							color: #404040;
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
		}
	}
</style>
