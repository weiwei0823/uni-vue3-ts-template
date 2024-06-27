<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{ marginTop: safeHeight,position: `fixed`, height:`${winHeight}px`, width:'100%' }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed></Header>
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`,marginTop:'20rpx'}" class="content"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="lover-body">
				<view class="title-box">
					<p class="sub-title">{{ $t('components.common.notice.notice.text0') }}</p>
					<view class="title">{{ content }}</view>
				</view>
				<view v-if="isGet" class="result-box-box" :style="{height:`calc(${winHeight}px - 88rpx - 160rpx)`}">
					<view class="result-box">
						<span v-for="(item, index) in lottery" :class="getClass(item.color)">{{ item.number }}</span>
					</view>
					<view class="tips"><text class="red">提示：</text>{{ $t('pages.luntan.toolBox.lover.text4') }}</view>
				</view>
				<view class="lover-content" v-else>
					<view class="person-body">
						<image mode="widthFix" src="@/static/img/toolbox/nan.svg" />
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
									fill="#A1A1A1" />
							</svg>
						</span>
						<image mode="widthFix" src="@/static/img/toolbox/nv.svg" />
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M20 9C20 8.44772 19.5523 8 19 8H5C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10L19 10C19.5523 10 20 9.55229 20 9ZM20 16C20 15.4477 19.5523 15 19 15L5 15C4.44772 15 4 15.4477 4 16C4 16.5523 4.44772 17 5 17L19 17C19.5523 17 20 16.5523 20 16Z"
									fill="#A1A1A1" />
							</svg>
						</span>
						<image mode="widthFix" src="@/static/img/toolbox/wen.svg" />
					</view>
					<view class="label-box">
						<view class="line-box">
							<span>{{ $t('pages.luntan.toolBox.lover.text0') }}</span>
							<view class="select" @click="sex = 0">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
									fill="none">
									<circle cx="10" cy="10" r="9" :stroke="themeColor.themeColor" stroke-width="2" />
									<circle v-if="sex == 0" cx="5" cy="5" r="5" transform="matrix(1 0 0 -1 5 15)"
										:fill="themeColor.themeColor" />
								</svg>
								<view class="text">男</view>
							</view>
							<view class="select" @click="sex = 1">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
									fill="none">
									<circle cx="10" cy="10" r="9" stroke="#FF1392" stroke-width="2" />
									<circle v-if="sex == 1" cx="5" cy="5" r="5" transform="matrix(1 0 0 -1 5 15)"
										fill="#FF1392" />
								</svg>
								<view class="text">女</view>
							</view>
						</view>
						<view class="line-box" @click="iconClick">
							<span>{{ $t('pages.luntan.toolBox.lover.text1') }}</span>
							<picker @click="iconClick" mode="date" :value="formData.maleBirthDate" :start="startDate" @cancel="handlePickerCancel"
								:end="endDate" @change="bindDateChangeMan">
								<view style="width: 100%; height: 100%; background: transparent;position: absolute; left: 0; z-index: 1;"></view>
								<input @click="iconClick" disabled type="text" v-model="formData.maleBirthDate"
									readonly="readonly" :placeholder="$t('pages.luntan.toolBox.lover.text5')"
									placeholder-style="color: #A1A1A1; font-size: 30rpx;">
							</picker>

						</view>
						<view class="line-box" @click="iconClick">
							<span>{{ $t('pages.luntan.toolBox.lover.text2') }}</span>
							<picker @click="iconClick" mode="date" :value="formData.femaleBirthDate" :start="startDate" @cancel="handlePickerCancel"
								:end="endDate" @change="bindDateChangeWoman">
								<view style="width: 100%; height: 100%; background: transparent;position: absolute; left: 0; z-index: 1;"></view>
								<input disabled @click="iconClick" type="text" v-model="formData.femaleBirthDate"
									readonly="readonly" :placeholder="$t('pages.luntan.toolBox.lover.text5')"
									placeholder-style="color: #A1A1A1; font-size: 30rpx;">
							</picker>
						</view>
					</view>
				</view><!---->
				<div class="footer-text" v-if="!isGet">
					<view class="match-btn" :style="{ backgroundColor: themeColor.themeColor }" @click="pipei">
						{{ $t('pages.luntan.toolBox.lover.text3') }}
					</view>
					<view class="tips"><text class="red">提示：</text>{{ $t('pages.luntan.toolBox.lover.text4') }}</view>
				</div>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import Notice from "@/components/common/notice/notice";
	import {
		loversNumber
	} from '@/utils/toolbox/index';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import {
		setPickerStyle
	} from "@/utils/common.ts";
	export default {
		name: "lover",
		components: {
			AlertInjectLayer,
			Header,
			Notice
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.lover.title'),
				content: this.$t('pages.luntan.toolBox.lover.content'),
				sex: 1,
				isGet: false,
				formData: {
					jpushId: 69250,
					isErrorMsg: false,
					maleBirthDate: '',
					femaleBirthDate: '',
				},
				lottery: {},
				winHeight: 0
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			iconClick() {
				this.$nativeBridge.setStatusBarColor('#b2b2b2')
				setTimeout(() => {
					setPickerStyle(this.themeColor.themeColor);
				}, 100)
			},
			getClass(color) {
				if (color == 1) {
					return 'red'
				} else if (color == 2) {
					return 'blue'
				} else {
					return 'green'
				}
			},
			bindDateChangeMan(e) {
				this.$nativeBridge.setStatusBarColor('#ffffff')
				this.formData.maleBirthDate = e.detail.value
			},
			bindDateChangeWoman(e) {
				this.$nativeBridge.setStatusBarColor('#ffffff')
				this.formData.femaleBirthDate = e.detail.value
			},
			handlePickerCancel() {
			   this.$nativeBridge.setStatusBarColor('#ffffff')
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			pipei() {
				let prams = this.formData
				loversNumber(prams).then(res => {
					this.lottery = res.result.numberList
					this.isGet = true
				}).catch(err => {
					console.log(err)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mint-tab-container-item {
		box-sizing: border-box;
		height: 94vh;
	}

	.lover-body {
		position: relative;
		// height: calc(var(--vh) - 92rpx);
		background: var(--theme-auxiliary-color-default);
		box-sizing: border-box;
		overflow: hidden;

		.title-box {
			padding: 20rpx 28rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #fff;
			border-radius: 24rpx;
			// margin-top: 20rpx;
			color: #404040;
			font-size: 28rpx;

			.title {
				margin-top: 20rpx;
			}
		}

		.lover-content {
			display: flex;
			flex-direction: column;
			background: #fff;
			border-radius: 24rpx;
			margin-top: 20rpx;
			height: 434rpx;

			.person-body {
				// flex: 1;
				height: 68rpx;
				padding: 20rpx 28rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				image {
					width: 68rpx;
				}

				span {
					margin: 0 10rpx;
				}

			}

			.label-box {
				padding: 20rpx 28rpx;
				flex: 1;
				height: 0;

				.line-box {
					height: 80rpx;
					display: flex;
					align-items: center;

					&+.line-box {
						margin-top: 20rpx;
					}

					span {
						color: #3E4347;
						font-size: 30rpx;
						margin-right: 20rpx;
					}

					.select {
						display: flex;
						align-items: center;

						.text {
							margin-left: 20rpx;
						}

						&+.select {
							margin-left: 40rpx;
						}
					}

					picker {
						display: inline-flex;
						height: 80rpx;
						border-radius: 20rpx;
						box-sizing: border-box;
						border: none;
						background: var(--theme-auxiliary-color-default);
						width: 524rpx;
						outline: none;
						padding-left: 20rpx;

						input {
							display: contents;
							box-sizing: border-box;
							text-align: left;
							border: none;
							background: #f1f1f1;
							width: calc(100% - 180rpx);
							outline: none;
						}
					}
				}
			}
		}



		.result-box-box {
			height: var(--vh);
			background: #fff;
			border-radius: 24rpx 24rpx 0 0;

			.tips {
				margin-top: 20rpx;
				color: #404040;
				font-size: 26rpx;
				padding: 0 28rpx;

				.red {
					color: var(--theme-auxiliary-color-remind);
				}
			}
		}

		.result-box {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 28rpx;
			margin-top: 20rpx;

			span {
				// display: inline-block;
				height: 68rpx;
				width: 68rpx;
				font-size: 28rpx;
				color: #404040;
				line-height: 72rpx;
				// text-indent: 16rpx;
				// text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.red {
				background: url('@/static/img/qiu/1.png');
				background-size: contain;
				background-repeat: no-repeat;
			}

			.blue {
				background: url('@/static/img/qiu/2.png');
				background-size: contain;
				background-repeat: no-repeat;
			}

			.green {
				background: url('@/static/img/qiu/3.png');
				background-size: contain;
				background-repeat: no-repeat;
			}
		}

		.footer-text {
			color: #fff;
			font-size: 34rpx;
			margin-top: 40rpx;
			padding: 0 28rpx;

			.match-btn {
				width: 100%;
				box-sizing: border-box;
				display: grid;
				place-content: center;
				height: 88rpx;
				border-radius: 16rpx;
				font-size: 34rpx;
				color: #fff;
			}

			.tips {
				margin-top: 40rpx;
				color: #404040;
				font-size: 26rpx;

				.red {
					color: var(--theme-auxiliary-color-remind);
				}
			}
		}
	}
</style>
