<template>
	<view class="notice-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :isFixed="true">
			<block slot="center">
				<view class="tab-box">
					<view class="nav">
						<view v-for="(item, index) in headerTab" :key="index"
							:class="item.key === current ? 'nav-item active' : 'nav-item'" @click="onSwitch(index)">
							{{ item.name }}
						</view>
					</view>
				</view>
			</block>
			<block slot="right">
				<view class="kefu" @click="$routerUtils.toUrl('/pages/common/userCenter/service/index')">
					<text class="text">{{ $t("pages.liuhe.notice.index.text1") }}</text>
				</view>
			</block>
		</Header>
		<z-paging ref="paging" v-model="noticeList" @query="getList" :lower-threshold="10" :refresher-enabled="true"
			:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
			:refresher-default-text="zpageUIConfig['refresher-default-text']"
			:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
			:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-default-style="themeColor.themeAuxiliaryColorDefault"
			:refresher-img-style="zpageUIConfig['refresher-img-style']"
			:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']" show-refresher-when-reload
			:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
			:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
			:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': themeColor.themeAuxiliaryColorDefault }"
			:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
			:show-loading-more-no-more-view="true" :loading-more-no-more-text="$t('pages.liuhe.notice.index.text2')"
			:hide-empty-view="false" :empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:empty-view-img="'/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }"
			:empty-view-img-style="{ 'width': '400rpx', 'height': '400rpx' }"
			:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }"
			class="list-box" :style="{height:` calc(${uWindowHeight}px - 120rpx + ${windowBottom/2}px`}">
			<view class="list-row" :class="{ 'list-flex': current == 2 && isEdit }" v-for="(item, index) in noticeList">
				<view class="checkbox-item" v-show="current == 2 && isEdit">
					<view @click="choseInfo(item.id)" v-if="checkData.indexOf(item.id) !== -1">
						<image src="/static/img/liuhe/notice/check.png"></image>
					</view>
					<view @click="choseInfo(item.id)" v-else>
						<image src="/static/img/liuhe/notice/ncheck.png"></image>
					</view>
				</view>
				<view class="list-item" :class="{ 'list-item-rigth': current == 2 && isEdit }">
					<view class="title">
						<svg v-if="current == 1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
							viewBox="0 0 24 24" fill="none">
							<g clip-path="url(#clip0_18474_32507)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M5.26661 6.23786C8.90459 5.94174 16.5613 4.76574 18.0842 2.43067C19.9878 -0.488177 23.2873 0.780885 23.7315 5.03225C24.0897 8.46072 24.0893 12.3114 23.7315 15.7362C23.2873 19.9875 19.9878 21.2566 18.0842 18.3378C16.5613 16.0027 8.90459 14.8267 5.26661 14.5306V6.23786ZM8.56616 22.716C8.30015 22.3909 7.81386 21.6941 7.27402 20.9205C6.65492 20.0333 5.9654 19.0452 5.45696 18.4012C4.88588 17.6431 4.50516 16.7514 5.45696 16.7514C6.40875 16.7514 7.93163 17.3225 9.51796 18.8454C11.1043 20.3683 12.3099 22.716 11.8023 23.0967C11.2946 23.4775 9.13724 23.414 8.56616 22.716ZM3.68028 6.28167C1.64772 6.28167 0 7.92939 0 9.96195V10.5965C0 12.629 1.64772 14.2768 3.68028 14.2768V6.28167Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_18474_32507">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							fill="none">
							<g clip-path="url(#clip0_18474_32380)">
								<path
									d="M23.98 5.19003C23.915 5.72756 23.6774 6.24495 23.27 6.65496L13.7675 16.1575C12.795 17.13 11.205 17.13 10.2325 16.1575L0.729966 6.65496C0.319957 6.24495 0.0824777 5.72495 0.0200414 5.19003C0.00747364 5.29255 0 5.39504 0 5.50004V18.5C0 19.875 1.12493 21.0001 2.50007 21.0001H21.5001C22.8749 21.0001 24 19.875 24 18.5V5.50004C24 5.39504 23.9925 5.29255 23.98 5.19003ZM13.7675 14.3375L23.73 4.37497C23.3174 3.56002 22.47 3 21.5001 3H2.50007C1.53011 3 0.682443 3.56002 0.270088 4.37497L10.2325 14.3375C11.2049 15.3101 12.795 15.3101 13.7675 14.3375Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_18474_32380">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<!-- <image v-if="current == 1" src="/static/img/liuhe/notice/laba_n.png"></image>
						<image v-else src="/static/img/liuhe/notice/msg_n.png"></image> -->
						<view class="title-text">
							{{ item.title }}
						</view>
						<view v-if="current == 1" class="top-lable">
							<image src="/static/img/liuhe/notice/top.png" mode="widthFix"></image>
						</view>
						<view v-else :class="item.isRead ? 'red' : 'not-red'">
							{{ item.isRead ? $t('pages.liuhe.notice.index.text3') : $t('pages.liuhe.notice.index.text4') }}
						</view>
					</view>
					<view class="content-box" @click="detail(item)"
						:style="current == 2 && 'border: rgba(244, 244, 244, .3)'">
						<view class="left">
							<view class="content">
								{{ current == 1 ? item.noticeContent : item.content }}
							</view>
							<view class="time">
								{{ item.createTime ? item.createTime.replaceAll("-", ".") : "" }}
							</view>
						</view>
						<view class="right">
							<uni-icons class="right-icon" type="right"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		listByPage,
		msgList,
		delMessage,
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.liuhe.notice.index.text5"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				current_curr: 0,
				headerTab: [{
						key: 1,
						name: this.$t("pages.liuhe.notice.index.text5"),
					},
					{
						key: 2,
						name: this.$t("pages.liuhe.notice.index.text6"),
					},
				],
				titleStyle: {
					'font-weight': 500,
					'font-size': '32rpx',
					'line-height': '45rpx',
					'color': '#FFFFFF'
				},
				current: 1,
				isEdit: false,
				noticeList: [],
				checkData: [],
			}
		},
		computed: {
			...mapGetters(["themeColor", 'uWindowHeight','windowBottom']),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onShow(option) {
			this?.$refs?.paging?.reload()
			// this.onSwitch(parseInt(option.type))
			if (option?.type) {
				this.onSwitch(parseInt(option.type))
			}
		},

		methods: {
			onSwitch(curr) {
				this.current = this.headerTab[curr].key;
				this.$refs.paging.reload()
			},
			choseAll() {
				this.checkData = [];
				this.noticeList.forEach((item, index) => {
					this.checkData.push(item.id)
				})
			},
			choseInfo(id) {
				let removedIndex = this.checkData.indexOf(id);
				if (removedIndex !== -1) {
					this.checkData = this.checkData.splice(removedIndex, 1);
				} else {
					this.checkData.push(id)
				}
			},
			cancel() {
				this.checkData = [];
				this.isEdit = false
			},
			cancelAll() {
				pop(this.$t("pages.liuhe.notice.index.text7"));
				this.checkData = [];
			},
			del() {
				if (this.checkData.length < 1) return pop(this.$t("pages.liuhe.notice.index.text8"));
				let ids = this.checkData.join(",")
				let prams = {
					ids: ids
				}
				delMessage(prams).then(res => {
					if (res.code == 200) {
						this.$refs.paging.reload()
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getList(pageNo) {
				if (this.current == 1) {
					this.getListByPage(pageNo)
				} else {
					this.getMessageList(pageNo)
				}
			},
			getListByPage(pageNo) {
				let prams = {
					pageNum: pageNo,
					pageSize: 10,
				}
				listByPage().then(res => {
					if (res.code === 200) {
						this.$refs.paging.complete(res.result.records);
					} else {
						this.$refs.paging.complete([]);
					}
				})
			},
			//加载站内信
			getMessageList(pageNo) {
				msgList({
					pageNum: pageNo,
					projectType: 2
				}).then(res => {
					if (res.code === 200) {
						this.$refs.paging.complete(res.result.records);
					} else {
						this.$refs.paging.complete([]);
					}
				})
			},
			//详情
			detail(item) {
				let url = ""
				if (this.current === 1) {
					url = "./detail?id=" + item.id
				} else {
					url = "./msg?id=" + item.id
				}

				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-div-radius {
		background-color: #fff;
		height: 20rpx;
		width: 100%;
		position: fixed;
		top: 108rpx;
		z-index: 12;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;

	}

	::v-deep .tab-div-bg {
		border-radius: 0;
		z-index: 11;
	}

	.nav-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		.nav-tabs {
			display: flex;
			border-radius: 16rpx;
			margin: 0 auto;
			border: 1px solid #fff;
			background: var(--theme-auxiliary-color-default);

			.nav-tabs-item {
				font-size: 28rpx;
				width: 140rpx;
				text-align: center;
				display: block;
				padding: 9rpx;
				transition: .3s;
			}

			// .nav-tabs-item:nth-child(1) {
			// 	border-top-left-radius: 50rpx;
			// 	border-bottom-left-radius: 50rpx;
			// }

			// .nav-tabs-item:nth-child(2) {
			// 	border-top-right-radius: 50rpx;
			// 	border-bottom-right-radius: 50rpx;
			// }

			.nav-tabs-item.active {
				background: var(--theme-color);
				color: #fff;
				transition: .3s;
				border-radius: 12rpx;
			}
		}
	}

	.notice-box {
		background: var(--theme-auxiliary-color-default);



		::v-deep .header {
			grid-template-columns: repeat(3, 20% 60% 20%);

			.u-item-bg {
				border-radius: 12rpx !important;
				height: 56rpx !important;
			}
		}

		.header-tab {
			width: 316rpx;
			height: 68rpx !important;
			box-sizing: border-box;
			margin: 0 auto;
			border-radius: 16rpx !important;
		}

		.tab-box {
			width: fit-content;
			box-sizing: border-box;
			margin: 0 auto;

			.nav {
				box-sizing: border-box;
				height: 68rpx;
				border-radius: 16rpx;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				justify-content: space-around;
				background: var(--theme-auxiliary-color-default);
				margin: 0 22rpx;
				padding: 0 6rpx;

				.nav-item {
					width: 138rpx;
					height: 56rpx;
					text-align: center;
					font-size: 28rpx;
					color: #404040;
					display: grid;
					place-content: center;

					&:last-child {
						border: 0px;
					}
				}

				.active {
					background-color: #fff;
					color: var(--theme-color);
					border-radius: 12rpx;
				}
			}
		}

		.bar-tool {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.switch-btn {
			height: 62rpx;
			width: 300rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.site-text {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 150rpx;
				height: 62rpx;
				background: #1794ff;
				border: 1px solid #FFFFFF;
				font-weight: 500;
				font-size: 24rpx;

				&:first-child {
					border-radius: 50rpx 0px 0px 50rpx;
				}

				&:last-child {
					border-radius: 0px 50rpx 50rpx 0px;
				}
			}

			.act {
				background: #FFFFFF;
				color: #03536E;
			}
		}

		.kefu {
			display: flex;

			justify-content: flex-end;

			.text {
				color: var(--theme-color);

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}

		.edit-box {
			margin-right: 20rpx;
			text-align: right;

			.text {
				font-size: 30rpx;
				color: #404040;
			}
		}

		.list-box {
			height: calc(var(--vh) - 140rpx + var(--safe-area-inset-bottom));
			margin-top: 20rpx;
			background: var(--theme-auxiliary-color-default);
			border-radius: 24rpx;
			overflow: hidden;
			padding-bottom: var(--safe-area-inset-bottom);

			.list-flex {
				display: flex;
			}

			.list-row {
				margin-top: 20rpx;

				&:first-child {
					margin-top: 0;
				}

				.checkbox-item {
					width: 15%;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						height: 40rpx;
						width: 40rpx;
					}
				}

				.list-item-rigth {
					width: 80%;
				}

				.list-item {
					background: #fff;
					border-radius: 24rpx;
					padding: 0 28rpx;

					.title {
						padding: 20rpx 0;
						display: flex;
						align-items: center;
						position: relative;

						image {
							height: 48rpx;
							width: 48rpx;
						}

						.title-text {
							margin-left: 20rpx;
							width: 528rpx;
							font-style: normal;
							font-weight: 400;
							font-size: 30rpx;
							color: #404040;
							overflow: hidden; //超出的文本隐藏
							text-overflow: ellipsis; //溢出用省略号显示
							white-space: nowrap; // 默认不换行；
						}

						.top-lable {
							color: var(--theme-color);


							font-style: normal;
							font-weight: 400;
							line-height: normal;

							position: absolute;
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;

							// background: var(--theme-color);
							// border-radius: 12rpx;
							// font-weight: 400;
							// font-size: 24rpx;
							right: 0;
							width: 80rpx;
							height: 40rpx;

							image {
								width: 80rpx;
								height: 40rpx;
							}
						}

						.not-red {
							position: absolute;
							display: flex;
							padding: 4rpx 16rpx;
							align-items: center;
							gap: 20rpx;
							border-radius: 12rpx;
							background: var(--theme-color);
							color: #FFF;

							font-size: 24rpx;
							font-style: normal;
							font-weight: 400;
							line-height: normal;
							right: 0;
						}

						.red {
							position: absolute;
							display: flex;
							padding: 4rpx 16rpx;
							align-items: center;
							gap: 20rpx;
							border-radius: 12rpx;
							background: #A1A1A1;
							color: #FFF;

							font-size: 24rpx;
							font-style: normal;
							font-weight: 400;
							line-height: normal;
							right: 0;
						}
					}

					.content-box {
						display: flex;
						align-items: center;
						border-top: 1px solid var(--theme-auxiliary-color-default) !important;
						padding: 20rpx 0;

						.left {
							display: flex;
							flex-direction: column;
							justify-content: center;
							width: 80%;
							font-weight: 400;
							font-size: 24rpx;
							color: #666666;

							.content {
								overflow: hidden; //超出的文本隐藏
								text-overflow: ellipsis; //溢出用省略号显示
								white-space: nowrap; // 默认不换行；
								color: #404040;

								font-size: 28rpx;
								font-style: normal;
								font-weight: 400;
								line-height: normal;
							}

							.time {
								margin-top: 10rpx;
								color: #404040;

								font-size: 24rpx;
								font-style: normal;
								font-weight: 400;
								line-height: normal;
							}
						}

						.right {
							position: absolute;
							right: 16rpx;

							.right-icon {
								font-size: 40rpx !important;
								color: #404040 !important;
							}
						}
					}
				}
			}
		}

		.footer {
			.footer-box {
				height: 80rpx;
				position: fixed;
				bottom: 0;
				width: 100%;
				max-width: 480px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0px;
				background: #FFFFFF;
				z-index: 20;

				.all {
					font-weight: 400;
					font-size: 30rpx;
					/* identical to box height */
					color: #DF2939;
					margin: 20rpx;
				}

				.delete {}
			}
		}
	}
</style>
