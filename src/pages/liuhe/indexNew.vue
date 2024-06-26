<template>
	<view class="body">
    <new-loading></new-loading>
		<component ref="componentRef" is="LiuheIndex_02" :scrollTop="scrollTop" :isReachBottom="isReachBottom" />
		<component :is="componentTabbar" :current="$config.station === 'ALL' ? '2' : '0'" />
		<uni-drawer ref="showLeft" mode="left" :width="80">
			<header-drawer @close="closeDrawer" />
		</uni-drawer>
		<ColorSwitch />
	</view>
</template>

<script>
import ColorSwitch from '@/components/common/colorSwitch/index.vue';
import LiuheIndex_01 from '@/components/CommonPages/pages-liuhe/LiuheIndex_01.vue'
import LiuheIndex_02 from '@/components/CommonPages/pages-liuhe/LiuheIndex_02.vue'
import TabBarLiuhe from '@/components/Tabbar/Liuhe'
import TabBarAll from "@/components/common/tabbar/TabBar";
import {
	mapGetters
} from 'pinia';
import headerDrawer from '@/components/CommonPages/pages-liuhe/components/drawer.vue';
export default {
	components: {
		LiuheIndex_01,
		LiuheIndex_02,
		TabBarLiuhe,
		TabBarAll,
		headerDrawer,
		ColorSwitch
	},
	data() {
		return {
			componentIdMap: {
				// 2: 'LiuheIndex_01',
				// 1: 'LiuheIndex_02',
				1: 'LiuheIndex_01',
				2: 'LiuheIndex_02',
			},
			scrollTop: 0,
			isReachBottom: false,
			componentTabbarMap: {
				'ALL': 'TabBarAll',
				'LIUHE': 'TabBarLiuhe'
			},
			componentTabbar: '',
			option: {}
		}
	},
	computed: {
		...mapGetters(["webSiteConfig"]),
	},
	mounted() {

		uni.$emit("on_page_mounted", this)

		uni.$off("open-liuhe-left-menu", this.showDrawer);
		uni.$on("open-liuhe-left-menu", this.showDrawer);

	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
		this.$u.debounce(this.setIsReachBottom, 500)
	},
	onReachBottom() {
		setTimeout(() => {
			this.isReachBottom = true
		}, 500);
	},
	onShow() {
		this.nextShow()
	},
	onHide() {
		this.nextHide();
	},
	onLoad(option) {
		this.option = option
		this.nextLoad()
	},
	methods: {
		closeDrawer() {
			this.$refs.showLeft.close()
		},
		showDrawer() {
			this.$refs.showLeft.open();
		},
		nextShow() {
			this.$nextTick(() => {
				this.$refs.componentRef._onShow && this.$refs.componentRef._onShow()
			})
		},
		nextHide() {
			this.$nextTick(() => {
				this.$refs.componentRef._onHide && this.$refs.componentRef._onHide({})
			})
		},
		nextLoad() {
			this.$nextTick(() => {
				this.$refs.componentRef._onLoad && this.$refs.componentRef._onLoad(this.option)
			})
			this.componentTabbar = this.componentTabbarMap[this.$config.station]
		},
		setIsReachBottom() {
			const {
				screenHeight
			} = uni.getSystemInfoSync()
			const query = uni.createSelectorQuery().in(this);
			query.select('.body').boundingClientRect(({
				height
			}) => {
				if (height - screenHeight > this.scrollTop + 5) {
					this.isReachBottom = false
				}
			}).exec();
		}
	}
}
</script>
<style lang="scss" scoped>
::v-deep .uni-drawer__content {
	width: 80% !important;
}

::v-deep .uni-drawer {
	position: fixed;
	width: 100%;
	max-width: 480px;
	height: 100vh;
	margin: 0px auto;
}
</style>
