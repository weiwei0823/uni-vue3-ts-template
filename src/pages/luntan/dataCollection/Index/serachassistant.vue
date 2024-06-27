<template>
	<view class="mint-tab-container-item pc-max-width" :style="{ position: `fixed`, width:'100%' }"
		:class="['theme-' + themeColor.name]">
		<!-- <NavBar :title="title"></NavBar> -->
		<Header :title="title" :headerStyle="{borderRadius:0,top:0}" :headerInnerStyle="{borderRadius:0}" isFixed />
		<view class="search-row">
			<uni-search-bar :bgColor="themeColor.themeAuxiliaryColorDefault" v-model="prams.title"
				:searchHeigth="'72rpx'" :placeholder="searchTitle" :placeholder-style="'color:#cbc9d6'"
				:cancelStyle="{ 'line-height': '60rpx','background-color':themeColor.themeAuxiliaryColorDefault, 'padding': '0 10px', 'color': themeColor.themeColor, 'font-size': '14px' }"
				cancelButton="always" :cancelText="$t('pages.luntan.dataCollection.index.searchAssistant.search')"
				@confirm="search" @cancel="search" @clear="clear">
				<template v-slot:searchIcon>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
							fill="#A1A1A1" />
					</svg>
					<!-- <uni-icons color="#323233" size="16" type="search" /> -->
				</template>
			</uni-search-bar>
		</view>
		<z-paging :style="{height:`calc(${uWindowHeight}px - 46px - 50px)`}" class="paging"
			style="background: #fff;z-index: 1" ref="paging" v-model="list" @query="searchList"
			:refresher-enabled="true" :hide-empty-view="true" :empty-view-center="true"
			:empty-view-text="$t('pages.luntan.dataCollection.index.searchAssistant.notFound')"
			:hide-no-more-inside="true" :empty-view-img="'@/static/img/wu.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }" :refresher-only="!prams.title" show-refresher-when-reload
			refresher-fixed-bac-height="400" :empty-view-img-style="{ 'width': '128rpx', 'height': '130rpx' }"
			:empty-view-title-style="{ 'color': ' #a0a0a0', 'font-size': '32rpx', 'line-height': '44rpx', 'margin-top': '28rpx' }">
			<template #refresher>
				<LuntanLoading class="loading" :text="'搜索中'" />
			</template>
			<uni-list class="list-row" v-if="list.length">
				<uni-list-item class="list-item" direction="column" v-for="(item, index) in list">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="list-header" @click="detail(item)">
							<image class="slot-image" :src="item.headPic" mode="widthFix"></image>
							<view class="cell-top-text">
								<p>{{ item.username }}</p>
								<view class="time">{{ $u.timeFormat(item.createTime,"yyyy-mm-dd hh:MM") }}</view>
							</view>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="content-box has-read" @click="detail(item)">
							<p>{{ item.title }}</p>
						</view>
					</template>
					<!-- 自定义 footer-->
					<template v-slot:footer>
						<view class="operation-box clearfix" @click="detail(item)">
							<view class="good">
								<uni-icons class="icon" type="hand-up-filled" size="17"></uni-icons>
								{{ item.thumbUpCount }}
							</view>
							<view class="comment">
								<uni-icons class="icon" custom-prefix="iconfont" type="pinglun" size="17"></uni-icons>
								{{ item.commentCount }}
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<empty v-if="!loading&&list.length<=0" :customStyle="{position: `fixed`,height: emptyHeight}"></empty>
		</z-paging>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		searchList
	} from "@/utils/data/index.js";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Header from '@/components/common/header/index.vue';
	import {
		mapGetters
	} from 'pinia';
	import Empty from "@/components/common/empty/empty";
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "serachassistant",
		components: {
			AlertInjectLayer,
			Header,
			Empty
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				title: this.$t('pages.luntan.dataCollection.index.searchAssistant.queryAssistant'),
				searchTitle: this.$t('pages.luntan.dataCollection.index.searchAssistant.enterSearch'),
				prams: {
					articleTypeId: 0,
					type: 4,
					pageNum: 1,
					pageSize: 10,
					title: '',
					year: (new Date().getFullYear())
				},
				list: [],
				loading: false,
				emptyHeight: 0
			}
		},
		onLoad(option) {
			this.prams.type = option.type
			this.prams.articleTypeId = option.articleTypeId;
			this.prams.year = option.year || this.prams.year;
			this.emptyHeight = `calc(${this.uWindowHeight}px - 200rpx)`
		},
		methods: {
			search() {
				this.$refs.paging.reload()
			},
			detail: function(item) {
				const that = this
				item.read = 1
				uni.navigateTo({
					url: '/pages/luntan/masterForum/detail?id=' + item.articleId + '&type=4&createTime=' + item
						.createTime,
					success: function(res) {
						res.eventChannel.emit('argParams', {
							lotteryType: that.lotteryType
						})
					}
				})
			},
			//列表获取
			searchList: function(pageNo, pageSize = 10) {
				if (!this.prams.title) {
					this.$refs.paging.complete([]);
					return false
				}
				this.prams.pageNum = pageNo
				let prams = this.prams
				this.loading = true;
				searchList(prams).then(res => {
					this.$refs.paging.complete(res.result.list);
					this.loading = false;
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-tab-container-item {}

	.paging {
		height: calc(var(--vh) - 46px - 50px);
		background-color: var(--theme-auxiliary-color-default) !important;
	}

	.search-row {
		background-color: #fff;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}

	::v-deep .uni-searchbar {
		border-radius: 16rpx;
		overflow: hidden;
	}

	::v-deep .uni-searchbar__box {
		// background-color: var(--theme-auxiliary-color-default) !important;
		border-radius: 0 !important;
		border-top-left-radius: 16rpx !important;
		border-bottom-left-radius: 16rpx !important;
	}

	::v-deep .uni-searchbar__cancel {
		border-top-right-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}

	.list-row {
		.list-item {
			.list-header {
				display: flex;

				.slot-image {
					height: 84rpx;
					width: 84rpx;
					margin-right: 20rpx;
				}

				.cell-top-text {
					display: inline-block;

					p {
						font-size: 28rpx;
						line-height: 40rpx;
						color: #404040;
						margin-bottom: 6rpx;
					}

					.time {
						font-size: 24rpx;
						line-height: 34rpx;
						color: #888;
					}
				}
			}

			.content-box {
				margin: 18rpx 0;
				color: #404040;
				line-height: 44rpx;
				font-size: 32rpx;
			}

			.operation-box {
				color: #888;
				font-size: 24rpx;
				line-height: 40rpx;

				.good,
				.comment {
					margin-right: 40rpx;
					float: left;

					.icon {
						color: #888 !important;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
