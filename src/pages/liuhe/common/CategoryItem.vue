<template>
	<view>
		<view class="list-item" name="category-item">
			<image class="image" mode="heightFix" :src="item.logo" @click.stop="detail(item)"></image>
			<view class="name">{{ item.name }}</view>
			<image v-if="isShow && item.collectStatus == 0" @click="collect(item)" class="collect"
				src="@/static/img/liuhe/list/nsc.png"></image>
			<image v-if="isShow && item.collectStatus == 1" @click="collect(item)" class="collect"
				src="@/static/img/liuhe/list/ysc.png"></image>
		</view>
	</view>
</template>

<script>
import { gameCollect } from "@/utils/lottery/list";
export default {
	components: {},
	data() {
		return {}
	},
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object,
			default: {}
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	methods: {
		detail(item) {
			if (item.type == 1) {
				return this.$config.gameRouterMgr.doJumpLotteryGameAndUpdateGameTitle(item);
			}
			if (!isLogin()) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
			if (['sign','demo'].includes(userInfo.userType)) {
				uni.$emit('showPop', {
					refName: 'AlertTestMsg',
				})
				return false
			}
		},
		collect(item) {
			let prams = {
				gameId: item.id
			}
			gameCollect(prams).then(res => {
				item.collectStatus = res.result ? 1 : 0
				this.$emit('collectSuccess')
			}).catch(err => {
				console.log(err)
			})
		},
	}
}
</script>
<style lang="scss" scoped>
.list-item {
	display: inline-block;
	text-align: center;
	position: relative;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.10),
		0rpx 1rpx 2rpx 0rpx rgba(0, 0, 0, 0.10),
		0rpx 4rpx 4rpx 0rpx rgba(0, 0, 0, 0.09),
		0rpx 9rpx 5rpx 0rpx rgba(0, 0, 0, 0.05),
		0rpx 15rpx 6rpx 0rpx rgba(0, 0, 0, 0.01),
		0rpx 24rpx 7rpx 0rpx rgba(0, 0, 0, 0.00);
	border-radius: 10px;
	width: 170rpx;
	height: 217rpx;
	display: flex;
	flex-direction: column;
	gap: 8rpx;

	.name {
		width: 100%;
		max-width: 170rpx;
		text-align: center;
		font-weight: 400;
		font-size: 22rpx;
		color: #404040;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.image {
		width: 100%;
		height: 170rpx;
		border-radius: 20rpx;
	}

	.collect {
		height: 40rpx;
		width: 40rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
}
</style>
