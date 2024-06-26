<template>
	<u-popup v-model="show" mode="left" :class="['theme-' + themeColor.name]">
		<view class="left-menu">
			<view class="header" @click="toHomePage">
				<view class="back-title" :style="{ paddingTop: `${isApp ? windowTop + 'px' : '20rpx'}` }">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path
							d="M12.1415 0.378945L20.6043 6.45314C21.0137 6.74695 21.3472 7.134 21.5773 7.58228C21.8074 8.03056 21.9274 8.52718 21.9275 9.03106V18.8263C21.9275 20.579 20.5065 22 18.7537 22H14.426V17.3837C14.426 15.4717 12.8757 13.9215 10.9637 13.9215C9.05171 13.9215 7.5015 15.4717 7.5015 17.3837V22H3.17371C1.42096 22 0 20.579 0 18.8263V9.03135C2.18081e-05 8.52742 0.120042 8.03074 0.350129 7.58241C0.580216 7.13408 0.913755 6.74698 1.32315 6.45314L9.786 0.378945C10.1293 0.132535 10.5412 0 10.9637 0C11.3863 0 11.7982 0.132535 12.1415 0.378945Z"
							:fill="themeColor.themeColor" />
					</svg>
					<text>返回首页</text>
				</view>
			</view>
			<view class="back-list">
				<u-collapse accordion>
					<u-collapse-item v-for="(item, index) in itemList" :key="index" :open="openIndex == index"
						:class="{ collapseItemOpen: index == openIndex }" @change="handleOpenChange(item, index)">
						<template #title>
							<view class="title">
								<imageSvgUrl :width="44" :height="44" :url="item.typeIcon ? item.typeIcon : config.url"
									replaceThemeTargetColor="#07C160" :replaceThemeTargetColorArray="['#08B95C', '#2AF88D', '#10D76F']">
								</imageSvgUrl>
								<view class="title-text">{{ item.typeName }}</view>
							</view>
						</template>
						<view class="body">
							<view class="item" :class="{ checked: lottery.lotteryId == lotteryId }"
								v-for="(lottery, i) in item.lotteries" :key="i" @click="detail(lottery)">
								{{ lottery.name }}
							</view>
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>
	</u-popup>
</template>

<script>
import {
	categoryData
} from "@/utils/lottery/betting";
import defaultTemplate from "@/utils/defaultTemplate";
import {
	mapGetters
} from 'pinia';
import imageSvgUrl from '@/components/common/imageSvgUrl'
export default {
	components: {
		imageSvgUrl
	},
	props: {
		lotteryId: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapGetters(["themeColor", "windowTop"]),
	},
	watch: {
		show(nv, ov) {
			if (nv) {
				this.$nativeBridge.setStatusBarColor('#fff')
			} else {
				this.$nativeBridge.setStatusBarColor('#fff')
			}
		}
	},
	data() {
		return {
			show: false,
			itemList: [],
			openIndex: 0,
			config: {},
			isApp: false
		}
	},
	mounted() {
		this.config = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG)[15]
		this.getCategoryData()
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
	},

	methods: {
		open() {
			this.show = true
		},
		toHomePage() {
			// 最新修改强制返回首页
			uni.reLaunch({
				url: '/pages/liuhe/home/index',
				fail: () => {
					uni.reLaunch({
						url: '/'
					})
				}
			})
			return;
		},
		getCategoryData() {
			let that = this;
			let prams = {
				categoryId: 2
			};
			const data = uni.getStorageSync('leftMenuData') || []
			if (data.length) {
				this.itemList = data
			}
			categoryData(prams).then(res => {
				if (res.code == 200) {
					const data = defaultTemplate([{
						typeName: "",
						typeIcon: "",
						lotteries: [{
							lotteryId: '',
							name: "",
							isLive: '',
							jumpType: '',
							lotteryTypeId: ''
						},]
					},], res.result)
					let openIndex = 0;
					data.forEach(item => {
						item.lotteries.forEach(lottery => {
							if (lottery.lotteryId === this.lotteryId) {
								item.open = true
								that.openIndex = openIndex;
							}
						});
						openIndex++;
					});
					uni.setStorageSync('leftMenuData', data);
					this.$store.dispatch("updateLotteryStoreAfterApiCategoryData", res.result);
					this.itemList = data
				}
			}).catch(err => {
				console.log(err)
			})
		},
		detail(item) {
			this.$config.gameRouterMgr.doOpenGameDetails(item, this);
		},

		handleOpenChange(item, index) {
			this.openIndex = index;
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .u-mask {
	background-color: rgba(0, 0, 0, 0.3) !important;

}

.left-menu {
	width: 586rpx;

	.header {
		gap: 10rpx;
		width: 100%;
		background: var(--theme-auxiliary-color-default);
		box-sizing: border-box;
		position: relative;

		.back-title {

			font-size: 34rpx;
			font-weight: 500;
			color: var(--theme-color);
			padding: 20rpx 28rpx;
			display: flex;
			align-items: center;

			text {
				margin-left: 20rpx;
			}
		}

		.img {
			width: 33rpx;
			height: 40rpx;
		}
	}

	.back-list {
		padding: 0 28rpx;
	}

	/deep/ .collapseItemOpen .u-collapse-head {
		border-bottom: none !important;
	}

	/deep/ .u-collapse-head {
		border-bottom: 1px solid var(--theme-auxiliary-color-default);
	}

	/deep/.u-arrow-down-icon {
		margin-right: 0;
	}

	.title {
		font-size: 28rpx;
		color: #404040;

		display: flex;
		align-items: center;

		.title-text {
			margin-left: 20rpx;
		}

		image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
	}

	.body {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20rpx;
		padding: 20rpx 0;

		.item {
			// width: 100%;
			// height: 80rpx;
			border-radius: 16rpx;
			background: var(--theme-auxiliary-color-default);

			border-radius: 10px;
			display: grid;
			place-content: center;
			font-size: 24rpx;
			padding: 20rpx;
			color: #404040;
			box-sizing: border-box;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.checked {
			background: var(--theme-color);
			// box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.10),
			//     0rpx 0rpx 1rpx 0rpx rgba(0, 0, 0, 0.10),
			//     0rpx 2rpx 2rpx 0rpx rgba(0, 0, 0, 0.09),
			//     0rpx 4rpx 3rpx 0rpx rgba(0, 0, 0, 0.05),
			//     0rpx 7rpx 3rpx 0rpx rgba(0, 0, 0, 0.01),
			//     0rpx 12rpx 3rpx 0rpx rgba(0, 0, 0, 0.00);
			color: #fff;
		}
	}
}
</style>
