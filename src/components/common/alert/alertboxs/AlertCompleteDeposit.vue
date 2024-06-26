<template>
	<u-popup v-model="show" mode="center" border-radius="24" :z-index="zIndex" @open="handleOpen" @close="handleClose">
		<view class="pop-box" :class="['theme-' + themeColor.name]">
			<svg @click="close" class="close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
				fill="none">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M1.0649 13.7929C0.674377 14.1834 0.674376 14.8166 1.0649 15.2071C1.45543 15.5976 2.08859 15.5976 2.47911 15.2071L7.85795 9.82825L13.3788 15.3491C13.7694 15.7397 14.4025 15.7397 14.793 15.3491C15.1836 14.9586 15.1836 14.3254 14.793 13.9349L9.27216 8.41403L15.207 2.47916C15.5976 2.08863 15.5976 1.45547 15.207 1.06494C14.8165 0.674421 14.1833 0.674421 13.7928 1.06495L7.85795 6.99982L2.06513 1.207C1.6746 0.816474 1.04144 0.816473 0.650912 1.207C0.260388 1.59752 0.260388 2.23069 0.650912 2.62121L6.44373 8.41403L1.0649 13.7929Z"
					:fill="themeColor.themeColor" />
			</svg>
			<image class="logo" src="/static/img/rocket.png"></image>
			<view class="title">存款订单等待支付中...</view>
			<view class="tips">请在10分钟内完成支付后<br />点击完成存款</view>
			<view class="btn" @click="confirm">已完成存款</view>
			<view class="kefu" @click="kefu">遇到问题未完成存款？</view>
		</view>
	</u-popup>
</template>

<script>
import {
	mapGetters
} from 'pinia';
export default {
	name: "Betting",
	props: {
		zIndex: {
			type: [Number, String],
			default: () => {
				return 10075
			}
		}
	},
	data() {
		return {
			show: false,
			args: {},
		}
	},
	watch:{
		show(val){
			if(val) {
				this.$nativeBridge.setStatusBarColor('#666666', true)
			}else{
				this.$nativeBridge.setStatusBarColor('#ffffff')
			}
		}
	},
	computed: {
		...mapGetters(['themeColor']),
		theme() {
			return getApp().globalData.themeMap[this.$config.station]
		},
	},
	methods: {
		open(_, args) {
			this.show = true
			this.args = args
			this.callback = args.callback
		},
		handleOpen() {
			this.$emit('open')
			this.callback && this.callback({
				type: 'open'
			})
		},
		handleClose() {
			this.$emit('close')
			this.callback && this.callback({
				type: 'close'
			})
		},
		confirm() {
			this.$emit('confirm')
			this.args?.confirm && this.args.confirm()
			this.show = false
		},
		close() {
			this.args?.close && this.args.close()
			this.show = false
		},
		kefu() {
			uni.navigateTo({
				url: '/pages/common/userCenter/service/index'
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.pop-box {
	width: 600rpx;
	height: 916rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	padding: 40rpx;

	.close {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}

	.logo {
		width: 520rpx;
		height: 520rpx;
	}

	.title {
		color: #3E4347;
		text-align: center;
		font-size: 40rpx;
		font-weight: 600;
	}

	.tips {
		color: #c0c0c0;
		font-size: 30rpx;
		margin-top: 10rpx;
		text-align: center;
	}

	.btn {
		width: 520rpx;
		height: 88rpx;
		display: grid;
		place-content: center;
		color: #FFF;
		font-size: 34rpx;
		color: #fff;
		margin: 20rpx auto;
		background: var(--theme-color);
		border-radius: 16rpx;
	}

	.kefu {
		color: var(--theme-color);
		font-size: 30rpx;
	}
}
</style>
