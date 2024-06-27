<template>
	<view class="recommend pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }">
		<Header :title="title" isFixed />
		<view id="nav-div" class="nav-div">
			<view id="nav-row" class="nav-row" :class="{ isTop: isTop }">
				<view v-for="(item, index) in nav" :class="select == index ? 'nav-item active' : 'nav-item'"
					@click="selectNav(index, item)">
					<view :class="{ 'nav-text': select - 1 != index }">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<scroll-view v-if="CategoryData.length > 0" scroll-y class="scroll-y" :style="{height:`calc(${winHeight}px - 88rpx - 108rpx)`}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="list">
				<List v-for="(item, index) in CategoryData" :key="index" :data="item" />
			</view>
		</scroll-view>
		<empty v-else/>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import List from "./common/List";
	import empty from '../../components/common/empty/empty.vue';
	import {
		reCategories,
		platformsByCategory
	} from "@/utils/lottery/list"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "recommend",
		components: {
			Header,
			AlertInjectLayer,
			List,
			empty
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: '本站推荐',
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				titleStyle: {
					'font-weight': 500,
					'font-size': '32rpx',
					'line-height': '45rpx',
					'color': '#FFFFFF'
				},
				isTop: false,
				select: 0,
				nav: [],
				name: '',
				category: {},
				data: [],
				CategoryData: [],
				winHeight: 0
			}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad() {
			this.getCategories()
		},
		methods: {
			openLoginPop() {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
			},
			selectNav(index, item) {
				this.select = index
				this.category = item
				this.CategoryData = []
				this.getCategoryData()
			},
			getCategories() {
				reCategories().then(res => {
					this.nav = res.result
					this.category = this.nav[0]
					this.getCategoryData()
				}).catch(err => {
					console.log(err)
				})
			},
			getCategoryData() {
				let prams = {
					id: this.category.id
				};
				platformsByCategory(prams).then(res => {
					this.CategoryData = res.result
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend {
		background: var(--theme-auxiliary-color-default);

		.nav-div {
			background: #FFFFFF;
			height: 88rpx;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
			margin-top: 20rpx;
			border-radius: 24rpx 24rpx 0 0;


			.nav-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100%;
				padding: 0 60rpx;
				font-size: 30rpx;
				color: #404040;
				font-weight: 400;

				.nav-item {
					height: 100%;
					display: flex;
					align-items: center;
				}

				.active {
					color: var(--theme-color);
					position: relative;

					&::after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 32rpx;
						height: 6rpx;
						background: var(--theme-color);
						border-radius: 6rpx 6rpx 0 0;
					}
				}
			}

			.isTop {
				position: fixed;
				top: 46px;
				width: calc(100vw - 40rpx);
				max-width: calc(480px - 40rpx);
				background: #ffffff;
				z-index: 999;
			}
		}
		.list {
			padding: 0 28rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
		}
	}
</style>
