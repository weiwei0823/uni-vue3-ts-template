<template>
	<u-popup :z-index="9999999" v-show="isLoadingPop" v-model="popupShow" mode="center" border-radius="28" ref="msg"
		:class="['theme-' + themeColor.name]">
		<view class="pop-box">
			<view class="pop-header">
				<view class="pop-header_bg">
					<svg style="width: 350rpx; height: 78rpx;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174 40"
						fill="none">
						<path
							d="M163.188 0H0C3.36944 1.15284 6.38615 3.14499 8.76274 5.78666C12.5276 9.87031 15.4421 14.6558 17.3379 19.8666C17.9041 21.2452 18.3632 22.6649 18.7113 24.1133L19.2874 26.5066C20.203 30.3545 22.3988 33.7814 25.5182 36.2309C28.6377 38.6804 32.4976 40.0086 36.4712 39.9999H137.034C141.008 40.0098 144.868 38.682 147.988 36.2323C151.108 33.7826 153.303 30.3551 154.218 26.5066L154.801 24.1133C155.138 22.6658 155.586 21.2461 156.141 19.8666C158.054 14.6509 160.99 9.86507 164.776 5.78666C167.136 3.15071 170.134 1.15879 173.485 0L163.188 0Z"
							:fill="themeColor.themeColor" />
					</svg>
				</view>
				<view class="text">
					{{ $t('pages.liuhe.common.homePop.viewLatestMessage') }}
					<view class="num" v-if="taskNum" :class="{ bigNum: taskNum > 99 }"
						:style="{ padding: taskNum > 9 ? '0px 10rpx' : '', right: taskNum > 9 ? '4rpx' : '21rpx' }">
						{{ taskNum >= 100 ? "99+" : taskNum }}
					</view>
				</view>
				<view class="close-btn" @click="closePop">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M1.0649 13.9928C0.674377 14.3833 0.674376 15.0165 1.0649 15.407C1.45543 15.7975 2.08859 15.7975 2.47911 15.407L7.85795 10.0282L13.3788 15.5491C13.7694 15.9396 14.4025 15.9396 14.793 15.5491C15.1836 15.1585 15.1836 14.5254 14.793 14.1348L9.27216 8.61395L15.207 2.67908C15.5976 2.28855 15.5976 1.65539 15.207 1.26487C14.8165 0.874342 14.1833 0.874341 13.7928 1.26487L7.85795 7.19974L2.06513 1.40692C1.6746 1.01639 1.04144 1.01639 0.650912 1.40692C0.260388 1.79744 0.260388 2.43061 0.650912 2.82113L6.44373 8.61395L1.0649 13.9928Z"
							:fill="themeColor.themeColor" />
					</svg>
				</view>
			</view>
			<view class="title-box" :style="{ 'border-bottom': !timeText ? '0px' : '' }">
				<view class="title-text">
					<view class="title">
						<view class="title-name">
							{{ list.length > 0 ? list[index].title : '' }}
						</view>
						<view class="look" @click="detail" v-if="list[index] && list[index].detailId">
							<view style="margin-right: 10rpx;">{{ $t('pages.liuhe.common.homePop.viewDetails') }}</view>
							<svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11"
								fill="none">
								<path d="M1 1.5L5 5.5L1 9.5" stroke="#A1A1A1" stroke-width="1.5" stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</view>
					</view>
					<u-line :color="themeColor.themeAuxiliaryColorDefault" border-style="dashed" :hair-line="false"
						style="border-width: 2px;" />
					<view class="time">
						{{timeText }}
						<view class="status-text" v-if="list.length > 0 && list[index].status == 2">活动中</view>
					</view>
				</view>
			</view>
			<swiper :current="index" :circular="true" @change="change" class="swiper" autoplay :interval="swiperTimer">
				<swiper-item v-for="(task, listIndex) in list" :key="listIndex">
          <template v-if="swiperItemLoadList.includes(listIndex)">
            <scroll-view :scroll-with-animation="true" :scroll-y="true" class="swiper-slide"
                         v-if="+task.type === 1">
              <mp-html class="type-html" :content="task.content" />
            </scroll-view>
            <view class="swiper-slide pic-slide" v-else-if="+task.type === 2">
              <image :src="task.content" mode="widthFix"></image>
            </view>
            <scroll-view :scroll-with-animation="true" :scroll-y="true" class="swiper-slide" v-else>
              <view class="task-box">
                <view class="task-item" v-for="(item, index) in task.data3">
                  <view class="label">{{ typeList(item.type) }}</view>
                  <view class="left">
                    <view class="title">
                      {{ item.des }}
                    </view>
                    <view class="progress-box" :class="{ 'progress-yuan': getProgress(item) > 10 }">
                      <liu-progressbar :progress="getProgress(item)" :bgColor="themeColor.themeColor"
                                       dsColor="#fff" color="#404040" fontSize="20rpx" :height="'28rpx'"
                                       :borderRadius="'32rpx'" />
                    </view>
                  </view>
                  <view class="right">
                    <view class="btn">
                      <view v-if="item.status == 2" class="btn-base ylq">
                        {{ $t('pages.liuhe.common.homePop.received') }}
                      </view>
                      <view v-else-if="getProgress(item) >= 100" @click="getReceive(item, task)"
                            class="btn-base lqbtn">{{ $t('pages.liuhe.common.homePop.receive') }}
                      </view>

                      <view v-else @click="goUrl(item)" class="btn-base goto">
                        {{ $t('pages.liuhe.common.homePop.goTo') }}
                      </view>
                    </view>
                    <view class="coin">
                      <text class="coin-text">¥{{ item.rewardMoney }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </template>
				</swiper-item>
			</swiper>
			<view class="dot-box">
				<view class="dot-item" :class="{ active: index == key }" v-if="key < 10" v-for="(item, key) in list">
				</view>
				<uni-icons type="more-filled" size="12" color="#A1A1A1" style="margin-left: 20rpx;"
					v-if="list.length > 9"></uni-icons>
			</view>
			<view class="btn-box">
				<view class="btn forget" @click="updateIndex('prev')">
					{{ $t('pages.liuhe.common.homePop.previous') }}
				</view>
				<view class="btn noAlert" @click="noAlert">
					不再提示
				</view>
				<view class="btn retry" @click="updateIndex('next')">
					{{ $t('pages.liuhe.common.homePop.next') }}
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	import {
		pop as _pop
	} from "@/utils/common/index";
	import {
		receive,
	} from "@/utils/activity/index";

	export default {
		name: "HomePop",
		props: {
			popImageList: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				popupShow: false,
				index: 0,
				status: true,
				list: [],
				isLoadingPop: false,
        // 轮播列表加载完成的列表，默认加载第一个
        swiperItemLoadList: [0],
        // swiper循环定时器
        swiperTimer: 6000
			}
		},
		watch: {
			popImageList: {
				handler(val) {
					this.list = val
					if (val.length) {
						setTimeout(() => {
							this.isLoadingPop = true;
						}, 100)
					}
				},
				immediate: true,
				deep: true
			},
			popupShow(val) {
				let color = '#ffffff'
				let isLightColor = false
				if (val) {
					color = '#666666'
					isLightColor = true
				}
				setTimeout(() => {
					this.$nativeBridge.setStatusBarColor(color, isLightColor)
				}, 120);
			}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
			taskNum() {
				return this.list.length || 0
			},
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			timeText() {
				const {
					list,
					index
				} = this
				if (!list.length || !list[index]) {
					return
				}
				const {
					beginTime,
					endTime,
					dateTime
				} = list[index]


				const text = (val) => {
					return val ? this.$u.timeFormat(new Date(val), 'yyyy.mm.dd') : ''
				}
				if (!beginTime || !endTime) {
					// if (dateTime) return dateTime;
					return ''
				}
				// return "开始时间:" + text(beginTime) + ' - ' + text(endTime)
				return text(beginTime) + ' - ' + text(endTime)
			},
			timeTextStart() {
				const {
					list,
					index
				} = this
				if (!list.length || !list[index]) {
					return
				}
				const {
					beginTime,
					endTime,
					dateTime
				} = list[index]


				const text = (val) => {
					return val ? this.$u.timeFormat(new Date(val), 'yyyy.mm.dd') : ''
				}
				if (!beginTime) {
					return ''
				}
				return beginTime
			},
			timeTextEnd() {
				const {
					list,
					index
				} = this
				if (!list.length || !list[index]) {
					return
				}
				const {
					beginTime,
					endTime,
					dateTime
				} = list[index]


				const text = (val) => {
					return val ? this.$u.timeFormat(new Date(val), 'yyyy.mm.dd') : ''
				}
				if (!endTime) {
					// if (dateTime) return dateTime;
					return ''
				}
				return endTime
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.alertPop();
			uni.$on('getPop', this.getPop);
      this.loadCurrentAndGetNextSwiperItem(this.index);
		},
		methods: {
			alertPop() {
				let bindPopSession = window.sessionStorage.getItem("bindPop")
				let bindPop = this.getCache('bindPop')

				if (bindPopSession) {
					return
				}
				if (!bindPop) {
					this.popupShow = true
				}
			},
			noAlert() {
				window.sessionStorage.setItem("bindPop", true)
				this.closePop();
			},
			typeList(key) {
				return this.$dataFormartter.formartActivityKeyToText(key);
			},
			getProgress(item) {
				// return 100;
				return item.taskSpeed > item.taskVolume ? 100 : (item.taskSpeed / item.taskVolume) * 100
			},
			change(event) {
				this.index = event.detail.current;
        this.loadCurrentAndGetNextSwiperItem(this.index);
			},
      // 懒加载轮播图，获取轮播图当前图片并加载下一张图片
      loadCurrentAndGetNextSwiperItem(index) {
        if (!this.swiperItemLoadList.includes(index)) {
          this.swiperItemLoadList.push(index);
        }
        // 下一个item加载
        let tempNext = index + 1;
        if (tempNext === this.list.length) {
          tempNext = 0;
        }
        if (!this.swiperItemLoadList.includes(tempNext)) {
          // 如果未加载, 4秒后加载下一个item
          setTimeout(() => {
            this.swiperItemLoadList.push(tempNext);
          }, this.swiperTimer - 1000);
        }
      },
			updateIndex(type) {
				let index = this.index
				if (type === 'next') {
					index = index === this.list.length - 1 ? 0 : index += 1
				} else if (type === 'prev') {
					index = index === 0 ? this.list.length - 1 : index -= 1

				}
				this.index = index
			},
			bindPop() {
				this.setCache('bindPop', 1, 60 * 60 * 1000);
				this.popupShow = false
				// this.$refs.msg.close()
			},
			setCache(key, value, expire = 0) {
				let obj = {
					data: value, //存储的数据
					time: Date.now() / 1000, //记录存储的时间戳
					expire: expire //记录过期时间，单位秒
				}
				uni.setStorageSync(key, JSON.stringify(obj))
			},
			closePop() {
				this.popupShow = false
				// this.$refs.msg.close()
			},
			getCache(key) {
				let val = uni.getStorageSync(key)
				if (!val) {
					return null
				}
				val = JSON.parse(val)
				if (val.expire && Date.now() / 1000 - val.time > val.expire) {
					uni.removeStorageSync(key)
					return null
				}
				return val.data
			},
			getPop() {
				let prams = {
					position: 1,
					projectType: 2
				}
				this.list = []
				_pop(prams).then(res => {
					if (res.code == 200) {
						this.list = res.result;
						// this.isLoadingPop = true;
						this.alertPop();
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getReceive(item, task) {
				let prams = {
					ruleId: item.ruleId,
					taskId: task.taskId
				}
				receive(prams).then(res => {
					if (res.code == 200) {
						pop(this.$t('pages.liuhe.common.homePop.successfullyReceived'), 2000)
						item.status = 2;
						// this.getInfo();
						this.$store.dispatch("updateUserBalanceFromServer");
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			goUrl(item) {
				let url = '';
				if (this.list[this.index].data3JumpType == 1) {
					url = "/pages/common/pay/index"
				} else if (this.list[this.index].data3JumpType == 2) {
					url = ""
				} else {
					url = "/pages/liuhe/list"
				}
				uni.navigateTo({
					url: url
				})
			},
			detail() {
				let url = '';
				if (this.list.length > 0) {
					if (this.list[this.index].type == 1 && this.list[this.index].detailId > 0) {
						url = "/pages/liuhe/notice/detail?id=" + this.list[this.index].detailId
					} else if (this.list[this.index].type == 2) {
						url = ""
					} else if (this.list[this.index].type == 3 && this.list[this.index].detailId > 0) {
						url = "/pages/liuhe/activity/detail?id=" + this.list[this.index].detailId
					}
				}
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep uni-swiper-item {
		border-radius: 24rpx;
	}

	::v-deep .uni-scroll-view-content {
		border-radius: 24rpx;
	}

	.pop-box {
		width: 600rpx;

		background: #fff;
		border-radius: 24rpx;
		overflow: hidden;

		.pop-header {
			height: 80rpx;
			position: relative;
			background: var(--theme-auxiliary-color-default);
			padding-bottom: 16rpx;

			.pop-header_bg {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}

			.text {
				width: 350rpx;
				// background: url('@/static/img/all/home-pop/header-bj.png') no-repeat;
				background-position: center;
				background-size: 100%;
				font-weight: 400;
				font-size: 34rpx;
				line-height: 80rpx;
				text-align: center;
				color: #FFFFFF;
				position: relative;
				margin: 0 auto;

				.num {
					position: absolute;
					right: 21rpx;
					top: 14rpx;
					min-width: 32rpx;
					height: 32rpx;
					font-size: 24rpx;
					border-radius: 60rpx;
					background: var(--theme-auxiliary-color-remind);
					color: #fff;
					line-height: 1;
					display: grid;
					place-content: center;

					&.bigNum {
						display: block;
						width: 38rpx;
						overflow: hidden;
						line-height: 32rpx;
						/*text-overflow: ellipsis;*/
						right: -4rpx !important;
					}
				}
			}

			.close-btn {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
			}
		}

		.title-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background: #FFFFFF;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
			box-sizing: border-box;

			.title-text {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: relative;

				.title {
					color: var(--theme-color);
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx;
					padding-bottom: 17rpx;

					.title-name {
						font-size: 30rpx;
						font-weight: 600;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						width: 400rpx;
					}

					.look {
						color: #404040;
						font-size: 26rpx;
						display: flex;
						align-items: center;

						.icon {
							margin-left: 10rpx;
						}
					}
				}

				.time {
					color: #404040;
					font-size: 24rpx;
					font-weight: 400;
					// height: 48rpx;

					display: flex;
					align-items: center;
					padding: 10rpx 20rpx;

					.status-text {
						position: absolute;
						right: 20rpx;
						font-weight: 600;
						font-size: 24rpx;
						color: var(--theme-auxiliary-color-remind);
					}
				}
			}


		}

		.swiper {
			height: 640rpx;
			padding: 20rpx;
			padding-bottom: 8rpx;
			box-sizing: border-box;

			.swiper-slide {
				height: 620rpx;
				padding-right: 10rpx;

				.type-html {
					border-radius: 24rpx;
					background: var(--theme-auxiliary-color-default);
					margin-top: 20rpx;
					padding: 20rpx;
					min-height: calc(100% - 20rpx);
					box-sizing: border-box;
					color: #404040;
				}

				img {
					width: 100%;
					border-radius: 8rpx;
					margin-top: 20rpx;
				}

				.task-box {

					.task-item {
						height: 148rpx;
						box-sizing: border-box;
						margin-bottom: 20rpx;
						padding: 20rpx;
						background: var(--theme-auxiliary-color-default);
						border-radius: 24rpx;
						display: flex;
						align-items: center;
						position: relative;


						.label {
							position: absolute;
							top: 0;
							left: 0;
							width: 106rpx;
							height: 32rpx;
							background: url('@/static/imgs-liuhe/activity/bg.png') no-repeat;
							background-size: 100%;
							font-size: 22rpx;
							font-weight: 500;
							padding-left: 16rpx;
							box-sizing: border-box;
						}

						.left {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							.title {
								color: #404040;
								font-size: 26rpx;
								margin-bottom: 10rpx;
								width: 378rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.progress-box {
								width: 328rpx;
								height: 32rpx;
								position: relative;
							}

							.progress-yuan {
								::v-deep .progress {
									&::before {
										content: '';
										display: block;
										width: 40rpx;
										height: 40rpx;
										position: absolute;
										top: -5rpx;
										right: 22rpx;
										background: var(--theme-color);
										clip-path: polygon(100% 0, 100% 100%, 0 80%, 0 20%);
									}

									&::after {
										content: '';
										width: 22rpx;
										height: 22rpx;
										border: 10rpx solid var(--theme-color);
										border-radius: 32rpx;
										background-color: var(--theme-auxiliary-color-default);
										position: absolute;
										right: 0;
										top: -5rpx;
									}
								}
							}
						}

						.right {
							.btn {
								display: flex;
								justify-content: center;

								image {
									height: 46rpx;
									width: 136rpx;
									margin-top: 12rpx;
								}

								.btn-base {
									height: 46rpx;
									width: 136rpx;
									margin-top: 12rpx;
									line-height: 46rpx;
									text-align: center;
									font-size: 26rpx;
									font-weight: 400;
									border-radius: 8rpx;
									color: whitesmoke;
									cursor: pointer;

								}

								.btn-base.ylq {
									background: #A1A1A1;
								}

								.btn-base.lqbtn {
									background: var(--theme-auxiliary-color-remind);
								}

								.btn-base.goto {
									background: var(--theme-color);
								}

							}

							.coin {
								margin-top: 10rpx;
								text-align: center;

								.coin-text {
									font-weight: 600;
									font-size: 28rpx;
									color: var(--theme-auxiliary-color-remind);
								}
							}
						}
					}
				}
			}

			.pic-slide {
				uni-image {
					height: 100% !important;
					width: 100% !important;
					border-radius: 8rpx !important;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.dot-box {
			height: 40rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding: 0 34.4rpx;
			$swiper-size: 14rpx;
			$swiper-active-width: 40rpx;

			.dot-item {
				width: $swiper-size !important;
				height: $swiper-size !important;
				border-radius: calc(#{$swiper-size} / 2) !important;
				background: rgba(0, 0, 0, 0.5) !important;
				background-color: rgba(0, 0, 0, 0.5) !important;
			}

			.dot-item+.dot-item {
				margin-left: 20rpx;
			}

			.active {
				width: $swiper-active-width !important;
				background: linear-gradient(180deg, var(--theme-color) 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%);
				//box-shadow: 0px 2.399998188018799px 2.399998188018799px 0px rgba(174, 254, 212, 0.30), 0px -0.5999995470046997px 0px 0px #00E76E;
			}
		}

		.btn-box {
			border-top: 1px solid var(--theme-auxiliary-color-default);
			height: 88rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);

			.btn {
				display: grid;
				place-content: center;
				font-size: 34rpx;
			}

			.noAlert {
				background-color: var(--theme-color);
				color: #FFF;
				text-align: center;
				font-size: 30rpx;
				font-weight: 400;
			}

			.btn+.btn {
				border-left: 1px solid var(--theme-auxiliary-color-default);
			}

			.forget {
				color: #404040;
			}

			.retry {
				color: var(--theme-color);
			}
		}
	}
</style>
