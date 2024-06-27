<template>
	<view class="detail pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{ position: `fixed`, height:`${uWindowHeight}px`, marginTop: safeHeight,width:'100%'  }">
		<Header :title="title">
			<block slot="right">
				<view class="lin-btn" @click="toLog">
					{{ $t('pages.liuhe.activity.detail.ClaimRecords') }}
				</view>
			</block>
		</Header>
		<scroll-view scroll-y class="scroll-y" :style="{height:`calc(${uWindowHeight}px - ${isApp?88:88}rpx)`}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="tab-div-bg"></view>
			<view class="table-box" v-if="info.type == 2">
				<view class="td-box td-box1">
					<view class="text">{{ info.taskTypeVo2.name }}</view>
					<u-line color="#fff" direction="col" length="24" :hair-line="false" />
					<view class="text">{{ $t('pages.liuhe.activity.detail.ExtraRewards') }}</view>
				</view>
				<view class="td-box" v-for="(item, index) in info.taskTypeVo2.rules">
					<view class="text">{{ item.dec }}</view>
					<u-line :color="themeColor.themeAuxiliaryColorDefault" direction="col" :hair-line="false" />
					<view class="coin">{{ item.rewardMoney }}</view>
				</view>
			</view>
			<view class="task-box" v-if="info.type == 1">
				<view class="task-item" v-for="(item, index) in  info.taskTypeVo1 ">
					<view class="label">{{ typeList(item.type) }}</view>
					<view class="left">
						<view class="title">
							{{ item.des }}
						</view>
						<view class="progress-box" :class="{ 'progress-yuan': getProgress(item) > 10 }">
							<liu-progressbar :progress="getProgress(item)" :bgColor="themeColor.themeColor"
								:dsColor="themeColor.themeAuxiliaryColorDefault" color="#404040" fontSize="20rpx"
								:height="'32rpx'" :borderRadius="'32rpx'" />
						</view>
					</view>
					<view class="right">
						<view class="btn">
							<image v-if="item.status == 2" src="@/static/img/liuhe/activity/ylq2.png"></image>
							<image v-else-if="getProgress(item) >= 100" @click="getReceive(item)"
								src="@/static/imgs-liuhe/activity/lqbtn.png">
							</image>
							<view v-else class="btn-go" @click="goUrl(item)">
								前往
							</view>
							<!-- <image v-else @click="goUrl(item)" src="@/static/imgs-liuhe/activity/go-btn.png"></image> -->
						</view>
						<view class="coin">
							<text class="coin-text">¥{{ item.rewardMoney }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="detail-box" v-show="info.content">
				<mp-html :content="replaceContentChar(info.content)" />
			</view>
			<view class="footer-btn">
				<view class="btn-box" v-if="info.type == 2">
					<view class="back" @click="backPre">
						{{ $t('pages.liuhe.activity.detail.Back') }}
					</view>
					<view class="sq-btn" v-if="info.sector === 0" @click="getApply">
						{{ $t('pages.liuhe.activity.detail.Apply') }}
					</view>

					<view class="sq-btn dis-btn" v-else>
						{{ $t('pages.liuhe.activity.detail.Apply') }}
					</view>
				</view>
				<view class="btn-box" v-if="info.type == 1">
					<view class="back" @click="backPre">
						{{ $t('pages.liuhe.activity.detail.Back') }}
					</view>
					<view class="sq-btn" v-if="isLq" @click="getReceive(null)">
						{{ $t('pages.liuhe.activity.detail.ClaimAll') }}
					</view>
					<view class="sq-btn dis-btn" v-else>
						{{ $t('pages.liuhe.activity.detail.ClaimAll') }}
					</view>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import {
		details,
		receive,
		apply
	} from "@/utils/activity/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import systemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "detail",
		components: {
			AlertInjectLayer,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.liuhe.activity.detail.title"),
				headerStyle: {
					borderRadius: '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040"
				},
				id: 0,
				info: {},
				reloadState: false,
				winHeight: 0,
				isApp: false

			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$t("pages.liuhe.activity.detail.title")
			})
			this.id = option.id
			this.getInfo()
		},
		onShow() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			if (this.reloadState) {
				this.getInfo()
			}
		},

		computed: {
			...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(systemInfoStore, ["uWindowHeight"]),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			isLq() {
				let status = false
				this.info.taskTypeVo1.some(item => {
					if (item.status == 1) {
						status = true
					}
				})
				return status
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			typeList(key) {
				return this.$dataFormartter.formartActivityKeyToText(key);
			},
			getProgress(item) {
				const val = (item.taskSpeed / item.taskVolume) * 100
				return val >= 100 ? 100 : parseInt(val)
			},
			backPage() {
				backPage()
			},
			toLog() {
				uni.navigateTo({
					url: "./log"
				})
			},
			getInfo() {
				let prams = {
					id: this.id
				}
        let _this=this;
				details(prams).then(res => {
          _this.$requestCache.bindLastCacheUpdateApiCallBack(res,(netResp)=>{
            if (netResp.code == 200) {
              _this.info = netResp.result
              _this.title = this.info.name
              _this.reloadState = false
            }
          },this);
          if (res.code == 200) {
						this.info = res.result
						this.title = this.info.name
						this.reloadState = false
					} else {
						this.reloadState = true
						// pop(res.message, 2000)
					}
				}).catch(err => {})
			},
			backPre() {
				backPage()
			},
			goUrl(item) {
				let url = '';
				if (this.info.jumpType == 1) {
					url = "/pages/common/pay/index"
				} else if (this.info.jumpType == 2) {
					url = ""
				} else {
					const urlMap = {
						ALL: "/pages/liuhe/home/index",
						LIUHE: "/pages/liuhe/indexNew"
					}
					uni.switchTab({
						url: urlMap[this.$config.station]
					});
					return
				}
				uni.navigateTo({
					url: url
				})
			},
			getApply() {
				let prams = {
					taskId: this.info.taskId,
					activityId: this.id
				}
				apply(prams).then(res => {
					if (res.code == 200) {
						pop(this.$t('pages.liuhe.activity.detail.ApplicationSuccess'), 2000)
						this.getInfo()
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getReceive(item = null) {
				let prams = {
					ruleId: 0,
					taskId: this.info.taskId
				}
				if (item !== null) {
					prams.ruleId = item.ruleId
				}
				uni.showLoading({mask: true})
				receive(prams).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						uni.$emit('getPop')
						pop(this.$t('pages.liuhe.activity.detail.ReceiveSuccess'), 2000)
						this.getInfo()
						this.$store.dispatch("updateUserBalanceFromServer");
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
      replaceContentChar(content){
        if(!content) return content;
        return content.replaceAll(' ','');
      }
		},
	}
</script>

<style lang="scss" scoped>
	.detail {

		background: var(--theme-auxiliary-color-default);
		min-height: 100vh;

		.lin-btn {
			font-weight: 400;
			font-size: 28rpx;
			color: #404040;
			text-align: right;
		}

		.table-box {
			margin: 20rpx;
			background: #FCFBF9;
			border-radius: 16rpx;
			overflow: hidden;

			.td-box {
				height: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 400;
				font-size: 28rpx;
				color: #404040;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				.text {
					width: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.coin {
					width: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: var(--theme-auxiliary-color-remind);
				}

				&:nth-child(2n) {
					background: #FFF;
				}
			}

			.td-box1 {
				background: var(--theme-color);
				height: 88rpx;
				color: #fff;
			}
		}

		.task-box {
			margin: 28rpx;

			.task-item {
				padding: 30rpx 20rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				background: #FFFFFF;
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
					}

					.progress-box {
						width: 428rpx;
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
						}
					}

					.btn-go {
						height: 46rpx;
						width: 136rpx;
						border-radius: 10rpx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						background: var(--theme-color);
						font-size: 24rpx;
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

		.detail-box {
			margin: 20rpx 28rpx 20rpx 28rpx;
			padding: 20rpx;
			background: #FFFFFF;
			border-radius: 24rpx;

			.title {
				font-weight: 500;
				font-size: 28rpx;
				color: #03536E;
				opacity: 0.9;
			}

			.desc-body-box {
				margin-top: 10rpx;
				font-weight: 400;
				font-size: 28rpx;
				line-height: 39rpx;
				color: #444444;
			}
		}

		.footer-btn {
			// height: 128rpx;
			height: calc(var(--safe-area-inset-bottom) + 128rpx);

			.btn-box {
				position: fixed;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: calc(var(--safe-area-inset-bottom) + 128rpx);
				max-width: 480px;
				background: #ffffff;
				z-index: 1;
				padding: 20rpx 28rpx;
				box-sizing: border-box;
				padding-bottom: var(--safe-area-inset-bottom);

				.back,
				.sq-btn {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 336rpx;
					height: 88rpx;
					border-radius: 18rpx;
				}

				.back {
					color: var(--theme-color);
					border: 1px solid var(--theme-color);
				}

				.sq-btn {
					color: #fff;
					background: var(--theme-color);
				}

				.dis-btn {
					background: #CFCFCF;
				}
			}
		}
	}


	::v-deep .input-view {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	::v-deep .header {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;
	}

	::v-deep .uni-navbar__header {
		padding: 0 28rpx;
		height: 88rpx !important;
	}
</style>
