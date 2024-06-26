<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight,height:`calc(${uWindowHeight}px)` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title">
			<block slot="right">
				<!-- <picker style="text-align: right" @change="bindPickerChange" :value="index" :range="array"> -->
				<view style="text-align: right">
					<svg v-show="active == 0" @click="handlePickerShow" xmlns="http://www.w3.org/2000/svg" width="22"
						height="22" viewBox="0 0 22 22" fill="none">
						<g clip-path="url(#clip0_20544_163659)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0019C7.28243 11.0019 7.48763 11.2071 7.48763 11.4602V14.2102C7.48763 14.4633 7.28243 14.6685 7.0293 14.6685H4.2793C4.02617 14.6685 3.82096 14.4633 3.82096 14.2102V11.4602C3.82096 11.2071 4.02617 11.0019 4.2793 11.0019H7.0293ZM7.0293 15.8914C7.28243 15.8914 7.48763 16.0966 7.48763 16.3497V19.0997C7.48763 19.3528 7.28243 19.558 7.0293 19.558H4.2793C4.02617 19.558 3.82096 19.3528 3.82096 19.0997V16.3497C3.82096 16.0966 4.02617 15.8914 4.2793 15.8914H7.0293ZM9.7793 11.0019C9.52617 11.0019 9.32096 11.2071 9.32096 11.4602V14.2102C9.32096 14.4633 9.52617 14.6685 9.7793 14.6685H12.5293C12.7824 14.6685 12.9876 14.4633 12.9876 14.2102V11.4602C12.9876 11.2071 12.7824 11.0019 12.5293 11.0019H9.7793ZM12.5293 15.8914C12.7824 15.8914 12.9876 16.0966 12.9876 16.3497V19.0997C12.9876 19.3528 12.7824 19.558 12.5293 19.558H9.7793C9.52617 19.558 9.32096 19.3528 9.32096 19.0997V16.3497C9.32096 16.0966 9.52617 15.8914 9.7793 15.8914H12.5293ZM15.2793 11.0019C15.0262 11.0019 14.821 11.2071 14.821 11.4602V14.2102C14.821 14.4633 15.0262 14.6685 15.2793 14.6685H18.0293C18.2824 14.6685 18.4876 14.4633 18.4876 14.2102V11.4602C18.4876 11.2071 18.2824 11.0019 18.0293 11.0019H15.2793ZM18.0293 15.8914C18.2824 15.8914 18.4876 16.0966 18.4876 16.3497V19.0997C18.4876 19.3528 18.2824 19.558 18.0293 19.558H15.2793C15.0262 19.558 14.821 19.3528 14.821 19.0997V16.3497C14.821 16.0966 15.0262 15.8914 15.2793 15.8914H18.0293Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_20544_163659">
								<rect width="22" height="22" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</view>
				<!-- </picker> -->
			</block>
		</Header>
		<u-select closeIcon class="year-select" v-model="pickerShow" :list="array"
			@confirm="bindPickerChange"></u-select>
		<view class="top-box">
			<view :class="{ active: active == 0 }" @click="active = 0">
				{{ $t("pages.luntan.historyLottery.text0") }}
			</view>
			<view :class="{ active: active == 1 }" @click="active = 1">
				{{ $t("pages.luntan.historyLottery.text1") }}
			</view>
		</view>
		<view v-show="active == 0" class="head-find">
			<view class="title">
				{{ year + $t("pages.luntan.historyLottery.text5") }}
			</view>
			<view class="right-sort">
				<view :span="4">
					<span class="sort" @click="setSort">
						{{
							sort == 0
							? $t("pages.luntan.historyLottery.text6")
							: $t("pages.luntan.historyLottery.text7")
						}}
						<svg class="sort-svg" :class="'sort-svg-' + sort" xmlns="http://www.w3.org/2000/svg" width="13"
							height="14" viewBox="0 0 13 14" fill="none">
							<path
								d="M5.55293 13.2512C5.94633 13.66 6.60068 13.66 6.99408 13.2512L10.4176 9.69338C11.0289 9.05807 10.5786 8 9.69698 8H2.85003C1.96837 8 1.51813 9.05807 2.12945 9.69338L5.55293 13.2512Z"
								fill="#A1A1A1" />
							<path
								d="M5.55293 0.748846C5.94633 0.340013 6.60068 0.340012 6.99408 0.748845L10.4176 4.30662C11.0289 4.94193 10.5786 6 9.69698 6H2.85003C1.96837 6 1.51813 4.94193 2.12945 4.30662L5.55293 0.748846Z"
								fill="#969897" />
						</svg>
					</span>
				</view>
				<view :span="4">
					<span class="center" :class="{ act: wuxing }" @click="wuxing = !wuxing">{{
						$t("pages.luntan.historyLottery.text2") }}</span>
				</view>
				<view :span="6">
					<!-- <rudon-rowMenuDotDotDot :localdata="options" @change="menuAction($event)">
						<span class="border">{{ options[codeSort].text }}</span>
					</rudon-rowMenuDotDotDot> -->
					<view class="selects">
						<uni-data-select stroke="#fff" class="item" ref="selectRef" :clear="false" v-model="codeSort"
							:localdata="options" coustIcon iconSize="mini" @change="menuAction">
							<template #itemImg="item">
								<view class="item-img">
									<image class="img" v-if="item.value === codeSort"
										src="/static/imgs-liuhe/activity/item-selected.png">
									</image>
								</view>
							</template>
						</uni-data-select>
					</view>
				</view>
			</view>
		</view>
		<view>
			<z-paging v-show="active == 0" :style="{height: getHeight}" class="paging" ref="paging" v-model="dataList"
				@query="search" show-refresher-when-reload :lower-threshold="10" :auto="false" :refresher-enabled="true"
				:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
				:refresher-default-text="zpageUIConfig['refresher-default-text']"
				:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
				:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']" :refresher-default-style="'#EEEEEE'"
				:refresher-img-style="zpageUIConfig['refresher-img-style']"
				:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
				:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
				:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
				:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': '#EFF6FE' }"
				:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
				:show-loading-more-no-more-view="false"
				:loading-more-no-more-text="$t('components.CommonPages.pages - liuhe.LiuheActivity.NoMoreData')"
				:hide-empty-view="false" :empty-view-center="true"
				:empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '170px' }"
				:empty-view-img-style="{ 'width': '443rpx', 'height': '443rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<view class="body-list">
					<view class="body-list-item" v-for="(item, index) in dataList">
						<view class="hd-text">
							<uni-row class="van-row">
								<uni-col :span="14">
									<span class="title">
										{{
											$t("pages.luntan.historyLottery.text8") +
											item.period +
											$t("pages.luntan.historyLottery.text9")
										}}
									</span>
								</uni-col>
								<uni-col :span="10">
									<span>{{
										$u.timeFormat(item.lotteryTime, "yyyy.mm.dd hh:MM:ss")
									}}</span>
								</uni-col>
							</uni-row>
						</view>
						<view class="border-box">
							<view class="border-box-body">
								<view class="border-box-body-bd">
									<view class="flex-row">
										<view class="var-row-item" v-for="(val, key) in item.numberList.slice(0, 6)">
											<view class="icon-text">
												<view>
													<span :class="'slot-icon bg-amage-' + val.color">
														<span>{{ val.number }}</span>
													</span>
												</view>
												<view class="slot-text">
													{{ val.shengXiao }}
													<span v-show="wuxing">/{{ val.wuXing }}</span>
												</view><!---->
											</view>
										</view>
										<view class="icon-text" style="padding-top: 10rpx">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24"
												viewBox="0 0 25 24" fill="none">
												<path fill-rule="evenodd" clip-rule="evenodd"
													d="M12.5703 3C12.018 3 11.5703 3.44772 11.5703 4V11L4.57031 11C4.01803 11 3.57031 11.4477 3.57031 12C3.57031 12.5523 4.01803 13 4.57031 13H11.5703V20C11.5703 20.5523 12.018 21 12.5703 21C13.1226 21 13.5703 20.5523 13.5703 20V13H20.5703C21.1226 13 21.5703 12.5523 21.5703 12C21.5703 11.4477 21.1226 11 20.5703 11L13.5703 11V4C13.5703 3.44772 13.1226 3 12.5703 3Z"
													fill="#A1A1A1" />
											</svg>
										</view>
										<view class="var-row-item">
											<view class="icon-text">
												<view>
													<span :class="'slot-icon bg-amage-' + item.numberList[6].color
														">
														<span>{{ item.numberList[6].number }}</span>
														<image src="/static/img/liuhe/detail/te.png"></image>
													</span>
												</view>
												<view class="slot-text">
													{{ item.numberList[6].shengXiao }}
													<span v-show="wuxing">/{{ item.numberList[6].wuXing }}</span>
												</view><!---->
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore status="nomore" v-if="nomore" />
				</view>
			</z-paging>
		</view>
		<view v-show="active == 1" class="lottery-date"
			:style="'height: calc(var(--vh) - 50px - 60px - ' + safeHeight + ')'">
			<view class="jianjie">
				<view class="title">{{ $t("pages.luntan.historyLottery.text3") }}</view>
				<view class="text">{{ content }}</view>
			</view>
			<date-item :lottery-type="lotteryType"></date-item>
		</view>
		<!--#ifdef H5-->
		<down v-if="!isApp"></down>
		<!--#endif-->
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index.vue";
	import Notice from "@/components/common/notice/notice";
	import DateItem from "@/components/common/date/dateItem";
	import Down from "@/components/common/down/down";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";

	import {
		listYear,
		historyListYear
	} from "@/utils/live/index";
	import {
		search
	} from "@/utils/lottery/index";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "lottery",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			Notice,
			DateItem,
			Down,
		},
		data() {
			return {
				nomore: false,
				title: this.$t("pages.luntan.historyLottery.text18"),
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				index: 0,
				active: 0,
				array: [],
				lotteryType: 0,
				year: 0,
				sort: 0,
				wuxing: true,
				codeSort: 0,
				pageNum: 1,
				options: [{
						value: 0,
						text: this.$t("pages.luntan.historyLottery.text10"),
					},
					{
						value: 1,
						text: this.$t("pages.luntan.historyLottery.text11"),
					},
					{
						value: 2,
						text: this.$t("pages.luntan.historyLottery.text12"),
					},
				],
				dataList: [],
				content: this.$t("pages.luntan.historyLottery.text13"),
				styleContent: {
					"font-size": "24rpx",
					"line-height": "40rpx",
				},
				pickerShow: false,
				isApp: false
			};
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight", "downloadShow"]),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			getHeight() {
				// const num = this.isApp ? 200 : 300
				// 此处常量有疑义 更换--vh使用 容器高度参与计算 避免APP下safe高度导致的偏差
				const num = 300; // 、、this.isApp ? 300 : 300
				return `calc(${this.uWindowHeight}px - ${num}rpx)`
			},
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		},
		onLoad(option) {
			this.lotteryType = option.lotteryType ? option.lotteryType : this.$config.getStorageSync(this.$config.enumMgr
				.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, 1);
			// this.lotteryType = uni.getStorageSync("lotteryType")
			// 	? uni.getStorageSync("lotteryType")
			// 	: 1;
			// if (this.lotteryType == 1) {
			// 	this.title = this.$t("pages.luntan.historyLottery.text14") + this.title;
			// } else if (this.lotteryType == 2) {
			// 	this.title = this.$t("pages.luntan.historyLottery.text15") + this.title;
			// } else if (this.lotteryType == 3) {
			// 	this.title = this.$t("pages.luntan.historyLottery.text16") + this.title;
			// } else if (this.lotteryType == 5) {
			// 	this.title = this.$t("pages.luntan.historyLottery.text15-1") + this.title;
			// } else {
			// 	this.title = this.$t("pages.luntan.historyLottery.text17") + this.title;
			// }
			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.title;
			uni.setNavigationBarTitle({
				title: this.title,
			});
			this.listYear();
		},
		watch: {
			pickerShow(val) {
				let color = '#ffffff'
				let isLightColor = false
				if (val) {
					color = '#666666'
					isLightColor = true
				}
				setTimeout(() => {
					this.$nativeBridge.setStatusBarColor(color, isLightColor)
				}, 120);
			}
		},
		methods: {
			handlePickerShow(e) {
				this.pickerShow = true
			},
			iconClick() {
				document.querySelector(".uni-picker-action-confirm").style.color =
					this.themeColor.themeColor;
			},
			bindPickerChange: function(e) {
				this.year = e[0].value;
				this.$refs.paging.reload();
			},
			//设置排序
			setSort() {
				if (this.sort == 0) {
					this.sort = 1;
				} else {
					this.sort = 0;
				}
				this.$refs.paging.reload();
			},
			//设置code码排序
			setCodeSort() {
				var arr = [];
				if (this.codeSort == 0) {
					this.$refs.paging.reload();
				} else if (this.codeSort == 1) {
					this.dataList.forEach((item, index) => {
						arr = item.numberList.slice(0, 6).sort(function(a, b) {
							if (parseInt(a.number) < parseInt(b.number)) {
								return -1;
							} else if (parseInt(a.number) == parseInt(b.number)) {
								return 0;
							} else {
								return 1;
							}
						});
						arr.push(item.numberList[6]);
						item.numberList = arr;
					});
				} else if (this.codeSort == 2) {
					this.dataList.forEach((item, index) => {
						arr = item.numberList.slice(0, 6).sort(function(a, b) {
							if (parseInt(a.number) > parseInt(b.number)) {
								return -1;
							} else if (parseInt(a.number) == parseInt(b.number)) {
								return 0;
							} else {
								return 1;
							}
						});
						arr.push(item.numberList[6]);
						item.numberList = arr;
					});
				}
			},
			/**
			 * 不同行的不同菜单点击事件
			 *
			 * @param {Object} action 第一个参数必须传入“$event” | 点击了哪个按钮 | 传入options的value
			 * @param {Number} rowId 第二个参数随意，可以是行ID等
			 */
			menuAction(action) {
				// 忽略初始化时的传入的空操作
				if (action === "") {
					return;
				}
				this.codeSort = action;
				this.setCodeSort();
			},
			listYear() {
				let prams = {
					lotteryType: this.lotteryType,
				};
				historyListYear(prams)
					.then((res) => {
						let yearAr = res.result || [];
						//添加年份高往低排序处理
						this.array = yearAr.sort((a, b) => {
							return b - a;
						}).map(item => {
							return {
								label: item,
								value: item
							}
						});
						this.year = this.array[this.index].value;
						this.dataList = [];
						this.nomore = false
						this.$refs.paging.reload();
					})
					.catch((err) => {
						console.log(err);
					});
			},
			search(pageNo, pageSize = 8) {
				//@MR 20240111 如果year未加载完成调用去加载，避免加载时间不对数据。 year初始化完成后会reload 无需z-page初始化后触发
				console.log(this.year, "this.year")
				//@MR 20240115 是否为解决zpage 直接return  loading动画会一直在的问题
				// if (!this.year) return;

				if (!this.year) {
					this.$refs.paging.complete();
					return;
				}
				this.pageNum = pageNo;
				let prams = {
					lotteryType: this.lotteryType,
					pageNum: this.pageNum,
					sort: this.sort,
					year: this.year,
				};
				search(prams)
					.then((res) => {
						if (!res.result.records?.length) {
							this.nomore = true
						}
						this.$refs.paging.complete(res.result.records);
						if (this.codeSort > 0) {
							this.setCodeSort();
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep .z-paging-content {
		border-radius: 24rpx;
	}

	.year-select {
		::v-deep .u-drawer-content {
			border-radius: 24rpx 24rpx 0 0;
			overflow: hidden;

			.u-select__header__confirm {
				color: var(--theme-color) !important;
			}

			.u-select__header {
				background: var(--theme-auxiliary-color-default);
			}

			.uni-picker-view-indicator {
				width: calc(100% - 56rpx);
				border-radius: 16rpx;
				margin: 0 28rpx;
				height: 80rpx;
				background: var(--theme-auxiliary-color-default);
				z-index: 1;
			}

			.uni-picker-view-content {
				z-index: 2;
			}
		}
	}

	.row-body {
		.active {
			color: var(--theme-color);
		}

		&::after {
			display: none;
			content: "";
		}
	}

	::v-deep .zp-l-container {
		background: var(--theme-auxiliary-color-default) !important;
	}

	.paging {
		// height: calc(var(--vh) - 310rpx);
		background: var(--theme-auxiliary-color-default);
	}

	.head-find {
		background: #fff;
		border-radius: 0 0 24rpx 24rpx;
		padding: 20rpx 28rpx;
		font-size: 30rpx;
		position: relative;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #404040;

		.right-sort {
			display: flex;
		}

		span {
			box-sizing: border-box;
			background: #fff;
			display: inline-block;
			font-size: 26rpx;
			color: #404040;
			padding: 7rpx 10rpx;
			border-radius: 12rpx;
			height: 48rpx;
			box-sizing: border-box;
		}

		.sort {
			float: right;
			display: flex;
			align-items: center;
			background: var(--theme-auxiliary-color-default);

			.sort-svg {
				margin-left: 7rpx;
			}

			.sort-svg-0 {
				transform: rotate(180deg);
			}
		}

		.selects {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: sticky;
			top: -1px;
			z-index: 11;
			gap: 20rpx;
			margin-left: 20rpx;

			.item-img {
				width: 36rpx;
				height: 36rpx;
				display: flex;
				align-items: center;
				margin-right: 10rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.item {
				background: var(--theme-auxiliary-color-default);
				border-radius: 12rpx;
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				::v-deep .uni-select {
					border: none;
					padding: 0 10rpx;
					font-size: 26rpx;
					height: 48rpx;

					.uni-select__input-box {
						gap: 10rpx;
					}

					.uni-select--mask {
						background: rgba(0, 0, 0, 0.06);
					}

					.uni-select__selector {
						z-index: 999;
						width: 288rpx;
						border-radius: 24rpx;
						transform: translate(-170rpx, -40rpx);
					}

					.uni-select__selector-item {
						border-bottom: 1px solid var(--theme-auxiliary-color-default);
						align-items: center;
						white-space: nowrap;

						&:last-child {
							border: none;
						}
					}

					.uni-popper__arrow {
						display: none;
					}

					.uni-select__input-text {
						color: #404040;
					}
				}
			}

			::v-deep .uni-searchbar {
				padding: 0;

				.uni-searchbar__box {
					padding: 0 20rpx;
					flex-direction: row-reverse;

					.uni-searchbar__box-icon-search {
						padding: 0;
					}
				}

				.uni-input-input {
					color: #A1A1A1;
				}

				.uni-input-placeholder {
					color: #A1A1A1 !important;
				}
			}

			.yeji {
				padding: 0 20rpx;
				box-sizing: border-box;
				color: #A1A1A1;
				font-size: 26rpx;
			}
		}

		.center {
			background: var(--theme-auxiliary-color-default);
			margin-left: 20rpx;
		}

		.act {
			background: var(--theme-color);
			color: #fff;
		}

		.border {
			// width: 66px;
			text-align: center;
			margin-right: 10px;
			float: left;
		}
	}

	.body-list {
		padding-bottom: 20rpx;
		.body-list-item {
			background: #fff;
			border-radius: 24rpx;
			margin-bottom: 20rpx;
			overflow: hidden;

			.hd-text {
				padding: 20rpx 28rpx;
				color: #404040;
				font-size: 28rpx;

				.van-row {
					span {
						display: block;
						text-align: right;
					}

					.title {
						text-align: left;
					}
				}
			}

			.border-box {
				height: unset;
				padding: 20rpx 28rpx;
				height: 158rpx;
				box-sizing: border-box;

				.border-box-body {
					border: unset;

					.icon-text {
						display: inline-block;
						text-align: center;
						position: relative;

						.slot-icon {
							span {
								font-weight: 600;
							}

							image {
								position: absolute;
								top: -5px;
								background: #f0b12e;
								width: 32rpx;
								height: 32rpx;
								right: 0;
								border-radius: 50%;
							}
						}

						.slot-text {
							color: #404040;
							font-size: 30rpx;
							padding-top: 10rpx;
						}
					}
				}
			}
		}
	}

	.lottery-date {
		background: var(--theme-auxiliary-color-default);

		.jianjie {
			background-color: #fff;
			background-size: 100% 100%;
			text-align: center;
			padding: 20rpx 28rpx;
			border-radius: 0 0 24rpx 24rpx;

			.title {
				margin-bottom: 30rpx;
				font-size: 30rpx;
			}

			.text {
				font-size: 28rpx;
				color: #404040;
			}
		}
	}

	.flex-row {
		display: flex;
		justify-content: space-between;

		.var-row-item {
			width: fit-content;
		}
	}

	.var-row-item {
		display: flex;
		justify-items: center;
	}

	.top-box {
		background: #fff;
		border-radius: 24rpx 24rpx 0 0;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		margin-top: 20rpx;
		justify-content: space-evenly;
		height: 88rpx;
		border-bottom: 1px solid var(--theme-auxiliary-color-default);
		color: #404040;
		font-size: 30rpx;

		.active {
			position: relative;
			height: 100%;
			display: grid;
			place-content: center;
			color: var(--theme-color);
			font-size: 34rpx;

			&::after {
				content: "";
				display: block;
				width: 36rpx;
				height: 6rpx;
				background: var(--theme-color);
				border-radius: 6rpx 6rpx 0 0;
				position: absolute;
				bottom: 0;
				left: calc(50% - 18rpx);
			}
		}
	}
</style>
