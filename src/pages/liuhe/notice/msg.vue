<template>
	<view class="detail pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{position: `fixed`, height:`${winHeight}px`,width:'100%', marginTop: safeHeight }">
		<!-- <nav-bar :fontColor="'#FFFFFF'" :title="title" :titleStyle="titleStyle" :isBack="true" :headerStyle="headerStyle"
      :leftWidth="90">
    </nav-bar> -->
		<Header :title="title" isFixed>
			<block slot="right">
				<view class="header-right">
					<text class="text" @click="editMsg(true)" v-if="!isEdit">
						{{ $t("pages.liuhe.notice.msg.text1") }}
					</text>
					<text class="text" @click="editMsg(false)" v-else-if="isEdit && checkId < 0">
						{{ $t("pages.liuhe.notice.msg.text2") }}
					</text>
					<text class="text" @click="del()" v-else-if="isEdit && checkId > 0">
						{{ $t("pages.liuhe.notice.msg.text3") }}
					</text>
				</view>
			</block>
		</Header>
		<scroll-view scroll-y class="info" :style="{height:`calc( ${winHeight}px - 88rpx)`}">
			<view style="display: flex;background-color:#fff;		padding: 20rpx 28rpx;border-radius: 24rpx	;">
				<view class="radio" v-if="isEdit" @click="switchRaio">
					<svg v-show="checkId !== id" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
						viewBox="0 0 24 24" fill="none">
						<g clip-path="url(#clip0_18474_32470)">
							<circle cx="12" cy="12" r="11" stroke="#A1A1A1" stroke-width="2" />
						</g>
						<rect x="1" y="1" width="22" height="22" rx="11" stroke="#A1A1A1" stroke-width="2" />
						<defs>
							<clipPath id="clip0_18474_32470">
								<rect width="24" height="24" rx="12" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<svg v-show="checkId === id" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
						viewBox="0 0 24 24" fill="none">
						<g clip-path="url(#clip0_18474_32489)">
							<circle cx="12" cy="12" r="11" stroke="#A1A1A1" stroke-width="2" />
							<circle cx="12" cy="12" r="6" :fill="themeColor.themeAuxiliaryColorRemind" />
						</g>
						<rect x="1" y="1" width="22" height="22" rx="11" :stroke="themeColor.themeAuxiliaryColorRemind"
							stroke-width="2" />
						<defs>
							<clipPath id="clip0_18474_32489">
								<rect width="24" height="24" rx="12" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</view>
				<view style="width: 100%;">
					<view class="title">
						<imageSvgUrl style="flex-shrink: 0;" url="/static/img/liuhe/notice/msg_n.svg" :width="48"
							:height="48" replaceThemeTargetColor="#07C160" />
						<view class="title-text">
							{{ info.title }}
						</view>
					</view>
					<view class="content">
						{{ info.content }}
					</view>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import NavBar from "@/components/common/navBar/navBar";
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		msgDetails,
		delMessage
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';

	export default {
		name: "msg",
		components: {
			AlertInjectLayer,
			NavBar,
			Header,
			imageSvgUrl
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.liuhe.notice.msg.text4"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				titleStyle: {
					'font-weight': 500,
					'font-size': '32rpx',
					'line-height': '45rpx',
					'color': '#FFFFFF'
				},
				id: 0,
				info: {},
				isEdit: false,
				checkId: -1,
				winHeight: 0,
			}
		},
		computed: {
			...mapGetters(['themeColor']),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
		},
		methods: {
			del() {
				if (this.checkId < 0) return pop(this.$t("pages.liuhe.notice.msg.text5"));
				let ids = this.checkId
				let prams = {
					ids: ids
				}
				delMessage(prams).then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: "/pages/liuhe/notice/index?type=2"
						})
						// backPage()
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			switchRaio() {
				if (this.checkId > 0) {
					this.checkId = -1;
					return;
				}
				this.checkId = this.id;
			},
			editMsg(bool) {
				this.isEdit = bool;
			},
			getInfo() {
				let prams = {
					id: this.id
				};
				msgDetails(prams).then(res => {
					this.info = res.result || {}
				}).catch(err => {
					console.log(err)
				})
			}
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

	/deep/ .tab-div-bg {
		border-radius: 0;
		z-index: 11;
	}

	.detail {
		height: 100vh;
	}

	.header-right {
		text-align: right;

		.text {
			color: var(--theme-color);

			font-size: 30rpx;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}

	.info {
		height: calc(var(--vh) - 110rpx);
		margin-top: 20rpx;
		border-radius: 24rpx;
		width: 100%;
		// border-radius: 5rpx 5rpx 0px 0px;
		// background: #FFFFFF;
		// min-height: calc(100% - 48px - 21px);
		padding-bottom: 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.radio {
			margin-top: 40rpx;
			margin-right: 60rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.title {
			// height: 75rpx;
			display: flex;
			align-items: center;
			padding-bottom: 20rpx;
			// width: calc(100% - 188rpx);
			width: 100%;

			image {
				height: 48rpx;
				width: 48rpx;
				margin-right: 20rpx;
				min-width: 48rpx;
				// margin: 0 16rpx;
			}

			.title-text {
				margin-left: 20rpx;

				font-style: normal;
				font-weight: 400;
				font-size: 30rpx;
				text-align: left;
				color: #404040;

				// overflow: hidden; //超出的文本隐藏
				// text-overflow: ellipsis; //溢出用省略号显示
				// white-space: nowrap; // 默认不换行；
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
			border-top: 2rpx solid var(--theme-auxiliary-color-default);

			font-size: 28rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 40rpx;
			padding: 20rpx 0;
		}
	}
</style>
