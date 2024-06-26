<template>
	<view class="mint-tab-container-item" :class="['theme-' + themeColor.name]" :style="{position: `fixed`, height:`${winHeight}px`,width:'100%'
		}">
		<Header :title="title" isFixed></Header>
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`,marginTop:'20rpx'}">
			<view class="item">
				<h4><i class="titleLine"></i>{{ $t('pages.luntan.queryHelper.help.text0') }}</h4>
				<p>{{ $t('pages.luntan.queryHelper.help.text1') }}</p>
			</view>
			<view class="item">
				<h4><i class="titleLine"></i>{{ $t('pages.luntan.queryHelper.help.text2') }}</h4>
				<p>{{ $t('pages.luntan.queryHelper.help.text3') }}</p>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "help",
		components: {
			AlertInjectLayer,
			Header
		},
		data() {
			return {
				title: this.$t('pages.luntan.queryHelper.help.title'),
				winHeight: 0,
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(['themeColor']),
		}
	}
</script>

<style lang="scss" scoped>
	.mint-tab-container-item {
		background: var(--theme-auxiliary-color-default);
		height: var(--vh);
	}

	.item {
		border-radius: 24rpx;
		overflow: hidden;
		margin-top: 20rpx;

		&:first-child {
			margin-top: 0;
		}
	}

	h4 {
		font-size: 30rpx;
		font-weight: 500;
		color: #404040;
		background: #fff;
		padding: 0 28rpx;
		height: 88rpx;
		border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
		display: flex;
		align-items: center;
	}

	p {
		font-size: 28rpx;
		padding: 20rpx 24rpx;
		font-weight: 400;
		background: #fff;
	}

	.titleLine {
		display: inline-block;
		width: 6rpx;
		border-radius: 6rpx;
		height: 24rpx;
		background: var(--theme-color);
		margin-right: 14rpx;
	}
</style>
