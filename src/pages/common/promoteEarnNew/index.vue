<template>
	<view class="ptp" :style="{ height: `${uWindowHeight}px` }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed :useCustomBack="true" @back="back" style="z-index:100;" :isBack="false" />
		<view class="content">
			<view class="header" v-if="isLogin">
				<view class="left">
					<image class="avatar" :src="headerData.headImg"></image>
					<view class="level">
						VIP{{ getVip }}
					</view>
				</view>
				<view class="text user">
					<view class="title">{{ $t("pages.common.promoteEarn.index.nickname") }} {{ headerData.account }}
					</view>
					<view class="accountUpUnder">{{ $t("pages.common.promoteEarn.index.superior") }}
						{{ headerData.accountUpUnder || '无' }}
					</view>
				</view>
				<view class="text money">
					<view class="title">{{ $t("pages.common.promoteEarn.index.available") }}</view>
					<view class="num">
						{{ $t("pages.common.promoteEarn.index.moneySymbal") }}{{ headerData.canReceived || '0.00' }}
					</view>
				</view>
			</view>
			<view class="header" style="justify-content:flex-start;" v-else>
				<view class="left" style="align-items: center;">
					<image class="avatar" src="@/static/imgs-liuhe/ava.png"></image>
					<view class="goLogin" @click="alertLogin">立即登录/注册</view>
					<!-- <view class="level">
						VIP{{ getVip }}
					</view> -->
				</view>
				<view class="right"></view>
			</view>
			<view class="flex">
				<view class="nav">
					<view class="item" :class="{ active: navActive === item.key }" v-for="(item) in navList" :key="item.key"
						@click="navClick(item)">
						{{ item.name }}
					</view>
					<view class="item btns" :style="{ backgroundColor: item.color }" v-for="(item) in btns" :key="item.key"
						@click="handleBtnClick(item)">
						{{ item.name }}
					</view>
				</view>
				<scroll-view :style="{ height: isApp ? `calc(${uWindowHeight}px - 300rpx)` : 'calc(var(--vh) - 270rpx)' }"
					class="body" scroll-y scroll-with-animation :scroll-top="scrollTop" @scroll="scroll">
					<components :is="navActive" @updateNavActive="navActive = $event" @videoClick="videoClick"
						@uqrcodeSave="uqrcodeSave" :key="navActive + 'body'" />
				</scroll-view>
				<svg v-if="scrollTop > 100" class="back-top-icon" @click="scrollTop = 0" xmlns="http://www.w3.org/2000/svg"
					width="44" height="44" viewBox="0 0 44 44" fill="none">
					<circle cx="22" cy="22" r="22" fill="#A1A1A1" fill-opacity="0.8" />
					<path
						d="M22.8671 31.0902V19.0748L29.6036 25.8338C29.9809 26.2111 30.5968 26.2111 30.9709 25.8338C31.3482 25.4565 31.3482 24.8406 30.9709 24.4665L22.7316 16.2015C22.5317 16.0016 22.264 15.908 22.0028 15.9209C21.7384 15.908 21.474 16.0016 21.274 16.2015L13.2766 24.4246C12.8993 24.8019 12.8993 25.4179 13.2766 25.7919C13.6539 26.1692 14.2699 26.1692 14.6439 25.7919L20.9322 19.2779V31.0902C20.9322 31.6223 21.3676 32.0576 21.8996 32.0576C22.4317 32.0576 22.8671 31.6223 22.8671 31.0902ZM30.9322 14.0345H13.067C12.5317 14.0345 12.0996 13.6023 12.0996 13.067C12.0996 12.5317 12.5317 12.0996 13.067 12.0996H30.9322C31.4675 12.0996 31.8996 12.5317 31.8996 13.067C31.8996 13.6023 31.4643 14.0345 30.9322 14.0345Z"
						fill="white" />
				</svg>
			</view>
			<components class="statistics" :is="navActive + 'Statistics'" :key="navActive + 'bottom'"
				v-if="['Performance', 'TeamData'].includes(navActive)" />
		</view>
		<view class="video-box">
			<u-popup v-model="videoShow" mode="center">
				<view class="video-view">

					<video class="video" :src="videoSrc" controls></video>
				</view>
			</u-popup>
		</view>

		<uqrcode style="position: fixed; left: -200%;z-index: 999;" size="150" sizeUnit="rpx" class="code" ref="uqrcode"
			canvas-id="qrcode" :value="uqrcodeUrl">
		</uqrcode>

		<AlertInjectLayer />
		<component :is="componentTabbar" :current="'1'" />
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import TabBarLiuhe from '@/components/Tabbar/Liuhe'
import Course from './components/Course'
import Promotion from './components/Promotion'
import Commission from './components/Commission'
import Performance from './components/Performance'
import TeamData from './components/TeamData'
import CommissionRatio from './components/CommissionRatio'
import AccountDirectly from './components/AccountDirectly'
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import topicon from '@/components/gwh-backTopIcon/gwh-backTopIcon.vue'
import {
	courseImage,
	courseVideo
} from '@/utils/ptp'
import PerformanceStatistics from './components/statistics/PerformanceStatistics'
import TeamDataStatistics from './components/statistics/TeamDataStatistics'
import {
	mapGetters
} from 'pinia';
import {
	oneTouchReceive,
	topData
} from '@/utils/ptp/index'
import defaultTemplate from "@/utils/defaultTemplate";
import { setNavigationBarColor, hideTabBar, lockOrientation } from '@/utils/common.ts';

export default {
	components: {
		Header,
		AlertInjectLayer,
		Course,
		Promotion,
		Commission,
		Performance,
		TeamData,
		CommissionRatio,
		AccountDirectly,
		PerformanceStatistics,
		TeamDataStatistics,
		topicon,
		TabBarLiuhe
	},
	mounted() {
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		uni.$emit("on_page_mounted", this)
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight"]),
		getVip() {
			return parseInt(this.$store.state.appInfoStore.userInfo?.liuheVipSpeedInfo?.level || 0)
		},

		btns() {
			return [{
				key: 'collection',
				name: this.$t("pages.common.promoteEarn.index.collection"),
				color: '#00D609'
			},
			{
				key: 'collectionRecord',
				name: this.$t("pages.common.promoteEarn.index.collectionRecord"),
				color: '#1592FF'
			},
			]
		}
	},
	beforeDestroy() {


	},
	data() {
		return {
			componentTabbar: 'TabBarLiuhe',
			uqrcodeUrl: '',
			videoShow: false,
			videoSrc: "",
			title: this.$t("pages.common.promoteEarn.index.title"),
			headerStyle: {
				backgroundColor: "#1794FF"
			},
			fontColor: "#FFFFFF",
			titleStyle: {
				color: "#FFFFFF"
			},
			headerData: {},
			navActive: 'Course',
			navList: [{
				key: 'Course',
				name: this.$t("pages.common.promoteEarn.index.Course")
			},
			{
				key: 'Promotion',
				name: this.$t("pages.common.promoteEarn.index.Promotion")
			},
			{
				key: 'Commission',
				name: this.$t("pages.common.promoteEarn.index.Commission")
			},
			{
				key: 'Performance',
				name: this.$t("pages.common.promoteEarn.index.Performance")
			},
			{
				key: 'TeamData',
				name: this.$t("pages.common.promoteEarn.index.TeamData")
			},
			{
				key: 'CommissionRatio',
				name: this.$t("pages.common.promoteEarn.index.CommissionRatio")
			},
			{
				key: 'AccountDirectly',
				name: this.$t("pages.common.promoteEarn.index.AccountDirectly")
			},
			],
			scrollTop: 0,
			isApp: false,
			isLogin: false
		}
	},
	watch: {
		videoShow(newV, OV) {
			if (newV) {
				this.$nativeBridge.setStatusBarColor('#b2b2b2', true)
			} else {
				this.$nativeBridge.setStatusBarColor('#fff')

			}
		}
	},
	onLoad() {

		this.isLogin = isLogin();
		if (isLogin()) {

			this.getTopData()
		}
		// this.getCourseVideo();
	},
	onLaunch() {
		hideTabBar();
		setNavigationBarColor("#aaaaaa");
		lockOrientation();
	},
	onShow() {

		if (isLogin()) {

			this.getTopData()
		}
	},
	methods: {
		alertLogin() {
			uni.$emit("showPop", {
				refName: "AlertMessage"
			});

		},
		back() {
			uni.hideKeyboard();
			setTimeout(() => {
				backPage();
			}, 500)
			// this.$nextTick(() => {
			// })
		},
		uqrcodeSave(url) {
			console.log("saveUrl", url, "setUrl", this.uqrcodeUrl);
			// this.uqrcodeUrl = url
			// // this.$nativeBridge.openUrl(url);
			// this.$refs.uqrcode.save();
		},
		async getCourseVideo() {
			const res = await courseVideo()
			this.videoSrc = res.result
		},
		async videoClick(e) {
			await this.getCourseVideo();
			this.videoShow = e;
		},
		navClick(item) {

			if (!isLogin()) {
				this.alertLogin();
				return;
			}
			this.navActive = item.key
		},
		async getTopData() {
			const res = await topData()
			this.headerData = defaultTemplate({
				account: "",
				headImg: "",
				accountUpUnder: "",
				canReceived: 0
			}, res.result)
		},
		scroll(e) {
			this.scrollTop = e.detail.scrollTop
		},
		async handleBtnClick(item) {

			if (!isLogin()) {
				this.alertLogin();
				return;
			}
			if (item.key === 'collectionRecord') {
				uni.navigateTo({
					url: "./collectionRecord",
				})
			} else if (item.key === 'collection') {
				uni.showLoading({ mask: true })
				const {
					message
				} = await oneTouchReceive()
				uni.hideLoading()
				if (isLogin()) {
					this.getTopData()
				}

				pop(message, 2000)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.goLogin {
	font-size: 34rpx;
	color: #404844;
	font-weight: 500;
	margin-left: 20rpx;
}

.back-top-icon {
	position: fixed;
	width: 96rpx;
	height: 96rpx;
	right: 30rpx;
	bottom: calc(140rpx + var(--safe-area-inset-bottom));
}

.video-box {


	::v-deep .u-drawer {
		position: fixed;
		top: 0;
		left: 0;
	}

	::v-deep .u-mode-center-box {
		background: unset;
	}

	.video-view {
		width: 600rpx;
		height: 340rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	::v-deep .uni-video-container {
		border-radius: 20rpx;
	}

	::v-deep .uni-video-cover {
		border-radius: 20rpx;
	}

	.video {
		width: 100%;
		height: 100%;
		// width: 600rpx;
		// height: 340rpx;
		border-radius: 20rpx;
		// overflow: hidden;

		::v-deep .uni-video-video {
			border-radius: 20rpx;
		}
	}
}

.ptp {
	background: var(--theme-auxiliary-color-default);
	display: flex;
	flex-direction: column;
	height: var(--vh);

	.content {
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		flex: 1;
		height: 0;

		.header {
			background: #fff;
			border-radius: 24rpx;
			display: flex;
			justify-content: center;
			height: 134rpx;
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;


			.left {
				display: flex;
				position: relative;
				border-radius: 24rpx;
				overflow: hidden;
				margin-right: 20rpx;

				.avatar {
					width: 96rpx;
					height: 96rpx;
				}

				.level {
					position: absolute;
					width: 88rpx;
					height: 32rpx;
					right: 0;
					bottom: 0;
					background: url('@/static/img/all/wallet/level-bg1.png');
					background-size: 100% 100%;
					color: #FFF;
					display: grid;
					align-content: center;
					text-align: right;
					padding-right: 6rpx;
					font-size: 24rpx;
					font-weight: 500;
					box-sizing: border-box;
					white-space: nowrap;
				}
			}

			.user {
				flex: 1;
			}

			.text {
				padding: 6rpx 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					color: #404040;
					font-size: 30rpx;
				}

				.accountUpUnder {
					color: #404040;
					font-size: 26rpx;
				}

				.num {
					font-size: 30rpx;
					background: linear-gradient(90deg, #D6B562 0%, #E3CD7C 54.17%, #D1B05B 100%);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}

			.money {
				align-items: flex-end;
			}
		}

		.flex {
			display: flex;
			padding: 0 28rpx;
			flex: 1;
			height: 0;
		}

		.nav {
			display: flex;
			flex-direction: column;
			/*gap: 20rpx;*/
			align-items: center;
			margin-right: 20rpx;

			.item {
				flex-shrink: 0;
				width: 160rpx;
				height: 78rpx;
				margin-bottom: 20rpx;
				display: grid;
				place-content: center;
				background: #FFFFFF;
				border-radius: 16rpx;
				font-size: 26rpx;
				color: #404040;
			}

			.btns {
				color: #fff;
			}

			.active {
				background: var(--theme-color);
				color: #FFFFFF;
			}
		}

		// 				height: calc(var(--vh) - 270rpx);
		.body {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			border-radius: 24rpx;
			border-top-left-radius: 0;
			border-top-right-radius: 0;

			::v-deep .uni-scroll-view {
				-webkit-overflow-scrolling: unset !important;
			}
		}
	}

}
</style>
