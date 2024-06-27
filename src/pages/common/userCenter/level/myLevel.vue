<template>
	<view class="my-level" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!-- <NavBar :title="title"></NavBar> -->
		<Header :title="title" isFixed>

		</Header>

		<view class="my-level-block">
			<view class="top-notice">
				<text>{{ $t('pages.common.userCenter.level.myLevel.CurrentGrowthValue') }}{{ score }}</text>
			</view>
			<scroll-view scroll-y class="scroll-y"
				v-if="list.length">
				<uni-list>
					<uni-list-item :title="item.name" :note="item.createTime" thumb-size="base"
						v-for="(item, index) in list">
						<text slot="footer" class="point">+{{ item.score }}</text>
					</uni-list-item>
				</uni-list>
			</scroll-view>
			<view v-else>
				<empty :customStyle="{height:`calc(${uWindowHeight}px - 108rpx)`}"></empty>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		myScore
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import Header from "@/components/common/header/index";
	import Empty from '@/components/common/empty/empty'
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "myLevel",
		components: {
			AlertInjectLayer,
			NavBar,
			Header,
			Empty
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.level.myLevel.MyGrowthValue'),
				score: 0,
				list: []
			}
		},
		onShow() {
			myScore().then(res => {
				if (res.code == 200) {
					this.score = res.result.score
					this.list = res.result.list
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .empty-box {
		height: calc(var(--vh) - 230rpx);
	}

	.my-level {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: var(--vh);
		.my-level-block {
			flex: 1;
			height: 0;
			margin-top: 20rpx;
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 24rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			.scroll-y {
				flex: 1;
				height: 0
			}
		}

		.top-notice {
			padding: 20rpx;
			width: 100%;
			border-radius: 24rpx;
			background-color: var(--theme-auxiliary-color-default);
			box-sizing: border-box;
			color: #404040;
			font-feature-settings: 'clig' off, 'liga' off;

			font-size: 30rpx;
			font-weight: 400;
		}

		.point {
			font-size: 32rpx;
			color: #f25050;
			position: relative;
			top: 24rpx;
		}

		::v-deep .uni-list--border-top {
			&:first-child {
				height: 0;
			}
		}
	}
</style>
