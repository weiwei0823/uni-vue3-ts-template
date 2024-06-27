<template>
	<view class="bank-div" :class="['theme-' + themeColor.name]" :style="{height:`${uWindowHeight}px`}">
		<view class="bank-box" :style="{ marginTop: safeHeight ,height:`${uWindowHeight}px`}">
			<Header :title="title || $t('pages.common.withdraw.common.success.Success')" />
			<view class="img-box">
				<svg xmlns="http://www.w3.org/2000/svg" width="114" height="114" viewBox="0 0 114 114" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M110 57C110 86.2711 86.2711 110 57 110C27.7289 110 4 86.2711 4 57C4 27.7289 27.7289 4 57 4C86.2711 4 110 27.7289 110 57ZM114 57C114 88.4802 88.4802 114 57 114C25.5198 114 0 88.4802 0 57C0 25.5198 25.5198 0 57 0C88.4802 0 114 25.5198 114 57ZM91.9352 40.536C93.86 38.5559 93.8153 35.3904 91.8352 33.4656C89.8552 31.5408 86.6897 31.5856 84.7649 33.5656L49.5626 69.7776L30.1852 49.8446C28.2604 47.8646 25.0949 47.8198 23.1149 49.7447C21.1349 51.6695 21.0901 54.835 23.0149 56.815L45.9775 80.436C46.9189 81.4044 48.212 81.9508 49.5626 81.9508C50.9132 81.9508 52.2064 81.4044 53.1478 80.436L91.9352 40.536Z"
						:fill="themeColor.themeColor" />
				</svg>
				<view class="msg">{{ msg || $t('pages.common.withdraw.common.success.WithdrawSuccessMessage') }}</view>
			</view>
			<view class="btn" @click="back">{{ $t('pages.common.withdraw.common.success.Return') }}</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "list",
		components: {
			Header
		},
		props: {
			bankList: {
				type: Array,
				default: []
			},
			msg: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			}
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			back() {
				backPage()
				this.$store.dispatch("updateUserBalanceFromServer")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bank-div {
		background: rgba(0, 0, 0, 0.1);
	}

	.bank-box {
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
				height: 250rpx;
				width: 250rpx;
			}

			.msg {
				font-weight: 400;
				font-size: 28rpx;
				margin-top: 20rpx;
				color: var(--theme-font-default-deep-color);
			}
		}

		.btn {
			margin: 100rpx 28rpx;
			height: 88rpx;
			padding: 0 10px;
			border-radius: 16rpx;
			background: var(--theme-color);
			display: grid;
			place-content: center;
			color: #fff;
			font-size: 34rpx;
		}
	}
</style>
