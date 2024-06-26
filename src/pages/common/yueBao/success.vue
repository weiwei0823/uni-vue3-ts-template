<template>
	<view class="yeb-success" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="content">
			<svg xmlns="http://www.w3.org/2000/svg" width="114" height="114" viewBox="0 0 114 114" fill="none">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M110 57C110 86.2711 86.2711 110 57 110C27.7289 110 4 86.2711 4 57C4 27.7289 27.7289 4 57 4C86.2711 4 110 27.7289 110 57ZM114 57C114 88.4802 88.4802 114 57 114C25.5198 114 0 88.4802 0 57C0 25.5198 25.5198 0 57 0C88.4802 0 114 25.5198 114 57ZM91.9352 40.536C93.86 38.5559 93.8153 35.3904 91.8352 33.4656C89.8552 31.5408 86.6897 31.5856 84.7649 33.5656L49.5626 69.7776L30.1852 49.8446C28.2604 47.8646 25.0949 47.8198 23.1149 49.7447C21.1349 51.6695 21.0901 54.835 23.0149 56.815L45.9775 80.436C46.9189 81.4044 48.212 81.9508 49.5626 81.9508C50.9132 81.9508 52.2064 81.4044 53.1478 80.436L91.9352 40.536Z"
					:fill="themeColor.themeColor" />
			</svg>
			<view class="title">{{ title }}</view>
		</view>
		<u-button class="btn" hover-class="btn-hover"
			@click="back">{{ $t("pages.common.userCenter.yueBao.Success.back") }}</u-button>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import oneInput from '@/components/myp-one/myp-one'
	import {
		mapGetters
	} from 'pinia';
	import {
		rollOut
	} from '@/utils/yeb'
	export default {
		components: {
			Header,
			oneInput
		},
		computed: {
			...mapGetters(['themeColor']),
		},
		data() {
			return {
				title: this.$t("pages.common.userCenter.yueBao.Success.title"),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
			}
		},
		onLoad(option) {
			this.title = option.title
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.yeb-success {
		background: var(--theme-auxiliary-color-default);

		.content {
			padding: 100rpx 0;
			margin: auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			.img {
				width: 250rpx;
				height: 250rpx;
			}

			.title {
				font-size: 28rpx;
				color: #3E4347;
				margin-top: 20rpx;
			}
		}

		.btn {
			background: var(--theme-color);
			color: #fff;
			border: unset;
			height: 90rpx;
			margin: 0 28rpx;
			border-radius: 16rpx;
		}

		.btn-hover {
			color: #fff;
		}
	}
</style>
