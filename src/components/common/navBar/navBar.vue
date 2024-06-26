<template>
	<view class="header-box" :style="headerStyle" :class="['theme-' + themeColor.name,{'border-show': show}]">
		<view class="safe"
			:style="{ height: safeHeight, backgroundColor: headerStyle ? headerStyle.backgroundColor : '#fff' }">
		</view>
		<view class="header" :style="{ marginTop: safeHeight, height: headerStyle.height,top:`${headerTop>0?headerTop:0}px` }">
			<uni-nav-bar :color="fontColor" :backgroundColor="headerStyle ? headerStyle.backgroundColor : 'transparent'"
				:height="navBarHeight ? navBarHeight : '92rpx'" :leftWidth="leftWidth" :rightWidth="rightWidth">
				<block slot="left" v-if="isBack&&!isForceHideBack">
					<uni-icons @click="back" type="back" :color="fontColor" :style="backStyle" size="24"
						style="font-weight: bold;margin-left: 10px" />
					<slot name="left"></slot>
				</block>
				<block slot="left" v-else-if="!isForceHideBack">
					<slot name="left">

					</slot>
				</block>
				<slot name="title">
					<view class="input-view" :style="titleStyle">{{ title }}</view>
				</slot>
				<block slot="right">
					<view class="right-action" @click="rightEvt">
						<slot name="right"></slot>
					</view>
				</block>
			</uni-nav-bar>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "navBar",
		props: {
			navBarHeight: {},
			leftWidth: {
				type: Number,
				default: 95
			},
			rightWidth: {
				type: Number,
				default: 95
			},
			headerStyle: {
				type: Object,
				default: () => {
					return {
						backgroundColor: '#fff'
					}
				}
			},
			bgColor: {
				type: String,
				default: "#FFFFFF"
			},
			fontColor: {
				type: String,
				default: ""
			},
			backStyle: {
				type: Object,
				default: null
			},
			titleStyle: {
				type: Object,
				default: null
			},
			isBack: {
				type: Boolean,
				default: true
			},
			goHome: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			},

			headerTop:{
				type:Number,
				default:0
			}
		},
		computed: {
			...mapGetters(["themeColor"]),
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top + "px",
				isForceHideBack: false
			}
		},

		mounted() {
			let that = this;
			this.$nextTick(() => {
				// tabbar
				const query = uni.createSelectorQuery();
				query.select('.tabbar').boundingClientRect(data => {
					if (!!data) that.isForceHideBack = true;
				}).exec();
			})

		},

		methods: {
			back() {
				if (this.goHome) {
					uni.reLaunch({
						url: "/pages/luntan/home/index/Index"
					})
				} else {
					this.$emit('goBack')
					/*uni.navigateBack()*/
					let canNavBack = getCurrentPages()
					if (canNavBack && canNavBack.length > 1) {
						uni.navigateBack()
					} else {
						history.back();
					}
					//在返回的方法里替换
				}
			},
			rightEvt() {
				this.$emit("rightEvt")
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep .uni-navbar__header{
  padding: 0 28rpx;
}
	.header-box {
		height: 92rpx;

		.safe {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 999;
		}
	}

	.safe {
		position: fixed;
		z-index: 999;
	}

	.header {
		position: fixed;
		height: 92rpx;
		top: 0;
		z-index: 5;
		width: 100%;
		max-width: 480px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.uni-navbar {
		.uni-navbar__content {
			border: none;
		}
	}

	.border-show {
		:after {
			position: absolute;
			box-sizing: border-box;
			content: " ";
			pointer-events: none;
			top: -50%;
			right: -50%;
			bottom: -50%;
			left: -50%;
			border: 0 solid #ebedf0;
			transform: scale(.5);
		}

		:after {
			border-bottom-width: 0px;
		}
	}
</style>
