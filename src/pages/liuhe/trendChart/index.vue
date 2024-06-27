<template>
	<view class="trend-chart">
		<Header :title="title"></Header>
		<scroll-view scroll-y class="trend-chart-content" :style="{height:`calc(${uWindowHeight}px - 108rpx)`}">
			<view class="calendar">
				<!--				<view class="header">-->
				<!--					{{$t('pages.liuhe.cart.away')}}<text-->
				<!--						:class="'theme-' + themeColor.name">{{ showRoundInfo.nextNo }}</text>{{$t('pages.liuhe.cart.Period')}}-->
				<!--					{{$t('pages.liuhe.cart.cutOff')}}-->
				<!--					<text class="time">{{ runtimes }}</text>-->
				<!--				</view>-->
				<liuhe-cmp v-if="lotteryTypeId === 4" :data-list="dataList"></liuhe-cmp>
				<ssc-cmp v-if="lotteryTypeId ===30" :data-list="dataList"></ssc-cmp>
				<pk10-cmp v-if="lotteryTypeId === 29" :data-list="dataList"></pk10-cmp>
				<lucky8-cmp v-if="lotteryTypeId === 32" :data-list="dataList"></lucky8-cmp>
				<happy8-cmp v-if="lotteryTypeId === 31" :data-list="dataList"></happy8-cmp>
				<selected-five-cmp v-if="lotteryTypeId === 19" :data-list="dataList"></selected-five-cmp>
				<kuaisan-cmp v-if="lotteryTypeId === 28" :data-list="dataList"></kuaisan-cmp>
				<pc-egg-cmp v-if="lotteryTypeId === 26" :data-list="dataList"></pc-egg-cmp>
				<low-rate-cmp v-if="lotteryTypeId === 20" :data-list="dataList"></low-rate-cmp>
			</view>
			<view class="play-chart">
				<view class="play-tabs">
					<view
						:class="[currentTab === index ? 'play-tabs-item active' : 'play-tabs-item','theme-' + themeColor.name]"
						v-for="(item, index) in trendList" :key="index" @click="getItemData(item,index)">
						<view v-if="lotteryTypeId ===19 && index === 0">{{ item.playName.split("、")[0] }}</view>
						<view v-else>{{ item.playName }}</view>
						<view class="underline"></view>
					</view>
				</view>
				<view class="checking-chart">
					<view class="danshuang">
						<view class="danshuang-box" v-for="(item,index) in ballObj.count">
							{{void (balls =  ballObj['formartMsg'][index][index].split(''))}}
							<view v-for="text in balls" class="dan"
								:style="{background:`${ballObj['formartMsg'][index]['col']}`}">{{ text }}</view>
							<view class="count">{{ item }}</view>
						</view>
					</view>
					<scroll-view scroll-y class="show-chart">
						<view class="show-chart-content">
							<view class="left">
								<view :class="currentType === index ? 'game-type-item active' : 'game-type-item'"
									v-for="(item,index) in gameObj.data" @click="getPlayBall(item,index)">
									<view v-for="(i,k) in item.menuTxt" class="type-name-item">
										<!--                      :style="{background:item['formartMsg'][i]['col']}"-->
										{{void (color=item['formartMsg'][i]?item['formartMsg'][i]['col']:(k%2==0?'#EC3232':'#1592FF'))}}
										{{void ( isActive= currentType === index )}}

										<view class="name" v-for="(c,l) in i.split('')"
											:style="{color:`${isActive?'#ffffff':color}`,  background: `${isActive?color:''}`,border:`${!isActive?('1px solid '+ color):''}`}"
											:play="i">{{ c }}</view>
									</view>
								</view>
							</view>
							<scroll-view scroll-x class="right" :enable-flex="true">
								<view class="col-list-item">
									<view class="col-flex">
										<view v-for="(i,k) in drawRowIndexList" class="box">
											<image v-if="k === 0"
												:src="require('./../../../static/img/changlong/mark.png')" mode="">
											</image>
										</view>
									</view>


									<view class="col-list-item"></view>
								</view>
								<view class="col-list-item" v-for="(ballGroup,index) in ballList">
									<view class="col-flex">
										<view v-for="(i,k) in drawRowIndexList" class="box">
											<template v-if="ballGroup.length>i">
												{{void (drawPlayCode = ballGroup[i])}}
												<view class="ball"
													:style="{background:ballObj.formartMsg[drawPlayCode]['col']}">
													<!--                        <span class="ball-text">{{ballObj.formartMsg[drawPlayCode][drawPlayCode]}}</span>-->
												</view>
											</template>

										</view>
									</view>

									<view class="col-list-item">

									</view>
								</view>
								<view class="col-list-item">
									<view class="col-flex">
										<view v-for="(i,k) in drawRowIndexList" class="box">


										</view>
									</view>
									<view class="col-list-item"></view>
								</view>
							</scroll-view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="rank">
				<view class="rank-header">
					<view
						:class="[currentRankFlag === 0 ? 'rank-header-item active' : 'rank-header-item','theme-' + themeColor.name]"
						@click="onChangeRank(0)">
						<view class="rank-header-text">长龙排行</view>
						<view class="under-line"></view>
					</view>
					<view
						:class="[currentRankFlag === 1 ? 'rank-header-item active' : 'rank-header-item','theme-' + themeColor.name]"
						@click="onChangeRank(1)">
						<view class="rank-header-text">遗漏排行</view>
						<view class="under-line"></view>
					</view>
				</view>
				<scroll-view scroll-y class="rank-list">
					<view class="lists" v-if="currentRankFlag === 0">
						<view class="lists-item" v-for="(item,index) in longQueue">
							<view class="left">
								<view>{{item.playName}}</view>
								<view class="line">-</view>
								<view :style="{color:`${item.signText.col}`}">{{item.signText.name}}</view>
								<!--                  <view v-for="(i,k) in item.plays" v-if="item.sign === i.code">-->
								<!--                    {{i.name}}-->
								<!--                  </view>-->
							</view>
							<view class="right">
								<view class="periods" :style="setColor(item.periods)">{{item.periods}}</view>
								<text>期</text>
							</view>
						</view>
					</view>
					<view class="lists" v-if="currentRankFlag === 1">
						<view class="lists-item" v-for="(item,index) in omissive">
							<view class="left">
								<view>{{item.playName}}</view>
								<view class="line">-</view>
								<view :style="{color:`${item.signText.col}`}">{{item.signText.name}}</view>

								<!--                <view v-for="(i,k) in item.plays" v-if="item.sign === i.code">-->
								<!--                  {{i.name}}-->
								<!--                </view>-->
							</view>
							<view class="right">
								<view class="periods" :style="setColor(item.periods)">{{item.periods}}</view>
								<text>期</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>

	</view>
</template>
<script>
	import Header from "../../../components/common/header/index.vue";
	import {
		getTrendChart,
		getHistoryList,
		getRewardsInfo
	} from "@/utils/lottery/betting";
	import {
		websocetObj
	} from '@/utils/websocet/websocet.js';
	import Playing from "@/utils/common/playing";
	import {
		mapGetters
	} from 'pinia';
	import LiuheCmp from "./liuheCmp.vue";
	import SscCmp from "./sscCmp.vue";
	import Pk10Cmp from "./pk10Cmp.vue";
	import Lucky8Cmp from "./lucky8Cmp.vue";
	import Happy8Cmp from "./happy8Cmp.vue";
	import SelectedFiveCmp from "./selectedFiveCmp.vue";
	import KuaisanCmp from "./kuaisanCmp.vue";
	import PcEggCmp from "./pcEggCmp.vue";
	import LowRateCmp from "./lowRateCmp.vue";
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		components: {
			Header,
			LiuheCmp,
			SscCmp,
			Pk10Cmp,
			Lucky8Cmp,
			Happy8Cmp,
			SelectedFiveCmp,
			KuaisanCmp,
			PcEggCmp,
			LowRateCmp
		},
		data() {
			return {
				title: "走势图",
				playing: new Playing(),
				lotteryId: "",
				pageSize: 120,
				dataList: [],
				drawRowIndexList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				trendList: [],
				longQueue: [],
				omissive: [],
				currentRankFlag: 0,
				currentTab: 0,
				currentType: 0,
				gameObj: {},
				ballList: [],
				ballObj: {},
				runtimes: '',
				headInfo: {},
				lotteryTypeId: null
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(useSystemInfoStore, ["uWindowHeight"]),
			showRoundInfo() {
				return this.isClientRun ? this.headInfo['nextRound'] : this.headInfo;
			},
			isClientRun() {
				let roundMsg = Object.assign({}, this.headInfo);
				let nextRound = roundMsg['nextRound'];
				if (nextRound) {

				}
				return !!this.headInfo && !!this.headInfo['nextRound'];
			},
		},
		onUnload() {
			// clearInterval(this.times);
			// //避免移除未銷毀頁面監聽
			// uni.$off("onGetGameInfo", this.onGetGameInfo);
		},
		onLoad(option) {
			this.lotteryId = option.id;
			this.$store.dispatch("updateUserBalanceFromServer")
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.loadingTrendData();
			this.historyLists();
			this.getHeadInfo();
			// uni.$on("onGetGameInfo", this.onGetGameInfo);
			// //如果当前页刷新大概率websocket未连接成功
			// this.doCommitUpdateEventBySocket();
			// //兼容上方逻辑
			// //如果内存中记录有来源游戏id为-1 则赋值 ，app.vue中 检测到网络状态为-1且网络状态变化会重新触发刷新游戏逻辑
			// if (this.inLotteryId == -1) {
			//   this.$store.commit("SET_LOTTERY_STORE_LOTTERY_ID", option.id)
			// }
		},
		mounted() {
			uni.$emit("on_page_mounted", this)

			this.windowHeight = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			onGetGameInfo(resultInfo) {
				console.warn("onGetGameInfo-------------- cartvue");
				this.doUpdateHeaderInfoFromSocket(resultInfo.data)
			},
			loadingTrendData() {
				getTrendChart({
					lotteryId: Number(this.lotteryId)
				}).then(res => {
					if (res.code === 200) {
						this.trendList = this.buildTrendListItemLocalMessages(res.result.trendList);
						this.longQueue = this.buildLongQueueMsg(res.result.longQueue);
						this.omissive = this.buildOmissiveMsg(res.result.omissive);
						this.getItemData(this.trendList[0], 0);
						this.getPlayBall(this.trendList[0].data[0], 0)
					}
				})
			},
			buildTrendListItemLocalMessages(trendList) {
				for (let playListIndex in trendList) {
					let infos = trendList[playListIndex];
					if (infos && (infos.data instanceof Array)) {
						infos.data.forEach((chartItem) => {
							let localMsgMap = {};
							for (let playcode in chartItem.count) {
								localMsgMap[playcode] = {};
								for (let titleTextIndex in chartItem.titleTxt) {
									let titleTxtItem = chartItem.titleTxt[titleTextIndex];
									if (titleTxtItem[playcode] !== undefined) {
										localMsgMap[playcode] = Object.assign({}, titleTxtItem);
										let stringText = titleTxtItem[playcode];
										localMsgMap[stringText] = Object.assign({}, titleTxtItem);
									}
								}
							}
							chartItem['formartMsg'] = localMsgMap;
						})
					}
				}
				return trendList;
			},


			buildLongQueueMsg(longQueue) {
				for (let lqIndex in longQueue) {
					let lqItem = longQueue[lqIndex];
					let lqSign = lqItem.sign;
					let signText = {};
					lqItem.titleTxt.forEach(i => {
						if (i[lqSign]) {
							signText = Object.assign({}, i);
							let name = signText[lqSign];
							signText['name'] = name;
						}
					});
					lqItem.signText = signText;
				}
				return longQueue;
			},
			buildOmissiveMsg(omissive) {
				for (let omIndex in omissive) {
					let omItem = omissive[omIndex];
					let lqSign = omItem.sign;
					let signText = {};
					omItem.titleTxt.forEach(i => {
						if (i[lqSign]) {
							signText = Object.assign({}, i);
							let name = signText[lqSign];
							signText['name'] = name;
						}
					});
					omItem.signText = signText;
				}
				return omissive;
			},


			historyLists() {
				let prams = {
					'pageSize': this.pageSize
				};
				prams.lotteryId = this.lotteryId
				getHistoryList(prams).then(res => {
					if (res.code == 200) {
						this.dataList = res.result
					}
				}).catch(err => {
					console.log(err)
				})
			},

			getItemData(item, index) {
				this.gameObj = item;
				this.currentTab = index;
				this.getPlayBall(item.data[0], 0);
			},
			onChangeRank(key) {
				this.currentRankFlag = key;
			},
			getPlayBall(item, index) {
				// item.titleTxt.forEach(l=>{
				//   for (let i in item.count){
				//     l.count = item.count[i];
				//     l.name = l[i];
				//   }
				// })
				//
				this.ballObj = item;
				this.currentType = index;
				this.ballList = item.list;
			},
			//获取头部开奖信息
			getHeadInfo() {
				getRewardsInfo({
					lotteryId: this.lotteryId
				}).then(res => {
					this.lotteryTypeId = res.result.lotteryTypeId
					this.headInfo = res.result;
					// this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
					this.isClosing = res.result.stampType === 3;
				})
			},
			doCommitUpdateEventBySocket() {
				let socketInitStruct = {
					event: "getGameInfo",
					lotteryId: this.lotteryId
				};
				websocetObj.sendMsg(socketInitStruct);
			},
			doUpdateHeaderInfoFromSocket(content) {
				this.headInfo = content;
				this.setRewardsTimeOut();
			},
			setRewardsTimeOut() {

				let time = this.showRoundInfo.closeTimeStamp; // this.headInfo.closeTimeStamp
				let isClientRun = this.isClientRun;
				let _this = this;
				this.runtimes = this.playing.timestampToDate(time);
				//调用清理定时器 避免多域执行 保证单任务
				clearInterval(this.times);
				let roundTime = 0;
				let lastTimerDate = Date.now();
				var sendCondRun = function(useSecend) {
					time -= useSecend;
					//避免出现-1的情况
					_this.runtimes = _this.playing.timestampToDate(time < 0 ? 0 : time);
					if (time < 0 || time === 0) {
						clearInterval(_this.times);
						_this.doCommitUpdateEventBySocket();
						return;
					}
					if (_this.headInfo && Date.now() >= _this.headInfo.nextTime) {
						clearInterval(_this.times);
						_this.doCommitUpdateEventBySocket();
						return;
					}
					if (isClientRun) {
						clearInterval(_this.times);
						_this.doCommitUpdateEventBySocket();
					}
				}
				this.times = setInterval(() => {
					let nowDate = Date.now();
					let frameTime = nowDate - lastTimerDate;
					roundTime += frameTime;
					lastTimerDate = nowDate;
					if (roundTime > 1000) {
						roundTime = roundTime % 1000; //取出余数 经历精准
						sendCondRun(Math.ceil(roundTime / 1000));
					}
				}, 100);
			},
			setColor(num) {
				if (Number(num) > 6) {
					return {
						color: "#EC3232"
					}
				} else if (Number(num) < 6) {
					return {
						color: "#404040"
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.trend-chart {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #F4F4F4;

		.trend-chart-content {
			background-color: #FFFFFF;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;
			//flex: 1;
			//height: 0;

			.calendar {
				padding-top: 20rpx;

				.header {
					text-align: center;
					color: #404040;
					font-family: 'MiSans';
					font-size: 34rpx;
					font-weight: 400;
					padding: 20rpx 0;

					text {
						color: var(--theme-color)
					}

					.time {
						margin-left: 20rpx;
						color: #EC3232;
						font-family: 'MiSans';
						font-size: 34rpx;
						font-weight: 400;
					}
				}

				.calendar-content {
					padding: 0 28rpx;

					.calendar-content-header {
						background: #F4F4F4;
						display: flex;
						padding: 10rpx 0;
						justify-content: space-between;
						align-items: center;

						.period {
							width: 140rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #404040;
							font-family: 'MiSans';
							font-size: 28rpx;
							font-weight: 400;
							flex: 0 0 auto;
						}

						.num-list {
							display: flex;

							.num-item {
								width: 72rpx;
								flex: 1;
								display: flex;
								justify-content: center;
								align-items: center;
								color: #404040;
								font-family: 'MiSans';
								font-size: 28rpx;
								font-weight: 400;
							}
						}

						.special {
							width: 140rpx;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							margin-right: 8rpx;
							color: #404040;
							font-family: 'MiSans';
							font-size: 28rpx;
							font-weight: 400;
						}
					}

					.record-list {
						height: 496rpx;

						.record-list-item {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 10rpx 0;

							.left {
								width: 140rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								color: #404040;
								font-family: 'Roboto';
								font-size: 28rpx;
								font-weight: 400;
								flex: 0 0 auto;
							}

							.center {
								display: flex;

								.center-item {
									width: 72rpx;
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
									color: #404040;
									font-family: 'MiSans';
									font-size: 28rpx;
									font-weight: 400;

									.shengxiao {
										color: #404040;
										font-family: 'MiSans';
										font-size: 28rpx;
										font-weight: 400;
									}
								}
							}

							.add {
								width: 66px;
								display: flex;
								justify-content: center;
								height: 90rpx;
								align-items: start;
								position: relative;
								top: 10rpx;
							}

							.right {
								width: 132rpx;
								display: flex;
								align-items: center;
								justify-content: end;
								margin-right: 16rpx;
								color: #404040;
								font-family: 'MiSans';
								font-size: 28rpx;
								font-weight: 400;
							}
						}

						.record-list-item.gray {
							background: #FAFAFA;
						}
					}
				}
			}

			.play-chart {
				padding: 0 28rpx;
				margin-top: 20rpx;

				.play-tabs {
					display: flex;
					//grid-template-columns: 150rpx 150rpx 150rpx 150rpx 150rpx;
					flex-direction: row;
					flex-wrap: wrap;

					.play-tabs-item {
						width: 20%;
						margin-bottom: 32rpx;
						color: #404040;
						text-align: center;
						font-family: 'MiSans';
						font-size: 28rpx;
						font-weight: 400;

						.underline {
							display: none;
						}
					}

					.play-tabs-item.active {
						color: var(--theme-color);
						text-align: center;
						font-family: 'MiSans';
						font-size: 30rpx;
						font-weight: 500;
						margin-bottom: 10rpx;

						.underline {
							display: block;
							width: 36rpx;
							height: 6rpx;
							border-radius: 6rpx;
							background: var(--theme-color);
							margin: 0 auto;
						}
					}
				}

				.checking-chart {
					.danshuang {
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 20rpx 0;
						width: 80%;
						margin: 0 auto;

						.danshuang-box {
							display: flex;
							align-items: center;
							//margin: 0 30rpx;
							justify-content: center;
							flex: 1;

							.dan {
								display: flex;
								width: 48rpx;
								height: 48rpx;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								border-radius: 50%;
								background: var(--theme-auxiliary-color-remind);
								color: #FFF;
								font-family: 'MiSans';
								font-size: 30rpx;
								font-weight: 400;
								margin-right: 20rpx;
							}

							.shuang {
								display: flex;
								width: 48rpx;
								height: 48rpx;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								border-radius: 50%;
								background: var(--theme-color);
								color: #FFF;
								font-family: 'MiSans';
								font-size: 30rpx;
								font-weight: 400;
								margin-right: 20rpx;
							}

							.count {
								color: #404040;
								font-family: 'MiSans';
								font-size: 34rpx;
								font-weight: 400;
							}
						}
					}

					.show-chart {
						height: 448rpx;
						box-sizing: border-box;

						.show-chart-content {
							display: flex;
							flex-direction: row;
							width: 100%;
							height: 100%;

							.left {
								flex-direction: column;
								display: flex;
								align-items: center;
								justify-content: center;
								//height: 100%;

								.game-type-item {
									flex: 1;
									height: 0;
									display: flex;
									align-items: center;
									justify-content: space-evenly;
									width: 190rpx;
									//height: 88rpx;
									border: 1rpx solid #F4F4F4;
									box-sizing: border-box;

									.type-name-item {
										display: flex;

										.name {
											display: flex;
											width: 40rpx;
											height: 40rpx;
											line-height: 40rpx;
											justify-content: center;
											align-items: center;
											gap: 20rpx;
											border-radius: 50%;
											font-size: 24rpx;
											color: white;
										}
									}
								}

								.game-type-item.active {
									background: #F4F4F4;
								}
							}

							.right {
								display: flex;
								flex-direction: row;
								white-space: nowrap;
								//height: 100%;
								box-sizing: border-box;
								flex: 1;
								// padding-right: 30rpx;
								width: calc(100% - 232rpx);

								.col-list-item {
									display: inline-block;
									width: 44rpx;
									//overflow: hidden;
									height: 100%;

									.col-flex {
										display: flex;
										flex-direction: column;
										height: 100%;

										.box {
											display: flex;
											width: 44rpx;
											height: 44rpx;
											flex-direction: column;
											justify-content: center;
											align-items: center;
											border: 1rpx solid #F4F4F4;
											box-sizing: border-box;
											flex: 1;

											image {
												height: 24rpx;
												width: 24rpx;
											}

											.ball {
												width: 24rpx;
												height: 24rpx;
												background-color: var(--theme-color);
												border-radius: 50%;
												position: relative;

												.ball-text {
													font-size: 20rpx;
													line-height: 24rpx;
													width: 24rpx;
													text-align: center;
													color: white;
													position: absolute;
													top: 0rpx;
												}
											}
										}
									}

								}
							}
						}
					}
				}
			}

			.rank {
				margin-top: 20rpx;
				padding: 0 28rpx;

				.rank-header {
					display: flex;
					align-items: center;
					justify-content: center;

					.rank-header-item {
						margin: 0 50rpx;
						color: #404040;
						text-align: center;
						font-family: 'MiSans';
						font-size: 28rpx;
						font-weight: 400;

						.rank-header-text {
							margin-bottom: 10rpx;
						}

						.under-line {
							display: none;
						}
					}

					.rank-header-item.active {
						color: var(--theme-color);
						text-align: center;
						font-family: 'MiSans';
						font-size: 30rpx;
						font-weight: 500;

						//margin-bottom: 10rpx;
						.under-line {
							display: block;
							width: 36rpx;
							height: 6rpx;
							border-radius: 6rpx;
							background: var(--theme-color);
							margin: 0 auto;
						}
					}
				}

				.rank-list {
					// height: 524rpx;

					.lists {
						.lists-item {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 28rpx 0;
							border-bottom: 2rpx solid #F4F4F4;

							.left {
								display: flex;
								justify-content: space-between;
								width: 200rpx;
								color: #404040;
								text-align: center;
								font-family: 'MiSans';
								font-size: 30rpx;
								font-weight: 400;

								.line {
									width: 40rpx;
									display: flex;
									flex: 1;
									justify-content: center;
								}
							}

							.right {
								color: var(--theme-auxiliary-color-remind);
								text-align: center;
								font-family: 'MiSans';
								font-size: 30rpx;
								font-weight: 400;
								display: flex;

								.periods {
									text-align: center;
									font-family: 'MiSans';
									font-size: 30rpx;
									font-style: normal;
									font-weight: 400;
								}

								text {
									color: #404040;
									font-family: 'MiSans';
									font-size: 30rpx;
									font-weight: 400;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
