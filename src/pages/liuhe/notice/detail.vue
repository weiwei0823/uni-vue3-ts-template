<template>
	<view class="detail pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%',backgroundColor:'#f4f4f4'}">
		<Header :title="title" isFixed />

		<!-- <nav-bar :fontColor="'#FFFFFF'" :title="title" :titleStyle="titleStyle" :isBack="true" :headerStyle="headerStyle"
      :leftWidth="90">
    </nav-bar> -->
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 130rpx)`}" class="scroll-y"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="info">
				<view class="title">
					<imageSvgUrl style="margin: 0 20rpx 0 28rpx;" url="@/static/img/liuhe/notice/laba_n.svg" :width="48"
						:height="48" replaceThemeTargetColor="#07C160" />
					<view class="title-text">
						{{ info.title }}
					</view>
				</view>
				<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
				<view class="content">
					{{ info.noticeContent }}
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		details
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Header from '@/components/common/header/index.vue';
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "detail",
		components: {
			AlertInjectLayer,
			NavBar,
			Header,
			imageSvgUrl
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.liuhe.notice.detail.text1"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				titleStyle: {
					'font-weight': 500,
					'font-size': '32rpx',
					'line-height': '45rpx',
					'color': '#FFFFFF'
				},
				id: 0,
				info: {},
				winHeight: 0
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			getInfo() {
				let prams = {
					id: this.id
				};
				details(prams).then(res => {
					this.info = res.result
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		height: 100vh;
		background: var(--theme-auxiliary-color-default);
	}

	.scroll-y {
		border-radius: 24rpx;
		overflow: hidden;
		margin-top: 20rpx;
	}

	.info {
		width: 100%;
		border-radius: 24rpx;
		background: #FFFFFF;
		// margin-top: 20rpx;
		overflow: hidden;

		.title {
			display: flex;
			align-items: center;
			padding: 20rpx 0;

			image {
				height: 48rpx;
				width: 48rpx;
				min-width: 48rpx;
				margin: 0 20rpx 0 28rpx;
			}

			.title-text {
				color: #404040;
				margin-right: 28rpx;
				font-size: 30rpx;
				font-style: normal;
				font-weight: 500;
				line-height: normal;

				// overflow: hidden; //超出的文本隐藏
				// text-overflow: ellipsis; //溢出用省略号显示
				// white-space: nowrap; // 默认不换行；
			}
		}

		.content {
			color: #404040;
			font-size: 28rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 40rpx;
			padding: 20rpx 28rpx;
			padding-bottom: 36rpx;
		}
	}
</style>
