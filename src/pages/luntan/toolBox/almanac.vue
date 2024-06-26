<template>
	<view class="almanac pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'}">
		<view style="height:88rpx;">
			<Header :title="title" isFixed>
				<!-- <uni-datetime-picker v-model="single" @change="onGetDate" slot="right"> -->
				<view slot="right">
					<view class="nav-right" @click="openTime">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<g clip-path="url(#clip0_20055_102094)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0018C7.28243 11.0018 7.48763 11.207 7.48763 11.4601V14.2101C7.48763 14.4632 7.28243 14.6684 7.0293 14.6684H4.2793C4.02617 14.6684 3.82096 14.4632 3.82096 14.2101V11.4601C3.82096 11.207 4.02617 11.0018 4.2793 11.0018H7.0293ZM7.0293 15.8912C7.28243 15.8912 7.48763 16.0964 7.48763 16.3496V19.0996C7.48763 19.3527 7.28243 19.5579 7.0293 19.5579H4.2793C4.02617 19.5579 3.82096 19.3527 3.82096 19.0996V16.3496C3.82096 16.0964 4.02617 15.8912 4.2793 15.8912H7.0293ZM9.7793 11.0018C9.52617 11.0018 9.32096 11.207 9.32096 11.4601V14.2101C9.32096 14.4632 9.52617 14.6684 9.7793 14.6684H12.5293C12.7824 14.6684 12.9876 14.4632 12.9876 14.2101V11.4601C12.9876 11.207 12.7824 11.0018 12.5293 11.0018H9.7793ZM12.5293 15.8912C12.7824 15.8912 12.9876 16.0964 12.9876 16.3496V19.0996C12.9876 19.3527 12.7824 19.5579 12.5293 19.5579H9.7793C9.52617 19.5579 9.32096 19.3527 9.32096 19.0996V16.3496C9.32096 16.0964 9.52617 15.8912 9.7793 15.8912H12.5293ZM15.2793 11.0018C15.0262 11.0018 14.821 11.207 14.821 11.4601V14.2101C14.821 14.4632 15.0262 14.6684 15.2793 14.6684H18.0293C18.2824 14.6684 18.4876 14.4632 18.4876 14.2101V11.4601C18.4876 11.207 18.2824 11.0018 18.0293 11.0018H15.2793ZM18.0293 15.8912C18.2824 15.8912 18.4876 16.0964 18.4876 16.3496V19.0996C18.4876 19.3527 18.2824 19.5579 18.0293 19.5579H15.2793C15.0262 19.5579 14.821 19.3527 14.821 19.0996V16.3496C14.821 16.0964 15.0262 15.8912 15.2793 15.8912H18.0293Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_20055_102094">
									<rect width="22" height="22" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</view>
				</view>
				<!-- </uni-datetime-picker> -->
			</Header>

		</view>
		<view class="date-part" :style="setDateStyle()">
			<view class="date-part-title">
				<view class="date-part-title-item left">
					{{ almanacData.solarCalendarMonth }}
				</view>
				<view class="date-part-title-item center">
					{{ almanacData.solarCalendarMonthEn }}
				</view>
				<view class="date-part-title-item right">
					{{ almanacData.solarCalendarYear }}
				</view>
			</view>
			<view class="date-part-content">
				<view class="date-part-content-item left">
					<view class="image-box" @click="onSetDate(1)">
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
							<path
								d="M9.13659 18.155C9.35981 18.3782 9.64392 18.5 9.97875 18.5C10.6484 18.5 11.1862 17.9724 11.1862 17.3027C11.1862 16.9679 11.0441 16.6635 10.8108 16.4301L3.70818 9.48985L10.8108 2.5699C11.0441 2.33653 11.1862 2.02198 11.1862 1.69729C11.1862 1.02762 10.6484 0.5 9.97875 0.5C9.64392 0.5 9.35981 0.621759 9.13659 0.844983L1.24256 8.55637C0.958458 8.82018 0.826553 9.14487 0.816406 9.5C0.816406 9.85513 0.958458 10.1595 1.24256 10.4335L9.13659 18.155Z"
								:fill="themeColor.themeColor" />
						</svg>
					</view>
				</view>
				<view class="date-part-content-item center">
					{{ almanacData.solarCalendarDay }}
				</view>
				<view class="date-part-content-item right" @click="onSetDate(2)">
					<view class="image-box">
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
							<path
								d="M2.86341 18.155C2.64019 18.3782 2.35608 18.5 2.02125 18.5C1.35157 18.5 0.813807 17.9724 0.813807 17.3027C0.813807 16.9679 0.955859 16.6635 1.18923 16.4301L8.29182 9.48985L1.18923 2.5699C0.955859 2.33653 0.813807 2.02198 0.813807 1.69729C0.813807 1.02762 1.35157 0.5 2.02125 0.5C2.35608 0.5 2.64019 0.621759 2.86341 0.844983L10.7574 8.55637C11.0415 8.82018 11.1734 9.14487 11.1836 9.5C11.1836 9.85513 11.0415 10.1595 10.7574 10.4335L2.86341 18.155Z"
								:fill="themeColor.themeColor" />
						</svg>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="calendar-part" :style="setThemeStyle()" :enhanced="true" :bounces="false"
			:show-scrollbar="false">
			<view class="calendar-part-title">
				<view class="week">
					<view class="week-text-en">
						{{ almanacData.calendarWeekEn }}
					</view>
					<view class="week-text-cn">
						{{ almanacData.calendarWeek }}
					</view>
				</view>
				<view class="date">
					<view class="date-1">
						{{ almanacData.chineseCalendarYear }}
						{{ almanacData.chineseCalendarMonth }}
					</view>
					<view class="date-2">
						{{ almanacData.chineseCalendarDay }}

					</view>
				</view>
			</view>
			<view class="calendar-part-content">
				<view class="calendar-text">
					<view class="bottom-line-text">
						<view class="title">{{ $t('pages.luntan.toolBox.almanac.text5') }}</view>
						<view>{{ almanacData.hl.wx ? almanacData.hl.wx : "" }}</view>
					</view>
					<view class="bottom-line-text">
						<view class="title">{{ $t('pages.luntan.toolBox.almanac.text6') }}</view>
						<view>{{ almanacData.hl.cs ? almanacData.hl.cs : "" }}</view>
					</view>
				</view>

				<view class="bottom-line-text">
					<view class="title">{{ $t('pages.luntan.toolBox.almanac.text7') }}</view>
					<view>{{ almanacData.hl.pzbj ? almanacData.hl.pzbj : "" }}</view>
				</view>
				<view class="good">
					<view class="good-left">
						<view class="good-left-title">
							<view class="text">{{ $t('pages.luntan.toolBox.almanac.text0') }}</view>
						</view>
						<view class="good-left-list">
							<view class="good-left-list-item" v-for="(item, index) in goodList" :key="index">
								{{ item }}
							</view>
						</view>
					</view>
					<view class="good-left">
						<view class="good-right-title">
							<view class="text">{{ $t('pages.luntan.toolBox.almanac.text1') }}</view>
						</view>
						<view class="good-left-list">
							<view class="good-left-list-item" v-for="(item, index) in jsList" :key="index">
								{{ item }}
							</view>
						</view>
					</view>
				</view>
				<view class="good-number">
					<view class="number-title">{{ $t('pages.luntan.toolBox.almanac.text2') }}</view>
					<view class="number-text">
						<view class="number-item" v-for="(item, i) in luckyNum" :style="item.bg">
							{{ item.num }}
						</view>
					</view>
				</view>
				<view class="bad">
					<view class="bad-left">
						<view class="bad-left-title">
							<view class="text">{{ $t('pages.luntan.toolBox.almanac.text3') }}</view>
						</view>
						<view class="bad-left-list">
							<view class="bad-left-list-item" v-for="(item, index) in badList" :key="index">
								{{ item }}
							</view>
						</view>
					</view>
					<view class="bad-left">
						<view class="bad-right-title">
							<view class="text">{{ $t('pages.luntan.toolBox.almanac.text4') }}</view>
						</view>
						<view class="bad-left-list">
							<view class="bad-left-list-item" v-for="(item, index) in xiongList" :key="index">
								{{ item }}
							</view>
						</view>
					</view>
				</view>

			</view>
		</scroll-view>


		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker :propsTitle="title" :multiple="false" :tipVisible="false" @closePay="closePay"
				@changeTime="onGetDate" :line="'.'" :startTimes="startTime" :endTimes="endTime"
				:contentStyle="{padding:0}">
			</time-picker>
		</uni-drawer>
	</view>
</template>
<script>
	import NavBar from "../../../components/common/navBar/navBar.vue";
	import Header from "../../../components/common/header/index.vue"
	import {
		mapGetters
	} from 'pinia';
	import {
		getAlmanac
	} from "../../../utils/toolbox/index";
	import {
		getTime
	} from "@/utils/function"
	import TimePicker from "@/components/common/time-picker";
	export default {
		components: {
			TimePicker,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.almanac.title'),
				almanacData: {
					hl: {}
				},
				goodList: [], //吉
				jsList: [], //吉神宜趋
				badList: [], //忌
				xiongList: [], //凶煞宜忌
				luckyNum: [],
				currentDate: "",
				currentDay: 0,
				single: "",
				startTime: '',
				endTime: '',
				today: "",
				winHeight: 0
			}
		},
		computed: {
			...mapGetters(["themeColor"])
		},
		onLoad() {
			let date = new Date();
			this.today = getTime(date)
			this.startTime = this.today
			this.endTime = this.today
			this.getCurrentDay()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			onShow() {
				this.winHeight = uni.getSystemInfoSync().windowHeight;
			},
			openTime() {
				this.$refs.pay.open()
			},
			closePay() {
				this.$refs.pay.close()
			},
			setDateStyle() {
				if (this.themeColor.id == 1) {
					return {
						background: `var(--theme-auxiliary-color-linear-gradient-start)`
					}
				} else {
					return {
						background: `var(--theme-auxiliary-color-linear-gradient-start)`
					}
				}
			},
			setThemeStyle() {
				if (this.themeColor.id == 1) {
					return {
						background: 'linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%)',
						padding: '0 28rpx',
						boxSizing: "border-box",
						height: `calc(${this.winHeight}px - 88rpx - 340rpx)`
					}
				} else {
					return {
						background: 'linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%)',
						padding: '0 28rpx',
						boxSizing: "border-box",
						height: `calc(${this.winHeight}px - 88rpx - 340rpx)`
					}
				}
			},
			getCurrentDay() {
				const now = new Date();
				const year = now.getFullYear();
				const month = ('0' + (now.getMonth() + 1)).slice(-2);
				const day = ('0' + now.getDate()).slice(-2);
				const formattedTime = year + '-' + month + '-' + day;
				this.currentDate = formattedTime;
				this.getAlmanacData();
			},
			setBgBall(arr1, arr2) {
				let arr = [];
				arr1.forEach((i, n) => {
					arr2.forEach((k, m) => {
						if (n === m) {
							let obj = {};
							obj.num = i;
							obj.bg = {
								backgroundImage: `url(/static/img/qiu/${k}.png)`,
							}
							arr.push(obj);
						}
					})
				})
				return arr;
			},
			getAlmanacData() {
				//TODO @ryan lotteryType 记得处理下 看下从哪里获取这个参数
				getAlmanac({
					dateStr: this.currentDate,
				}).then(res => {
					this.almanacData = res.result;
					this.goodList = res.result.hl.yi.split(' ');
					this.jsList = res.result.hl.jsyq.split(' ');
					this.badList = res.result.hl.ji.split(' ');
					this.xiongList = res.result.hl.xsyj.split(' ');
					this.luckyNum = this.setBgBall(res.result.luckyNumbers[0], res.result.luckyNumbers[1]);
				})
			},
			/**
			 * 指定日期，-1表示前一天，1表示后一天
			 * @param {Object} date
			 * @param {Object} day
			 */
			getNextDate(date, day) {
				let dd = new Date(date);
				dd.setDate(dd.getDate() + day);
				let y = dd.getFullYear();
				let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
				let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
				return y + "-" + m + "-" + d;
			},
			/**
			 * 指定天数 1表示向前，2表示向后
			 * @param {Object} index
			 */
			onSetDate(index) {
				if (index === 1) {
					this.currentDay = -1
				} else {
					this.currentDay = 1
				}
				this.currentDate = this.getNextDate(this.currentDate, this.currentDay);
				this.getAlmanacData();
			},
			onGetDate(item) {
				const day = item.start;
				const selectDay = item.start.replaceAll(".", "-")
				this.single = selectDay;
				this.currentDate = selectDay;
				this.getAlmanacData();
			}
		}
	}
</script>
<style scoped lang="scss">
	::v-deep .uni-calendar--fixed-top {
		display: none;
	}

	::v-deep .uni-calendar-item__weeks-box .uni-calendar-item--checked {
		background-color: var(--theme-color);
	}

	::v-deep .uni-datetime-picker--btn {
		background-color: var(--theme-color);
	}




	.almanac {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--theme-auxiliary-color-default);

		::v-deep .date-part .date-part-title .center,
		::v-deep .date-part-content-item.center {
			color: var(--theme-color) !important;
		}

		::v-deep .uni-calendar-item--checked {
			background: var(--theme-color) !important;
		}

		::v-deep .uni-datetime-picker--btn {
			background-color: var(--theme-color) !important;
		}

		.nav-right {
			width: 100%;
			display: flex;
			justify-content: flex-end;

			image {
				width: 60rpx;
				height: 64rpx;
			}
		}

		.date-part {
			border-radius: 24rpx;
			background: #FFF;
			// margin-top: 106rpx;
			margin-top: 20rpx;
			padding: 0 28rpx;

			.date-part-title {
				display: flex;
				// height: 96rpx;
				padding: 20rpx 0;
				align-items: center;
				border-bottom: 2rpx solid var(--theme-auxiliary-color-default);

				.date-part-title-item {
					width: 33.3%;
				}

				.left {
					text-align: left;
					color: #404040;

					font-size: 34rpx;
					font-style: normal;
					font-weight: 500;
				}

				.center {
					text-align: center;
					color: var(--theme-color);

					font-size: 34rpx;
					font-style: normal;
					font-weight: 500;
					line-height: normal;
				}

				.right {
					text-align: right;
					color: #404040;

					font-size: 34rpx;
					font-style: normal;
					font-weight: 500;
				}
			}

			.date-part-content {
				width: 100%;
				// padding: 20rpx 0;
				gap: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.date-part-content-item {
					display: flex;

					justify-content: center;
					align-items: center;
					flex-shrink: 0;
					box-sizing: border-box;

					image {
						width: 20.74rpx;
						height: 36rpx;
					}
				}

				.center {
					color: var(--theme-color);

					font-size: 172rpx;
					font-style: normal;
					font-weight: 600;
					line-height: normal;
				}

				.left,
				.right {
					.image-box {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 88rpx;
						height: 88rpx;
						padding: 20rpx;
						background-color: #FFFFFF;
						border-radius: 50%;
						gap: 20rpx;
						box-sizing: border-box;
					}
				}
			}
		}

		.calendar-part {
			flex: 1;
			height: 0;
			margin-top: 20rpx;
			width: 100%;
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20rpx;
			border-radius: 24rpx;
			background: #FFF;

			.calendar-part-title {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				// height: 128rpx;
				// padding: 20rpx 28rpx;
				padding: 20rpx 0;
				gap: 20rpx;
				border-bottom: 2rpx solid var(--theme-auxiliary-color-default);

				.week {
					text-align: left;

					.week-text-en {
						color: #404040;
						text-align: center;

						font-size: 34rpx;
						font-weight: 500;
					}

					.week-text-cn {
						color: #404040;
						text-align: center;

						font-size: 28rpx;
						font-weight: 400;
					}
				}

				.date {
					text-align: right;

					.date-1 {
						color: #404040;
						text-align: center;

						font-size: 34rpx;
						font-weight: 500;
					}

					.date-2 {
						color: #404040;
						text-align: center;

						font-size: 28rpx;
						font-weight: 400;
					}
				}
			}

			.calendar-part-content {
				background-color: transparent;
				padding: 20rpx 0;
				box-sizing: border-box;
				width: 100%;
				border-radius: 24rpx;
				padding-bottom: 100rpx;

				.calendar-text {
					display: flex;
					justify-content: space-between;
					margin-bottom: 16rpx;
				}

				.good {
					width: 100%;
					display: flex;
					justify-content: space-between;
					box-sizing: border-box;
					gap: 20rpx;
					margin-top: 20rpx;

					.good-left {
						display: flex;
						width: 336rpx;
						padding: 20rpx 20rpx;
						flex-direction: column;
						align-items: center;
						gap: 20rpx;
						border-radius: 24rpx;
						border: 2rpx solid var(--theme-color);
						box-sizing: border-box;

						.good-left-title {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;

							.text {
								display: flex;
								width: 60rpx;
								height: 60rpx;
								padding: 20rpx;
								justify-content: center;
								align-items: center;
								gap: 20rpx;
								box-sizing: border-box;
								background-color: var(--theme-color);
								border-radius: 50%;
								color: #FFF;

								font-size: 34rpx;
								font-weight: 500;
							}
						}

						.good-right-title {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;

							.text {
								display: flex;
								padding: 10rpx 20rpx;
								justify-content: center;
								align-items: center;
								gap: 20rpx;
								box-sizing: border-box;
								background-color: var(--theme-color);
								border-radius: 100rpx;
								color: #FFF;

								font-size: 30rpx;
								font-weight: 500;
							}
						}

						.good-left-list {
							width: 100%;
							display: flex;
							padding: 0 20rpx;
							align-items: center;
							// gap: 28rpx;
							flex-direction: row;
							flex-wrap: wrap;

							margin-left: -28rpx;
							margin-top: -28rpx;

							.good-left-list-item {
								// width: 25%;
								color: #404040;
								text-align: center;
								margin-left: 28rpx;
								margin-top: 28rpx;
								font-size: 26rpx;
								font-weight: 400;
							}
						}
					}
				}

				.good-number {
					padding: 30rpx 0;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.number-title {
						color: var(--theme-color);

						font-size: 34rpx;
						font-weight: 500;
					}

					.number-text {
						display: flex;

						.number-item {
							width: 68rpx;
							height: 68rpx;
							background-repeat: no-repeat;
							background-size: contain;
							color: #404040;
							//padding-left: 12rpx;
							//line-height: 76rpx;

							font-size: 33rpx;
							font-weight: 600;
							box-sizing: border-box;
							margin-left: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}

				.bad {
					width: 100%;
					display: flex;
					justify-content: space-between;
					box-sizing: border-box;
					margin-bottom: 20rpx;

					.bad-left {
						display: flex;
						width: 336rpx;
						padding: 20rpx 20rpx;
						flex-direction: column;
						align-items: center;
						gap: 20rpx;
						border-radius: 24rpx;
						border: 2rpx solid #404040;
						&+.bad-left{
							margin-left: 20rpx;
						}
						box-sizing: border-box;

						.bad-left-title {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;

							.text {
								display: flex;
								width: 60rpx;
								height: 60rpx;
								padding: 20rpx;
								justify-content: center;
								align-items: center;
								gap: 20rpx;
								box-sizing: border-box;
								background-color: #404040;
								border-radius: 50%;
								color: #FFF;

								font-size: 34rpx;
								font-weight: 500;
							}
						}

						.bad-right-title {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;

							.text {
								display: flex;
								padding: 10rpx 20rpx;
								justify-content: center;
								align-items: center;
								gap: 20rpx;
								box-sizing: border-box;
								background-color: #404040;
								border-radius: 100rpx;
								color: #FFF;

								font-size: 30rpx;
								font-weight: 500;
							}
						}

						.bad-left-list {
							width: 100%;
							display: flex;
							padding: 0 20rpx;
							align-items: center;
							// gap: 28rpx;
							flex-direction: row;
							flex-wrap: wrap;
							margin-left: -28rpx;
							margin-top: -28rpx;

							.bad-left-list-item {
								color: #404040;
								text-align: center;
								margin-left: 28rpx;
								margin-top: 28rpx;
								font-size: 26rpx;
								font-weight: 400;
							}
						}
					}
				}

				.bottom-line-text {
					// width: 100%;
					// margin-bottom: 16rpx;
					display: flex;
					color: #404040;

					font-size: 28rpx;
					font-weight: 400;
				}
			}
		}
	}
</style>
