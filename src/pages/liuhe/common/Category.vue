<template>
	<view class="category">
		<view class="data-box" :class="{ rowReverse: isHand }" :style="{ height: isTop ? dataHeight : '' }">
			<scroll-view scroll-y="true" class="menu" :enable-flex="true" :scroll-with-animation="true"
				:class="{ isTop: isTop }" :style="{ height: isTop ? dataHeight : '' }">
				<view class="menu-item" @click="recommend()">
					<image mode="heightFix" style="height:40rpx"
						:src="require('@/static/img/liuhe/index/category/c_0.png')" />
					<view class="text">本站推荐</view>
				</view>
				<view class="menu-item" v-for="(item, index) in data" @click="selectData(item, index)"
					:class="{ active: curr == index }">
					<image mode="heightFix" style="height:40rpx;" :src="curr == index ? item.imgs[1] : item.imgs[0]"
						v-if="item.id === '0_0'" />
					<image mode="heightFix" style="height:40rpx;max-width: 80rpx;"
						:src="curr == index ? item.selectedIcon : item.unSelectedIcon" v-else />
					<view class="text">{{ item.name }}</view>
				</view>
				<view class="height-null"></view>
			</scroll-view>
			<scroll-view scroll-y="true"
				:style="{ transform: `translateY(${distanceX}px)`, height: isTop ? dataHeight : '' }"
				:class="{ isTops: isTop, rowReverseIsTops: isTop && isHand }" class="list" ref="paging"
				@touchstart="onTouchStartScroll" @touchmove="onTouchMoveScroll" @touchend="onTouchEndScroll"
				@scrolltoupper="scrolltoupper" @scrolltolower="loadMore" :upper-threshold="0" :lower-threshold="10"
				@scroll="onItemContentScroll">

				<view v-if="distanceX > 0" class="load-text">{{ loadText }}</view>
				<view class="list-item-box" @touchstart="onTouchStart" @touchend="onTouchEnd"
					:style="{ minHeight: isTop ? '170rpx' : '' }">
					<CategoryItem @collectSuccess="collectSuccess" :isShow="isShow" :item="item"
						v-for="(item, index) in list" />
				</view>

				<view class="loding" v-show="isLoadMore">
					<image src="@/static/img/liuhe/load.gif"></image>
					<text class="text">正在加载更多数据...</text>
				</view>
				<view class="nomore" v-show="noMore && list.length > 15 && !loadText">
					<text class="text">没有更多数据了</text>
				</view>
				<view v-if="distanceX < 0" class="load-text">{{ loadText }}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		gameListByPlatformCateId,
	} from "@/utils/lottery/list";
	import {
		gamePlatformUpholdInfo
	} from "@/utils/lottery/mine";
	import CategoryItem from './CategoryItem.vue'
	import Playing from '@/utils/common/playing';
	import {
		config
	} from '@/config/config'
	import CryptoJS from "@/utils/common/crypto-js";
	import EncryptUtils from '@/utils/common/encryptUtils.js';
	export default {
		name: "Category",
		components: {
			CategoryItem
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			isTop: {
				type: Number,
				default: 0
			},
			isShow: {
				type: Boolean,
				default: false
			},
			name: {
				type: String,
				default: ''
			},
			gameCategoryId: {
				type: Number,
				default: 0
			},
			dataHeight: {
				type: String,
				default: ''
			},
		},


		watch: {
			'$route.path': {
				handler() {
					this.isHand = this.playing.getStorage('isHand')
				},
				immediate: true
			},
			data: {
				handler(newData, oldData) {
					this.reload()
				},
				immediate: true,
				deep: true
			},
			isTop(val) {
				if (val) {
					//this.scrolled=false;
				}
			}
		},


		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				platformCateId: 0,
				curr: 0,
				info: null,
				pageNo: 1,
				pageSize: 18,
				isLoadMore: false,
				noMore: false,
				isHeight: false,
				list: [],
				scrolled: false,
				scrollPointY: 0,
				isTopOnTouchStart: 0,
				touchPointStart: null,
				touchPointEnd: null,
				loadText: '',
				isChangeData: false,
				scrollTop: 0,
				startY: 0,
				moveX: 0,
				distanceX: 0,
				playing: new Playing(),
				isHand: false
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			scrolltoupper() {
				// pop("scrolltoupper:"+this.isLoadMore)
				if (this.isLoadMore) return false
				// pop("scrolltoupper");
				this.$emit("scrolltoupper")
			},
			selectData(item, index) {
				this.curr = index
				this.info = item
				this.isLoadMore = true
				this.pageNo = 1
				this.list = []
				this.noMore = false
				let prams = {
					platformId: item.gamePlatformId
				};
				if (item.gamePlatformId > 0) {
					gamePlatformUpholdInfo(prams).then(res => {
						if (res.result.upholdStatus == 1) {
							uni.$emit('showPop', {
								refName: 'Maintain',
								data: res.result
							})
							return false
						}
						this.getGameList()
					}).catch(err => {
						console.log(err)
					})
				} else {
					this.getGameList()
				}
			},
			top() {

			},
			reload() {
				this.isLoadMore = true
				this.list = []
				this.pageNo = 1
				this.noMore = false;
				this.scrollPointY = 0;
				if (this.data.length > 0) {
					this.curr = 0
					this.info = this.data[0]
					this.getGameList()
				}
			},
			loadMore() {
				if (!this.isLoadMore && !this.noMore) { //此处判断，上锁，防止重复请求
					this.isLoadMore = true
					this.pageNo += 1
					this.getGameList()
				}
			},
			collectSuccess() {
				uni.setStorageSync('gameListByPlatformCateId', {})
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CATEGORYDATA, {})
			},
			getGameList() {
				let prams = {
					gameCategoryId: this.info.gameCategoryId,
					platformCateId: this.info.gamePlatformId,
					name: this.name,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}
				if (this.info.gameCategoryIds != null) {
					prams.gameCategoryIds = this.info.gameCategoryIds
				}
				const data = uni.getStorageSync('gameListByPlatformCateId') || {}
				const key = EncryptUtils.encryptMacToBase64(JSON.stringify(prams), CryptoJS.MD5(CryptoJS.enc.Utf8.parse(
					config.apiKey)))
				const dataResult = data[key]
				if (dataResult) {
					this.list.push(...dataResult.records);
					//过滤重复
					let idMap = {};
					this.list = this.list.filter(function(item) {
						let had = idMap[item.id];
						idMap[item.id] = 1;
						return !had;
					})
					this.isLoadMore = false
					if (dataResult.records.length < this.pageSize) {
						this.noMore = true
					} else {
						this.noMore = false
					}
				}
				gameListByPlatformCateId(prams).then(res => {
					this.list.push(...res.result.records);
					//过滤重复
					let idMap = {};
					this.list = this.list.filter(function(item) {
						let had = idMap[item.id];
						idMap[item.id] = 1;
						return !had;
					})
					this.isLoadMore = false
					if (res.result.records.length < this.pageSize) {
						this.noMore = true
					} else {
						this.noMore = false
					}

					const data = uni.getStorageSync('gameListByPlatformCateId') || {}
					data[key] = res.result
					uni.setStorageSync('gameListByPlatformCateId', data)
				}).catch(err => {
					console.log(err)
				})
			},
			recommend() {
				uni.navigateTo({
					url: '/pages/liuhe/recommend'
				})
			},
			onItemContentScroll(event) {
				this.scrollTop = event.detail.scrollTop
				this.scrolled = true;
			},
			onTouchStartScroll(event) {
				this.startY = event.touches[0].clientY;
			},
			onTouchMoveScroll(event) {
				this.moveX = event.touches[0].clientY;
				this.distanceX = (this.moveX - this.startY) / 10;
				const absDistanceX = Math.abs(this.distanceX)
				if (this.distanceX > 0 && this.curr === 0 || this.distanceX < 0 && this.curr === this.data.length) {
					this.isChangeData = false
					return
				}
				if (absDistanceX > 10 && absDistanceX < 20) {
					this.loadText = `继续${this.distanceX > 0 ? '下' : '上'}拉加载${this.distanceX > 0 ? '上' : '下'}一个分类`
					this.isChangeData = false
				} else if (absDistanceX > 15) {
					this.loadText = `松开加载${this.distanceX > 0 ? '上' : '下'}一个分类`
					this.isChangeData = true
				}
			},
			onTouchEndScroll() {
				if (this.isChangeData) {
					if (this.distanceX > 0) {
						this.curr--
					} else if (this.distanceX < 0) {
						this.curr++
					}
					this.selectData(this.data[this.curr], this.curr)
				}

				this.distanceX = 0;
				this.startY = 0;
				this.loadText = ''
				this.isChangeData = false
			},

			onTouchStart(event) {
				if (!this.isTop) return;
				this.touchPointStart = event.changedTouches.length > 0 ? event.changedTouches[0] : null;
				this.scrolled = false;

			},
			onTouchEnd(event) {
				if (!this.isTop) return;
				let touchEndPoint = event.changedTouches.length > 0 ? event.changedTouches[0] : null;
				let touchStartPoint = this.touchPointStart;
				//判断触摸位置有效
				if (touchEndPoint && touchStartPoint && !this.scrolled) {
					//检测行为为上拉 但是页面没有做过任何滚动 判断为切换后到顶 加个互动容差
					if (touchEndPoint.clientY - touchStartPoint.clientY > 20) {
						this.touchPointStart = null;
						this.scrolltoupper();
					}
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.category {
		overflow: hidden;
		padding-top: 10rpx;

		.data-box {
			display: flex;

			/*gap: 20rpx; !*ios低版本 flex + gap 组合gap属性失效了*/
			/*display: inline-flex;*/
			.menu {
				width: 140rpx;
				margin-right: 20rpx;

				/*暂时使用此种方式*/
				.menu-item {
					background: #FFFFFF;
					width: 140rpx;
					height: 105rpx;
					font-size: 22rpx;
					color: #778899;
					text-align: center;
					background: #FFFFFF;
					box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.10),
						0rpx 1rpx 2rpx 0rpx rgba(0, 0, 0, 0.10),
						0rpx 3rpx 3rpx 0rpx rgba(0, 0, 0, 0.09),
						0rpx 8rpx 5rpx 0rpx rgba(0, 0, 0, 0.05),
						0rpx 14rpx 5rpx 0rpx rgba(0, 0, 0, 0.01),
						0rpx 21rpx 6rpx 0rpx rgba(0, 0, 0, 0.00);
					border-radius: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					margin-bottom: 20rpx;

					.text {
						display: block;
						width: calc(164rpx - 24rpx);
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						white-space: nowrap; // 默认不换行；
						text-align: center;
					}
				}

				.height-null {
					height: 100px;
				}

				.active {
					background: linear-gradient(180deg, #4FACFD 0%, #0089FF 100%);
					box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.10),
						0rpx 1rpx 2rpx 0rpx rgba(0, 0, 0, 0.10),
						0rpx 3rpx 3rpx 0rpx rgba(0, 0, 0, 0.09),
						0rpx 7rpx 4rpx 0rpx rgba(0, 0, 0, 0.05),
						0rpx 13rpx 5rpx 0rpx rgba(0, 0, 0, 0.01),
						0rpx 20rpx 6rpx 0rpx rgba(0, 0, 0, 0.00);
					color: #FFFFFF;
				}
			}

			.isTop {
				position: fixed;
				top: calc(100rpx + 120rpx)
			}

			.list {
				z-index: 4;
				height: auto;

				.list-item-box {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 20rpx;
				}

				.loding {
					background: #EFF6FE;
					display: flex;
					justify-content: center;
					align-items: center;

					// position: fixed;
					// top: 50%;
					// width: calc(100vw - 164rpx);
					// max-width: calc(480px - 164rpx);
					image {
						width: 100rpx;
						height: 100rpx;
					}

					.text {
						font-weight: 400;
						font-size: 24rpx;
						color: #555555;
					}
				}

				.nomore {
					text-align: center;

					.text {
						text-align: center;
						font-weight: 400;
						font-size: 24rpx;
						color: #555555;
						line-height: 60rpx;
					}
				}

				.load-text {
					font-weight: 400;
					font-size: 24rpx;
					color: #555555;
					text-align: center;
					margin: 20rpx 0;
				}
			}

			.list.isTops {
				margin-left: 160rpx;
				position: fixed;
				top: calc(100rpx + 120rpx);
				width: calc(100% - 198rpx);
				max-width: calc(480px - 198rpx);
			}

			.list.rowReverseIsTops {
				margin-left: 0;
				margin-right: 160rpx;
			}
		}

		.rowReverse {
			flex-direction: row-reverse;
		}
	}
</style>
