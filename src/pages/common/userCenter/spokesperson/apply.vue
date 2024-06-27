<template>
	<view :class="['theme-' + themeColor.name]" style="background-color: #fff;max-width: var(--maxWidth)"
		:style="{ position: `fixed`, height: `${uWindowHeight}px`, marginTop: safeHeight, width: '100%' }">
		<Header :title="title" :header-style="{ borderRadius: 0 }" :isFixed="true"></Header>
		<view class=""
			:style="{ overflow: 'hidden', height: `${uWindowHeight}px`, borderTopLeftRadius: '24rpx', borderTopRightRadius: '24rpx', }">
			<!--  - 88rpx - ${downloadShow?108:0}rpx -->
			<scroll-view scroll-y class="scroll-y" :style="{ height: `calc(${uWindowHeight}px  - ${isApp ? 88 : 88}rpx)` }"
				:enhanced="true" :bounces="false" :show-scrollbar="false">
				<view class="apply" :style="customStyle">
					<!-- <NavBar :title="title"></NavBar> -->

					<view class="rules" @click="toRules">
						{{ $t('pages.common.userCenter.spokesperson.text2') }}
					</view>
					<view class="header-top-text">
						<image class="header-top-img" :src="src1"></image>
					</view>
					<view class="content-image-box">
						<image class="content-image" :src="src2"></image>
					</view>
					<view class="condition">
						<view class="content">
							<view class="title">{{ $t('pages.common.userCenter.spokesperson.text1') }}</view>
							<view class="bd">
								<view>1.{{ applyConditionList[0] }}</view>
								<view>2.{{ applyConditionList[1] }}</view>
								<view>3.{{ applyConditionList[2] }}</view>
							</view>
						</view>
					</view>
					<view class="ft-btn">
						<view class="new-sub-btn" @click="toApply">
							{{ $t('pages.common.userCenter.spokesperson.text0') }}
						</view>
					</view>
					<AlertInjectLayer />
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
import {
	applySpoke,
	getActiveRule
} from "@/utils/user";
import {
  mapGetters, mapState
} from 'pinia';
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
import Header from "@/components/common/header/index";
import useAppInfoStore from "@/store/modules/appInfoStore";
import SystemInfoStore from "@/store/modules/systemInfoStore";
export default {
	name: "apply",
	components: {
		AlertInjectLayer,
		Header
	},
	computed: {
    ...mapState(useAppInfoStore, ["themeColor"]),
    ...mapState(SystemInfoStore, ["uWindowHeight", "downloadShow"]),
		customStyle() {
			return {
				// marginTop: "-100rpx",
				paddingTop: '2rpx',
				marginTop: this.safeHeight,
				minHeight: isApp ? `${this.uWindowHeight}px` : `${this.uWindowHeight}px`,
				winHeight: 0
			}
		}
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t('pages.common.userCenter.spokesperson.text3'),
			src1: "@/static/img/user/sqdyr-title.png",
			src2: "@/static/img/user/sqdyr.png",
			applyConditionList: [],
			isApp: false
		}
	},
	onShow() {
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		this.winHeight = uni.getSystemInfoSync().windowHeight;
		this.getRules()
	},
	onLoad() {
		if (typeof plus !== 'undefined') {
			plus.navigator.setFullscreen(true);
		} else {
			try {


				if (plus) {
					plus.android.importClass("com.example.myplugin.FullScreenPlugin");

					// 创建插件实例
					var fullScreenPlugin = plus.android.newObject("com.example.myplugin.FullScreenPlugin");

					// 调用插件方法
					plus.android.invoke(fullScreenPlugin, "setFullScreen");
				}
			} catch (e) {
				// console.log(e)
			}
			// 导入插件类


		}
	},
	methods: {
		//获取活动规则
		getRules() {
			getActiveRule().then(res => {
				if (res.code === 200) {
					this.applyConditionList = res.result.applyConditionList
				}
			})
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		//申请代言人
		setApply() {
			applySpoke().then(res => {
				uni.showToast({
					title: res.message,
					icon: "none"
				})
			})
		},
		toApply() { //点击申请按钮
			// pop(this.$t('pages.common.userCenter.spokesperson.text4'), 2000)
			/*this.setApply()*/
			uni.navigateTo({
				url: '/pages/common/promoteEarn/index'
			})
		},
		toRules() {
			uni.navigateTo({
				url: "/pages/common/userCenter/spokesperson/activity"
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.apply {
	background: linear-gradient(151deg, #b32b98, #f8484a 35%, #e9379e 57%, #ef4373);
	// height: calc(var(--vh) - 92rpx);
	position: relative;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	overflow: hidden;

	.rules {
		position: absolute;
		height: 72rpx;
		width: 196rpx;
		text-align: center;
		line-height: 72rpx;
		font-weight: 600;
		color: #fffae3;
		font-size: 32rpx;
		right: 0;
		top: 12rpx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAABICAMAAACeCqr6AAAA0lBMVEUAAAD//3///0D//1X/32D/6lX/61j/8Fr/61r/6ln/6Fn/6lf/61f/6Fj/6lj/61j/6ln/61j/6Vf/6Vj/6lj/6Ff/6Vn/6Vj/6ln/6Ff/6Vj/6lj/6Vf/6lj/6Vj/6lj/6Vj/6Vj/6Vf/6Vj/6Vf/6Vj/6Vj/6lj/6Vf/sEr/sUr/s0r/s0v/tEv/tkz/t0v/uUz/ukz/u0z/u03/vU3/wE7/xE//yVD/zFH/zVH/z1H/01L/1lP/3VX/4Vb/5Fb/5Vf/5lf/51f/6Ff/6Fj/6VjZRegGAAAAKXRSTlMAAgQGCAwaIjM8QlVbYmJlbXFydIiSr7C4zNDQ0t7f5uvs7/D4+Pz8/hEksfEAAAGnSURBVGje7dtbV0EBEIbhjYjo6HwqijJFSkJOKd7//5e6UWsV3XXhm9XcunrWtpg9800Q/F6h+GEmV6rWmux4/SqIneQvEantgr1U4Rqd2kaIpi+Qqk1C+LT++eHr9GXwdN+5tR2vDUOishbMho8mUj8IkWwLgLfxg+nUd8N+EYDFqG2miji4AlhNOmayiGQDYN4300Uc3wBM70wYkbwBlkMzYcRBA3gfmDJi/wp4fzZlRKQILDWfwxciCzA0aUSiBUxNGhGuAPM7bcQpsOqbNCJaByamjUgDi442Yu8CGJk2IgW8tcURBWBs2ojYNfAgjjgBZiaOyCs3HGtE6BJ4FEfEgVcTRxxJt35rRAZ4UUfkgIE6ogz01BHnQFcdUQM66ogmcPuP+P86/Q2iCtyrI0oefmJd/Nm5aDtcNIAuWnEXL0UuXk99DApcjGxcDM98jDFdDJRdjPZ9LFlcrLt8LB5drIB9LON9xCJcBFR8RIV8hLZ8xOd8BBl9REp9hHt9xKx9BN6DIAiffTs96HUFTw98HIE4Ocdxchj1eaJ2lMmVz3f/RO0DmiQsG9kI7/MAAAAASUVORK5CYII=);
		background-size: 100% 100%;
	}

	.header-top-text {
		margin-top: 100rpx;
		text-align: center;

		.header-top-img {
			height: 122rpx;
			width: 540rpx;
		}
	}

	.content-image-box {
		text-align: center;
		width: 750rpx;
		max-width: 480px;
		height: 640rpx;

		.content-image {
			width: 100%;
			height: 640rpx;
		}
	}

	.condition {
		padding: 0 60rpx;
		position: relative;
		// bottom: 220rpx;

		top: -130rpx;
		width: 100%;
		box-sizing: border-box;

		.content {
			background: #fff;
			box-shadow: inset 0 0 6rpx 4rpx #feeb9d;
			border-radius: 42rpx;
			padding: 24rpx;
			color: #404040;

			.title {
				font-size: 30rpx;
				color: #404040;
				margin-bottom: 18rpx;
			}

			.bd {
				font-size: 26rpx;
				color: #404040;
				line-height: 46rpx;
			}
		}
	}

	.ft-btn {
		padding: 0 60rpx;
		position: relative;
		// position:fixed;
		// bottom: 16rpx;
		top: -50rpx;
		width: 100%;
		box-sizing: border-box;

		.new-sub-btn {
			background-image: url("@/static/img/user/yqhybtn.png");
			background-size: 100% 100%;
			height: 116rpx;
			line-height: 116rpx;
			text-align: center;
			font-weight: 600;
			color: #fff;
			font-size: 36rpx;
		}
	}
}
</style>
