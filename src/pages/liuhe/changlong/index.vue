<template>
	<view class="chang-long">
		<uni-popup ref="popup">
			<view class="changlong-rule">
				<view class="header">
					<view class="title">
						<view class="left">
							<image :src="require('./../../../static/img/changlong/left.png')"></image>
						</view>
						<view>规则说明</view>
						<view class="right">
							<image :src="require('./../../../static/img/changlong/right.png')"></image>
						</view>
					</view>
				</view>
				<mp-html class="content" :content="playData.rule.url" style="overflow: unset;" />
				<!-- <view class="content" v-html="playData.rule.url">

        </view> -->
				<view class="footer" @click="closeRule">
					我知道了
				</view>
			</view>
		</uni-popup>
		<view class="chang-long-content">
			<view class="tabs">
				<view :class="currentTab === 0 ? 'tabs-item active' : 'tabs-item'" @click="onChangeTab(0)">
					长龙投注
					<view class="selected-line"></view>
				</view>
				<view class="line"></view>
				<view :class="currentTab === 1 ? 'tabs-item active' : 'tabs-item'" @click="onChangeTab(1)">
					遗漏投注
					<view class="selected-line"></view>
				</view>
			</view>
			<view class="tips">
				<view class="pired">
					仅显示连开
					<view class="pired-text" @click="showSelectes">{{currentPeriod}}</view>
					<view class="selectes" v-if="isShowPeriod">
						<view :class="currentPeriod === item ? 'selectes-item active' : 'selectes-item'"
							v-for="(item,index) in periodList" :key="index" @click="onSelectedPeriod(item)">{{item}}
						</view>
					</view>
					<image :src="require('./../../../static/img/changlong/down.png')"></image>
					期以上的{{currentTab === 0 ? "长龙" : "遗漏"}}
				</view>
				<view class="condition">
					{{sortList[currentSort].label}}
					<image :src="require('./../../../static/img/changlong/down-fill.png')" @click="isShowSort"></image>
					<view class="sort-filter" v-if="showSort">
						<view class="sort-item" v-for="(item,index) in sortList" :key="index"
							@click="onChangeSort(index)">{{item.label}}</view>
					</view>
					<view class="rules">
						<image :src="require('./../../../static/img/changlong/rule.png')" @click="showRule"></image>
					</view>
				</view>
			</view>
			<scroll-view scroll-y class="betting-list" v-if="bettingInfoList.length > 0">
				<view class="lists">
					<view class="lists-item dan" v-for="(item, index) in bettingInfoList" :key="index">
						<view class="close-mask" v-if="item.result.stampType === 1 || item.result.stampType === 3">
							<view v-if="item.result.stampType === 1">待开盘中</view>
							<view v-if="item.result.stampType === 3 && item.result.closeTimeStamp != 0">封盘中</view>
							<view v-if="item.result.stampType === 3 && item.result.closeTimeStamp === 0">开奖中</view>
						</view>
						<view class="top">
							<view class="top-item" v-if="currentTab === 0">
								<view class="title">{{ item.lottery.name }}</view>
								<view class="num">{{item.result.shorNo}}期</view>
								<view class="rank">
									{{ item.playName }}
									<view class="sp">-</view>
									<text> {{item.childPlay}}</text>
								</view>
							</view>
							<view class="top-item" v-if="currentTab === 1">
								<view class="title-yl">{{ item.lottery.name }}</view>
								<view class="num">{{item.result.shorNo}}期</view>
								<view class="rank-cl">
									{{ item.playName }}
									<view class="sp">-</view>
									<text>{{item.childPlay}}</text>
								</view>
							</view>
							<view class="top-right">
								<view
									:class="['item'+ ' item' + i,{selected : c.isSelected === true && currentBall === i && currentIndex === index}]"
									v-for="(c,i) in item.playList" v-if="currentTab === 0"
									@click="getBall(c,i,item,index)">
									<view>
										<view class="item-text">{{ c.name }}</view>
										<view class="item-times">
<!--                      {{ c.odds }}-->
                      <span-box :value="c.odds" :ball-info="c"></span-box>
                    </view>
									</view>
								</view>
								<!-- c.isSelected === true && -->
								<view
									:class="['item-small' + ' item-small' + i, {selected :  currentBall === i && currentIndex === index}]"
									v-for="(c,i) in item.playList" v-if="currentTab === 1"
									@click="getBall(c,i,item,index)">
									<view>
										<view class="item-text">{{["漏","冷","热"][i]}}</view>
										<view class="item-text-bottom">
											<view class="item-text-name">{{ c.name }}</view>
											<view class="item-times">
<!--                        {{ c.odds ? c.odds : 0 }}-->
                        <span-box :value="c.odds" :ball-info="c"></span-box>

                      </view>
                    </view>
									</view>
								</view>
							</view>
						</view>
						<view class="sp-line"></view>
						<view class="bottom">
							<view class="bottom-left">
								{{ currentTab === 0 ? '连开' : '遗漏' }}
								<text>{{item.periods}}</text>期
							</view>
							<view class="bottom-right">
								{{ setRewardsTimeOut(item.result.closeTimeStamp) }}
							</view>
						</view>
						<view class="bottom-line" v-if="currentTab === 0">
							<view class="bottom-line-left"></view>
							<view class="pk">
								<image :src="require('./../../../static/img/changlong/pk.png')"></image>
							</view>
							<view class="bottom-line-right"></view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="no-data" v-else>
				<view class="no-data-text">
					<view class="line1">当前暂无{{currentTab === 0 ? "长龙" : "遗漏"}}</view>
					<view class="line2">去其他地方看看吧</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getTrendChartBet,
		getLotteryBet
	} from "../../../utils/lottery/betting";
	import Playing from "../../../utils/common/playing";
	import {
		websocetObj
	} from '@/utils/websocet/websocet.js';
	import {
		mapGetters
	} from 'pinia';
  import usePlayingStore from "@/store/modules/playIngStore";

	export default {
		components: {},
		props: {
			playData: {
				default: {},
				type: Object,
			}
		},
		data() {
			return {
				currentTab: 0,
				periodList: [6, 8, 10, 12],
				currentPeriod: 6,
				isShowPeriod: false,
				bettingInfoList: [],
				bettingInfoMap: {},
				sortList: [{
					label: "按时间",
					value: 0
				}, {
					label: "按期数",
					value: 1
				}],
				playing: new Playing(),
				showSort: false,
				currentSort: 0,
				isSelected: false,
				currentIndex: null,
				currentBall: null
			}
		},
		computed: {
      ...mapState(usePlayingStore, ["orderList"])
		},
		watch: {
			orderList() {
				if (this.orderList.length === 0) {
					this.reSetData()
				}
			}
		},
		onLoad() {},
		/****
		 *  TODO @ryan 一定要在正确的事件里面销毁定时器
		 * ***/
		onUnLoad() {
			for (let i in this.bettingInfoMap) {
				let betInfo = this.bettingInfoMap[i];
				this.deletePlayInfo(betInfo);
			}
			uni.$off("on_event_getLotteryBet");
		},

		mounted() {

			uni.$emit("on_page_mounted", this)

			let that = this;
			this.loadingTrendChartBet();
			// this.doCommitUpdateEventBySocket();
			//获取ws数据推送
			uni.$on("on_event_getLotteryBet", function(resultInfo) {
				let info = resultInfo.data.result;
				if (null == info) {
					let memInfo = that.bettingInfoMap[resultInfo.betId];
					if (memInfo) that.deletePlayInfo(memInfo)
				} else if (info && info.betId) that.updateOneBetInfo(info);
			})
			uni.$on("on_event_changLongQueue", function(msg) {
				let info = that.currentTab == 0 ? msg.data.long : msg.data.miss;
				if (null == info) {
					let memInfo = that.bettingInfoMap[msg.betId];
					if (memInfo) that.deletePlayInfo(memInfo)
				} else if (info && info.betId && info.periods > this.currentPeriod) that.updateOneBetInfo(info);


			})

		},
		methods: {
			/**
			 * sortType: 0按照时间 1按照期数
			 * type: 0长龙 1遗漏
			 */
			loadingTrendChartBet() {
				let param = {
					periods: this.currentPeriod,
					sortType: this.currentSort,
					type: this.currentTab
				};
				getTrendChartBet(param).then(res => {
					if (res.code === 200) {
						this.bettingInfoList = res.result;
						this.deleteAllMemPlayInfos();
						this.buildListToLotteryIdToMap();
						this.startAllBetInfosTimmer();
						if (this.currentTab === 1) {
							this.reSetData();
						}
					}
				})
			},
			//给遗漏加上name
			reSetData() {
				this.bettingInfoList.forEach(item => {
					for (let i = 0; i < item.playList.length; i++) {
						item.playList[i].isSelected = false;
					}
				})
			},
			buildListToLotteryIdToMap() {
				for (let playIndex in this.bettingInfoList) {
					let playInfo = this.bettingInfoList[playIndex];
					let resultInfo = playInfo.result;
					if (!resultInfo) continue;
					let saveKey = playInfo.betId;
					this.bettingInfoMap[saveKey] = playInfo;
				}
			},

			startAllBetInfosTimmer() {
				let that = this;
				for (let saveKey in this.bettingInfoMap) {
					let oneLotteryPlays = this.bettingInfoMap[saveKey];
					that.startRunOneBetinfoTimmer(oneLotteryPlays);
				}
			},
			startRunOneBetinfoTimmer(betInfo) {
				let that = this;
				clearTimeout(betInfo.httpSyncTimmer);
				clearInterval(betInfo.timmer);
				if (betInfo.timmer) clearInterval(betInfo.timmer);
				var run = function() {
					let time = Date.now();
					if (!betInfo.lastTimmerTick) betInfo.lastTimmerTick = time;
					if (time - betInfo.lastTimmerTick >= 1000) {
						let subTime = Math.round((time - betInfo.lastTimmerTick) / 1000);
						let t = betInfo.result.closeTimeStamp;
						let subedTime = t - subTime;
						betInfo.result.closeTimeStamp = subedTime < 0 ? 0 : subedTime;
						betInfo.lastTimmerTick = time;
						if (subedTime <= 0) {
							clearInterval(betInfo.timmer);
							that.dispathUpdateBetInfoFromServer(betInfo);
						}
					}

				}
				betInfo.timmer = setInterval(() => {
					run();
				}, 100)
			},
			/**
			 * 发送某个下注开始惊醒数据更新请求
			 * @param betInfo
			 */
			dispathUpdateBetInfoFromServer(betInfo) {
				clearTimeout(betInfo.httpSyncTimmer);
				let socketInitStruct = {
					event: "getLotteryBet",
					betId: betInfo.betId,
					periods: betInfo.periods,
					type: this.currentTab,
					lotteryId: betInfo.result.lotteryId
				};
				let that = this;
				websocetObj.sendMsg(socketInitStruct);
				/**
				 * 到时间没ws返回触更新betInfo则会执行HTTP请求同步
				 * @type {number}
				 */
				betInfo.httpSyncTimmer = setTimeout(() => {
					that.getLotteryBet(betInfo);
				}, betInfo.result.stampType == 3 ? 15000 : 3000); //websocket 有消息返回清空这个定时器 避免走http同步  返回为服务端配套逻辑有问题
			},

			getLotteryBet(playInfo) {
				getLotteryBet({
					betId: playInfo.betId,
					type: this.currentTab,
					periods: playInfo.periods
				}).then(res => {
					if (res.code == 200) {
						if (res.result == null) {
							this.deletePlayInfo(playInfo);
						} else {
							this.updateOneBetInfo(res.result)
						}
					}
				})
			},

			deleteAllMemPlayInfos() {
				for (let betId in this.bettingInfoMap) {
					let playInfo = this.bettingInfoMap[betId];
					if (!playInfo) continue;
					clearTimeout(playInfo.httpSyncTimmer);
					clearInterval(playInfo.timmer);
				}
				this.bettingInfoMap = {};
			},

			/**
			 * 删除betInfo 及清理定时器
			 * @param playInfo
			 */
			deletePlayInfo(playInfo) {
				let index = this.bettingInfoList.indexOf(playInfo)
				clearTimeout(playInfo.httpSyncTimmer);
				clearInterval(playInfo.timmer);
				delete this.bettingInfoMap[playInfo.betId];
				if (index != -1) this.bettingInfoList.splice(index, 1);
			},
			/**
			 * 更新betInfo 并及清理旧对象的定时器
			 * @param playInfo
			 */
			updateOneBetInfo(playInfo) {
				let memData = this.bettingInfoMap[playInfo.betId];
				if (memData) {
					clearTimeout(memData.httpSyncTimmer);
					clearInterval(memData.timmer);
					let index = this.bettingInfoList.indexOf(memData);
					if (index != -1) {
						this.bettingInfoList[index] = playInfo;
					} else {
						this.bettingInfoList.push(playInfo);
					}
				} else {
					this.bettingInfoList.push(playInfo);
				}
				if (this.currentTab === 1) {
					this.reSetData();
				}
				this.bettingInfoMap[playInfo.betId] = playInfo;
				this.startRunOneBetinfoTimmer(playInfo);
			},


			onChangeTab(index) {
        uni.$emit(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LIUHE_BUY_REBATE_INIT);
				this.bettingInfoList = [];
				this.currentTab = index;
				this.loadingTrendChartBet();
			},
			onSelectedPeriod(item) {
				this.currentPeriod = item;
				this.isShowPeriod = false;
				this.loadingTrendChartBet();
			},
			showSelectes() {
				this.isShowPeriod = !this.isShowPeriod;
			},
			doCommitUpdateEventBySocket() {
				let socketInitStruct = {
					event: "getLotteryBet",
					// lotteryId: this.lotteryId
				};
				websocetObj.sendMsg(socketInitStruct);
			},
			//设置倒计时
			setRewardsTimeOut(time) {
				this.runtimes = this.playing.timestampToDate(time); //转化时分秒
				return this.runtimes
			},
			isShowSort() {
				this.showSort = !this.showSort
			},
			onChangeSort(index) {
				this.showSort = false
				this.currentSort = index
				this.loadingTrendChartBet()
			},
			getBall(c, i, item, index) {
				this.currentIndex = index;
				this.currentBall = i;
				this.bettingInfoList[index].playList[i].isSelected = !this.bettingInfoList[index].playList[i].isSelected;
				this.$emit("selectedBall", c, item);
				this.$forceUpdate()
			},
			showRule() {
				this.$refs.popup.open('center');
			},
			closeRule() {
				this.$refs.popup.close();
			}
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .uni-popup .content-box {
		left: 0 !important;
		right: 0 !important;
		max-width: none !important;
		width: auto !important;
	}

	.chang-long {
		height: 100%;
		background-color: #F1F3F4;

		.changlong-rule {
			width: 600rpx;
			// height: 783rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;

			.header {
				display: flex;
				width: 100%;
				height: 157rpx;
				padding: 50rpx 0 70rpx 0;
				// padding: 100rpx 0 236rpx 0;
				box-sizing: border-box;
				justify-content: center;
				align-items: center;
				gap: 30rpx;

				.title {
					display: flex;

					.left {
						width: 69rpx;
						height: 22rpx;
						margin-right: 30rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.header-title {
						color: #03536E;
						font-family: Inter;
						// font-size: 56rpx;
						font-weight: 500;
					}

					.right {
						width: 69rpx;
						height: 22rpx;
						margin-left: 30rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

			}

			.content {
				// height: 506rpx;
				margin-bottom: 40rpx;
				display: flex;
				justify-content: center;
				// margin-top:20rpx;
				padding: 20rpx 60rpx;

				::v-deep ._block {
					display: block !important;

				}

				::v-deep .exp {
					margin-bottom: 40rpx;
				}

				::v-deep .text {
					color: #404040;
					font-family: 'PingFang SC';
					font-size: 26rpx;
					font-weight: 400;
					letter-spacing: -1px;


				}
			}

			.footer {
				color: #03536E;
				font-family: 'PingFang SC';
				font-size: 30rpx;
				font-weight: 400;
				letter-spacing: -1px;
				display: flex;
				height: 100rpx;
				padding: 10rpx;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				gap: 10rpx;
				width: 100%;
				border-top: 1px solid #F9F9F9;
			}
		}

		.chang-long-content {
			display: flex;
			flex-direction: column;
			height: 100%;

			.tabs {
				display: flex;
				align-items: center;
				background: #FFF;

				.tabs-item {
					color: #7D878B;
					text-align: center;
					font-family: 'PingFang SC';
					font-size: 26rpx;
					font-weight: 300;
					letter-spacing: -1px;
					width: 100%;
					padding: 15rpx 0;
					box-sizing: border-box;
					position: relative;
				}

				.tabs-item.active {
					color: #03536E;

					.selected-line {
						width: 111.81rpx;
						height: 2rpx;
						background: #07AEE6;
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translate(-50%);
					}
				}

				.line {
					width: 1rpx;
					height: 35rpx;
					background: #D9D9D9;
				}
			}

			.tips {
				padding: 10rpx 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #666;
				text-align: center;
				font-family: 'PingFang SC';
				font-size: 26rpx;
				font-weight: 300;
				letter-spacing: -1px;

				.pired {
					display: flex;
					align-items: center;
					position: relative;

					.pired-text {
						color: #000;
						text-align: center;
						font-family: 'PingFang SC';
						font-size: 26rpx;
						font-style: normal;
						font-weight: 300;
						line-height: 40rpx;
						/* 153.846% */
						letter-spacing: -1px;
						margin-right: 8rpx;
					}

					.selectes {
						width: 100rpx;
						box-shadow: 0 4rpx 4rpx 0 rgba(0, 0, 0, 0.25);
						position: absolute;
						z-index: 2;
						bottom: -250rpx;
						transform: translate(-50%);
						left: 50%;

						.selectes-item {
							height: 60rpx;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: left;
							box-sizing: border-box;
							padding: 20rpx 10rpx;
							background: #FFF;
							color: #000;
							font-family: 'PingFang SC';
							font-size: 30rpx;
							font-weight: 400;
							letter-spacing: -2px;
						}

						.selectes-item.active {
							background: #A8DCF0;
							color: #FFFFFF;
						}
					}

					image {
						width: 26rpx;
						height: 26rpx;
					}
				}
			}

			.condition {
				display: flex;
				align-items: center;
				position: relative;

				.sort-filter {
					width: 118rpx;
					height: 120rpx;
					border: 1px solid #EFEFEF;
					background: #F6F6F6;
					position: absolute;
					top: 46rpx;
					left: -16rpx;
					z-index: 2;

					.sort-item {
						display: flex;
						align-items: center;
						justify-content: center;
						color: #666;
						font-family: 'PingFang SC';
						font-size: 26rpx;
						font-weight: 400;
						letter-spacing: -1px;
						padding: 10rpx;
						box-sizing: border-box;
					}
				}

				image {
					width: 32rpx;
					height: 40rpx;
				}

				.rules {
					width: 34rpx;
					height: 34rpx;

					image {
						width: 34rpx;
						height: 34rpx;
					}
				}
			}

			.betting-list {
				flex: 1;
				height: 0;

				.lists {
					padding: 0 20rpx;
					box-sizing: border-box;

					.lists-item {
						width: 100%;
						//height: 230rpx;
						border-radius: 10rpx;
						background-color: #FFFFFF;
						border-bottom: 2rpx solid #E8E8E8;
						display: flex;
						flex-direction: column;
						box-sizing: border-box;
						margin-bottom: 20rpx;
						position: relative;

						.close-mask {
							position: absolute;
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
							background: rgba(0, 0, 0, 0.50);
							display: flex;
							align-items: center;
							justify-content: center;
							color: #FFF;
							font-family: 'PingFang SC';
							font-size: 48rpx;
							font-weight: 500;
							line-height: 20rpx;
							/* 41.667% */
							letter-spacing: -1px;
						}

						.top {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 10rpx 15rpx;

							.top-item {
								.title {
									color: #16607A;
									font-family: 'PingFang SC';
									font-size: 26rpx;
									font-weight: 400;
									line-height: 40rpx;
									/* 181.818% */
									letter-spacing: -1px;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									-o-text-overflow: ellipsis;
								}

								.title-yl {
									color: #16607A;
									font-family: 'PingFang SC';
									font-size: 26rpx;
									font-weight: 400;
									line-height: 40rpx;
									/* 153.846% */
									letter-spacing: -1px;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									-o-text-overflow: ellipsis;
								}

								.num {
									color: #666;
									font-family: 'PingFang SC';
									font-size: 22rpx;
									font-weight: 400;
									line-height: 40rpx;
									/* 181.818% */
									letter-spacing: -1px;
								}

								.rank {
									color: #16607A;
									text-align: center;
									font-family: 'PingFang SC';
									font-size: 22rpx;
									font-weight: 400;
									line-height: 40rpx;
									/* 181.818% */
									letter-spacing: -1px;
									display: flex;

									.sp {
										margin: 0 15rpx;
									}

									text {
										color: #D3556A;
										text-align: center;
										font-family: 'PingFang SC';
										font-size: 22rpx;
										font-weight: 400;
										line-height: 40rpx;
										/* 181.818% */
										letter-spacing: -1px;
									}
								}

								.rank-cl {
									color: #16607A;
									font-family: 'PingFang SC';
									font-size: 22rpx;
									font-weight: 400;
									line-height: 40rpx;
									/* 181.818% */
									letter-spacing: -1px;
									display: flex;

									.sp {
										margin: 0 15rpx;
									}

									text {
										color: #55D46A;
										text-align: center;
										font-family: 'PingFang SC';
										font-size: 22rpx;
										font-weight: 400;
										line-height: 40rpx;
										/* 181.818% */
										letter-spacing: -1px;
									}
								}
							}

							.top-right {
								display: flex;
								align-items: center;

								.item1 {
									.item-text {
										color: #09C;
									}
								}

								.item0 {
									.item-text {
										color: #DF2939;
									}
								}

								.item0.selected {
									background: #D3556A;

									.item-text {
										color: #FFF;
									}

									.item-times {
										color: #FFF;
									}
								}

								.item1.selected {
									background: #3881A8;

									.item-text {
										color: #FFF;
									}

									.item-times {
										color: #FFF;
									}
								}

								.item-small {
									width: 105rpx;
									height: 95rpx;
									border-radius: 6rpx;
									border: 2rpx solid #E7E7E7;
									margin-right: 14rpx;
									text-align: center;
									display: flex;
									align-items: center;
									justify-content: center;

								}

								.item-small0 {
									color: #55D46A;
									text-align: center;
									font-family: 'PingFang SC';
									font-size: 36rpx;
									font-weight: 500;
									letter-spacing: -1px;

									.item-text-bottom {
										display: flex;

										.item-text-name {
											color: #55D46A;
											text-align: center;
											font-family: 'PingFang SC';
											font-size: 24rpx;
											font-weight: 400;
											letter-spacing: -1px;
											margin-right: 10rpx;
										}

										.item-times {
											color: #7D878B;
											text-align: center;
											font-family: 'PingFang SC';
											font-size: 24rpx;
											font-weight: 400;
											letter-spacing: -1px;
										}
									}
								}

								.item-small0.selected {
									background-color: #55D46A;
									color: #fff;

									.item-text-bottom {
										.item-text-name {
											color: #fff;
										}

										.item-times {
											color: #fff;
										}
									}
								}

								.item-small1.selected {
									background-color: #3881A8;
									color: #fff;

									.item-text-bottom {
										.item-text-name {
											color: #fff;
										}

										.item-times {
											color: #fff;
										}
									}
								}

								.item-small2.selected {
									background-color: #D3556A;
									color: #fff;

									.item-text-bottom {
										.item-text-name {
											color: #fff;
										}

										.item-times {
											color: #fff;
										}
									}
								}

								.item-small1 {
									color: #09C;
									text-align: center;
									font-family: 'PingFang SC';
									font-size: 36rpx;
									font-weight: 500;
									letter-spacing: -1px;

									.item-text-bottom {
										display: flex;

										.item-text-name {
											color: #09C;
											text-align: center;
											font-family: 'PingFang SC';
											font-size: 24rpx;
											font-weight: 400;
											letter-spacing: -1px;
											margin-right: 10rpx;
										}

										.item-times {
											color: #7D878B;
											text-align: center;
											font-family: 'PingFang SC';
											font-size: 24rpx;
											font-weight: 400;
											letter-spacing: -1px;
										}
									}
								}

								.item-small2 {
									color: #DF2939;
									text-align: center;
									font-family: 'PingFang SC';
									font-size: 36rpx;
									font-weight: 500;
									letter-spacing: -1px;

									.item-text-bottom {
										display: flex;

										.item-text-name {
											color: #DF2939;
											text-align: center;
											font-family: 'PingFang SC';
											font-size: 24rpx;
											font-weight: 400;
											letter-spacing: -1px;
											margin-right: 10rpx;
										}

										.item-times {
											color: #7D878B;
											text-align: center;
											font-family: 'PingFang SC';
											font-size: 24rpx;
											font-weight: 400;
											letter-spacing: -1px;
										}
									}
								}

								.item {
									width: 140rpx;
									height: 100rpx;
									border-radius: 6rpx;
									border: 2rpx solid #E7E7E7;
									margin-right: 14rpx;
									display: flex;
									align-items: center;
									justify-content: center;

									.item-text {
										text-align: center;
										font-family: 'PingFang SC';
										font-size: 36rpx;
										font-weight: 500;
										line-height: 40rpx;
										/* 111.111% */
										letter-spacing: -1px;
									}

									.item-text.shuang {
										color: #09C;
									}

									.item-times {
										color: #999;
										text-align: center;
										font-family: 'PingFang SC';
										font-size: 24rpx;
										font-weight: 400;
										line-height: 40rpx;
										/* 166.667% */
										letter-spacing: -1px;
									}
								}
							}
						}

						.sp-line {
							width: 100%;
							height: 2rpx;
							background-color: #E8E8E8;
						}

						.bottom {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 10rpx 20rpx;
							box-sizing: border-box;

							.bottom-left {
								color: #999;
								text-align: center;
								font-family: 'PingFang SC';
								font-size: 28rpx;
								font-weight: 400;
								letter-spacing: -1px;

								text {
									color: #DA2215;
									text-align: center;
									font-family: 'PingFang SC';
									font-size: 28rpx;
									font-weight: 500;
									letter-spacing: -1px;
									margin: 0 15rpx;
								}
							}

							.bottom-right {
								color: #DF2939;
								text-align: center;
								font-family: 'PingFang SC';
								font-size: 28rpx;
								font-weight: 500;
								letter-spacing: -1px;
							}
						}

						.bottom-line {
							display: flex;
							position: relative;

							.pk {
								width: 35.192rpx;
								height: 30rpx;
								position: absolute;
								transform: translate(-50%);
								left: 50%;
								top: -20rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}

							.bottom-line-left {
								border-radius: 0 0 0 10rpx;
								background: #D3556A;
								height: 20rpx;
								width: 100%;
							}

							.bottom-line-right {
								border-radius: 0 0 10rpx 0;
								background: #09C;
								height: 20rpx;
								width: 100%;
							}
						}
					}
				}
			}

			.no-data {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				height: 0;

				.no-data-text {
					text-align: center;

					.line1 {
						color: #666;
						font-size: 36rpx;
					}

					.line2 {
						color: #7D878B;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
