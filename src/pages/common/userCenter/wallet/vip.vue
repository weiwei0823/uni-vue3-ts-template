<template>
	<scroll-view scroll-y="true" show-scrollbar="true" scroll-with-animation="true" lower-threshold="700"
		class="vip-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="content">
			<view class="item title">
				<view class="text">等级</view>
				<view class="text">打码量</view>
			</view>
			<view class="item child" v-for="(item, index) in vipList" :key="index">
				<view class="text">{{ item.levelName }}</view>
				<view class="text num">{{ item.codingAmount }}</view>
			</view>
			<!-- <div class="tips-box">
                <view class="tips-title">vip等级介绍</view>
                <view class="tips">{{ desc }}</view>
            </div> -->
		</view>
		<AlertInjectLayer />
	</scroll-view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		vipInfo
	} from "@/utils/user/vip";
	import defaultTemplate from "@/utils/defaultTemplate";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
  import useAppInfoStore from "@/store/modules/appInfoStore";

	export default {
		name: "vip",
		components: {
			AlertInjectLayer,
			Header,
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "VIP等级",
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				vipList: [],
				desc: ''
			}
		},
		onLoad() {
			this.getUserVipInfo()
		},
		methods: {
			back() {
				history.back();
			},
			async getUserVipInfo() {
				const {
					result
				} = await vipInfo()
				const {
					vips,
					desc
				} = defaultTemplate({
					vips: [{
						"id": 1,
						"level": 1,
						"levelName": "VIP1",
						"levelDesc": "VIP1",
						"codingAmount": 0,
						"status": '1',
						"createTime": "0",
						"createBy": "0",
						"updateTime": "0",
						"updateBy": "0"
					}, ],
					desc: ""
				}, result)
				this.vipList = vips.filter(item => item.status === '1')
				this.desc = desc
			}
		}
	}
</script>
<style lang="scss" scoped>
	.vip-box {
		height: var(--vh);
		background: var(--theme-auxiliary-color-default);

		font-style: normal;

		.content {
			margin: 20rpx 28rpx;
			border-radius: 24rpx;
			overflow: hidden;

			.text {
				display: grid;
				place-content: center;
				font-weight: 600;
				border-left: 1px solid #EEE;
				border-right: 1px solid #EEE;
			}


			.item {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				font-size: 28rpx;
				height: 96rpx;
				justify-content: space-between;
				border-bottom: 1px solid #EEE;

				.text {
					font-size: 28rpx;
					color: #404040;
				}
			}

			.title {
				background: var(--theme-color);

				.text {
					font-size: 30rpx;
					color: #FFF;
					border: none;
				}
			}

			.child {
				background: #fff;

				.num {
					color: var(--theme-auxiliary-color-remind);
					font-weight: 400;
					border-left: none;
					border-right: 1px solid #EEE;
				}
			}

			.tips-box {
				margin-top: 40rpx;
				border-radius: 10rpx;
				background: #FFF;
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				gap: 10rpx;

				.tips-title {
					color: #03536E;
					font-size: 36rpx;
					font-weight: 400;
				}

				.tips {
					font-size: 28rpx;
					color: #444444;
				}
			}
		}
	}
</style>
