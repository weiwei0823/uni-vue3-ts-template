<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }" @click="isShow = false"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" />
		<view class="search">
			<view class="selects">
				<uni-data-select stroke="#fff" class="item" ref="selectRef" :clear="false" v-model="curr"
					:localdata="yearRangeList" coustIcon @change="listPeriod">
					<template #itemImg="item">
						<view class="item-img">
							<image class="img" v-if="item.value === curr" src="@/static/imgs-liuhe/activity/item-selected.png">
							</image>
						</view>
					</template>
				</uni-data-select>
			</view>
			<view class="right">
				<view class="item" @click="lishi">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM9.09091 5.45455C9.09091 4.95247 9.49792 4.54545 10 4.54545C10.5021 4.54545 10.9091 4.95247 10.9091 5.45455V10.3879L13.6226 11.9545C14.0574 12.2056 14.2064 12.7616 13.9554 13.1964C13.7043 13.6312 13.1483 13.7802 12.7135 13.5291L9.56433 11.711C9.52438 11.6879 9.48684 11.6622 9.4518 11.6344C9.23256 11.4684 9.09091 11.2053 9.09091 10.9091V5.45455Z"
							:fill="themeColor.themeColor" />
					</svg>
					<!-- <filterIcon src="@/static/img/picture/lis.png" :width="40" :height="40" /> -->
					<span class="descs">{{ $t('pages.luntan.liuhePicture.detail.lotteryRecords') }}</span>
				</view>
				<view class="item">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M13.3333 13.9997H12.8423L12.542 14.3882L9.79167 17.9475L7.04129 14.3882L6.74104 13.9997H6.25H4C2.34315 13.9997 1 12.6565 1 10.9997V4.83301C1 3.17616 2.34315 1.83301 4 1.83301H16C17.6569 1.83301 19 3.17615 19 4.83301V10.9997C19 12.6565 17.6569 13.9997 16 13.9997H13.3333Z"
							:stroke="themeColor.themeColor" stroke-width="2" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M4.99992 9.99935C5.92039 9.99935 6.66658 9.25316 6.66658 8.33268C6.66658 7.41221 5.92039 6.66602 4.99992 6.66602C4.07944 6.66602 3.33325 7.41221 3.33325 8.33268C3.33325 9.25316 4.07944 9.99935 4.99992 9.99935ZM9.99992 9.99935C10.9204 9.99935 11.6666 9.25316 11.6666 8.33268C11.6666 7.41221 10.9204 6.66602 9.99992 6.66602C9.07944 6.66602 8.33325 7.41221 8.33325 8.33268C8.33325 9.25316 9.07944 9.99935 9.99992 9.99935ZM16.6666 8.33268C16.6666 9.25316 15.9204 9.99935 14.9999 9.99935C14.0794 9.99935 13.3333 9.25316 13.3333 8.33268C13.3333 7.41221 14.0794 6.66602 14.9999 6.66602C15.9204 6.66602 16.6666 7.41221 16.6666 8.33268Z"
							:fill="themeColor.themeColor" />
					</svg>

					<!-- <filterIcon src="@/static/img/picture/pl2.png" :width="40" :height="40" /> -->
					<span class="descs" @click="replyComment">{{
						$t('pages.luntan.liuhePicture.detail.postComment') }}</span>
				</view>
			</view>
		</view>
		<view class="customfixed" :class="{ 'bor-b': !lottery.id || !lottery.isFit }">
			<view class="m-tabs-period-home van-row">
				<view class="m-tabs-period">
					<scroll-view scroll-x class="m-tabs-period-bd" :scroll-into-view="scrollIntoView" scroll-with-animation>
						<span :id="'item' + index" v-for="(item, index) in periodList" :key="index"
							:class="pictureId == item.guessId ? 'act' : ''" @click="selectPeriod(item, index)">{{
								item.name }}</span>
					</scroll-view>
				</view>
				<view class="right-btn" @click.stop="isShow = !isShow">
					<svg v-if="isShow === false" xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"
						fill="none">
						<path d="M1 1L5 5L9 1" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<uni-icons v-else type="top" size="12" color="#A1A1A1"></uni-icons>
				</view>
			</view>
			<view class="van-dropdown-box" v-show="isShow" :style="{ marginTop: safeHeight }">
				<scroll-view scroll-y class="dropdown-body">
					<view class="van-col van-col--6" :class="pictureId == item.guessId ? 'act2' : ''"
						v-for="(item, index) in periodList" :key="index" @click.stop="selectPeriod(item, index)">
						<span>{{ item.name }}</span>
					</view>
				</scroll-view>
			</view>
		</view>
		<scroll-view scroll-y class="scroll-Y">
			<!--彩票区域-->
			<view class="border-box" v-if="lottery.id">
				<lottery :lotteryDetail="lottery">
					<template v-slot:header>
						<view class="body-hd-2">{{ lottery.year }}年 <view style="color: #404040;margin-left: 10rpx;">第{{
							lottery.period }}期</view>
						</view>
						<view style="background: #fff;width: calc(100% - 40rpx);height: 1px;margin: 0 auto;"></view>
					</template>
					<template v-slot:lottery></template>
					<template v-slot:footer><span></span></template>
				</lottery>
			</view>
			<!-- 投票区域 -->
			<view>
				<view class="vote-box"
					style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
					<view class="ms-bd-vote">
						<view class="van-row">
							<view class="van-col van-col--12" style="padding-right: 15rpx;" v-for="(item, index) in info.voteResult"
								:key="index">
								<view class="vote-num">{{ item.voteCount }}票</view>
								<view class="vote-item">
									<span class="left">{{ item.animalName }}</span>
									<view class="bd-rate">
										<span class="bd-rate-color" :style="'width: ' + item.rate + '%;'"></span>
									</view>
									<span class="right">{{ item.rate.split(".")[0] }}%</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!--评论弹窗-->
		<uni-popup ref="comentPopup" background-color="#fff" mask-background-color="rgba(0,0,0,.7)" :is-mask-click="false">
			<view style="width: 100vw;height: var(--vh)">
				<reply-comment ref="replyComment" @closeComent="closeComent" :commentId="0" :relatedId="pictureId"
					:commentType="8"></reply-comment>
			</view>
		</uni-popup>
		<comment style="display: none;" ref="comment" :relatedId="pictureId" :type="1" :isShow="false"></comment>
		<AlertInjectLayer />
		<Login v-if="showLogin" @closePopup="showLogin = false" />
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import Lottery from '@/components/common/lottery/Lottery'
import Login from "@/components/common/login/Login";
import {
	listPeriod,
	detail
} from "@/utils/vote/index.js"
import {
	period
} from '@/utils/lottery/index.js'
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import Comment from "@/components/common/comment/Comment";
import ReplyComment from "@/components/common/comment/ReplyComment";
import {
	mapGetters
} from 'pinia';
export default {
	name: "voteDetails",
	components: {
		Login,
		Header,
		AlertInjectLayer,
		Lottery,
		Comment,
		ReplyComment
	},
	computed: {
		...mapState(AppInfoStore, ['themeColor']),
		yearRangeList() {
			return this.yearList.map(item => {
				return {
					value: item.id,
					text: item.name
				}
			})
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	data() {
		return {
			showLogin: false,
			scrollIntoView: '',
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: '投票记录',
			selectText: '请选择',
			isShow: false,
			pictureId: 0,
			yearList: [],
			periodList: [],
			info: {},
			lottery: {},
			curr: 0,
		}
	},
	onLoad(option) {
		this.pictureId = parseInt(option.id)
		this.curr = parseInt(option.years)
		this.detail()
		uni.setNavigationBarTitle({
			title: this.title
		});
	},
	methods: {
		lishi: function () {
			uni.navigateTo({
				url: '/pages/luntan/historyLottery/lottery?lotteryType=' + uni.getStorageSync(
					'lotteryType')
			})
		},
		//打开评论
		replyComment() {
			if (!isLogin()) {
				if (this.$config.station === 'LUNTAN') {
					this.showLogin = true
					return
				}
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			this.$refs.comentPopup.open('right')
		},
		//关闭评论
		closeComent: function () {
			this.$refs.comentPopup.close()
			this.$refs.comment.restComment()
			this.detail()
		},
		back: function () {
			backPage()
		},
		//选择期
		async selectPeriod(item, index) {
			this.scrollIntoView = 'item' + index
			this.pictureId = item.guessId
			await this.detail()
			this.selectText = "第" + this.info.period + "期"
			this.isShow = false
		},
		//详情
		async detail() {
			let prams = {
				id: this.pictureId
			}
			await detail(prams).then(res => {
				this.yearList = res.result.yearList
				if (res.result?.yearList.length && !this.curr) {
					this.curr = res.result.yearList[0].id
				}
				this.info = res.result
				this.periodList = res.result.periodList
				this.$nextTick(() => {
					this.scrollIntoView = 'item' + this.periodList.findIndex(item => item
						.guessId == this.pictureId)
				})
				this.period()
			}).catch(err => {
				console.log(err)
			})
		},
		//获取期
		listPeriod: function (year) {
			this.curr = this.yearList.findIndex(item => item.year === year)
			let prams = {
				year,
				platform: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE)
			};

			listPeriod(prams).then(res => {
				this.pictureId = res.result[0].guessId
				this.periodList = res.result
				this.detail()
			}).catch(err => {
				console.log(err)
			})
		},
		//根据期数获取彩票信息
		period: function () {
			this.$nextTick(() => {
				let prams = {
					lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_LOTTERYTYPE),

					number: this.info.number,
					year: this.curr,
				}
				period(prams).then(res => {
					this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netRes) => {
						this.lottery = netRes.result
					}, this)
					this.lottery = res.result
				}).catch(err => {
					console.log(err)
				})
			})
		},
	}
}
</script>
<style lang="scss" scoped>
.search {
	display: flex;
	align-items: center;
	padding: 20rpx;
	height: 56rpx;
	border-bottom: 1px solid var(--theme-auxiliary-color-default);
	margin-top: 20rpx;
	border-radius: 24rpx 24rpx 0 0;
	background: #fff;

	.selects {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: -1px;
		z-index: 1;
		gap: 20rpx;

		::v-deep .uni-stat__select {
			background: var(--theme-color) !important;
		}

		::v-deep .uni-select {
			border: none;
			padding: 0 20rpx;
			font-size: 26rpx;
			height: 52rpx;

			.select-svg {
				transform: rotate(180deg);
			}

			.select-svg-show {
				transform: rotate(0deg);
			}

			.uni-select__input-box {
				gap: 10rpx;
			}

			.uni-select--mask {
				background: rgba(0, 0, 0, 0.06);
			}

			.uni-select__selector {
				z-index: 999;
				transform: translate(0, -20rpx) !important;
				border-radius: 24rpx;
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
				color: #fff;
			}
		}

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
			background: #fff;
			border-radius: 12rpx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			::v-deep .uni-select {
				border: none;
				padding: 0 20rpx;
				font-size: 26rpx;
				height: 60rpx;

				.uni-select__input-box {
					gap: 10rpx;
				}

				.uni-select--mask {
					background: rgba(0, 0, 0, 0.06);
				}

				.uni-select__selector {
					z-index: 999;
					transform: translate(100rpx, -80rpx);
					border-radius: 24rpx;
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
					color: #fff;
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

	.right {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.item {
			display: flex;
			align-items: center;

			.descs {
				margin-left: 20rpx;
				color: #404040;
				font-size: 30rpx;
			}
		}

		.item+.item {
			margin-left: 20rpx;
		}
	}
}
</style>
<style lang="scss" scoped>
.mint-tab-container-item {

	background: var(--theme-auxiliary-color-default);
	height: var(--vh);
	overflow: hidden;
	position: fixed;
	width: 100%;

	::v-deep .center {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}

.scroll-Y {
	height: calc(var(--vh) - 300rpx);
	border-radius: 0 0 24rpx 24rpx;
	overflow: hidden;
}

.header-box,
.header {
	height: 46px;
	border-bottom: 1px solid #ebedf0;
}

.rht1 {
	margin-right: 32rpx;
}

.rht {
	color: var(--theme-color);

	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.rht span {
	height: 34rpx;
	line-height: 34rpx;
}

.rht * {
	display: inline-block;
}

.rht1 .icons {
	background-image: url('@/static/img/picture/lis.png');
	background-size: 100% 100%;
	height: 36rpx;
	width: 36rpx;
}

.rht2 .icons {
	background-image: url('@/static/img/picture/pl.png');
	background-size: 100% 100%;
	height: 36rpx;
	width: 36rpx;
}

.customfixed {
	height: 40rpx;
	padding: 20rpx 28rpx;
	position: relative;
	background: #fff;
}

.bor-b {
	// border-radius: 0 0 24rpx 24rpx;
}

.sticky-body {
	max-width: 480px;
	width: 100vw;
	margin: 0px auto;
	background-color: #fff;
	position: fixed;
	z-index: 4;
}

.m-tabs-years {
	overflow-x: auto;
	background-color: #fff;
}

.m-tabs-years .m-tabs-years-bd {
	height: 76rpx;
	white-space: nowrap;
	min-width: 100%;
	overflow: hidden;
	padding-left: 28rpx;
}

.m-tabs-years .m-tabs-years-bd span {
	border: 1Px solid #a9a9a9;
	border-radius: 40rpx;
	width: 110rpx;
	height: 40rpx;
	text-align: center;
	line-height: 40rpx;
	font-size: 24rpx;
	margin: 20rpx 28rpx 0 0;
	display: inline-block;
}

.act2 {
	border: 1px solid var(--theme-color);
	background: var(--theme-color);

	span {
		color: #fff;
	}
}

.m-tabs-period-home {
	position: relative;
	display: flex;
	justify-content: space-between;
}

.right-btn {
	margin-left: 40rpx;
}

.m-tabs-period {
	overflow-x: auto;
	flex: 1;
}

.m-tabs-period .m-tabs-period-bd {
	white-space: nowrap;
	min-width: 100%;
}

.m-tabs-period .m-tabs-period-bd span {
	text-align: center;
	font-size: 28rpx;
	color: #404040;
	display: inline-block;
	font-weight: 400;

	&+span {
		margin-left: 40rpx;
	}
}

.m-tabs-period .m-tabs-period-bd span.act {
	color: var(--theme-color);
	font-size: 30rpx;
	font-weight: 600;
}

.van-dropdown-menu__bar {
	width: 116rpx;
	height: 44rpx;
	line-height: 44rpx;
	margin-top: 10rpx;
	background: var(--theme-color);
	border-radius: 30rpx;
}

.van-dropdown-menu__title {
	font-size: 24rpx;
	color: #fff;
}

.van-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.van-dropdown-box {
	position: absolute;
	left: 0;
	width: 100%;
	max-width: 480px;
	height: var(--vh);
	background: rgba(0, 0, 0, 0.30);
	z-index: 1;
}

.van-dropdown-box-in {
	width: 100%;
	max-height: 1100rpx;
	background-color: #fff;
	overflow-y: auto;
}

.dropdown-body {
	padding: 20rpx 28rpx;
	overflow-y: auto;
	max-height: calc(var(--vh) - 600rpx);
	background-color: #fff;
	border-radius: 0 0 24rpx 24rpx;
}

.dropdown-body .van-col {
	width: 152rpx;
	height: 70rpx;
	border: 1px solid var(--theme-auxiliary-color-default);
	color: #404040;
	border-radius: 12rpx;
	display: grid;
	place-content: center;
	margin-left: 28rpx;
	margin-top: 28rpx;
	border: 1px solid var(--theme-auxiliary-color-default);
	color: #404040;
	font-size: 28rpx;

	&:nth-child(4n+1),
	&:nth-child(1) {
		margin-left: 0;
	}

	&:nth-child(-n+4) {
		margin-top: 0;
	}
}


.body-hd-2 {
	text-align: center;
	color: var(--theme-color);
	padding: 20rpx 0;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	.text {
		color: #404040;
		display: flex;
	}
}

.border-box {
	padding: 0 28rpx 20rpx !important;
	border-radius: 0 0 24rpx 24rpx;
}

.vote-box {
	transition: all .3s;
	position: relative;
	border-radius: 24rpx;
	margin-top: 20rpx;
	background: #fff;
	padding-bottom: 20rpx;
}

.imgPos {
	background: #fff;
}

.ms-bd-img {
	text-align: center;
	background: #f9f9f9;
}

.ms-bd-img img {
	width: auto;
	width: 100%;
}

.ms-bd-vote {
	padding: 20rpx 28rpx;
	font-size: 26rpx;
	display: inline-block;
	border-radius: 24rpx;
}

.ms-bd-vote .vote-num {
	text-align: center;
	line-height: 38rpx;
}

.ms-bd-vote .vote-item {
	margin-bottom: 16rpx;
	display: flex;
	align-items: center;

	.left {}

	.bd-rate {
		flex: 1;
		border-radius: 18rpx;
		overflow: hidden;
	}

	.right {
		width: 64rpx;
		text-align: right;
	}
}

.ms-bd-vote .bd-rate {
	background: #ebeae8;
	height: 20rpx;
	position: relative;
	margin: 0 10rpx;
}

.ms-bd-vote .bd-rate .bd-rate-color {
	background: var(--theme-color);
	height: 20rpx;
	position: absolute;
	left: 0;
	top: 0;
}

.ms-bd-vote .vote-item .right {
	right: 0;
}
</style>
