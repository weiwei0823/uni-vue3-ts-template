<template>
	<view class="log-box" :style="{ marginTop: safeHeight,height: `${uWindowHeight}px`  }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="menu-box">
			<view class="menu-item" v-for="(item, index) in menu" :class="{ active: type == index }"
				@click="selectType(index)">
				{{ item.name }}
			</view>
		</view>
		<view class="date-box">
			<view class="pre">
				<view class="pre" v-if="isShowPre" @click="pre()">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect y="18" width="18" height="18" rx="9" transform="rotate(-90 0 18)"
							:fill="themeColor.themeAuxiliaryColorDefault" />
						<path d="M10.5 13L6.5 9L10.5 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
					<view class="text">{{ $t('pages.common.userCenter.accountLog.PreviousDay') }}</view>
				</view>
			</view>
			<view class="time-item">
				<view class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<g clip-path="url(#clip0_17702_97178)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M9 1.5C9 0.670313 8.32969 0 7.5 0C6.67031 0 6 0.670313 6 1.5V3H3.75C2.50781 3 1.5 4.00781 1.5 5.25V7.5H22.5V5.25C22.5 4.00781 21.4922 3 20.25 3H18V1.5C18 0.670313 17.3297 0 16.5 0C15.6703 0 15 0.670313 15 1.5V3H9V1.5ZM22.5 9H1.5V21.75C1.5 22.9922 2.50781 24 3.75 24H20.25C21.4922 24 22.5 22.9922 22.5 21.75V9ZM7.66669 12.002C7.94283 12.002 8.16669 12.2258 8.16669 12.502V15.502C8.16669 15.7781 7.94283 16.002 7.66669 16.002H4.66669C4.39054 16.002 4.16669 15.7781 4.16669 15.502V12.502C4.16669 12.2258 4.39054 12.002 4.66669 12.002H7.66669ZM7.66675 17.3359C7.94289 17.3359 8.16675 17.5598 8.16675 17.8359V20.8359C8.16675 21.1121 7.94289 21.3359 7.66675 21.3359H4.66675C4.39061 21.3359 4.16675 21.1121 4.16675 20.8359V17.8359C4.16675 17.5598 4.39061 17.3359 4.66675 17.3359H7.66675ZM10.6667 12.002C10.3906 12.002 10.1667 12.2258 10.1667 12.502V15.502C10.1667 15.7781 10.3906 16.002 10.6667 16.002H13.6667C13.9429 16.002 14.1667 15.7781 14.1667 15.502V12.502C14.1667 12.2258 13.9429 12.002 13.6667 12.002H10.6667ZM13.6667 17.3359C13.9428 17.3359 14.1667 17.5598 14.1667 17.8359V20.8359C14.1667 21.1121 13.9428 21.3359 13.6667 21.3359H10.6667C10.3905 21.3359 10.1667 21.1121 10.1667 20.8359V17.8359C10.1667 17.5598 10.3905 17.3359 10.6667 17.3359H13.6667ZM16.6667 12.002C16.3906 12.002 16.1667 12.2258 16.1667 12.502V15.502C16.1667 15.7781 16.3906 16.002 16.6667 16.002H19.6667C19.9429 16.002 20.1667 15.7781 20.1667 15.502V12.502C20.1667 12.2258 19.9429 12.002 19.6667 12.002H16.6667ZM19.6667 17.3359C19.9429 17.3359 20.1667 17.5598 20.1667 17.8359V20.8359C20.1667 21.1121 19.9429 21.3359 19.6667 21.3359H16.6667C16.3906 21.3359 16.1667 21.1121 16.1667 20.8359V17.8359C16.1667 17.5598 16.3906 17.3359 16.6667 17.3359H19.6667Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_17702_97178">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</view>
				<view class="time" @click="openTime">{{ showTime.replace(/\s*/g,"") }}</view>
			</view>
			<view class="next">
				<view class="next" v-if="isShowNext" @click="next()">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect width="18" height="18" rx="9" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 18 18)"
							:fill="themeColor.themeAuxiliaryColorDefault" />
						<path d="M7.5 13L11.5 9L7.5 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
					<view class="text">{{ $t('pages.common.userCenter.accountLog.NextDay') }}</view>
				</view>
			</view>
		</view>
		<view class="type-box">
			<view class="row-box">
				<view class="title">
					<view class="text">{{ type == 0 ? $t('pages.common.userCenter.accountLog.Type') :
						$t('pages.common.userCenter.accountLog.Channel') }}</view>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
						<path
							d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<view class="title">
					<view class="text">{{ type == 0 ? $t('pages.common.userCenter.accountLog.Channel') :
						$t('pages.common.userCenter.accountLog.Amount') }}</view>
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
						<path
							d="M5.05293 13.2512C5.44633 13.66 6.10068 13.66 6.49408 13.2512L9.91755 9.69338C10.5289 9.05807 10.0786 8 9.19698 8H2.35003C1.46837 8 1.01813 9.05807 1.62945 9.69338L5.05293 13.2512Z"
							fill="#A1A1A1" />
						<path
							d="M5.05293 0.748846C5.44633 0.340013 6.10068 0.340012 6.49408 0.748845L9.91755 4.30662C10.5289 4.94193 10.0786 6 9.19698 6H2.35003C1.46837 6 1.01813 4.94193 1.62945 4.30662L5.05293 0.748846Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<view class="title icon-box" @click="setSort('status')">
					{{ $t('pages.common.userCenter.accountLog.Status') }}
					<view class="sort-box">
						<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
							<path
								d="M9.05293 15.2512C9.44633 15.66 10.1007 15.66 10.4941 15.2512L13.9176 11.6934C14.5289 11.0581 14.0786 10 13.197 10H6.35003C5.46837 10 5.01813 11.0581 5.62945 11.6934L9.05293 15.2512Z"
								:fill="order == 'asc' && orderBy == 'status' ? '#969897' : '#A1A1A1'" />
							<path
								d="M9.05293 2.74885C9.44633 2.34001 10.1007 2.34001 10.4941 2.74885L13.9176 6.30662C14.5289 6.94193 14.0786 8 13.197 8H6.35003C5.46837 8 5.01813 6.94193 5.62945 6.30662L9.05293 2.74885Z"
								:fill="order == 'desc' && orderBy == 'status' ? '#969897' : '#A1A1A1'" />
						</svg>
					</view>
				</view>
				<view class="title icon-box" @click="setSort('create_time')">
					{{ $t('pages.common.userCenter.accountLog.Time') }}
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
			<z-paging :style="{background: 'var(--theme-auxiliary-color-default)',height:`calc(var(--vh) - 520rpx)`}"
				class="paging" ref="paging" v-model="list" @query="getList" :lower-threshold="10"
				:refresher-enabled="true" :refresherAnimated="false" :loading-more-enabled="false"
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
				:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
				:show-loading-more-no-more-view="true"
				:loading-more-no-more-text="$t('pages.common.userCenter.accountLog.NoMoreData')"
				:hide-empty-view="false" :empty-view-center="true"
				:empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '150rpx' }"
				:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<!--        <scroll-view :scroll-top="scrollTop"
                     scroll-y="true" class="scroll-Y"
                     @scrolltoupper="upper"
                     @scrolltolower="lower"
                     @scroll="scroll">-->
				<view class="list-item" v-for="(item, index) in list" @click="detail(item)">
					<image class="new"
						v-if="item.timeText == '刚刚'||item.timeText ==$t('pages.common.userCenter.accountLog.JustNow')"
						src="@/static/img/user/accountlog/new_n.png">
					</image>
					<uni-row class="row-box list-row">
						<uni-col class="row-col" :span="4">
							<view class="title">
								<text class="type-text">{{ type == 0 ? item.type : item.childType }}</text>
							</view>
						</uni-col>
						<uni-col class="row-col" :span="8">
							<view class="title" style="flex-direction: column;">
								<view class="bank" v-if="type == 0">{{ item.childType }}</view>
								<view class="money-text">{{ item.amount }}</view>
							</view>
						</uni-col>
						<uni-col class="row-col" :span="6">
							<view class="title status">
								<text class="fq" v-if="item.status == -1">{{ item.statusText }}</text>
								<text class="sl" v-else-if="item.status == 0">{{ item.statusText }}</text>
								<text class="ok" v-else-if="item.status == 1">{{ item.statusText }}</text>
								<text class="err" v-else-if="item.status == 2">{{ item.statusText }}</text>
							</view>
						</uni-col>
						<uni-col class="row-col" :span="6">
							<view class="title time-box">
								<view class="time">{{ item.createTime }}</view>
								<view class="time-text">{{ item.timeText }}</view>
							</view>
						</uni-col>
					</uni-row>
				</view>
				<!--      </scroll-view>-->
			</z-paging>
			<view v-if="loading" class="loading">
				<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
				<view :style="pageLoadingConfig['text_style']">{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
				</view>
			</view>
			<view style="height: 120rpx">
				<Common :total="total" />
			</view>
		</view>
		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker @closePay="closePay" @changeTime="changeTime" :line="'.'" :startTimes="startTime"
				:endTimes="endTime">
			</time-picker>
		</uni-drawer>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import Common from "./common/common";
	import TimePicker from "@/components/common/time-picker";
	import {
		getTime
	} from "@/utils/function"
	import {
		accessRecord
	} from "@/utils/lottery/mine";
	import defaultTemplate from "@/utils/defaultTemplate";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "index",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			Common,
			TimePicker
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.accountLog.index.AccountLog'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				type: 0,
				menu: [{
					name: this.$t('pages.common.userCenter.accountLog.index.All')
				}, {
					name: this.$t('pages.common.userCenter.accountLog.index.Recharge')
				}, {
					name: this.$t('pages.common.userCenter.accountLog.index.Withdrawal')
				}],
				start: '',
				end: '',
				startTime: '',
				endTime: '',
				time: '',
				timeStr: '',
				today: '',
				order: '',
				orderBy: '',
				pageNo: 1,
				pageSize: 12,
				list: [],
				total: [],
				loading: false,
				loadingTimes: 0,
				isApp: false
			}
		},
		mounted() {
			let date = new Date();
			this.today = getTime(date)
			this.startTime = this.today
			this.endTime = this.today
			this.start = this.getDay(-30)
			this.end = this.today

			uni.$emit("on_page_mounted", this)
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			if (this.isApp) {
				this.$nativeBridge.setSafeAreaColor('#f3f9f6')
			}
			/*this.getList();*/
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
			showTime() {
				const formatText =
					`yyyy ${this.$t('pages.common.userCenter.accountLog.Years')} mm ${this.$t('pages.common.userCenter.accountLog.Months')} dd ${this.$t('pages.common.userCenter.accountLog.Days')}`
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let startTime = getTime(start, '/', 2, 'date')
				let endTime = getTime(end, '/', 2, 'date')
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
				uni.navigateTo({
					url: 'detail?createTime=' + item.createTime + "&id=" + item.id + "&source=" + item.source,
					success: function(res) {
						res.eventChannel.emit('argParams', item)
					}
				})
			},
			selectType(index) {
				this.type = index
				this.loadingTimes = 0;
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
				this.loadingTimes = 0;
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
				this.orderBy = orderBy
				if (this.order == 'asc') {
					this.order = 'desc'
				} else {
					this.order = 'asc'
				}
				this.$refs.paging.reload()
			},
			getList(pageNo, pageSize = 10) {
				this.loadingTimes++;
				if (this.loadingTimes <= 1) this.loading = true;
				this.pageNo = pageNo;
				let prams = {
					'beginTime': this.startTime,
					'endTime': this.endTime,
					'order': this.order,
					'orderBy': this.orderBy,
					'pageNo': this.pageNo,
					'pageSize': this.pageSize,
					'type': this.type,
				}
				accessRecord(prams).then(res => {
					const {
						list,
						stat: total
					} = defaultTemplate({
						list: [{
							id: "",
							orderNo: "",
							bankNumber: 0,
							source: '1',
							type: "",
							childType: "",
							amount: 0,
							discountAmount: 0,
							fee: 0,
							feeRatio: 0,
							status: 1,
							statusText: "",
							createTime: "",
							lockTime: "",
							confirmTime: "",
							remark: "",
							timeText: ""
						}],
						stat: {
							totalRechargeAmount: 0,
							totalDrawAmount: 0,
							rechargeSuccessAmount: 0,
							drawSuccessAmount: 0
						}
					}, res.result)
					if (this.type == 0) {
						this.total = [{
								title: this.$t('pages.common.userCenter.accountLog.index.TotalRecharge'),
								amount: total.totalRechargeAmount
							},
							{
								title: this.$t('pages.common.userCenter.accountLog.index.TotalWithdrawal'),
								amount: total.totalDrawAmount
							},
							{
								title: this.$t('pages.common.userCenter.accountLog.index.RechargeSuccess'),
								amount: total.rechargeSuccessAmount
							},
							{
								title: this.$t('pages.common.userCenter.accountLog.index.WithdrawalSuccess'),
								amount: total.drawSuccessAmount
							},
						]
					} else if (this.type == 1) {
						this.total = [{
								title: this.$t('pages.common.userCenter.accountLog.index.RechargeSuccess'),
								amount: total.totalRechargeAmount
							},
							{
								title: this.$t('pages.common.userCenter.accountLog.index.RechargeSuccess'),
								amount: total.rechargeSuccessAmount
							},
						]
					} else {
						this.total = [{
								title: this.$t('pages.common.userCenter.accountLog.index.TotalWithdrawal'),
								amount: total.totalDrawAmount
							},
							{
								title: this.$t('pages.common.userCenter.accountLog.index.WithdrawalSuccess'),
								amount: total.drawSuccessAmount
							},
						]
					}
					const lia = [{}, {}]
					this.$refs.paging.complete(list);
					// this.$refs.paging.complete(lia);
					this.loading = false
					this.$store.dispatch("updateUserBalanceFromServer")
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
		background: var(--theme-auxiliary-color-default);
		position: fixed;
		width: 100%;
		max-width: 480px;

		.menu-box {
			margin-top: 20rpx;
			border-radius: 24rpx 24rpx 0 0;
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #FFFFFF;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
			padding: 0 60rpx;

			.menu-item {
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-weight: 400;
				font-size: 30rpx;
				text-align: center;
				color: #404040;
				height: 100%;
			}

			.active {
				color: var(--theme-color);
				position: relative;

				&::after {
					position: absolute;
					bottom: 0px;
					content: '';
					width: 38rpx;
					height: 6rpx;
					border-radius: 6rpx 6rpx 0px 0px;
					background: var(--theme-color);
					margin: 0 auto;
				}
			}
		}

		.date-box {
			display: flex;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);

			.pre,
			.next {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 186rpx;
				height: 116rpx;
				background: #fff;
				font-weight: 400;
				font-size: 28rpx;
				color: #404040;

				.text {
					margin-left: 20rpx;
				}
			}

			.time-item {
				width: 326rpx;
				height: 116rpx;
				background: var(--theme-color-bg);
				display: flex;
				align-items: center;
				justify-content: center;

				.icon {
					margin-right: 20rpx;

					image {
						margin-left: 24rpx;
						height: 96rpx;
						width: 96rpx;
					}
				}

				.time {
					text-align: center;
					font-weight: 400;
					font-size: 28rpx;
					text-align: center;
					color: #404040;
				}
			}
		}

		.type-box {
			.row-box {
				background: #FFFFFF;
				height: 76rpx;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 28rpx;

				.title {
					/* font-weight: 400;*/
					font-size: 28rpx;
					text-align: center;
					color: #404040;
					display: flex;
					align-items: center;

					.text {
						margin-right: 10rpx;
					}

					.type-text {
						color: #404040;
					}

					.bank,
					.money-text {
						color: #404040;
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
						color: var(--theme-auxiliary-color-remind);
					}

					.err {
						font-size: 22rpx;
						color: #07C160;
					}

					.time {
						font-size: 24rpx;
						text-align: center;
						color: #404040;
					}

					.time-text {
						font-size: 24rpx;
						text-align: center;
						color: var(--theme-color);
						margin-top: 10rpx;
					}
				}

				.status {
					justify-content: center;
				}

				.time-box {
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.time {
						text-align: right;
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
			}

			.list-item {
				position: relative;

				.new {
					height: 27rpx;
					width: 54rpx;
					position: absolute;
					top: 0;
					z-index: 1;
				}

				.row-box {
					// height: 120rpx;
					height: 146rpx;
				}
			}
		}
	}
</style>
