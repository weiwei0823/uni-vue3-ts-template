<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'}"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed>
			<template v-slot:right>
				<view class="header-right">
					<picker @change="bindPickerChange" :value="index" :range="array" v-if="year" @cancel="handlePickerCancel">
						<svg @click="iconClick" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
							viewBox="0 0 22 22" fill="none">
							<g clip-path="url(#clip0_22857_68907)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0016C7.28243 11.0016 7.48763 11.2068 7.48763 11.46V14.21C7.48763 14.4631 7.28243 14.6683 7.0293 14.6683H4.2793C4.02617 14.6683 3.82096 14.4631 3.82096 14.21V11.46C3.82096 11.2068 4.02617 11.0016 4.2793 11.0016H7.0293ZM7.0293 15.8911C7.28243 15.8911 7.48763 16.0963 7.48763 16.3494V19.0994C7.48763 19.3526 7.28243 19.5578 7.0293 19.5578H4.2793C4.02617 19.5578 3.82096 19.3526 3.82096 19.0994V16.3494C3.82096 16.0963 4.02617 15.8911 4.2793 15.8911H7.0293ZM9.7793 11.0016C9.52617 11.0016 9.32096 11.2068 9.32096 11.46V14.21C9.32096 14.4631 9.52617 14.6683 9.7793 14.6683H12.5293C12.7824 14.6683 12.9876 14.4631 12.9876 14.21V11.46C12.9876 11.2068 12.7824 11.0016 12.5293 11.0016H9.7793ZM12.5293 15.8911C12.7824 15.8911 12.9876 16.0963 12.9876 16.3494V19.0994C12.9876 19.3526 12.7824 19.5578 12.5293 19.5578H9.7793C9.52617 19.5578 9.32096 19.3526 9.32096 19.0994V16.3494C9.32096 16.0963 9.52617 15.8911 9.7793 15.8911H12.5293ZM15.2793 11.0016C15.0262 11.0016 14.821 11.2068 14.821 11.46V14.21C14.821 14.4631 15.0262 14.6683 15.2793 14.6683H18.0293C18.2824 14.6683 18.4876 14.4631 18.4876 14.21V11.46C18.4876 11.2068 18.2824 11.0016 18.0293 11.0016H15.2793ZM18.0293 15.8911C18.2824 15.8911 18.4876 16.0963 18.4876 16.3494V19.0994C18.4876 19.3526 18.2824 19.5578 18.0293 19.5578H15.2793C15.0262 19.5578 14.821 19.3526 14.821 19.0994V16.3494C14.821 16.0963 15.0262 15.8911 15.2793 15.8911H18.0293Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_22857_68907">
									<rect width="22" height="22" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</picker>
				</view>
			</template>
		</Header>

		<scroll-view scroll-y="true" v-if="!year" class="scroll-y" :style="{height:`calc( ${winHeight}px - 88rpx)`}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="silkbag-body" style="">
				<view class="title-box">
					<p class="sub-title-1">{{ $t('components.common.notice.notice.text0') }}</p>
					<view class="title">{{ content }}</view>
				</view>
				<view class="content">
					<p class="sub-title">{{ sinkBagInfo.title }}</p>
					<image mode="widthFix" src="@/static/img/toolbox/silkbag.svg"></image>
					<view v-if="isOpen" class="body-content">
						<p>{{ sinkBagInfo.content }}</p>
					</view>
				</view>
				<button v-if="!isOpen" type="primary" class="open" @click="isOpen = true">
					{{ $t('pages.luntan.toolBox.silkbag.text0') }}
				</button>
				<button type="primary" class="history" @click="goHistory">
					{{ $t('pages.luntan.toolBox.silkbag.text1') }}
				</button>
				<view class="footer-text"><text class="red">提示：</text>{{ $t('pages.luntan.toolBox.silkbag.text2') }}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y class="history-list" v-else
			:style="{height:`calc( ${winHeight}px - 150rpx)`,paddingBottom:'60rpx'}">
			<view v-if="loading" class="loading">
				<ltLoading />
			</view>
			<view class="empty" v-if="!loading && list.length <= 0">
				<empty></empty>
			</view>
			<template v-else>
				<uni-collapse v-for="(item, index) in list">
					<uni-collapse-item :showArrow="false">
						<template v-slot:title>
							<p class="history-item-title">
								<view class="text">{{ item.title }}</view>
								<svg class="svg-img" xmlns="http://www.w3.org/2000/svg" width="13" height="8"
									viewBox="0 0 13 8" fill="none">
									<path d="M12 1.25L6.5 6.75L1 1.25" stroke="#A1A1A1" stroke-width="2"
										stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</p>
						</template>
						<view class="content">
							<view class="history-item-content" style="">
								<p>{{ item.content }}</p>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</template>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import Notice from "@/components/common/notice/notice";
	import {
		sinkBag,
		listYear,
		listSinkBag
	} from '@/utils/toolbox/index';
	import Empty from '@/components/common/empty/empty'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		setPickerStyle
	} from "@/utils/common.ts";
	import {
		mapGetters
	} from 'pinia';
	import ltLoading from "@/components/common/loading/LuntanLoading.vue";
  import useAppInfoStore from "@/store/modules/appInfoStore";

	export default {
		name: "silkbag",
		components: {
			AlertInjectLayer,
			Header,
			Notice,
			Empty,
			ltLoading
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.silkbag.title'),
				content: this.$t('pages.luntan.toolBox.silkbag.content'),
				year: '',
				index: 0,
				styleContent: {
					'font-size': '24rpx',
					'margin-top': '6rpx 0 0 0',
					'line-height': '28rpx',
					'text-align': 'left',
					'box-sizing': 'border-box',
					padding: '0 20rpx'
				},
				isOpen: false,
				sinkBagInfo: {},
				array: [],
				list: [],
				loading: false,
				winHeight: 0,
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad(option) {
			this.year = option.year
			if (this.year) {
				this.listSinkBag()
			} else {
				this.sinkBag()
			}
			this.listLotteryDate()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			iconClick() {
				this.$nativeBridge.setStatusBarColor('#b2b2b2');
				setPickerStyle(this.themeColor.themeColor);
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.year = this.array[this.index]
				this.list = []
				this.listSinkBag()
				this.$nativeBridge.setStatusBarColor('#ffffff')

			},
			handlePickerCancel() {
			   this.$nativeBridge.setStatusBarColor('#ffffff')
			},
			goHistory() {
				let year = this.array[0]
				uni.navigateTo({
					url: 'silkbag?year=' + year,
				})
			},
			sinkBag() {
				sinkBag().then(res => {
					this.sinkBagInfo = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			listLotteryDate() {
				listYear().then(res => {
					this.array = res.result || []
				}).catch(err => {
					console.log(err)
				})
			},
			listSinkBag() {
				let prams = {
					jpushId: Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000,
					year: this.year,
					pageNo: 1,
					pageSize: 100
				}
				this.loading = true
				listSinkBag(prams).then(res => {
					this.list = res.result.records
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.header-right {
		text-align: right;
	}

	.scroll-y {
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.silkbag-body {
		position: relative;
		min-height: calc(var(--vh) - 55px);
		background: var(--theme-auxiliary-color-default);
		box-sizing: border-box;

		.title-box {
			padding: 20rpx 28rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #fff;
			border-radius: 24rpx;
			color: #404040;
			font-size: 28rpx;

			.sub-title-1 {
				font-size: 30rpx;
			}

			.title {
				margin-top: 20rpx;
				text-align: center;
			}
		}

		.content {
			background: #fff;
			border-radius: 24rpx;
			margin-top: 20rpx;
			padding-bottom: 40rpx;
		}

		.sub-title {
			font-size: 34rpx;
			font-weight: 600;
			color: #404040;
			padding: 20rpx 28rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);

			&::before {
				content: '';
				width: 6rpx;
				height: 24rpx;
				border-radius: 6rpx;
				margin-right: 14rpx;
				display: block;
				background: var(--theme-color);
			}
		}

		image {
			display: block;
			width: 360rpx;
			margin: 40rpx auto 0;
		}

		.body-content {
			margin-top: 40rpx;
			font-size: 34rpx;
			color: #db1f1f;
			padding: 0 28rpx;
			text-align: center;
		}

		.open {
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 16rpx;
			background: var(--theme-color);
			font-size: 34rpx;
			margin: 40rpx 28rpx 0;
		}

		.history {
			border: 2rpx solid var(--theme-color);
			background: transparent;
			color: var(--theme-color);
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 16rpx;
			font-size: 34rpx;
			margin: 40rpx 28rpx 0;
		}

		.footer-text {
			color: #404040;
			font-size: 26rpx;
			padding: 40rpx 28rpx;

			.red {
				color: var(--theme-auxiliary-color-remind);
			}
		}
	}

	.history-list {
		flex: 1;
		height: 0;
		margin-top: 20rpx;
		//position: absolute;
		//height: fit-content;
		//border-radius: 24rpx;
		//overflow: hidden;
		//top: 104rpx;
		//left: 0;
		//right: 0;
		//bottom: 0;
		//overflow-y: auto;
		background: #fff;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;

		.svg-img {
			transition: all .3s;
		}

		::v-deep .uni-collapse-item-border {
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
		}

		::v-deep .is-open .uni-collapse-item__wrap {
			height: fit-content !important;
		}

		::v-deep .is-open {
			border-bottom: none;

			.svg-img {
				transform: rotate(180deg);
			}
		}


		.history-item-title {
			font-size: 36rpx;
			height: 100rpx;
			line-height: 50rpx;
			padding: 22rpx 28rpx 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.text {
				flex: 1;
				color: #404040;
				font-size: 30rpx;
			}
		}

		.history-item-content {
			text-align: center;
			padding: 20rpx 28rpx;
			background: #fff;

			p {
				font-size: 30rpx;
				color: var(--theme-auxiliary-color-remind);
				text-align: left;
			}
		}
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>
