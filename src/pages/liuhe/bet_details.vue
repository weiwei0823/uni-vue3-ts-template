<template>
	<view class="bet-body" :style="{height:windowHeight}" :class="['theme-' + themeColor.name]">
		<Header :title="title">
			<block slot="right">
				<view class="header-right-box" @click="toNav">
					<image src="@/static/img/liuhe/detail/qiu.png"></image>
					{{ $t("pages.liuhe.betDetail.Number") }}
				</view>
			</block>
		</Header>
		<view class="title-box">
			<view class="left-box">
				<view class="top">
					<span class="lottery-name">{{ detail.lotteryName }}</span>
					<span class="period">{{ $t("pages.liuhe.betDetail.No") }}{{ detail.lotteryNo
					}}{{ $t("pages.liuhe.betDetail.Period") }}</span>
					<image src="@/static/img/liuhe/detail/no.png"></image>
				</view>
				<view class="bottom">
					<span class="content">{{ detail.playName }}</span>
				</view>
			</view>
			<view class="right-box">
				<image class="status-img" :src="setStatusImg(detail.status)"></image>
			</view>
		</view>
		<scroll-view scroll-y class="center-box" :class="{ bot: detail.status == 0 }">
			<view class="list-center">
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.bettingNum") }}
					</view>
					<view class="bet-text large-text">
						{{ detail.betValue }}
					</view>
				</view>
				<view
					:class="detail.status === 1 || detail.status === 2 || detail.status === 9 ? 'center-row number-box' : 'center-row'">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.winNum") }}
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 4"><!--六合彩-->
						<Number v-if="detail.status === 1 || detail.status === 2 || detail.status === 9"
							:lotteryDetail="detail.numberList" />
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 30"><!-- 时时彩 -->
						<view class="number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="number-list-item" :style="setBallStyle(item.number)"
								v-for="(item, key) in detail.numberList">
								{{ item.number }}
							</view>
						</view>
						<view class="item-text">
							{{ detail.resultDetail }}
						</view>
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 19"><!-- 11选5 -->
						<view class="number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="number-list-item eleven" v-for="(item, key) in detail.numberList">
								<text>{{ item.number }}</text>
							</view>
						</view>

						<view class="item-text">
							{{ detail.resultDetail }}
						</view>
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 20"><!-- 低频彩 -->
						<view class="number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="number-list-item three" v-for="(item, key) in detail.numberList">
								<text>{{ item.number }}</text>
							</view>
						</view>

						<view class="item-text">
							{{ detail.resultDetail }}
						</view>
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 29"><!-- 飞艇 -->
						<view class="number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="feiting-item" :style="setBallStyle(item.number)" :key="key"
								v-for="(item, key) in detail.numberList"></view>
						</view>

						<view class="item-text">
							{{ detail.resultDetail }}
						</view>

					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 10"><!-- PK -->
						<view class="number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9"
							v-for="(item, key) in detail.numberList">
							{{ item.number }}
						</view>

					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 28"><!-- 快三 -->
						<view class="number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="kuaisan-item" v-for="(item, key) in detail.numberList"
								:style="setBallStyle(item.number)" :key="key"></view>
						</view>

						<view class="item-text">
							{{ detail.resultDetail }}
						</view>
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 31"><!-- 澳洲幸运20 -->
						<view class="lucky-number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="lucky-item" v-for="(item, key) in detail.numberList" :key="key"
								:style="setColorBall(item.color)">{{ item.number }}</view>
						</view>

						<view class="item-text">
							{{ detail.resultDetail }}
						</view>
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 26"><!-- pcEgg 幸运28 -->
						<view class="number-list pcEgg-result"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="number-list-wrap" v-for="(item, key) in detail.numberList" :key="key">
								<view class="number-list-item pc-egg-item">
									<text>{{ item.number }}</text>
								</view>
								<view class="number-symbol">
									<image v-if="key !== 2" src="@/static/img/liuhe/pcEgg/add.png"></image>
									<image v-else src="@/static/img/liuhe/pcEgg/equal.png"></image>
								</view>
							</view>
							<view
								:class="['number-list-item', 'result-ball', ballColor === '1' ? 'ball-red' : (ballColor === '2' ? 'ball-blue' : (ballColor === '3' ? 'ball-green' : 'ball-gray'))]">
								{{ detail.resultDetail && detail.resultDetail.split('_')[0].split(' ')[0] || "" }}
							</view>
						</view>

						<view class="item-text">
							{{ detail.resultDetail && detail.resultDetail.split('_')[1] }}
						</view>
					</view>
					<view class="bet-text ball-show" v-if="detail.lotteryTypeId === 32"><!-- 幸运农场 -->
						<view class="number-list"
							v-if="detail.status === 1 || detail.status === 2 || detail.status === 9">
							<view class="number-list-item lucky-farm-item" v-for="(item, key) in detail.numberList">
								<text>{{ item.number }}</text>
							</view>
						</view>

						<view class="item-text">
							{{ detail.resultDetail }}
						</view>
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.betTime") }}
					</view>
					<view class="bet-text black">
						{{ formatDate(detail.createTime) }}
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.betNum") }}
					</view>
					<view class="bet-text black">
						{{ detail.orderNo }}
						<view class="copy" @click="copyText(detail.orderNo)">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M4.5 4H3.5C2.39543 4 1.5 4.89543 1.5 6V18C1.5 19.1046 2.39543 20 3.5 20H12.5C13.6046 20 14.5 19.1046 14.5 18V17H12.5C12.5 17.5523 12.0523 18 11.5 18H4.5C3.94772 18 3.5 17.5523 3.5 17V7C3.5 6.44772 3.94772 6 4.5 6V4Z"
									:fill="themeColor.themeColor" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M12.3076 0H7.5C6.39543 0 5.5 0.895431 5.5 2V14C5.5 15.1046 6.39543 16 7.5 16H16.5C17.6046 16 18.5 15.1046 18.5 14V6.19238L12.3076 0ZM12.5 2L16.5 6H12.5V2ZM7.6 8C7.26863 8 7 8.26863 7 8.6C7 8.93137 7.26863 9.2 7.6 9.2H14.4C14.7314 9.2 15 8.93137 15 8.6C15 8.26863 14.7314 8 14.4 8H7.6ZM7.6 10.7C7.26863 10.7 7 10.9686 7 11.3C7 11.6313 7.26863 11.9 7.6 11.9H14.4C14.7314 11.9 15 11.6313 15 11.3C15 10.9686 14.7314 10.7 14.4 10.7H7.6ZM7 13.9999C7 13.6685 7.26863 13.3999 7.6 13.3999H11.4C11.7314 13.3999 12 13.6685 12 13.9999C12 14.3313 11.7314 14.5999 11.4 14.5999H7.6C7.26863 14.5999 7 14.3313 7 13.9999Z"
									:fill="themeColor.themeColor" />
							</svg>
						</view>
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.mode") }}
					</view>
					<view class="bet-text black">
						{{ detail.mode == 1 ? $t("pages.liuhe.betDetail.normal") : $t("pages.liuhe.betDetail.follow") }}，{{
							setAmount(detail.baseAmount) }}{{ $t("pages.liuhe.betDetail.Money") }}
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.bets") }}
					</view>
					<view class="bet-text black">
						{{ detail.betNum }}{{ $t("pages.liuhe.betDetail.Note") }}，{{ detail.betAmount
						}}{{ $t("pages.liuhe.betDetail.Times") }}
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.betAmount") }}
					</view>
					<view class="bet-text black">
						{{ setAmount(detail.betAmount * detail.betNum) }}
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.Odds") }}
					</view>
					<view class="bet-text win-money">
						<span v-if="detail.betMultiple > 0">{{ detail.betMultiple2 }}</span>
						<span v-else style="color: #404040">0.00</span>
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.winAmount") }}
					</view>
					<view class="bet-text win-money">
						<span v-if="detail.winAmount > 0">{{ setAmount(detail.winAmount) }}</span>
						<span v-else style="color: #404040">0.00</span>
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.rebate") }}
					</view>
					<view class="bet-text black">
						{{ setAmount(detail.rebateAmount) }}（{{ setAmount(detail.rebate) }}%）
					</view>
				</view>
				<view class="center-row">
					<view class="left">
						{{ $t("pages.liuhe.betDetail.profit") }}
					</view>
					<view class="bet-text loss">
						<!--2=中奖；1=未中奖；0=未开奖；3=已撤销-->
						<span v-if="detail.status == 2" style="color: #DF2939">{{ setAmount(detail.winAmount -
							detail.betAmount * detail.betNum )
						}}</span>
						<span v-else-if="detail.status == 1" style="color: #34B822">{{ "-" + setAmount(detail.betAmount)
						}}</span>
						<span v-else style="color: #404040">--</span>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="footer-box">
					<view class="botton-box">
						<view class="bet-btn" @click="toCart" :style="{backgroundColor: themeColor.themeColor}">
							{{$t("pages.liuhe.betDetail.again")}}
						</view>

						<!--  -->
						<view class="share-btn" @click="cancel" v-if="detail.status == 0"
							:style="{color: themeColor.themeColor,border:`1rpx solid ${themeColor.themeColor}`}">
							{{$t("pages.liuhe.betDetail.cancelOrder")}}
						</view>
						<!--          <view class="share-btn" @click="toShare" v-else-if="detail.status == 2" :style="{color: themeColor.themeColor,border:`1rpx solid ${themeColor.themeColor}`}">-->
						<!--            分享结果-->
						<!--          </view>-->
					</view>
				</view>
			</view>
		</scroll-view>
		<!--    <view class="win-box">
          <view class="win">
            <view class="title">可中奖项</view>
            <view class="tr th">
              <view :span="6" class="td">名称</view>
              <view :span="6" class="td">奖项</view>
              <view :span="6" class="td">返点</view>
              <view :span="6" class="td">赔率</view>
            </view>
            <view class="tr">
              <view :span="6" class="td">特码A</view>
              <view :span="6" class="td">1-10</view>
              <view :span="6" class="td">0.00%</view>
              <view :span="6" class="td">4.700</view>
            </view>
            <view class="tr">
              <view :span="6" class="td">特码A</view>
              <view :span="6" class="td">1-10</view>
              <view :span="6" class="td">0.00%</view>
              <view :span="6" class="td">4.700</view>
            </view>
            <view class="tr">
              <view :span="6" class="td">特码A</view>
              <view :span="6" class="td">1-10</view>
              <view :span="6" class="td">0.00%</view>
              <view :span="6" class="td">4.700</view>
            </view>
            <view class="tr">
              <view :span="6" class="td">特码A</view>
              <view :span="6" class="td">1-10</view>
              <view :span="6" class="td">0.00%</view>
              <view :span="6" class="td">4.700</view>
            </view>
          </view>
        </view>-->
		<view class="footer">
			<view class="footer-box">
				<view class="botton-box">
					<view class="bet-btn" @click="toCart" :style="{ backgroundColor: themeColor.themeColor }">
						{{ $t("pages.liuhe.betDetail.again") }}
					</view>

					<!--  -->
					<view class="share-btn" @click="cancel" v-if="detail.status == 0"
						:style="{ color: themeColor.themeColor, border: `1rpx solid ${themeColor.themeColor}` }">
						{{ $t("pages.liuhe.betDetail.cancelOrder") }}
					</view>
					<!--          <view class="share-btn" @click="toShare" v-else-if="detail.status == 2" :style="{color: themeColor.themeColor,border:`1rpx solid ${themeColor.themeColor}`}">-->
					<!--            分享结果-->
					<!--          </view>-->
				</view>
			</view>
		</view>
		<AlertInjectLayer />
		<uni-popup ref="confirm" type="center" background-color="#fff">
			<view class="confirm-box">
				<view class="conftrm-text">
					{{ $t("pages.liuhe.betDetail.tips") }}
				</view>
				<view class="confirm-content">
					<view>
						<view>{{ $t("pages.liuhe.betDetail.desc") }}</view>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="cancel" @click="cancelBtn">{{ $t("pages.liuhe.betDetail.cancel") }}</view>
					<view class="confirm-act" @click="submit" :style="setBtnStyle()">
						{{ $t("pages.liuhe.betDetail.confirm") }}
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="share" background-color="#fff">
			<view class="confirm-box">
				<view class="conftrm-text">
					{{ $t("pages.liuhe.betDetail.tips") }}
				</view>
				<view class="confirm-content">
					<view>
						<view>{{ $t("pages.liuhe.betDetail.chat") }}</view>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="cancel" @click="cancelBtn">{{ $t("pages.liuhe.betDetail.cancel") }}</view>
					<view class="confirm-act" :style="setBtnStyle()">{{ $t("pages.liuhe.betDetail.confirm") }}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Header from "@/components/common/header/index.vue";
	import Number from "@/components/common/lottery/Number";
	import {
		cancel,
		betOrderDetail
	} from "@/utils/lottery/betting";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Playing from "@/utils/common/playing";
	import {
		mapGetters
	} from 'pinia';

	export default {
		name: "bet_details",
		components: {
			AlertInjectLayer,
			Header,
			Number
		},
		data() {
			return {
				title: "注单详情",
				windowHeight: "",
				playing: new Playing(),
				headerStyle: {
					backgroundColor: '#03536E',
				},
				titleStyle: {
					color: '#FFFFFF',
				},
				detail: {},
				prams: {
					bettingVo: {
						lotteryId: 1,
						lotteryNo: 20230203,
					}
				},

				queryInfo: null,
			}
		},
		computed: {
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			...mapGetters(['themeColor'])
		},
		mounted() {
			uni.$emit("on_page_mounted", this)

			this.windowHeight = uni.$sys.windowHeight + "px";
		},
		onLoad({
			id,
			createTime
		}) {
			let option = null;
			//方式二：接收参数
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('argParams', function(data) {
				option = data
			})
			if (id && createTime) {
				this.query = {
					id: id,
					createTime: createTime
				}
			}

			this.detail = option
			this.getDetail()
			uni.$on('betDetailsToCart', this.toCart)
		},
		methods: {
			formatDate(currentDate) { //定义日期格式化函数
				return this.playing.formatDate(currentDate) //拼接成yyyymmdd形式字符串
			},
			setBtnStyle() {
				return {
					color: this.themeColor.themeColor
				}
			},
			ballColor() {
				return this.detail.resultDetail && this.detail.resultDetail.split('_')[0].split(' ')[1] || null
			},
			toShare() {
				this.$refs.share.open("center")
			},
			setStatusImg(status) {
				switch (status) {
					case 0:
						return require('@/static/img/liuhe/detail/wkj.png')
					case 1:
						return require('@/static/img/liuhe/detail/wzj.png')
					case 2:
						return require('@/static/img/liuhe/detail/zj.png')
					case 3:
						return require('@/static/img/liuhe/detail/cedan.png')
					case 4:
						return require('@/static/img/liuhe/detail/system.png')
					case 9:
						return require('@/static/img/liuhe/detail/tie.png')
				}
			},
			setColorBall(color) {
				return {
					backgroundImage: `url(/static/img/liuhe/ball/${color}.png)`,
					backgroundPosition: "center",
					backgroundSize: "100% 100%"
				}
			},
			setBallStyle(num) {
				if (this.detail.lotteryTypeId === 29) {
					return {
						backgroundImage: `url(/static/img/liuhe/airship/numbers/${num}.svg)`,
						backgroundPosition: "center",
						backgroundSize: "100% 100%",
						width: '25px',
						height: '25px'
					}
				} else if (this.detail.lotteryTypeId === 28) {
					if (num === "*") {
						num = "star"
					}
					return {
						backgroundImage: `url(/static/img/liuhe/kuaisan/${num}.svg)`,
						backgroundPosition: "center",
						backgroundSize: "100% 100%"
					}
				} else if (this.detail.lotteryTypeId === 30) {
					return {
						backgroundImage: `url(/static/img/liuhe/ssc/ball.svg)`,
						backgroundPosition: "center",
						backgroundSize: "100% 100%"
					}
				}

			},
			setAmount(num) {
				return this.playing.setAmount(num, 2, '.', ',')
			},
			toNav() {
				uni.navigateTo({
					url: '/pages/liuhe/bet_num?num=' + this.detail.betValue
				})
			},
			getDetail() {
				let id = this.detail ? this.detail.id : this.query ? this.query.id : -1;
				let createTime = this.detail ? this.detail.createTime : this.query ? this.query.createTime : -1;

				betOrderDetail({
					id: id,
					createTime: createTime
				}).then(res => {
					if (res.code === 200) {
						this.detail = res.result
					}
				})
			},
			cancel() {
				this.$refs.confirm.open("center")
			},
			cancelBtn() {
				this.$refs.confirm.close()
				this.$refs.share.close()
			},
			submit() {
				let prams = {
					betId: this.detail.id,
					createTime: this.detail.createTime
				};
				cancel(prams).then(res => {
					pop(res.message, 1000);
					if (res.code === 200) {
						// this.detail.status = 3
						// this.cancelBtn()
						// this.getDetail()
						uni.redirectTo({
							url: '/pages/liuhe/liuhePlaying?id=' + this.detail.lotteryId + '&cancel=' + 0
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//再次下注跳转购物车
			toCart() {
				let data = {
					chaseNum: 0,
					chaseStop: 1,
					code: this.detail.playParentCode,
					content: this.detail.betSource,
					methodName: this.detail.playName,
					mode: 1,
					name: this.detail.betValue,
					playId: this.detail.playId,
					rebatePoint: 0,
					stakeCount: this.detail.betNum,
					totalPrice: this.detail.betNum * this.detail.betAmount,
					unitPrice: this.detail.betAmount
				}
				this.playing.setStorage(this.detail.playParentCode, [data]);
				uni.redirectTo({
					url: '/pages/liuhe/cart?code=' + this.detail.playParentCode + '&id=' + this.detail.lotteryId
				})
			},
			copyText(text) {
				uni.setClipboardData({
					data: text,
					success: (res) => {
						uni.showToast({
							title: this.$t("pages.liuhe.betDetail.copyText")
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .content-box {
		z-index: 10;
	}

	.bet-body {
		.confirm-box {
			width: 600rpx;
			//height: 282rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			box-sizing: border-box;

			.conftrm-text {
				color: #404040;
				text-align: center;

				font-size: 34rpx;
				padding: 35rpx 232rpx;
				border-top-left-radius: 24rpx;
				border-top-right-radius: 24rpx;
				box-sizing: border-box;
				display: grid;
				place-content: center;
			}

			.confirm-content {
				color: #404040;
				text-align: center;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 56rpx;
				padding-bottom: 28rpx;
			}

			.bottom-btn {
				display: flex;
				justify-content: space-around;
				height: 88rpx;
				width: 100%;
				border-top: 2rpx solid var(--theme-auxiliary-color-default);

				.cancel {
					color: #404040;
					text-align: center;

					font-size: 34rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					display: flex;
					align-items: center;
					justify-content: center;
					border-right: 2rpx solid var(--theme-auxiliary-color-default);
					width: 100%;
				}

				.confirm-act {
					text-align: center;

					font-size: 34rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;

				}
			}
		}

		background: #EEEEEE;
		height: 100vh;

		position: relative;
		display: flex;
		flex-direction: column;

		.header-right-box {
			display: flex;
			align-items: center;
			justify-content: end;
			color: #404040;
			text-align: center;

			font-size: 30rpx;
			font-weight: 400;

			image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 10rpx;
			}
		}



		.right-box {
			line-height: 92rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.title-box {
			background: #FFFFFF;
			padding: 20rpx 28rpx;
			border-radius: 24rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left-box {
				height: 100%;
				display: flex;
				align-items: flex-start;
				flex-direction: column;

				.top {
					display: flex;
					align-items: center;

					.lottery-name {
						color: #404040;

						font-size: 34rpx;
						font-weight: 400;
						margin-right: 20rpx;
					}

					.period {
						margin-right: 15rpx;
						color: #404040;

						font-size: 28rpx;
						font-weight: 400;
					}

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.bottom {
					margin-top: 5rpx;

					.content {
						color: var(--theme-auxiliary-color-remind);

						font-size: 34rpx;
						font-weight: 400;
					}
				}
			}

			.right-box {
				height: 100%;
				display: flex;
				align-items: center;

				.status-img {
					width: 132rpx;
					height: 96rpx;
				}
			}
		}

		.center-box {
			background: #EEEEEE;
			height: calc(var(--vh) - 410rpx);
			border-radius: 24rpx;
			overflow: hidden;
			margin-top: 20rpx;

			.list-center {
				box-sizing: border-box;
				background: #FFFFFF;
				border-bottom: 2rpx solid #DDDDDD;
				border-radius: 24rpx;
				padding: 0 28rpx;

				.center-row.number-box {
					align-items: flex-start;
					flex-direction: column;
					padding: 20rpx 0;
				}

				.center-row {
					display: flex;
					min-height: 96rpx;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2rpx solid var(--theme-auxiliary-color-default);

					.left {
						color: #404040;
						text-align: left;

						font-size: 30rpx;
						font-weight: 400;
						width: 180rpx;
					}

					.bet-text.ball-show {
						margin-top: 20rpx;
						width: 100%;
					}

					.bet-text {
						color: var(--theme-auxiliary-color-remind);
						text-align: center;

						font-size: 28rpx;
						font-style: normal;
						font-weight: 400;

						.number-list {
							display: flex;
							justify-content: start;

							.feiting-item {
								width: 46rpx;
								height: 46rpx;
								margin-right: 16rpx;
							}

							.kuaisan-item {
								width: 76rpx;
								height: 77rpx;
								margin-right: 20rpx;
							}


							.number-list-item {
								width: 72rpx;
								height: 80rpx;
								border-radius: 50%;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 20rpx;
								font-weight: 500;
								font-size: 42rpx;
								color: #EBFDFF;
								background-position: center;
								background-size: 100% 100%;

								&.ball-red {
									background-image: url("@/static/img/liuhe/pcEgg/ball-red.png");
								}

								&.ball-blue {
									background-image: url("@/static/img/liuhe/pcEgg/ball-blue.png");
								}

								&.ball-green {
									background-image: url("@/static/img/liuhe/pcEgg/ball-green.png");
								}

								&.ball-gray {
									background-image: url("@/static/img/liuhe/pcEgg/ball-gray.png");
								}
							}

							.eleven {
								background-image: url("@/static/img/liuhe/ssc/ball.svg");
								background-position: center;
								background-size: 100% 100%;

								text {
									background: linear-gradient(180deg, #FFFFFF 23.02%, #b5ceee 78.57%);
									-webkit-background-clip: text;
									-webkit-text-fill-color: transparent;
									background-clip: text;
									text-fill-color: transparent;
									// text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.25);
									font-size: 30rpx;
									font-weight: bold;
								}
							}

							.three {
								background-image: url("@/static/img/liuhe/ssc/ball.svg");
								background-position: center;
								background-size: 100% 100%;

								text {
									background: linear-gradient(180deg, #FFFFFF 23.02%, #b5ceee 78.57%);
									-webkit-background-clip: text;
									-webkit-text-fill-color: transparent;
									background-clip: text;
									text-fill-color: transparent;
									// text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.25);
									font-size: 30rpx;
									font-weight: bold;
								}
							}

							.lucky-farm-item {
								background-image: url("@/static/img/liuhe/ssc/ball.svg");
								background-position: center;
								background-size: 100% 100%;

								text {
									background: linear-gradient(180deg, #FFFFFF 23.02%, #b5ceee 78.57%);
									-webkit-background-clip: text;
									-webkit-text-fill-color: transparent;
									background-clip: text;
									text-fill-color: transparent;
									// text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.25);
									font-size: 30rpx;
									font-weight: bold;
								}
							}

						}

						.pcEgg-result {
							.number-list-wrap {
								display: flex;
								align-items: center;
								justify-content: center;

								.number-list-item {
									margin-right: 10rpx;
									margin-left: 10rpx;
								}

								.pc-egg-item {
									background-image: url("@/static/img/liuhe/ssc/ball.svg");
									background-position: center;
									background-size: 100% 100%;

									text {
										background: linear-gradient(180deg, #FFFFFF 23.02%, #b5ceee 78.57%);
										-webkit-background-clip: text;
										-webkit-text-fill-color: transparent;
										background-clip: text;
										text-fill-color: transparent;
										// text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.25);
										font-size: 30rpx;
										font-weight: bold;
									}
								}

								.number-symbol {
									margin-top: 10rpx;

									image {
										width: 35rpx;
										height: 35rpx;
									}
								}
							}

							.number-list-wrap:first-of-type {
								.number-list-item {
									margin-left: 0;
								}
							}

							.result-ball {
								margin-left: 10rpx;
							}
						}

						.lucky-number-list {
							display: flex;
							align-items: flex-start;
							flex-flow: row wrap;
							gap: 10rpx;

							.lucky-item {
								display: flex;
								align-items: center;
								justify-content: center;
								width: 58rpx;
								height: 66rpx;
								color: #000;

								font-size: 30rpx;
								font-weight: 600;
							}
						}

						.item-text {
							color: #404040;

							font-size: 30rpx;
							font-weight: 400;
							text-align: left;
							margin-top: 18rpx;
						}
					}

					.bet-text.large-text {
						font-size: 30rpx;
            width: 500rpx;
            text-align: right;
					}

					.black {
						color: #404040;
						text-align: center;

						font-size: 28rpx;
						font-weight: 400;
						display: flex;

						.copy {
							margin-left: 10rpx;
						}
					}

					.win-money {
						font-weight: 400;
						font-size: 28rpx;
						line-height: 24rpx;
						color: #DF2939;
					}
				}
			}
		}

		.bot {
			height: calc(var(--vh) - 520rpx);
		}

		.win-box {
			background: #EEEEEE;
			padding: 26rpx 22rpx;

			.win {
				box-sizing: border-box;
				background: #FFFFFF;
				border-bottom: 2rpx solid #DDDDDD;
				border-radius: 20rpx;
				padding: 1rpx 20rpx;

				.title {
					////font-weight: 500;
					font-size: 30rpx;
					line-height: 42rpx;
					text-align: center;
					color: #8CB2C9;
					margin: 18rpx 0;
				}

				.tr {
					margin: 10rpx 0;
					padding: 20rpx 0;

					.td {
						//font-weight: 500;
						font-size: 25rpx;
						line-height: 35rpx;
						color: #404040;
						text-align: center;
					}
				}

				.th {
					border-top: 2rpx solid #E7E7E7;
					border-bottom: 2rpx solid #E7E7E7;

					.td {
						color: #999999;
					}
				}
			}
		}

		.footer {
			width: 100%;
			min-height: 128rpx;
			position: fixed;
			bottom: 0;
			margin-top: 12rpx;
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			border-radius: 40rpx 40rpx 0 0;
			background: #FFF;
			/* 底部阴影 */
			box-shadow: 0px -1rpx 0px 0px var(--theme-auxiliary-color-default);
			z-index: 2;
			max-width: var(--maxWidth);

			.footer-box {
				width: 100%;
				box-sizing: border-box;

				.botton-box {
					width: 100%;

					view {
						font-weight: 400;
						border-radius: 16rpx;
						height: 88rpx;
						font-size: 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #FFFFFF;
					}

					.bet-btn {
						background: var(--theme-color);
						width: 100%;
						height: 88rpx;
						border-radius: 16rpx;
						box-sizing: border-box;
						display: flex;
						padding: 20rpx;
						justify-content: center;
						align-items: center;
					}

					.share-btn {
						width: 100%;
						border: 2rpx solid var(--theme-color);
						color: var(--theme-color);

						font-size: 34rpx;
						font-weight: 400;
						margin-top: 20rpx;
						// margin-bottom: 20rpx;
					}
				}
			}
		}
	}
</style>
