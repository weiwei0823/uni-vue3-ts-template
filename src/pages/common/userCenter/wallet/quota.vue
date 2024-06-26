<template>
	<view class="wallet-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<!-- <scroll-view scroll-y class="content"> -->
		<view class="content">
			<view class="header">
				<view class="left">
					<view class="title">
						<view>{{$t("pages.common.userCenter.wallet.quota.Balance")}}</view>
						<view class="balance-box">
							<u-count-to class="balance" :decimals="2" :start-val="0" :end-val="balance"
								v-if="!loading"></u-count-to>
							<u-loading :show="loading" size="24"></u-loading>
						</view>
						<svg :class="{ run: loading }" @click="getInit()" xmlns="http://www.w3.org/2000/svg" width="20"
							height="21" viewBox="0 0 20 21" fill="none">
							<path
								d="M4.55185 4.19352C6.06398 2.88324 7.9985 2.16323 9.99935 2.16602C14.6018 2.16602 18.3327 5.89686 18.3327 10.4994C18.3327 12.2794 17.7743 13.9294 16.8244 15.2827L14.166 10.4994H16.666C16.6661 9.19238 16.2821 7.91419 15.5616 6.82374C14.8411 5.73328 13.816 4.87866 12.6137 4.36613C11.4114 3.8536 10.0849 3.70578 8.79931 3.94104C7.51368 4.1763 6.32556 4.78427 5.38268 5.68936L4.55185 4.19352ZM15.4468 16.8052C13.9347 18.1155 12.0002 18.8355 9.99935 18.8327C5.39685 18.8327 1.66602 15.1019 1.66602 10.4994C1.66602 8.71936 2.22435 7.06936 3.17435 5.71602L5.83268 10.4994H3.33268C3.33258 11.8063 3.71664 13.0845 4.43713 14.175C5.15762 15.2654 6.18274 16.1201 7.38503 16.6326C8.58733 17.1451 9.91375 17.2929 11.1994 17.0577C12.485 16.8224 13.6731 16.2144 14.616 15.3094L15.4468 16.8052Z"
								fill="#A1A1A1" />
						</svg>
						<!-- 	<image class="refshs" :class="{ run: loading }" src="@/static/img/liuhe/refresh_n.png"
							@click="getInit()">
						</image> -->
					</view>
					<view class="tip">{{$t("pages.common.userCenter.wallet.quota.desc")}}</view>
				</view>
				<view class="btn" @click="rollInBack()">
					<image class="btn-icon" src="/static/img/liuhe/activity/quota/ico_hs_01.png"></image>
					{{$t("pages.common.userCenter.wallet.quota.Recycle")}}
				</view>
			</view>
			<view class="list-box">
				<scroll-view scroll-y class="category-list" :style="{height:`calc(${uWindowHeight}px - 270rpx)`}">
					<view class="item" :class="{ selected: categoryId === 0 }" @click="categoryId = 0">
						<image class="img"
							:src="`/static/img/liuhe/activity/quota/${categoryId === 0 ? '' : 'ac'}0.png`">
						</image>
						<view class="name">
							{{$t("pages.common.userCenter.wallet.quota.all")}}
						</view>
					</view>
					<view class="item" :class="{ selected: categoryId === item.id }"
						v-for="(item, index) in categoryList" :key="index" @click="categoryId = item.id">
						<image class="img"
							:src="`/static/img/liuhe/activity/quota/${categoryId === item.id ? item.id : 'ac' + item.id}.png`">
						</image>
						<view class="name">{{ item.name }}</view>
					</view>
				</scroll-view>

				<view class="right">
					<uni-search-bar class="search" bgColor="#fff" radius="10"
						:placeholderStyle="'color:rgba(37, 98, 86, 0.75);font-size: 24rpx;'" placeholder="平台搜索"
						clearButton="none" cancelButton="none" v-model="platformName" @confirm="getInit" />
					<scroll-view scroll-y :style="{height:`calc(${uWindowHeight}px - 88rpx - 290rpx)`, borderRadius: '16rpx', overflow: 'hidden'}" :enhanced="true"
						:bounces="false" :show-scrollbar="false">
						<Empty v-if="!loading && !list.length" />
						<view class="loding" v-if="loading">
							<image src="/static/img/loading_v1.gif"></image>
							<text class="text">
								{{$t("pages.common.userCenter.wallet.quota.loading")}}
							</text>
						</view>
						<view class="list" v-else>
							<view class="item" v-for="(item, index) in list" :key="index">
								<view class="title">
									<image class="img" :src="item.logo"></image>
									<view class="name">{{ item.platformName }}</view>
									<!-- <filterIcon /> -->
									<!-- <filterIcon src="/static/img/liuhe/activity/quota/ico_hs_02.png" :width="32"
									:height="32" /> -->
									<view class="img-ico" @click="rollInBack(item)"
										:class="{ run: curr === item.platformId || currAll }">
										<filterIcon src="/static/img/liuhe/activity/quota/ico_hs_02.png" :width="32"
											:height="32" />
									</view>
									<!-- <image class="img-ico" :class="{ run: curr === item.platformId || currAll }"
									src="/static/img/liuhe/activity/quota/ico_hs_02.png" @click="rollInBack(item)">
								</image> -->
								</view>
								<view class="divider"></view>
								<view class="tip" :class="{ tip1: item.text === '已回收' }">{{ item.text }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- </scroll-view> -->
		<AlertInjectLayer />
		<new-loading></new-loading>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import NavBar from "@/components/common/navBar/navBar";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"

	import {
		initQuota,
		rollIn
	} from "@/utils/lottery/mine";
	import {
		mapGetters
	} from 'pinia';
	import Empty from '@/components/common/empty/empty'
	export default {
		name: "quota",
		components: {
			AlertInjectLayer,
			NavBar,
			Empty,
			Header
		},
		computed: {
			...mapGetters(['themeColor', 'uWindowHeight']),
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.common.userCenter.wallet.quota.title"),
				headerStyle: {
					backgroundColor: "#ffffff",
					height: "88rpx"
				},
				titleStyle: {
					color: "#000000",
					fontSize: "34rpx",
					weight: 600
				},
				loading: false,
				isRoll: false,
				platformName: '',
				categoryId: 0,
				curr: 0,
				currAll: false,
				balance: '',
				categoryList: [],
				list: [],
			}
		},
		onLoad(option) {
			this.getInit()
		},
		watch: {
			categoryId(val) {
				this.getInit()
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			getInit() {
				this.loading = true
				const params = {
					platformId: !!this.platformId,
					platformName: this.platformName
				}
				if (this.categoryId) {
					params.categoryId = this.categoryId
				}
				initQuota(params).then(res => {
					this.balance = res.result.balance
					this.categoryList = res.result.categoryList
					this.list = res.result.list
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			},
			async rollInBack(item = null) {
				if (this.isRoll) {
					pop(this.$t("pages.common.userCenter.wallet.quota.loadingText"), 2000)
					return false
				}
				this.$loading(true, this.$t("pages.common.userCenter.wallet.quota.loadingText"))

				this.isRoll = true
				let params = {}
				if (this.categoryId) {
					params.categoryId = this.categoryId
				}
				if (item) {
					this.curr = item.platformId
					params.platformId = item.platformId
				} else {
					this.currAll = true
				}
				const res = await rollIn(params).catch(err => {
					console.log(err)
				})
				this.$loading(false);
				if (res.code == 200) {
					this.balance = res.result.balance;
					this.categoryList = res.result.categoryList;
					// this.list = res.result.list
					let resultMap={};
					let resultList = res.result.list;
					let freshedList = [];
					for(let key in resultList){
						let platInfo = resultList[key];
						if(platInfo && platInfo.platformId) resultMap[platInfo.platformId] = platInfo;
					}
					for (let index in this.list){
						let memInfo = this.list[index];
						if(memInfo&&memInfo.platformId){
							let memPlatformId = memInfo.platformId;
							let syncInfo = resultMap[memPlatformId];
                            //避免前后返回不一致 导致数据缺失UI出现抖动的情况
                            freshedList.push(!syncInfo?memInfo:syncInfo);
						}
					}
					this.list = freshedList;
				}
				pop(res.message, 2000)
				this.isRoll = false
				this.curr = 0
				this.currAll = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .empty-box {
		height: calc(var(--vh) - 512rpx)
	}

	/deep/ .uni-input-placeholder {
		color: #A1A1A1 !important;
	}

	/deep/ .uniui-search {
		color: #A1A1A1 !important;
		font-size: 20px !important;
		font-weight: bold;
	}

	.wallet-box {
		background: #f6f6f6;
		height: var(--vh);

		.content {
			/*padding: 10rpx;*/
			display: flex;
			flex-direction: column;
			/*gap: 20rpx;*/
			height: calc(var(--vh) - 120rpx);
			margin-top: 20rpx;

			.header {
				display: flex;
				justify-content: space-between;
				padding: 19rpx 28rpx;
				background: #FFFFFF;
				border-radius: 24rpx;
				align-items: center;
				height: 128rpx;
				box-sizing: border-box;

				.left {
					display: flex;
					flex-direction: column;
					gap: 10rpx;
					width: 444rpx;
					height: 90rpx;

					.title {
						display: flex;
						align-items: center;
						gap: 10rpx;
						font-size: 30rpx;
						color: #444444;
						line-height: 40rpx;

						.balance-box {
							display: flex;
							align-items: center;
							gap: 10rpx;
							min-width: 100rpx;
							justify-content: center;

							.balance {
								color: #ffd43d !important;
								font-size: 30rpx !important;
							}

							.balance:before {
								content: '¥';
							}

						}

						.refshs {
							width: 30rpx;
							height: 30rpx;
							filter: brightness(0.5);
						}
					}

					.tip {
						font-size: 24rpx;
						color: #999999;
						line-height: 25rpx;
					}

				}

				.btn {
					box-sizing: border-box;
					background: var(--theme-color);
					border-radius: 16rpx;
					font-size: 28rpx;
					line-height: 28rpx;
					color: #FFFFFF;
					display: flex;
					gap: 10rpx;
					width: 198rpx;
					height: 68rpx;
					align-items: center;
					justify-content: center;

					.btn-icon {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

			.list-box {
				display: flex;
				/*gap: 20rpx;*/
				/*flex: 1;*/
				/*底部gap失效导致贴紧*/
				margin-top: 20rpx;
				justify-content: center;
				padding: 0rpx 28rpx;

				.category-list {
					width: 160rpx;
					display: flex;
					flex-direction: column;
					flex-shrink: 0;
					border-radius: 16rpx;
					overflow: hidden;

					.item {
						flex-shrink: 0;
						height: 104rpx;
						width: 160rpx;
						background: #FFFFFF;
						margin-bottom: 20rpx;
						border-radius: 16rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						/*padding: 0 15px;*/
						box-sizing: border-box;
						flex-direction: column;

						.img {
							width: 44rpx;
							height: 44rpx;
							flex-shrink: 0;
						}


						.name {
							font-size: 24rpx;
							line-height: 34rpx;
							color: #666666;
							white-space: nowrap;
						}
					}

					.selected {
						/*background: linear-gradient(180deg, #4FACFD 0%, #4FACFD 0%, #20B5FA 0.01%, #0089FF 100%);*/
						background: var(--theme-color);

						.name {
							color: #fff;
						}
					}
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					width: 516rpx;
					margin-left: 20rpx;

					.search {
						flex-shrink: 0;
						padding: 0;
						overflow: hidden;
						margin-bottom: 20rpx;
						height: 88rpx;
						display: flex;
						align-items: center;
						background: #ffffff;
						border-radius: 16rpx;

						/deep/ .uni-searchbar__box {
							flex-direction: row-reverse;

							.uni-searchbar__box-search-input {
								padding-left: 20rpx;
							}
						}
					}

					.loding {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 100%;
						flex-direction: column;

						image {
							width: 100rpx;
							height: 76rpx;
						}

						.text {
							font-weight: 400;
							font-size: 24rpx;
							color: #555555;
						}
					}

					.list {
						display: grid;
						grid-template-columns: repeat(2, 1fr);
						gap: 20rpx;
						overflow: auto;
						height: fit-content;
						// max-height: calc(var(--vh) - 360rpx);

						.item {
							background: #FFFFFF;
							border-radius: 10rpx;
							width: 248rpx;

							/*height: 124rpx ;*/
							.title {
								display: flex;
								align-items: center;
								gap: 20rpx;
								padding: 0rpx 10rpx;
								height: 72rpx;
								width: 208rpx;
								margin: auto;

								.img {
									width: 32rpx;
									height: 32rpx;
									flex-shrink: 0;
								}

								.img-ico {
									width: 32rpx;
									height: 32rpx;
									line-height: 0;
								}

								.name {
									font-size: 24rpx;
									line-height: 34rpx;
									color: #404040;
									flex: 1;
									white-space: nowrap;
									max-width: 18vw;
									overflow: hidden;
									text-overflow: ellipsis;
									// margin-top: 12rpx;
								}
							}

							.divider {
								border-top: 1px solid #eee;
							}

							.tip {
								height: 52rpx;
								padding: 0rpx 10rpx;
								font-size: 20rpx;
								line-height: 50rpx;
								color: var(--theme-auxiliary-color-remind);
								max-width: 248rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.tip1 {
								color: var(--theme-auxiliary-color-remind);
							}
						}
					}
				}
			}
		}

		.run {
			animation: rotate 1s linear infinite;
		}

		@keyframes rotate {
			0% {
				-webkit-transform: rotate(0deg);
			}

			25% {
				-webkit-transform: rotate(90deg);
			}

			50% {
				-webkit-transform: rotate(180deg);
			}

			75% {
				-webkit-transform: rotate(270deg);
			}

			100% {
				-webkit-transform: rotate(360deg);
			}
		}
	}
</style>
