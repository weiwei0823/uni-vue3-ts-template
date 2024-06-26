<template>
	<view class="bank-div" :style="{height:`${uWindowHeight}px`}">
		<view class="bank" :style="{ marginTop: safeHeight,height:`${uWindowHeight}px` }"
			:class="['theme-' + themeColor.name]">
			<NavBar :isBack="false" :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor"
				:font-color="fontColor" :title-style="titleStyle">
				<block slot="left">
					<view class="" @click="back">
						<filterIcon src="/static/imgs-liuhe/activity/back.png" :width="24" :height="42" />
					</view>
					<!--  <image @click="back" :style="{
            width: '24rpx',
            height: '42rpx',
          }" src="/static/imgs-liuhe/activity/back.png"></image> -->
				</block>
			</NavBar>
			<view class="title">
				<image class="tan" src="/static/imgs-liuhe/bank/warning.png"></image>确认绑定信息
			</view>
			<view class="from">
				<view class="from-row">
					<view class="from-rol">
						<view class="left">真实姓名：</view>
						<view class="right">{{ formData.realName }}</view>
					</view>
					<view class="from-rol">
						<view class="left">钱包名称：</view>
						<view class="right">{{ data.name }}</view>
					</view>
					<view class="from-rol">
						<view class="left">收款地址：</view>
						<view class="right">{{ formData.bankNumber }}</view>
					</view>
				</view>
			</view>
			<view class="next-box">
				<view class="next-btn" @click="actionFrom">确定绑定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		addWallet
	} from "@/utils/lottery/mine";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "ConfirmWallet",
		components: {
			NavBar
		},
		props: {
			data: {
				type: Object,
				default: () => {
					return {}
				},
			},
			formData: {
				type: Object,
				default: () => {
					return {}
				},
			}
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "确认信息",
				headerStyle: {
					backgroundColor: "#fff",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040",
					'font-weight': 600
				},
				isAction: false
			}
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		methods: {
			back() {
				this.$emit('closeNext');
			},
			backIndex() {
				this.$emit("backIndex");
			},
			actionFrom() {
				if (this.isAction == true) {
					pop("请不要重复提交", 2000)
					return false
				}
				this.isAction = true
				let prams = this.formData
				addWallet(prams).then(res => {
					if (res.code == 200) {
						this.isAction = true
						// pop("添加成功", 2000)
						this.$emit("backIndex");
						/*uni.navigateTo({
						  url:"/pages/common/userCenter/bank/index"
						})*/
					} else {
						pop(res.message, 2000)
						return false
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-div {
		width: 100vw;
		background: rgba(0, 0, 0, 0.1);
	}

	.bank {

		width: 100vw;
		max-width: 480px;
		margin: auto;
		height: var(--vh);
		background: var(--theme-auxiliary-color-default);

		.title {
			color: #A1A1A1;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 28rpx;

			.tan {
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
		}

		.from {
			border-radius: 24rpx;
			overflow: hidden;

			.from-row {
				.from-rol {
					display: flex;
					height: 96rpx;
					padding: 0rpx 28rpx;
					background: #FFFFFF;
					border-bottom: 1px solid var(--theme-auxiliary-color-default);
					align-items: center;

					&:last-child {
						border-bottom: none;
					}

					.left {
						width: fit-content;
						white-space: nowrap;
						font-weight: 400;
						font-size: 28rpx;
						line-height: 42rpx;
						color: #404040;
					}

					.right {
						flex: 1;
						display: flex;
						color: #404040;
						font-size: 28rpx;
						font-weight: 400;

						.input-item {
							text-align: left;

							/deep/ .uni-icons {
								columns: var(--theme-color) !important;
							}
						}

						.text-box {
							width: 90%;
							margin-left: 20rpx;
							color: #999999;
							text-align: left;
						}

						.bank {
							width: 90%;
							color: #404040;
							font-size: 28rpx;
							display: flex;
							align-items: center;
							justify-content: flex-start;

							image {
								margin-right: 10rpx;
								height: 48rpx;
								width: 48rpx;
							}
						}

						.arrow {
							text-align: left;
						}
					}
				}
			}
		}

		.next-box {
			clear: both;
			margin-top: 40rpx;
			display: flex;
			justify-content: center;

			.next-btn {
				width: 694rpx;
				height: 88rpx;
				background: var(--theme-color);
				border-radius: 16rpx;
				font-size: 34rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.ok {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			margin-bottom: 100rpx;

			.img {
				image {
					height: 250rpx;
					width: 250rpx;
					border-radius: 0px;
				}
			}

			.msg {
				font-weight: 400;
				font-size: 32rpx;
				line-height: 45rpx;
				color: #666666;
			}
		}
	}
</style>
