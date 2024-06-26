<template>
	<view class="help" :style="{ marginTop: safeHeight, height:`${winHeight}px`,position: `fixed` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<!-- <NavBar :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor" :font-color="fontColor"
      :title-style="titleStyle"> -->
		<!-- </NavBar> -->
		<!-- <LuntanLoading class="loading" v-if="loading" /> -->
		<view v-if="loading" class=""
			style="display:flex;align-items: center; justify-content:center;color:#D8D8D8;margin-top:20rpx;">

			<image src="@/static/img/loading_v1.gif" :style="{ width: '100rpx', height: '100rpx',marginRight:'10rpx',}">
			</image> 加载中...
		</view>
		<view class="help-content" v-else>
			<view class="title">{{ info.title }}</view>
			<scroll-view scroll-y class="scroll-y" :style="{height: `calc(${winHeight}px - 228rpx) `}">
				<view class="content">
					<mp-html :content="info.content" />
				</view>
				<view class="fg">
					<view class="line"></view>
					<view class="text">{{ $t('pages.liuhe.help.detail.answerHelpful') }}</view>
					<view class="line"></view>
				</view>
				<view class="hand">
					<view class="item" @click="setAnswer(1)">
						<uni-icons v-if="info.answer === 1" type="hand-up-filled" size="26" :color="'#d43345'" />
						<image v-else src="@/static/img/zan-stroke.png" mode="" style="width:42rpx;height:42rpx;">
						</image>

						<!-- <uni-icons type="hand-up-filled" size="26" :color="info.answer === 1 ? '#d43345' : ''" /> -->
						<text class="text">{{ $t('pages.liuhe.help.detail.helpful') }} {{ info.haveHelpAmount }}</text>
					</view>
					<view class="item" @click="setAnswer(-1)">
						<uni-icons style="transform: rotate(180deg);" v-if="info.answer === -1" type="hand-up-filled"
							size="26" :color="'#d43345'" />
						<image v-else src="@/static/img/zan-stroke.png" mode=""
							style="width:42rpx;height:42rpx;transform: rotate(180deg);">
						</image>
						<text class="text">{{ $t('pages.liuhe.help.detail.notHelpful') }} {{ info.noHelpAmount }}</text>
					</view>
					<AlertInjectLayer />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		details,
		answer
	} from "@/utils/lottery/help";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Header from '@/components/common/header/index.vue';
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "detail",
		components: {
			AlertInjectLayer,
			NavBar,
			Header
		},
		data() {
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.liuhe.help.detail.commonQuestions'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				id: 0,
				info: {},
				winHeight: 0
			}
		},
		computed: {
			...mapGetters(["themeColor", "windowTop"]),
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			uni.onWindowResize(() => {

				this.winHeight = uni.getSystemInfoSync().windowHeight;
			})
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			async setAnswer(type) {
				const res = await answer({
					id: parseInt(this.id),
					answer: type,
				})
				if (res.code === 200) {
					//接口暂未返回统计数值 后续可和后端讨论优化 暂时以服务器detail刷新数值
					this.info.answer = type
					this.getInfo(true);
				}
			},
			getInfo() {
				this.loading = true
				let prams = {
					id: this.id
				}
				details(prams).then(res => {
					this.loading = false
					if (res.code == 200) {
						this.title = res.result.title
						this.info = res.result;
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.help {
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		max-width: 480px;

		/deep/ .header .center {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.help-content {
			border-radius: 24rpx;
			background-color: #fff;
			margin-top: 20rpx;
			overflow: hidden;
		}

		.title {
			color: #404040;

			font-size: 30rpx;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			background: #fff;
			padding: 30rpx 28rpx;
			border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
		}

		.scroll-y {
			padding: 20rpx 28rpx;
			box-sizing: border-box;
		}

		.content {
			color: #404040;

			font-size: 28rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 40rpx;
		}

		.fg {
			display: flex;
			margin: 0 0 0 0;
			align-items: center;
			justify-content: center;
			padding-top: 60rpx;

			.line {
				width: 194rpx;
				height: 1px;
				background: #E7E7E7;
			}

			.text {
				// color: var(--theme-color);
				color: #404040;

				font-size: 26rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 40rpx;
				/* 142.857% */
			}
		}

		.hand {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-bottom: 30rpx;

			.item {
				padding: 30rpx 60rpx;
				display: flex;
				align-items: center;
				font-size: 22rpx;
				color: #999999;

				.text {
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
