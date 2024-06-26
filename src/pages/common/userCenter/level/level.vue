<template>
	<view class="user-level" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!-- 		<NavBar :title="title">
			<view slot="right" class="right-text" @click="toMyLevel">
				{{ $t('pages.common.userCenter.level.level.MyGrowthValue') }}</view>
		</NavBar> -->
		<Header :title="title" :isFixed="true">
			<block slot="right">
				<view class="tip_block" style="text-align: right;">
					<view class="right-text" @click="toMyLevel">
						{{ $t('pages.common.userCenter.level.level.MyGrowthValue') }}
					</view>
				</view>
			</block>
		</Header>
		<uni-popup ref="popup" type="center">
			<view class="buy-block">
				<image src="/static/img/buy-level.png" mode=""></image>
				<view class="btn-group">
					<view class="" @click="chargeVip">

					</view>
					<view class="" @click="chargeVip">

					</view>
				</view>
			</view>
			<!-- <view class="block">
				<view class="t-b"><text>{{ $t('pages.common.userCenter.level.level.VIPPrivileges') }}</text></view>
				<view class="text">
					<view style="color: rgb(255, 69, 69);">
						1.{{ $t('pages.common.userCenter.level.level.NicknameInRed') }}
					</view>
					<view style="color: rgb(161, 80, 12);">
						2.{{ $t('pages.common.userCenter.level.level.ViewExpertStats') }}
					</view>
					<view style="color: rgb(161, 80, 12);">
						3.{{ $t('pages.common.userCenter.level.level.DoubleRewardsForGrowthValue') }}</view>
					<view style="color: rgb(161, 80, 12);">4.{{ $t('pages.common.userCenter.level.level.PurchaseYearlyVIP')
					}}
					</view>
				</view>
				<view class="l-r-btn">
					<text @click="chargeVip">{{ $t('pages.common.userCenter.level.level.January10Yuan')
				}}</text>
					<text @click="chargeVip">
						{{ $t('pages.common.userCenter.level.level.OneYear100Yuan')}}
					</text>
				</view>
				<view class="close"><i class="van-icon van-icon-close" style="font-size: 32px;">
					</i></view>
			</view> -->
		</uni-popup>
		<!--		<view class="tab-div-bg" style="height:40rpx" v-if="!isTop" />-->
		<!--		<view class="tab-div-radius" v-if="!isTop" />-->
		<scroll-view @scroll="scroll" scroll-y="true" class="content" :enhanced="true" :bounces="false"
			:show-scrollbar="false"
			:style="{height: isApp?`calc(${uWindowHeight}px - 108rpx)`:'calc(var(--vh) - 110rpx)'}">
			<view class="level-wrap">

				<view class="table-wrap">
					<view class="top-notice clearfix">
						<text>
							{{ $t('pages.common.userCenter.level.level.CurrentLevel') }}{{searchSection(score)}}

						</text>
						<text class="czz">{{ $t('pages.common.userCenter.level.level.GrowthValue') }}{{ score }}</text>
					</view>
					<!-- <view class="title">{{ $t('pages.common.userCenter.level.level.UserLevelList') }}</view> -->
					<view class="table-data">
						<view class="table-data-th">
							<view class="table-data-th-td">
								{{ $t('pages.common.userCenter.level.level.UserLevel')}}
							</view>
							<view class="table-data-th-td">
								{{ $t('pages.common.userCenter.level.level.LevelMedal')}}
							</view>
							<view class="table-data-th-td">
								{{$t('pages.common.userCenter.level.level.RequiredGrowthValue') }}
							</view>
						</view>
						<view class="table-data-tr" v-for="(item, index) in list" :key="index">
							<view class="table-data-tr-td">
								{{ item.name }}
							</view>
							<view class="table-data-tr-td">
								<image :src="item.pictureUrl" mode="widthFix" />
							</view>
							<view class="table-data-tr-td">
								{{ item.score }}
							</view>
						</view>
					</view>

					<!-- 	<view class="table">
					<uni-table border stripe emptyText="暂无更多数据">

						<uni-tr>
							<uni-th align="center" width="105">{{ $t('pages.common.userCenter.level.level.UserLevel')
							}}</uni-th>
							<uni-th align="center" width="105">{{ $t('pages.common.userCenter.level.level.LevelMedal')
							}}</uni-th>
							<uni-th align="center" width="105">{{
								$t('pages.common.userCenter.level.level.RequiredGrowthValue') }}</uni-th>
						</uni-tr>

						<uni-tr v-for="(item, index) in list" :key="index">
							<uni-td align="center">{{ item.name }}</uni-td>
							<uni-td align="center">
								<image :src="item.pictureUrl" mode="widthFix" />
							</uni-td>
							<uni-td align="center">{{ item.score }}</uni-td>
						</uni-tr>
					</uni-table>
				</view> -->

				</view>

				<view class="shuom">
					<view class="how-get">
						{{ $t('pages.common.userCenter.level.level.HowToGetGrowthValue') }}
					</view>
					<view class="how-get-line">

					</view>
					<view class="get-list">
						<view>1.{{ $t('pages.common.userCenter.level.level.ShareWithFriends') }}</view>
						<view>2.{{ $t('pages.common.userCenter.level.level.InviteeShares') }}</view>
						<view>3.{{ $t('pages.common.userCenter.level.level.Posting') }}</view>
						<view>4.{{ $t('pages.common.userCenter.level.level.Replying') }}</view>
						<view>5.{{ $t('pages.common.userCenter.level.level.Liking') }}</view>
						<view>6.{{ $t('pages.common.userCenter.level.level.BuyVIP') }}<text class="buy"
								@click="toBuy">{{
						$t('pages.common.userCenter.level.level.GoToPurchase') }}</text></view>
					</view>
					<view class="how-get" style="margin-top: 34rpx;">
						{{ $t('pages.common.userCenter.level.level.WhatAreTheBenefits') }}
					</view>
					<view class="how-get-line">

					</view>
					<view class="get-list">
						<view>1.{{ $t('pages.common.userCenter.level.level.HigherLevelsMoreMedals') }}</view>
						<view>2.{{ $t('pages.common.userCenter.level.level.AcceptingTips') }}</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		myScore,
		userLevelList
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import Header from "@/components/common/header/index";
	export default {
		name: "level",
		components: {
			AlertInjectLayer,
			NavBar,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.level.level.UserLevels'),
				score: 0,
				list: [],
				isTop: false,
				isApp: false
			}
		},
		mounted() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		onLoad() {
			this.getUserLevelList()
			myScore().then(res => {
				this.score = res.result.score
			})
		},
		methods: {
			scroll(e) {
				this.isTop = (e.detail.scrollTop == 0)

			},
			//获取用户等级列表
			getUserLevelList() {
				userLevelList().then(res => {
					if (res.code == 200) {
						this.list = res.result
					}
				})
			},
			searchSection(val) {
				let result = [];
				for (let item of this.list) {
					if (val >= item.score) {
						result.push(item);
					}
				}
				return result.length ? result[result.length - 1].name : this.$t(
					"pages.common.userCenter.level.level.CurrentLevelName");
			},
			toMyLevel() {
				uni.navigateTo({
					url: "/pages/common/userCenter/level/myLevel"
				})
			},
			toBuy() {
				this.$refs.popup.open()
			},
			chargeVip() {
				this.$refs.popup.close()
				uni.showToast({
					title: this.$t('pages.common.userCenter.level.level.MustExchangeToPurchaseVIP'),
					icon: "none"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab-div-radius {
		background-color: #fff;
		height: 20rpx;
		width: 100%;
		position: fixed;
		top: 108rpx;
		z-index: 12;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;

	}

	::v-deep .tab-div-bg {
		border-radius: 0;
		z-index: 11;
	}

	.buy-block {
		position: relative;

		image {
			width: 562rpx;
			height: 718rpx;
		}

		.btn-group {
			display: flex;
			justify-content: space-between;
			position: absolute;
			bottom: 68rpx;
			left: 28rpx;

			view {
				width: 250rpx;
				height: 88rpx;
			}
		}
	}

	.user-level {

		.content {
			margin-top: 20rpx;
			border-radius: 24rpx 24rpx 0 0;
			overflow: hidden;

		}

		.block {
			width: 580rpx;
			height: 580rpx;
			background-image: url(@/static/img/user/vipImg.png);
			background-size: 100% 100%;
			position: relative;

			.t-b {
				position: absolute;
				right: 86rpx;
				top: 180rpx;

				text {
					width: 132rpx;
					height: 60rpx;
					background: #a1500c;
					border-radius: 30rpx;
					color: #fee2c7;
					text-align: center;
					line-height: 60rpx;
					display: inline-block;
					font-weight: 600;
				}
			}

			.text {
				position: absolute;
				font-size: 24rpx;
				top: 180rpx;
				margin-left: 106rpx;
				line-height: 44rpx;
			}

			.l-r-btn {
				position: absolute;
				bottom: 40rpx;
				width: 100%;
				text-align: center;

				text {
					width: 200rpx;
					height: 84rpx;
					background: #ffe2c6;
					border-radius: 42rpx;
					border: 0.02rem solid #979797;
					color: #a1500c;
					font-size: 32rpx;
					line-height: 84rpx;
					display: inline-block;
					margin-left: 40rpx;
				}
			}

			.close {
				text-align: center;
				font-size: 24rpx;
				color: #a9a9a9;
				position: absolute;
				bottom: -100rpx;
				left: 50%;
				margin-left: -32rpx;
			}
		}

		.right-text {
			color: var(--theme-color);
			font-size: 28rpx;
		}

		.level-wrap {
			position: relative;

			.top-notice {
				background: var(--theme-auxiliary-color-default);
				border-radius: 24rpx;
				color: #404040;
				font-size: 28rpx;
				padding: 10px;
				justify-content: space-between;
				align-items: center;
				display: flex;

				text {
					color: #404040;
					font-feature-settings: 'clig' off, 'liga' off;

					font-size: 30rpx;
					font-weight: 400;
				}

			}

			.shuom {
				background: #fff;
				border-radius: 24rpx 24rpx 0 0;
				margin-top: 20rpx;
				padding: 0 30rpx 20rpx;

				.how-get {
					padding: 20rpx 0;
					color: #404040;

					font-size: 30rpx;
					font-style: normal;
					font-weight: 500;
					line-height: normal;
				}

				.how-get-line {
					width: 694rpx;
					border-top: 1px solid var(--theme-auxiliary-color-default);
					margin-left: auto;
					margin-right: auto;
				}

				.get-list {
					view {
						margin-top: 20rpx;
						color: #404040;

						font-size: 28rpx;
						font-weight: 400;
						line-height: 20px;

						text {
							color: var(--theme-color);

							font-weight: 400;
						}

						/* 142.857% */
					}
				}
			}

			.table-wrap {
				background: #fff;
				text-align: center;
				padding: 20rpx 30rpx;
				border-radius: 24rpx;

				.title {
					padding: 24rpx;
				}

				.table {
					border-collapse: collapse;
					width: 100%;
					margin-bottom: 46rpx;
					margin-top: 20rpx;


					image {
						width: 44rpx;
					}
				}

				.table-data {
					width: 100%;
					border-radius: 24rpx;
					overflow: hidden;
					margin-top: 20rpx;
					border: 1px solid #eee;

					.table-data-th {
						background-color: var(--theme-color);
						display: flex;

						.table-data-th-td {
							display: flex;
							width: 230rpx;
							height: 96rpx;
							justify-content: center;
							align-items: center;

							color: #FFF;
							text-align: center;

							font-size: 30rpx;
							font-weight: 500;
						}
					}

					.table-data-tr {
						display: flex;
						border-bottom: 1px solid #eee;

						&:last-child {
							border: none;
						}

						.table-data-tr-td {
							display: flex;
							width: 230rpx;
							height: 88rpx;

							justify-content: center;
							align-items: center;

							color: #404040;

							font-size: 28rpx;
							font-weight: 400;
							border-right: 1px solid #eee;

							image {
								width: 44rpx;
							}

							&:last-child {
								border: none;
							}
						}
					}
				}

				.how-get {
					text-align: left;
					color: #404040;
					font-size: 32rpx;
					margin-bottom: 18rpx;
				}

				.get-list {
					color: #666;
					font-size: 28rpx;
					line-height: 40rpx;
					text-align: left;
					margin-bottom: 30rpx;

					.buy {
						color: var(--theme-color);
					}
				}
			}

		}


	}
</style>
