<template>
	<view class="bank-div" :class="['theme-' + themeColor.name]" :style="{height:`${uWindowHeight}px`}">
		<view class="bank-box" :style="{ marginTop: safeHeight,height:`${uWindowHeight}px` }">
			<Header :title="title" :isBack="false" showBack @back="back" />
			<view class="img-box">
				<imageSvgUrl url="@/static/imgs-liuhe/bank/ok.svg" :width="228" :height="228"
					replaceThemeTargetColor="#07C160" />
				<view class="msg">{{ $t('pages.common.userCenter.bank.common.BindSuccess') }}</view>
			</view>
			<view class="btn" @click="back">{{ $t('pages.common.userCenter.bank.common.Return') }}</view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import Header from '@/components/common/header/index.vue';
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "list",
		components: {
			Header,
			imageSvgUrl
		},
		props: {
			option: Object
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.bank.common.BindSuccessMessage'),
				headerStyle: {
					backgroundColor: "#fff",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040",
					'font-weight': 600
				},
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(useSystemInfoStore, ["uWindowHeight"]),
		},
		methods: {
			back() {
				backPage(true)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bank-div {
		width: 100vw;
		position: relative;
	}

	.bank-box {

		width: 100vw;
		max-width: 480px;
		margin: auto;
		height: var(--vh);
		background: var(--theme-auxiliary-color-default);

		.img-box {
			margin-top: 139rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				height: 228rpx;
				width: 228rpx;
			}

			.msg {
				color: #3E4347;
				font-size: 28rpx;
				font-weight: 400;
				font-weight: 400;
				margin-top: 20rpx;
			}
		}

		.btn {
			width: 694rpx;
			height: 88rpx;
			background: var(--theme-color);
			border-radius: 16rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 100rpx auto;
		}
	}
</style>
