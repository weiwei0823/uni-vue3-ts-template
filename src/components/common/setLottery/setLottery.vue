<template>
	<view class="v-platform" :class="['theme-' + themeColor.name]">
		<view class="van-overlay" style="z-index: 101;" :style="{height:`${uWindowHeight}px`}">
			<view class="platform-row" @click="close" :style="{height:`${uWindowHeight}px`}">
				<view class="v-platform-list">
					<view class="list">
						<view class="item" :class="{ act: lotteryType == item.lotteryType }"
							v-for="(item, index) in sortLotteryTypeTabs" :key="index" @click.stop="cutover(item)">
							<view class="title">{{ item.lotteryName }}</view>
							<view class="text">{{$t("components.common.setLottery.setLottery.text1")}}</view>
							<view class="time-text">{{ item.lotteryTime }}</view>
						</view>
					</view>
					<view class="platform-btn">
						<view class="btn-item" @click.stop="confirm">
							{{$t("components.common.setLottery.setLottery.text2")}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	import {
		lotteryTime
	} from '../../../utils/lottery/index'
	export default {
		name: "setLottery",
		mounted() {
			this.lotteryTime()
		},
		props:{
			isShow: Boolean,
		},
		data() {
			return {
				list: [],
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					1)
			}
		},
		computed: {
			...mapGetters(["themeColor", 'uWindowHeight']),
      sortLotteryTypeTabs(){
        let buildAr = [];
        for(let key in this.list){
          let lotteryInfo = this.list[key];
          let copyLotteryInfo = Object.assign({},lotteryInfo);
          copyLotteryInfo.sortIndex = this.$config.lotterTimesTabsSort&&Array.isArray(this.$config.lotterTimesTabsSort)?this.$config.lotterTimesTabsSort.indexOf(Number(copyLotteryInfo.lotteryType)):0;
          buildAr.push(copyLotteryInfo);
        }
        // buildAr.sort((a,b)=>{
        //   return a.sortIndex - b.sortIndex;
        // })
        return buildAr;
      }
		},
		watch: {
			isShow(){
				this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					1)
			}
		},
		methods: {
			lotteryTime() {
				let prams = {}
				lotteryTime(prams).then(res => {
					this.list = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			cutover(item) {
				this.lotteryType = item.lotteryType
			},
			close() {
				this.$emit('showLottery')
			},
			confirm() {
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, this
					.lotteryType);
				this.$emit('showLottery')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-platform {
		.van-overlay {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1;
			width: 100vw;
			height: var(--vh);

			.platform-row {
				background-color: rgba(0, 0, 0, 0.6);
				display: block;
				height: var(--vh);
				width: 100%;
				max-width: 480px;
				margin: auto;

				.v-platform-list {
					width: 600rpx;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					border-radius: 24rpx;
					background: #FFF;

					.list {
						padding: 20rpx;
						box-sizing: border-box;

						.item {
							background-color: var(--theme-auxiliary-color-default);
							margin-bottom: 20rpx;
							line-height: 40rpx;
							padding: 20rpx 40rpx;
							box-sizing: border-box;
							text-align: center;
							width: 100%;
							border-radius: 20rpx;

							.title {
								color: #404040;
								text-align: center;

								font-size: 34rpx;
								font-weight: 500;
							}

							.text {
								color: #404040;
								text-align: center;

								font-size: 26rpx;
								font-weight: 400;
							}

							.time-text {
								color: #404040;
								text-align: center;

								font-size: 26rpx;
								font-weight: 400;
							}
						}

						.act {
							background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
							color: var(--theme-color);

							.title {
								color: var(--theme-color);

							}

							.text {
								color: var(--theme-color);

							}

							.time-text {
								color: var(--theme-color);

							}
						}
					}

					.platform-btn {
						color: #fff;
						bottom: 100rpx;
						border-radius: 0 0 24rpx 24rpx;
						text-align: center;
						font-size: 32rpx;
						width: 100%;
						max-width: 480px;
						border-top: 2rpx solid var(--theme-auxiliary-color-default);

						.btn-item {
							padding: 20rpx;
							box-sizing: border-box;
							color: var(--theme-color);
							text-align: center;

							font-size: 34rpx;
							font-weight: 400;
						}
					}
				}
			}
		}


	}
</style>
