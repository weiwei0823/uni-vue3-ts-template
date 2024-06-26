<template>
	<view class="list-box">
		<view class="list-item" name="electron-list-item" v-for="(item, index) in data" @click="detail(item)">
			<view class="img">
				<image :src="item.icon"></image>
			</view>
			<view class="title">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "Electron",
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		data: {
			type: Array,
			default: function () {
				return []
			}
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	methods: {
		detail(item) {
			this.$config.gameRouterMgr.doOpenGameDetails(item, this);
		},
	}
}
</script>

<style lang="scss" scoped>
.list-box {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-top: 10rpx;

	.list-item {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;

		.img {
			image {
				height: 160rpx;
				width: 160rpx;
			}
		}

		.title {
			font-weight: 400;
			font-size: 26rpx;
			text-align: center;
			color: #404040;
		}
	}
}
</style>