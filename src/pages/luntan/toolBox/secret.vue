<template>
	<view class="toolbox-warp1 pc-max-width"
		:style="{position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'}"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed></Header>
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`}" :enhanced="true" :bounces="false"
			:show-scrollbar="false">
			<view class="notice-block" style="margin-top:20rpx;">
				<view class="notice-block-title">
					{{ $t('components.common.notice.notice.text0') }}
				</view>
				<view class="notice-block-content">
					{{content}}
				</view>
			</view>
			<view class="lover-body" style="">
				<!-- <notice :content="content" :styleContent="styleContent"></notice> -->
				<view class="start-btn-box">
					<view class="start-btns">
						<p>{{ $t('pages.luntan.toolBox.secret.text0') }}</p>
						<view class="start-btn" v-if="SxStr.length == 0" @click="startSx">
							{{ $t('pages.luntan.toolBox.secret.text1') }}
						</view>
						<view class="start-btn disabled" v-else>{{ SxStr }}</view>
					</view>
					<view class="start-btns">
						<p>{{ $t('pages.luntan.toolBox.secret.text2') }}</p>
						<view class="start-btn" v-if="WsStr.length == 0" @click="startWs">
							{{ $t('pages.luntan.toolBox.secret.text3') }}
						</view>
						<view class="start-btn disabled" v-else>{{ WsStr }}</view>
					</view>
				</view>
				<view class="bottom-body">
					<view class="top-ty">
						<p>
							<span v-for="(item, index) in SxArr">{{ item }}</span>
						</p>
						<p>
							<span v-for="(item, index) in WsArr">{{ item }}</span>
						</p>
					</view>
					<view class="center-ty"></view>
					<image mode="widthFix" src="@/static/img/toolbox/person.png" class="bottom-person"></image>
				</view>
			</view>
			<view class="picker-box" v-show="sxShow">
				<view class="picker">
					<picker-items ref="shengxiao" :list="firstArr" :type="1" @closeSx="closeSx"
						:prize="SxPrize"></picker-items>
				</view>
			</view>
			<view class="picker-box" v-show="wsShow">
				<view class="picker">
					<picker-items ref="weishu" :list="secondArr" :type="2" @closeSx="closeSx"
						:prize="WsPrize"></picker-items>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index.vue";
	import Notice from "@/components/common/notice/notice";
	import PickerItems from "@/components/common/picker/pickerItems";
	import {
		forecast
	} from "@/utils/toolbox/index"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "secret",
		components: {
			AlertInjectLayer,
			Header,
			Notice,
			PickerItems
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.secret.title'),
				content: this.$t('pages.luntan.toolBox.secret.content'),
				styleContent: {
					'font-size': '24rpx',
					'margin-top': '6rpx',
					'line-height': '28rpx',
					'text-align': 'left',
					'box-sizing': 'border-box',
					padding: '0 20rpx'
				},
				sxShow: false,
				SxArr: ['?', "?", "?"],
				SxStr: '',
				SxPrize: [],
				firstArr: [
					[this.$t('pages.luntan.toolBox.secret.text4'), this.$t('pages.luntan.toolBox.secret.text5'), this
						.$t('pages.luntan.toolBox.secret.text6'), this.$t('pages.luntan.toolBox.secret.text7'), this
						.$t('pages.luntan.toolBox.secret.text8'), this.$t('pages.luntan.toolBox.secret.text9'), this
						.$t('pages.luntan.toolBox.secret.text10'), this.$t('pages.luntan.toolBox.secret.text11'), this
						.$t('pages.luntan.toolBox.secret.text12'), this.$t('pages.luntan.toolBox.secret.text13'), this
						.$t('pages.luntan.toolBox.secret.text14'), this.$t('pages.luntan.toolBox.secret.text15')
					],
					[this.$t('pages.luntan.toolBox.secret.text4'), this.$t('pages.luntan.toolBox.secret.text5'), this
						.$t('pages.luntan.toolBox.secret.text6'), this.$t('pages.luntan.toolBox.secret.text7'), this
						.$t('pages.luntan.toolBox.secret.text8'), this.$t('pages.luntan.toolBox.secret.text9'), this
						.$t('pages.luntan.toolBox.secret.text10'), this.$t('pages.luntan.toolBox.secret.text11'), this
						.$t('pages.luntan.toolBox.secret.text12'), this.$t('pages.luntan.toolBox.secret.text13'), this
						.$t('pages.luntan.toolBox.secret.text14'), this.$t('pages.luntan.toolBox.secret.text15')
					],
					[this.$t('pages.luntan.toolBox.secret.text4'), this.$t('pages.luntan.toolBox.secret.text5'), this
						.$t('pages.luntan.toolBox.secret.text6'), this.$t('pages.luntan.toolBox.secret.text7'), this
						.$t('pages.luntan.toolBox.secret.text8'), this.$t('pages.luntan.toolBox.secret.text9'), this
						.$t('pages.luntan.toolBox.secret.text10'), this.$t('pages.luntan.toolBox.secret.text11'), this
						.$t('pages.luntan.toolBox.secret.text12'), this.$t('pages.luntan.toolBox.secret.text13'), this
						.$t('pages.luntan.toolBox.secret.text14'), this.$t('pages.luntan.toolBox.secret.text15')
					],
				],
				wsShow: false,
				WsArr: ['?', "?", "?"],
				WsStr: '',
				WsPrize: [],
				secondArr: [
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
				],
				visible: true,
				indicatorStyle: `height: 50px;`,
				winHeight: 0
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor'])
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			startSx() {
				this.sxShow = true
				let i;
				let firstArr = this.firstArr
				firstArr.forEach((item, index) => {
					this.SxPrize.forEach((val, key) => {
						let k = item.indexOf(val);
						item.splice(k, 1)
					})
					i = Math.floor(Math.random() * item.length)
					this.SxPrize.push(item[i])
				})
				this.$refs.shengxiao.startRoll()
			},
			startWs() {
				this.wsShow = true
				let i;
				let secondArr = this.secondArr
				secondArr.forEach((item, index) => {
					this.WsPrize.forEach((val, key) => {
						let k = item.indexOf(val);
						item.splice(k, 1)
					})
					i = Math.floor(Math.random() * item.length)
					this.WsPrize.push(item[i])
				})
				this.$refs.weishu.startRoll()
			},
			closeSx(type) {
				if (type == 1) {
					this.sxShow = false
					this.SxArr = this.SxPrize
					this.SxStr = this.SxArr.join(" ")
				} else {
					this.wsShow = false
					this.WsArr = this.WsPrize
					this.WsStr = this.WsArr.join(" ")
				}
				this.forecast(type)
			},
			forecast(type = 1) {
				let prams = {
					jpushId: Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000,
				}
				if (type == 1) {
					prams.animals = this.SxPrize.join(',')
				} else {
					prams.tailNumbers = this.WsPrize.join(',')
				}
				forecast(prams).then(res => {

				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-block {
		padding: 20rpx 28rpx;
		// margin-top: 20rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 24rpx;

		.notice-block-title {
			color: #404040;
			text-align: center;

			font-size: 30rpx;
			font-weight: 500;
		}

		.notice-block-content {
			color: #404040;
			text-align: center;

			font-size: 28rpx;
			font-weight: 400;
			margin-top: 20rpx;
		}
	}

	.toolbox-warp1 {
		display: flex;
		height: 100vh;
		flex-direction: column;
		background: var(--theme-auxiliary-color-default);

		.lover-body {
			flex: 1;
			height: 0;
			// margin-top: 12rpx;
			position: relative;
			// padding: 20rpx 24rpx;
			box-sizing: border-box;
			background: #fff;
			margin-top: 20rpx;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;

			.start-btn-box {
				display: flex;
				justify-content: space-between;
				padding: 0 58rpx;
				// margin: 148rpx 0 100rpx;
				margin-top: 60rpx;
				margin-bottom: 68rpx;

				.start-btns {
					width: 206rpx;
					text-align: center;
					font-size: 32rpx;

					p {
						color: #404040;
						text-align: center;

						font-size: 34rpx;
						font-weight: 500;
						margin-bottom: 20rpx;
					}

					.start-btn {
						// height: 78rpx;
						// line-height: 78rpx;
						// background: #e85755;
						border-radius: 12rpx;
						height: 66rpx;
						width: 196rpx;
						display: flex;
						color: #fff;
						justify-content: center;
						align-items: center;
						background-color: var(--theme-color);

						font-size: 34rpx;
						font-weight: 400;
					}


					.disabled {
						background: #d0d0d0;
					}
				}

			}

			.bottom-body {
				.top-ty {
					height: 178rpx;
					width: 346rpx;
					border-radius: 50%;
					text-align: center;
					padding-top: 32rpx;
					background: #e85755;
					box-sizing: border-box;
					margin-left: calc(50% - 40rpx);

					p {

						color: #FFF;
						text-align: center;

						font-size: 34rpx;
						// font-style: normal;
						font-weight: 500;
						// line-height: normal;

						span {
							margin-right: 16rpx;
						}
					}
				}

				.center-ty {
					width: 56rpx;
					height: 18rpx;
					border-radius: 50%;
					background: #e85755;
					margin-left: 50%;
					margin-top: 20rpx;
				}
			}

			image {
				display: block;
				width: 232rpx;
				margin-top: 40rpx;
				margin-left: calc(50% - 116rpx);
			}
		}

		.picker-box {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: transparent;
			z-index: 2;

			.picker {
				width: 60%;
				position: absolute;
				top: calc(50% - 0.9rem);
				left: 20%;
				background-image: linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .8));
				overflow: hidden;
				height: 216rpx;

				.picker-view {
					height: 216rpx;
					font-size: 48rpx;
				}
			}
		}
	}
</style>
