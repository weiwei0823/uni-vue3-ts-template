<template>
	<view class="log-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />

		<view class="date-box">
			<view class="pre" @click="pre()">
				<view class="pre-item" v-show="isShowPre">
					<view class="text">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
							<rect x="0.5" y="18" width="18" height="18" rx="9" transform="rotate(-90 0.5 18)"
								:fill="themeColor.themeAuxiliaryColorDefault" />
							<path d="M11 13L7 9L11 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
						<view class="te">前一天</view>
					</view>
					<view class="coin-box">
						盈亏：
						<text class="coin" :class="lastAmount > 0 ? 'red' : lastAmount < 0 ? 'green' : ''">
							{{ lastAmount || '0.00' }}
						</text>
					</view>
				</view>
			</view>
			<view class="time-item">
				<view class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
						<g clip-path="url(#clip0_17702_98016)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M9.5 1.5C9.5 0.670313 8.82969 0 8 0C7.17031 0 6.5 0.670313 6.5 1.5V3H4.25C3.00781 3 2 4.00781 2 5.25V7.5H23V5.25C23 4.00781 21.9922 3 20.75 3H18.5V1.5C18.5 0.670313 17.8297 0 17 0C16.1703 0 15.5 0.670313 15.5 1.5V3H9.5V1.5ZM23 9H2V21.75C2 22.9922 3.00781 24 4.25 24H20.75C21.9922 24 23 22.9922 23 21.75V9ZM8.16669 12.002C8.44283 12.002 8.66669 12.2258 8.66669 12.502V15.502C8.66669 15.7781 8.44283 16.002 8.16669 16.002H5.16669C4.89054 16.002 4.66669 15.7781 4.66669 15.502V12.502C4.66669 12.2258 4.89054 12.002 5.16669 12.002H8.16669ZM8.16675 17.3359C8.44289 17.3359 8.66675 17.5598 8.66675 17.8359V20.8359C8.66675 21.1121 8.44289 21.3359 8.16675 21.3359H5.16675C4.89061 21.3359 4.66675 21.1121 4.66675 20.8359V17.8359C4.66675 17.5598 4.89061 17.3359 5.16675 17.3359H8.16675ZM11.1667 12.002C10.8906 12.002 10.6667 12.2258 10.6667 12.502V15.502C10.6667 15.7781 10.8906 16.002 11.1667 16.002H14.1667C14.4429 16.002 14.6667 15.7781 14.6667 15.502V12.502C14.6667 12.2258 14.4429 12.002 14.1667 12.002H11.1667ZM14.1667 17.3359C14.4428 17.3359 14.6667 17.5598 14.6667 17.8359V20.8359C14.6667 21.1121 14.4428 21.3359 14.1667 21.3359H11.1667C10.8905 21.3359 10.6667 21.1121 10.6667 20.8359V17.8359C10.6667 17.5598 10.8905 17.3359 11.1667 17.3359H14.1667ZM17.1667 12.002C16.8906 12.002 16.6667 12.2258 16.6667 12.502V15.502C16.6667 15.7781 16.8906 16.002 17.1667 16.002H20.1667C20.4429 16.002 20.6667 15.7781 20.6667 15.502V12.502C20.6667 12.2258 20.4429 12.002 20.1667 12.002H17.1667ZM20.1667 17.3359C20.4429 17.3359 20.6667 17.5598 20.6667 17.8359V20.8359C20.6667 21.1121 20.4429 21.3359 20.1667 21.3359H17.1667C16.8906 21.3359 16.6667 21.1121 16.6667 20.8359V17.8359C16.6667 17.5598 16.8906 17.3359 17.1667 17.3359H20.1667Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_17702_98016">
								<rect width="24" height="24" fill="white" transform="translate(0.5)" />
							</clipPath>
						</defs>
					</svg>
				</view>
				<view class="time" @click="openTime">
					<view class="time-text">{{ showTime }}</view>
					<view class="coin-text">
						盈亏：
						<text class="num-text" :class="todayAmount > 0 ? 'red' : todayAmount < 0 ? 'green' : ''">
							{{ todayAmount || '0.00' }}
						</text>
					</view>

				</view>
			</view>
			<view class="next" @click="next()">
				<view class="next-item" v-show="isShowNext">
					<view class="text">
						<view class="te">后一天</view>
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
							<rect x="18.5" width="18" height="18" rx="9" transform="rotate(90 18.5 0)"
								:fill="themeColor.themeAuxiliaryColorDefault" />
							<path d="M8 5L12 9L8 13" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</view>
					<view class="coin-box">
						盈亏：
						<text class="coin" :class="nextAmount > 0 ? 'red' : nextAmount < 0 ? 'green' : ''">
							{{ nextAmount || '0.00' }}
						</text>
					</view>
				</view>
			</view>
		</view>

		<view class="type-box">
			<view class="row-box">
				<view class="title icon-box" @click="isShow = !isShow">
					第三方类别
				</view>
				<view class="title icon-box" @click="setSort('all_bet')">
					投注总额
					<view class="sort-box">
						<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
							<path
								d="M9.05293 15.2512C9.44633 15.66 10.1007 15.66 10.4941 15.2512L13.9176 11.6934C14.5289 11.0581 14.0786 10 13.197 10H6.35003C5.46837 10 5.01813 11.0581 5.62945 11.6934L9.05293 15.2512Z"
								:fill="order == 'asc' && orderBy == 'all_bet' ? '#969897' : '#A1A1A1'" />
							<path
								d="M9.05293 2.74885C9.44633 2.34001 10.1007 2.34001 10.4941 2.74885L13.9176 6.30662C14.5289 6.94193 14.0786 8 13.197 8H6.35003C5.46837 8 5.01813 6.94193 5.62945 6.30662L9.05293 2.74885Z"
								:fill="order == 'desc' && orderBy == 'all_bet' ? '#969897' : '#A1A1A1'" />
						</svg>
					</view>
				</view>
				<view class="title icon-box" @click="setSort('profit')">
					盈亏
					<view class="sort-box">
						<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
							<path
								d="M9.05293 15.2512C9.44633 15.66 10.1007 15.66 10.4941 15.2512L13.9176 11.6934C14.5289 11.0581 14.0786 10 13.197 10H6.35003C5.46837 10 5.01813 11.0581 5.62945 11.6934L9.05293 15.2512Z"
								:fill="order == 'asc' && orderBy == 'profit' ? '#969897' : '#A1A1A1'" />
							<path
								d="M9.05293 2.74885C9.44633 2.34001 10.1007 2.34001 10.4941 2.74885L13.9176 6.30662C14.5289 6.94193 14.0786 8 13.197 8H6.35003C5.46837 8 5.01813 6.94193 5.62945 6.30662L9.05293 2.74885Z"
								:fill="order == 'desc' && orderBy == 'profit' ? '#969897' : '#A1A1A1'" />
						</svg>
					</view>
				</view>
				<view class="title icon-box" @click="setSort('create_time')">
					时间
					<view class="sort-box">
						<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
							<path
								d="M9.05293 15.2512C9.44633 15.66 10.1007 15.66 10.4941 15.2512L13.9176 11.6934C14.5289 11.0581 14.0786 10 13.197 10H6.35003C5.46837 10 5.01813 11.0581 5.62945 11.6934L9.05293 15.2512Z"
								:fill="order == 'asc' && orderBy == 'create_time' ? '#969897' : '#A1A1A1'" />
							<path
								d="M9.05293 2.74885C9.44633 2.34001 10.1007 2.34001 10.4941 2.74885L13.9176 6.30662C14.5289 6.94193 14.0786 8 13.197 8H6.35003C5.46837 8 5.01813 6.94193 5.62945 6.30662L9.05293 2.74885Z"
								:fill="order == 'desc' && orderBy == 'create_time' ? '#969897' : '#A1A1A1'" />
						</svg>
					</view>
				</view>
			</view>

			<z-paging
				:style="'height: calc(var(--vh) - 96rpx - 90rpx - 122rpx);background: var(--theme-auxiliary-color-default);'"
				class="paging" ref="paging" v-model="list" @query="getList" :lower-threshold="10"
				:refresher-enabled="true" :refresherAnimated="false"
				:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
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
				:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': themeColor.themeAuxiliaryColorDefault }"
				:loading-more-loading-animated="false" :loading-more-default-as-loading="false"
				:show-loading-more-no-more-view="true" :loading-more-no-more-text="'没有更多数据了'" :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '170px' }"
				:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<view class="list-item" v-for="(item, index) in list">
					<!-- <image class="new" v-if="item.timeText == '刚刚'" src="@/static/img/user/accountlog/new.png"></image> -->
					<view class="new" v-if="item.timeText == '刚刚'">
						<svg width="27" height="14" viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="27" height="14" fill="#444444" />
							<g clip-path="url(#clip0_15862_194359)">
								<rect width="375" height="812" transform="translate(0 -238)"
									:fill="themeColor.themeAuxiliaryColorDefault" />
								<rect y="-140" width="375" height="205" rx="12" fill="white" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M0 12.65C0 11.1175 0 10.3513 0.076247 9.70709C0.674037 4.65639 4.65639 0.674037 9.70709 0.076247C10.3513 0 11.1175 0 12.65 0H27C20.934 0 18.1414 3.6469 16.9267 8.86778C16.6936 9.86938 16.5771 10.3702 16.5029 10.5874C15.8569 12.4778 14.6363 13.4471 12.6487 13.6478C12.4203 13.6709 12.0722 13.6709 11.376 13.6709H0V12.65Z"
									fill="url(#paint0_linear_15862_194359)" />
								<path
									d="M9.096 8.348H7.744V10.18C7.744 10.388 7.71733 10.548 7.664 10.66C7.616 10.772 7.528 10.8493 7.4 10.892C7.272 10.94 7.088 10.964 6.848 10.964H6.352L6.216 10.252H6.648C6.792 10.252 6.89067 10.244 6.944 10.228C6.99733 10.2067 7.02933 10.172 7.04 10.124C7.056 10.076 7.064 9.98533 7.064 9.852V8.348H5.6V7.676H7.064V6.932H5.448V6.276H6.4L6.144 5.124H5.672V4.476H7.048C6.936 4.14 6.86133 3.908 6.824 3.78L7.568 3.652C7.664 3.92933 7.752 4.204 7.832 4.476H9.056V5.124H8.648C8.52533 5.62 8.424 6.004 8.344 6.276H9.216V6.932H7.744V7.676H9.096V8.348ZM12.568 6.428V7.148H11.776V10.996H11.08V7.148H10.232C10.232 7.82 10.208 8.37467 10.16 8.812C10.1173 9.244 10.0373 9.63333 9.92 9.98C9.80267 10.3213 9.63467 10.684 9.416 11.068L8.68 10.708C8.90933 10.3613 9.08 10.028 9.192 9.708C9.30933 9.388 9.38933 9.02267 9.432 8.612C9.47467 8.20133 9.496 7.65733 9.496 6.98V4.476C9.97067 4.43333 10.4533 4.36133 10.944 4.26C11.4347 4.15333 11.848 4.036 12.184 3.908L12.416 4.62C12.1387 4.732 11.8 4.836 11.4 4.932C11 5.028 10.6107 5.1 10.232 5.148V6.428H12.568ZM6.776 5.124L6.848 5.42C6.93867 5.77733 7.00533 6.06267 7.048 6.276H7.68C7.76 6.02533 7.864 5.64133 7.992 5.124H6.776ZM6.736 8.796C6.496 9.43067 6.224 9.99333 5.92 10.484L5.376 10.148C5.52533 9.92933 5.65867 9.69467 5.776 9.444C5.89867 9.19333 6.024 8.89733 6.152 8.556L6.736 8.796ZM8.392 8.564C8.52 8.73467 8.73333 9.036 9.032 9.468L9.144 9.628L8.632 10.012C8.48267 9.76667 8.24 9.40133 7.904 8.916L8.392 8.564Z"
									fill="white" />
							</g>
							<path
								d="M-3096 -489H10715V-491H-3096V-489ZM10716 -488V5199H10718V-488H10716ZM10715 5200H-3096V5202H10715V5200ZM-3097 5199V-488H-3099V5199H-3097ZM-3096 5200C-3096.55 5200 -3097 5199.55 -3097 5199H-3099C-3099 5200.66 -3097.66 5202 -3096 5202V5200ZM10716 5199C10716 5199.55 10715.6 5200 10715 5200V5202C10716.7 5202 10718 5200.66 10718 5199H10716ZM10715 -489C10715.6 -489 10716 -488.552 10716 -488H10718C10718 -489.657 10716.7 -491 10715 -491V-489ZM-3096 -491C-3097.66 -491 -3099 -489.657 -3099 -488H-3097C-3097 -488.552 -3096.55 -489 -3096 -489V-491Z"
								fill="#A1A1A1" />
							<defs>
								<linearGradient id="paint0_linear_15862_194359" x1="0" y1="13.6709" x2="28" y2="13.6709"
									gradientUnits="userSpaceOnUse">
									<stop :stop-color="themeColor.svgStopColor1" />
									<stop offset="1" :stop-color="themeColor.svgStopColor2" />
								</linearGradient>
								<clipPath id="clip0_15862_194359">
									<rect width="375" height="812" fill="white" transform="translate(0 -238)" />
								</clipPath>
							</defs>
						</svg>

					</view>

					<uni-row class="row-box list-row">
						<uni-col class="row-col" :span="4">
							<view class="title">
								<text class="type-text">{{ item.gameName }}</text>
							</view>
						</uni-col>
						<uni-col class="row-col" :span="8">
							<view class="title">
								<view class="bank gray">{{ item.allBet }}</view>
							</view>
						</uni-col>
						<uni-col class="row-col" :span="8">
							<view class="title">
								<view class="bank" :class="item.profit >= 0 ? 'red' : 'green'">{{ item.profit }}</view>
							</view>
						</uni-col>
						<uni-col class="row-col" :span="4">
							<view class="title">
								<view class="time">{{ item.createTime }}</view>
								<view class="time-text">{{ item.timeText }}</view>
							</view>
						</uni-col>
					</uni-row>
				</view>
			</z-paging>

			<view v-if="loading" class="loading">
				<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
				<view :style="pageLoadingConfig['text_style']">{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
				</view>
			</view>
		</view>
		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker @closePay="closePay" @changeTime="changeTime" :line="'.'" :dayStatMap="dayStatMap"
				:startTimes="startTime" :endTimes="endTime">
			</time-picker>
		</uni-drawer>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import TimePicker from "@/components/common/time-picker";
	import {
		getTime
	} from "@/utils/function"
	import {
		record
	} from "@/utils/lottery/mine";
	import defaultTemplate from "@/utils/defaultTemplate";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "detail",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			TimePicker
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "游戏明细",
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				isShow: false,
				platformId: 0,
				start: '',
				end: '',
				startTime: '',
				endTime: '',
				dayStatMap: [],
				time: '',
				timeStr: '',
				today: '',
				GroupType: [],
				order: 'desc',
				orderBy: 'create_time',
				pageNo: 1,
				pageSize: 15,
				list: [],
				total: [],
				info: {},
				lastAmount: 0.00,
				nextAmount: 0.00,
				todayAmount: 0.00,
				loading: false
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(option) {
			this.title = option.title
			this.platformId = option.platformId

			let date = new Date();
			this.today = getTime(date)
			this.startTime = option.startTime
			this.endTime = option.endTime
			this.start = this.getDay(-30)
			this.end = this.today
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
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
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let date = end.getTime() + 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.startTime = getTime(date)
				}
				this.endTime = getTime(date)
				this.$refs.paging.reload()
			},
			setSort(orderBy) {
				this.orderBy = orderBy
				if (this.order == 'asc') {
					this.order = 'desc'
				} else {
					this.order = 'asc'
				}
				this.$refs.paging.reload()
			},
			getList(pageNo, pageSIze, isLoading) {
				this.loading = isLoading
				this.pageNo = pageNo
				let prams = {
					'beginTime': this.startTime,
					'endTime': this.endTime,
					'order': this.order,
					'orderBy': this.orderBy,
					'pageNo': this.pageNo,
					'pageSize': this.pageSize,
					'platformId': this.platformId
				}
				record(prams).then(res => {
					const {
						list,
						dayStatMap,
						statList,
						lastAmount,
						nextAmount,
						todayAmount
					} = defaultTemplate({
						lastAmount: 0,
						todayAmount: 0,
						nextAmount: 0,
						list: [{
							id: "",
							orderNo: "",
							platformId: '',
							gameName: "",
							allBet: 0,
							profit: 0,
							createTime: "",
							timeText: ""
						}, ],
						dayStatMap: {}
					}, res.result)
					this.dayStatMap = dayStatMap
					this.total = statList
					this.lastAmount = lastAmount
					this.nextAmount = nextAmount
					this.todayAmount = todayAmount
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


		.sx {
			font-weight: 500;
			font-size: 28rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				height: 40rpx;
				width: 40rpx;
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
			background: #fff;
			padding: 0 24rpx;
			border-top: 1px solid var(--theme-auxiliary-color-default);
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
			margin-top: 20rpx;
			border-radius: 24rpx 24rpx 0 0;

			.pre,
			.next {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 184rpx;
				height: 116rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #404040;

				.pre-item,
				.next-item {
					display: flex;
					align-items: center;
					flex-direction: column;

					.text {
						display: flex;
						align-items: center;
					}

					.te {
						margin: 0 20rpx;
					}

					.coin-box {
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 24rpx;
						margin-top: 10rpx;
					}

					.coin {
						display: inline-block;
						font-size: 24rpx;
						max-width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.green {
						color: var(--theme-color);
					}

					.red {
						color: var(--theme-auxiliary-color-remind);
					}
				}
			}

			.pre {
				.pre-item {
					align-items: flex-start;
				}
			}

			.next {
				.pre-item {
					align-items: flex-end;
				}
			}

			.time-item {
				width: 378rpx;
				background: var(--theme-color-bg);
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20rpx;

				.icon {
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
				}

				.time {
					text-align: center;
					font-weight: 400;
					text-align: center;
					color: #404040;

					.time-text {
						font-size: 28rpx;
					}

					.coin-text {
						font-size: 24rpx;

						.green {
							// color: var(--theme-color);
							color: var(--theme-color);
						}

						.red {
							color: var(--theme-auxiliary-color-remind);
						}
					}
				}
			}
		}

		.type-box {
			.row-box {
				background: #FFFFFF;
				height: 76rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 28rpx;
				font-size: 26rpx;
				font-weight: 400;


				.title {
					font-weight: 400;
					font-size: 22rpx;
					text-align: center;
					color: #666666;

					/*display: flex;
          justify-content: center;
          align-items: center;*/
					.icon {
						background: #C5CCCE;
						height: 30rpx;
						width: 30rpx;
						border-radius: 50%;
						margin-left: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.type-text {
						font-size: 22rpx;
						color: #404040;
					}

					.bank,
					.money-text {
						font-size: 22rpx;
						color: #404040;
					}

					.gift-money {
						font-size: 22rpx;
					}

					.gray {
						color: #666666;
					}

					.red {
						color: #CC3333;
					}

					.green {
						// color: #34B822;
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
						font-size: 18rpx;
						text-align: right;
						color: #404040;
					}

					.time-text {
						font-size: 24rpx;
						text-align: right;
						color: #CC3333;
					}
				}

				.icon-box {
					display: flex;

					.sort-box {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-left: 6rpx;

						.asc {
							border-bottom: 10rpx solid #CECECD;
							border-left: 10rpx solid transparent;
							border-right: 10rpx solid transparent;
						}

						.desc {
							margin-top: 4rpx;
							border-top: 10rpx solid #CECECD;
							border-left: 10rpx solid transparent;
							border-right: 10rpx solid transparent;
						}

						.act-asc {
							border-bottom: 10rpx solid #858583;
						}

						.act-desc {
							border-top: 10rpx solid #858583;
						}
					}
				}

				.container-data {
					position: relative;

					.container-box {
						position: absolute;
						top: 48rpx;
						z-index: 999;
						width: 100%;
						max-width: 480px;
						background: #EEEEEE;
						height: calc(var(--vh) - 96rpx - 90rpx - 50rpx - 120rpx);

						.container-row {
							.container-title {
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: flex-start;
								padding: 0px 0px 0px 30rpx;
								height: 50rpx;
								background: #EEEEEE;
								font-weight: 400;
								font-size: 24rpx;
								color: #666666;
							}

							.container-list {
								background: #F6F6F6;
								display: flex;
								flex-wrap: wrap;

								.container-list-item {
									margin: 13rpx;
									min-width: 220rpx;
									height: 60rpx;
									font-size: 26rpx;
									border: 1px solid #e7e7e7;
									border-radius: 50rpx;
									background: #FFFFFF;
									text-align: center;
									line-height: 60rpx;
								}

								.active {
									background: #8CB2C9;
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
				height: 100rpx;
			}
		}
	}
</style>
