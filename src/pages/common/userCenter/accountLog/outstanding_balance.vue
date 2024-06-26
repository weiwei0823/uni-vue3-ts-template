<template>
	<view class="log-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed>
		</Header>
		<view class="type-box">
			<view class="row-box" style="margin-top: 20rpx;padding: 20rpx 28rpx;border-radius: 24rpx 24rpx 0 0;">
				<view class="title icon-box" @click="setSort('all')">
					全部
					<view class="sort-box">
						<svg :style="{ transform: sort == '1' ? 'rotate(180deg)' : '' }"
							xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<rect width="18" height="18" rx="9" fill="#F4F4F4" />
							<path
								d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
								fill="#AFAFAF" />
						</svg>
					</view>
				</view>
				<view class="title icon-box" @click="setSort('amount')">
					金额
					<view class="sort-box">
						<svg :style="{ transform: sort == '3' ? 'rotate(180deg)' : '' }"
							xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<rect width="18" height="18" rx="9" fill="#F4F4F4" />
							<path
								d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
								fill="#AFAFAF" />
						</svg>
					</view>
				</view>
				<view class="title icon-box" @click="setSort('time')">
					时间
					<view class="sort-box">
						<svg :style="{ transform: sort == '5' ? 'rotate(180deg)' : '' }"
							xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<rect width="18" height="18" rx="9" fill="#F4F4F4" />
							<path
								d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
								fill="#AFAFAF" />
						</svg>
					</view>
				</view>
			</view>

			<view class="container-data" @click.stop="isShow = false" v-show="isShow">
				<view class="container-box" @click.stop="" :class="isShow ? 'fadeOutDown' : 'fadeOutUp'">
					<view class="container-row">
						<view class="container-list" style="padding: 20rpx 28rpx;">
							<view class="container-list-item"
								:class="{ active: typeTitle == this.$t('pages.common.userCenter.accountLog.index.All') }"
								@click="setGroupType()">
								{{ $t('pages.common.userCenter.accountLog.index.All') }}
							</view>
						</view>
					</view>
					<view class="container-row" v-for="(item, index) in GroupType">
						<view class="container-title">
							<view class="bar"></view>{{ item.title }}
						</view>
						<view class="container-list" style="padding-bottom: 20rpx;">
							<view class="container-list-item" v-for="(v, k) in item.children" @click="setGroupType(v)"
								:class="{ active: typeTitle == v.title }">
								{{ v.title }}
							</view>
						</view>
					</view>
				</view>
			</view>

			<z-paging :style="'height: calc(var(--vh) - 100rpx - 90rpx - 80rpx);'" class="paging" ref="paging"
				v-model="list" @query="getList" :lower-threshold="10" :refresher-enabled="true"
				:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
				:refresher-default-text="zpageUIConfig['refresher-default-text']"
				:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
				:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-default-style="themeColor.themeAuxiliaryColorDefault"
				:refresher-img-style="zpageUIConfig['refresher-img-style']"
				:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
				:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
				:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
				:loading-more-custom-style="{ 'padding-top': '20rpx', 'padding-bottom': '60rpx', 'background': themeColor.themeAuxiliaryColorDefault }"
				:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
				:show-loading-more-no-more-view="true" :loading-more-no-more-text="'没有更多数据了'" :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '100rpx' }" show-refresher-when-reload
				:empty-view-img-style="{ 'width': '400rpx', 'height': '400rpx' }">
				<view style="border-radius: 0 0 24rpx 24rpx; overflow: hidden;">
					<view class="list-item" v-for="(item, index) in list">
						<view class="list-row row-box">
							<view class="firstTitle">
								<text class="group-text">{{ item.gameName }}</text>
								<view class="type-text">{{ item.gameNameTip }}期</view>
							</view>
							<view class="firstTitle" style="justify-content: center; align-items: center;">
								<view class="time"
									style="max-width: 240rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
									{{ item.type }}
								</view>
								<view class="time-text" style="color: #EC3232; margin-top: 10rpx;">{{
									Number(item.money).toFixed(2) }}</view>
							</view>
							<view style="color: #404040; width: 160rpx; font-size: 28rpx; text-align: right;">
								{{ item.time.replace(/-/g, '.') }}
							</view>
						</view>
					</view>
				</view>
			</z-paging>
			<!-- <view v-if="loading" class="loading">
				<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
				<view :style="pageLoadingConfig['text_style']">{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
				</view>
			</view> -->

		</view>
		<view
			style="height: 88rpx; display: flex; align-items: center; justify-content: center; background: var(--theme-color-bg);padding-bottom: var(--safe-area-inset-bottom);">
			<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
				<g clip-path="url(#clip0_558_81213)">
					<path
						d="M11.4999 11.9999V12.9999H12.4999H23.3936C23.161 15.5345 22.0497 17.9208 20.2353 19.7353C18.1837 21.7868 15.4012 22.9393 12.4999 22.9393C9.59863 22.9393 6.81615 21.7868 4.76462 19.7353C2.71309 17.6837 1.56055 14.9012 1.56055 11.9999C1.56055 9.09863 2.71309 6.31616 4.76462 4.26462C6.57911 2.45013 8.96538 1.33889 11.4999 1.10632V11.9999Z"
						:stroke="themeColor.themeColor" stroke-width="2" stroke-miterlimit="10" />
					<path
						d="M14.5312 0.0605469V9.96843H24.4391C24.4393 8.66726 24.1831 7.37881 23.6853 6.17666C23.1874 4.9745 22.4576 3.88221 21.5375 2.96214C20.6175 2.04208 19.5252 1.31228 18.323 0.814415C17.1209 0.316554 15.8324 0.0603877 14.5312 0.0605469Z"
						:fill="themeColor.themeColor" />
				</g>
				<defs>
					<clipPath id="clip0_558_81213">
						<rect width="24" height="24" fill="white" transform="translate(0.5)" />
					</clipPath>
				</defs>
			</svg>
			<view style="margin: 0 10rpx; color: #404040; font-size: 30rpx;">合计</view>
			<view style="margin-left: 40rpx; color: #EC3232;">{{ total }}</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import NavBar from "@/components/common/navBar/navBar";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import Common from "./common/common";
	import Change from "./common/change";
	import TimePicker from "@/components/common/time-picker";
	import {
		getTime
	} from "@/utils/function"
	import {
		getGroupType,
		unsettledList
	} from "@/utils/lottery/mine";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			Common,
			TimePicker,
			Change
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: '未结余额',
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				isShow: false,
				type: 0,
				typeTitle: this.$t('pages.common.userCenter.accountLog.index.All'),
				start: '',
				end: '',
				code: '',
				startTime: '',
				endTime: '',
				time: '',
				timeStr: '',
				today: '',
				GroupType: [],
				order: 'desc',
				orderBy: 'create_time',
				pageNo: 1,
				pageSize: 15,
				list: [],
				total: 0.00,
				info: {},
				loading: false,
				loadingTimes: 0,
				sort: '1'
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onShow() {
			let date = new Date();
			this.today = getTime(date)
			this.startTime = this.today
			this.endTime = this.today
			this.start = this.getDay(-30)
			this.end = this.today
			this.getGroupTypeList();
			/*this.getList();*/
		},
		computed: {
			...mapGetters(['themeColor']),
			showTime() {
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let startTime = getTime(start, '.', 2, 'date')
				let endTime = getTime(end, '.', 2, 'date')
				if (startTime == endTime) {
					startTime.indexOf(".") != -1 && (startTime = startTime.replace(/\./g, "/"));
					return this.$u.timeFormat(new Date(startTime), 'yyyy年mm月dd日'); //;
				} else {
					startTime.indexOf(".") != -1 && (startTime = startTime.replace(/\./g, "/"));
					endTime.indexOf(".") != -1 && (endTime = endTime.replace(/\./g, "/"));
					return this.$u.timeFormat(new Date(startTime), 'yyyy年mm.dd') + "-" + this.$u.timeFormat(new Date(
						endTime), 'mm.dd')
				}

			},
			isShowPre() {
				let startTime = new Date(this.startTime.replace(/\./g, '/'))
				let start = new Date(this.start.replace(/\./g, '/'))
				if (this.startTime == this.start) {
					return false
				} else if (startTime <= start) {
					return false
				} else {
					return true
				}
			},
			isShowNext() {
				let endTime = new Date(this.endTime.replace(/\./g, '/'))
				let end = new Date(this.end.replace(/\./g, '/'))
				if (this.endTime == this.end) {
					return false
				} else if (endTime >= end) {
					return false
				} else {
					return true
				}
			},
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		methods: {
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds);

				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return tYear + "." + tMonth + "." + tDate;
			},
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},
			detail(item) {
				this.info = item;
				this.$refs.change.open()
			},
			closeDetail() {
				this.$refs.change.close()
			},
			setGroupType(item = null) {
				if (item != null) {
					this.code = item.code
					this.typeTitle = item.title
				} else {
					this.code = ""
					this.typeTitle = "全部"
				}
				this.isShow = false
				this.$refs.paging.reload()
			},
			openTime() {
				this.$refs.pay.open()
			},
			closePay() {
				this.$refs.pay.close()
			},
			changeTime(time) {
				this.startTime = time.start
				this.endTime = time.end
				this.$refs.paging.reload()
			},
			pre() {

				if (!this.isShowPre) return
				this.loadingTimes = 0;
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let date = start.getTime() - 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.endTime = getTime(date)
				}
				this.startTime = getTime(date)

				this.$refs.paging.reload()

			},
			next() {
				if (!this.isShowNext) return
				this.loadingTimes = 0;
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let date = end.getTime() + 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.startTime = getTime(date)
				}
				this.endTime = getTime(date)
				this.$refs.paging.reload()
			},
			setSort(orderBy) {
				if (orderBy === 'all') {
					this.sort = this.sort === '1' ? '2' : '1'
				} else if (orderBy === 'amount') {
					this.sort = this.sort === '3' ? '4' : '3'
				} else if (orderBy === 'time') {
					this.sort = this.sort === '5' ? '6' : '5'
				}
				this.$refs.paging.reload()
			},
			getGroupTypeList() {
				getGroupType().then(res => {
					this.GroupType = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			getList(pageNo, pageSize = 10) {
				this.loadingTimes++;
				if (this.loadingTimes <= 1) this.loading = true;
				// this.loading = true
				this.pageNo = pageNo
				let prams = {
					'sort': this.sort,
					'pageNo': this.pageNo,
				}
				unsettledList(prams).then(res => {
					let list = res.result.records
					this.total = Number(res.result?.total || 0).toFixed(2)
					this.$refs.paging.complete(list);
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-drawer {
		.uni-drawer__content {
			max-width: 480px !important;
		}
	}

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

	.log-box {

		position: fixed;
		background: var(--theme-auxiliary-color-default);
		max-width: 480px;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.sx {
			color: #404040;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.text {
				margin-left: 20rpx;
			}
		}

		.menu-box {
			height: 60rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.menu-item {
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-weight: 400;
				font-size: 24rpx;
				text-align: center;
				color: #404040;
				height: 100%;
				width: 33.3%;
			}

			.active {
				color: #088972;
				// color: var(--theme-color);
				position: relative;

				&::after {
					position: absolute;
					bottom: 0px;
					content: '';
					width: 26rpx;
					margin: 0 auto;
					border: 4rpx solid #088972;
				}
			}
		}

		.date-box {
			display: flex;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
			background: #fff;
			height: 116rpx;
			margin-top: 20rpx;
			border-radius: 24rpx 24rpx 0 0;

			.pre,
			.next {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 186rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #404040;

				.text {
					margin: 0 20rpx;
					line-height: 2;
				}
			}

			.time-item {
				width: 378rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: var(--theme-color-bg);

				.icon {
					width: 20%;

					image {
						margin-left: 24rpx;
						height: 55rpx;
						width: 55rpx;
					}
				}

				.time {
					text-align: 404844;
					font-weight: 400;

					font-size: 28rpx;
					color: #404040;
					margin-left: 20rpx;
				}
			}
		}

		.type-box {
			flex: 1;
			height: 0;
			display: flex;
			flex-direction: column;
			position: relative;

			.list-item {
				background: #FFFFFF;
				padding: 0 28rpx;

				&:last-child .row-box {
					border-bottom: none;
				}
			}

			.row-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				align-items: center;
				color: #404040;
				font-size: 26rpx;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);
				background: #fff;


				.firstTitle {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					color: #404040;
					font-size: 28rpx;

					.type-text {
						color: #404040;
						font-size: 28rpx;
						margin-top: 10rpx;
					}
				}

				.lastTitle {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					color: #404040;
					font-size: 28rpx;

					.time {
						color: #404040;
						font-size: 24rpx;
						width: 120rpx;
						text-align: right;
					}

					.time-text {
						color: var(--theme-color);
						font-size: 24rpx;
						margin-top: 10rpx;
					}
				}

				.title {
					font-size: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #404040;
					line-height: 0;

					.sort-box {
						margin-left: 10rpx;
					}

					.icon {
						margin-left: 10rpx;
					}

					.group-text {
						font-size: 22rpx;
						color: #404040;
					}

					.type-text {
						font-size: 22rpx;
						color: #999999;
					}

					.bank,
					.money-text {
						color: #444444;
					}

					.red {
						color: var(--theme-auxiliary-color-remind);
					}

					.green {
						color: var(--theme-color);
					}

					.fq {
						font-size: 22rpx;
						color: #0099CC;
					}

					.sl {
						font-size: 22rpx;
						color: #666666;
					}

					.ok {
						font-size: 22rpx;
						color: #CC3333;
					}

					.err {
						font-size: 22rpx;
						color: #34B822;
					}

					.time {
						font-size: 20rpx;
						text-align: center;
						color: #999999;
					}

					.time-text {
						font-size: 20rpx;
						text-align: center;
						color: #CC3333;
					}

					.icon-box {
						display: flex;
						align-items: center;
						line-height: 1;

					}
				}
			}

			.container-data {
				position: absolute;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.30);
				z-index: 99;
				top: 76rpx;

				.container-box {
					margin-top: 1px solid var(--theme-auxiliary-color-default);
					position: absolute;
					top: 0;
					z-index: 999;
					width: 100%;
					max-width: 480px;
					background: var(--theme-auxiliary-color-default);
					border-radius: 0 0 24rpx 24rpx;
					overflow: hidden;

					.container-row {
						background: #fff;

						.container-title {
							padding: 20rpx 28rpx;
							font-weight: 400;
							font-size: 30rpx;
							color: #404040;
							display: flex;
							align-items: center;

							.bar {
								width: 6rpx;
								height: 24rpx;
								border-radius: 6rpx;
								background: var(--theme-color);
								margin-right: 20rpx;
								display: block;
							}
						}

						.container-list {
							display: flex;
							// gap: 20rpx;
							align-items: center;
							padding: 0 28rpx 0;
							flex-wrap: wrap;

							.container-list-item {
								height: 48rpx;
								padding: 0 20rpx;
								display: grid;
								place-content: center;
								border-radius: 60rpx;
								background: var(--theme-auxiliary-color-default);
								color: #404040;
								font-size: 26rpx;
							}

							.active {
								background: var(--theme-color);
								color: #FFFFFF;
							}
						}
					}
				}

				.fadeOutUp {
					animation-name: fadeOutUp;
				}

				.fadeOutDown {
					animation-name: fadeOutDown;
				}
			}

			.list-item {
				position: relative;

				.new {
					height: 26rpx;
					width: 54rpx;
					position: absolute;
					top: -6rpx;
					left: 0;
					z-index: 1;
				}
			}

			.list-row {
				padding: 20rpx 0;
			}
		}
	}

	@keyframes fadeOutUp {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: translate3d(0, -100%, 0);
		}
	}

	@keyframes fadeOutDown {
		0% {
			opacity: 0;
			transform: translate3d(0, -100%, 0);
		}

		100% {
			opacity: 1;
			transform: translateZ(0);
		}
	}
</style>
