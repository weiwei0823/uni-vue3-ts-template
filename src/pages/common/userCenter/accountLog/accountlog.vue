<template>
	<view class="log-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed>
			<block slot="right">
				<view class="sx" @click="isShow = !isShow">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 22 22" fill="none">
						<path
							d="M21.9038 0.609663C22.0814 1.03706 22.0075 1.4016 21.6854 1.70329L13.9939 9.40579V20.9988C14.0034 21.1972 13.9496 21.3934 13.8403 21.5592C13.731 21.725 13.5719 21.8518 13.3858 21.9212C13.2618 21.971 13.1297 21.9976 12.9961 21.9997C12.8647 22.0029 12.7341 21.978 12.613 21.9268C12.4919 21.8756 12.3831 21.7992 12.2937 21.7028L8.2995 17.7022C8.20486 17.6116 8.12982 17.5025 8.07901 17.3817C8.0282 17.2609 8.00271 17.1309 8.0041 16.9999V9.40579L0.312599 1.70329C-0.00951721 1.4016 -0.0833683 1.03706 0.0941883 0.609663C0.271745 0.204269 0.578148 0 1.01497 0H20.9846C21.4198 0.0015713 21.7262 0.204269 21.9038 0.609663Z"
							fill="#A1A1A1" />
					</svg>
					<view class="text">{{ $t('pages.common.userCenter.accountLog.filter') }}</view>
				</view>
			</block>
		</Header>
		<view class="date-box">
			<view class="pre" @click="pre()">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"
					v-if="isShowPre">
					<rect y="18" width="18" height="18" rx="9" transform="rotate(-90 0 18)"
						:fill="themeColor.themeAuxiliaryColorDefault" />
					<path d="M10.5 13L6.5 9L10.5 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
				<view class="text">{{ isShowPre ? $t('pages.common.userCenter.accountLog.PreviousDay') : '' }}</view>
			</view>
			<view class="time-item">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<g clip-path="url(#clip0_17702_98569)">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M9 1.5C9 0.670313 8.32969 0 7.5 0C6.67031 0 6 0.670313 6 1.5V3H3.75C2.50781 3 1.5 4.00781 1.5 5.25V7.5H22.5V5.25C22.5 4.00781 21.4922 3 20.25 3H18V1.5C18 0.670313 17.3297 0 16.5 0C15.6703 0 15 0.670313 15 1.5V3H9V1.5ZM22.5 9H1.5V21.75C1.5 22.9922 2.50781 24 3.75 24H20.25C21.4922 24 22.5 22.9922 22.5 21.75V9ZM7.66669 12.002C7.94283 12.002 8.16669 12.2258 8.16669 12.502V15.502C8.16669 15.7781 7.94283 16.002 7.66669 16.002H4.66669C4.39054 16.002 4.16669 15.7781 4.16669 15.502V12.502C4.16669 12.2258 4.39054 12.002 4.66669 12.002H7.66669ZM7.66675 17.3359C7.94289 17.3359 8.16675 17.5598 8.16675 17.8359V20.8359C8.16675 21.1121 7.94289 21.3359 7.66675 21.3359H4.66675C4.39061 21.3359 4.16675 21.1121 4.16675 20.8359V17.8359C4.16675 17.5598 4.39061 17.3359 4.66675 17.3359H7.66675ZM10.6667 12.002C10.3906 12.002 10.1667 12.2258 10.1667 12.502V15.502C10.1667 15.7781 10.3906 16.002 10.6667 16.002H13.6667C13.9429 16.002 14.1667 15.7781 14.1667 15.502V12.502C14.1667 12.2258 13.9429 12.002 13.6667 12.002H10.6667ZM13.6667 17.3359C13.9428 17.3359 14.1667 17.5598 14.1667 17.8359V20.8359C14.1667 21.1121 13.9428 21.3359 13.6667 21.3359H10.6667C10.3905 21.3359 10.1667 21.1121 10.1667 20.8359V17.8359C10.1667 17.5598 10.3905 17.3359 10.6667 17.3359H13.6667ZM16.6667 12.002C16.3906 12.002 16.1667 12.2258 16.1667 12.502V15.502C16.1667 15.7781 16.3906 16.002 16.6667 16.002H19.6667C19.9429 16.002 20.1667 15.7781 20.1667 15.502V12.502C20.1667 12.2258 19.9429 12.002 19.6667 12.002H16.6667ZM19.6667 17.3359C19.9429 17.3359 20.1667 17.5598 20.1667 17.8359V20.8359C20.1667 21.1121 19.9429 21.3359 19.6667 21.3359H16.6667C16.3906 21.3359 16.1667 21.1121 16.1667 20.8359V17.8359C16.1667 17.5598 16.3906 17.3359 16.6667 17.3359H19.6667Z"
							:fill="themeColor.activeColor" />
					</g>
					<defs>
						<clipPath id="clip0_17702_98569">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
				<view class="time" @click="openTime">{{ showTime }}</view>
			</view>
			<view class="next" @click="next()">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"
					v-if="isShowNext">
					<rect width="18" height="18" rx="9" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 18 18)"
						:fill="themeColor.themeAuxiliaryColorDefault" />
					<path d="M7.5 13L11.5 9L7.5 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
				<view class="text">{{ isShowNext ? $t('pages.common.userCenter.accountLog.NextDay') : '' }}</view>
			</view>
		</view>
		<view class="type-box">
			<view class="row-box" :style="{ borderRadius: isShow || list.length ? '0' : '0 0 24rpx 24rpx' }">
				<view class="title icon-box" @click="isShow = !isShow">
					{{ typeTitle }}
					<text class="icon">
						<svg :style="{
							transition: 'all .3s',
							transform: isShow ? 'rotate(180deg)' : '',
						}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<rect width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
							<path
								d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
								fill="#A1A1A1" />
						</svg>
					</text>
				</view>
				<view class="title icon-box" @click="setSort('amount')">
					账变金额
					<view class="sort-box">
						<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
							<path
								d="M9.05293 15.2512C9.44633 15.66 10.1007 15.66 10.4941 15.2512L13.9176 11.6934C14.5289 11.0581 14.0786 10 13.197 10H6.35003C5.46837 10 5.01813 11.0581 5.62945 11.6934L9.05293 15.2512Z"
								:fill="order == 'asc' && orderBy == 'amount' ? '#969897' : '#A1A1A1'" />
							<path
								d="M9.05293 2.74885C9.44633 2.34001 10.1007 2.34001 10.4941 2.74885L13.9176 6.30662C14.5289 6.94193 14.0786 8 13.197 8H6.35003C5.46837 8 5.01813 6.94193 5.62945 6.30662L9.05293 2.74885Z"
								:fill="order == 'desc' && orderBy == 'amount' ? '#969897' : '#A1A1A1'" />
						</svg>
					</view>
				</view>
				<view class="title icon-box" @click="setSort('after_balance')">
					余额
					<view class="sort-box">
						<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
							<path
								d="M9.05293 15.2512C9.44633 15.66 10.1007 15.66 10.4941 15.2512L13.9176 11.6934C14.5289 11.0581 14.0786 10 13.197 10H6.35003C5.46837 10 5.01813 11.0581 5.62945 11.6934L9.05293 15.2512Z"
								:fill="order == 'asc' && orderBy == 'after_balance' ? '#969897' : '#A1A1A1'" />
							<path
								d="M9.05293 2.74885C9.44633 2.34001 10.1007 2.34001 10.4941 2.74885L13.9176 6.30662C14.5289 6.94193 14.0786 8 13.197 8H6.35003C5.46837 8 5.01813 6.94193 5.62945 6.30662L9.05293 2.74885Z"
								:fill="order == 'desc' && orderBy == 'after_balance' ? '#969897' : '#A1A1A1'" />
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

			<view class="container-data" @click.stop="isShow=false" v-show="isShow">
				<view class="container-box" @click.stop="" :class="isShow ? 'fadeOutDown' : 'fadeOutUp'">
					<view class="container-row">
						<view class="container-list">
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
						<view class="container-list">
							<view class="container-list-item" v-for="(v, k) in item.children" @click="setGroupType(v)"
								:class="{ active: typeTitle == v.title }">
								{{ v.title }}
							</view>
						</view>
					</view>
				</view>
			</view>

			<z-paging :style="'height: calc(var(--vh) - 100rpx - 90rpx - 50rpx - 120rpx);'" class="paging" ref="paging"
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
				:loading-more-custom-style="{ 'padding-top': '20rpx','padding-bottom':'60rpx', 'background': themeColor.themeAuxiliaryColorDefault}"
				:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
				:show-loading-more-no-more-view="true" :loading-more-no-more-text="'没有更多数据了'" :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '100rpx' }"
				:empty-view-img-style="{ 'width': '400rpx', 'height': '400rpx' }">
				<view class="list-item" v-for="(item, index) in list" @click="detail(item)">
					<!-- <image class="new" v-if="item.timeText == $t('pages.common.userCenter.accountLog.JustNow')"
						src="@/static/img/user/accountlog/new.png"></image> -->

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
									<stop :stop-color="themeColor.themeColor" />
									<stop offset="1" :stop-color="themeColor.themeColor" />
								</linearGradient>
								<clipPath id="clip0_15862_194359">
									<rect width="375" height="812" fill="white" transform="translate(0 -238)" />
								</clipPath>
							</defs>
						</svg>

					</view>

					<view class="row-box list-row">
						<view class="firstTitle">
							<text class="group-text">{{ item.groupName }}</text>
							<view class="type-text">{{ item.typeName }}</view>
						</view>
						<view class="title">
							<view class="bank"
								:class="item.balanceDirection == 1 ? 'red' : item.balanceDirection == 2 ? 'green' : ''">
								{{
									item.balanceDirection == 2 ? '-' : '' }}{{ item.amount }}
							</view>
						</view>
						<view class="title">
							{{ item.afterBalance }}
						</view>
						<view class="lastTitle">
							<view class="time">{{ item.createTime }}</view>
							<view class="time-text">{{ item.timeText }}</view>
						</view>
					</view>
				</view>
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
		<uni-drawer ref="change" mode="right" :width="100" style="max-width: 480px;margin: auto;">
			<Change :info="info" @closeDetail="closeDetail" />
		</uni-drawer>
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
		balanceRecord
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
				title: this.$t('pages.common.userCenter.accountLog.totalTitle'),
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
				total: [],
				info: {},
				loading: false,
				loadingTimes: 0,
				isApp: false
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
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			if (this.isApp) {
				this.$nativeBridge.setSafeAreaColor('#f3f9f6')
			}
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
				this.orderBy = orderBy
				if (this.order == 'asc') {
					this.order = 'desc'
				} else {
					this.order = 'asc'
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
					'beginTime': this.startTime,
					'endTime': this.endTime,
					'groupType': this.code,
					'order': this.order,
					'orderBy': this.orderBy,
					'pageNo': this.pageNo,
					'pageSize': this.pageSize,
				}
				balanceRecord(prams).then(res => {
					let list = res.result.list
					// 	item.timeText = "刚刚"
					// })
					this.total = res.result.stat
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
	::v-deep .uni-drawer {
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
			}

			.row-box {
				padding: 20rpx 0;
				display: grid;
				grid-template-columns: repeat(4, 1fr);
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
						font-size: 24rpx;
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
								margin: 0 20rpx 20rpx 0;
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
				// height: 130rpx;
				height: 146rpx;
				box-sizing: border-box;
				border-bottom-style: dashed;
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
