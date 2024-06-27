<template>
	<view class="menu-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<uni-list class="list-row">
			<template v-for="(item, index) in menu">
				<uni-list-item class="list-item" :border="false" showArrow
					:arrowStyle="{ 'font-size': '48rpx', color: '#A1A1A1' }" :to="item.url">
					<template v-slot:header>
						<view class="slot-box">
							<imageSvgUrl style="margin-right:20rpx;" :url="item.img" :width="44" :height="44"
								replaceThemeTargetColor="#07C160" />
						</view>
					</template>
					<template v-slot:body>
						<text class="slot-text">{{ item.title }}</text>
					</template>
				</uni-list-item>
				<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
			</template>
		</uni-list>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		mapGetters
	} from 'pinia';

	export default {
		name: "menu",
		components: {
			Header,
			AlertInjectLayer,
			imageSvgUrl
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.accountLog.menu.title1'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				menu: [{
						img: '@/static/img/all/accountLog/svgs/1.svg',
						title: this.$t('pages.common.userCenter.accountLog.totalTitle'),
						url: './accountlog'
					},
					{
						img: '@/static/img/all/accountLog/svgs/2.svg',
						title: this.$t('pages.common.userCenter.accountLog.profitreport.title'),
						url: '/pages/common/userCenter/profitreport/profitreport'
					},
					{
						img: '@/static/img/all/accountLog/svgs/3.svg',
						title: this.$t('pages.common.userCenter.accountLog.index.AccountLog'),
						url: '/pages/common/userCenter/accountLog/index'
					},
					{
						img: '@/static/img/all/accountLog/svgs/4.svg',
						title: this.$t('pages.common.userCenter.accountLog.menu.title2'),
						url: './convert'
					},
					{
						img: '@/static/img/all/accountLog/svgs/5.svg',
						title: this.$t('pages.common.userCenter.accountLog.menu.title3'),
						url: './gift_money'
					}
				],
			}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
		},
	}
</script>

<style lang="scss" scoped>
	.menu-box {
		height: var(--vh);
		background: var(--theme-auxiliary-color-default);

		.list-row {
			border-radius: 24rpx;
			margin-top: 20rpx;
			overflow: hidden;
			background: #FFF;

			.list-item {
				height: 96rpx;

				.slot-box {
					display: flex;
					align-items: center;

					.slot-image {
						height: 44rpx;
						width: 44rpx;
						margin-right: 20rpx;
					}

					.slot-text {
						font-weight: 400;
						font-size: 30rpx;
						color: #404040;
					}
				}
			}
		}

	}
</style>
