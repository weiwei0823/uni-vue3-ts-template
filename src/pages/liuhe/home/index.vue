<template>
	<view class="page-content">
		<new-loading></new-loading>
		<component ref="componentRef" is="LiuheIndex_02" />
		<component :is="componentTabbar" :current="$config.station === 'ALL' ? '2' : '0'" />
		<uni-drawer ref="showLeft" mode="left" :width="80" v-if="showLeftDrawer">
			<header-drawer @close="closeDrawer" />
		</uni-drawer>
		<Envelope />
		<!-- <ColorSwitch /> -->
	</view>
</template>

<script>
// import LiuheIndex_01 from '@/components/CommonPages/pages-liuhe/LiuheIndex_01.vue'
import Envelope from '@/components/common/envelope/index.vue';
import LiuheIndex_02 from '@/components/CommonPages/pages-liuhe/LiuheIndex_02.vue';
import TabBarLiuhe from '@/components/Tabbar/Liuhe';
import TabBarAll from '@/components/common/tabbar/TabBar';
import headerDrawer from '@/components/CommonPages/pages-liuhe/components/drawer.vue';
import ColorSwitch from '@/components/common/colorSwitch/index.vue';
import { mapGetters } from 'pinia';
export default {
	components: {
		// LiuheIndex_01,
		LiuheIndex_02,
		TabBarLiuhe,
		TabBarAll,
		headerDrawer,
		ColorSwitch,
		Envelope
	},
	data() {
		return {
			componentTabbarMap: {
				ALL: 'TabBarAll',
				LIUHE: 'TabBarLiuhe'
			},
			componentTabbar: '',
			option: {},
			// 首页刚开始不加载这个组件，点击后调用加载
			showLeftDrawer: false
		};
	},
	mounted() {
		uni.$emit('on_page_mounted', this);

		uni.$off('open-liuhe-left-menu', this.showDrawer);
		uni.$on('open-liuhe-left-menu', this.showDrawer);
	},

	computed: {
		...mapGetters(['webSiteConfig'])
	},
	onShow() {
		this.nextShow();
	},
	onHide() {
		this.nextHide();
	},
	onLoad(option) {
		this.option = option;
		this.nextLoad();
	},
	methods: {
		showDrawer() {
			// 第一次需要等组件加载
			if (!this.showLeftDrawer) {
				this.showLeftDrawer = true;
				this.$nextTick(() => {
					this.$refs.showLeft.open();
				});
			} else {
				this.$refs.showLeft.open();
			}
		},

		nextShow() {
			this.$nextTick(() => {
				this.$refs.componentRef._onShow && this.$refs.componentRef._onShow();
			});
		},
		nextLoad() {
			this.$nextTick(() => {
				this.$refs.componentRef._onLoad && this.$refs.componentRef._onLoad(this.option);
			});
			this.componentTabbar = this.componentTabbarMap[this.$config.station];
		},
		nextHide() {
			this.$nextTick(() => {
				this.$refs.componentRef._onHide && this.$refs.componentRef._onHide({});
			});
		},
		closeDrawer() {
			this.$refs.showLeft.close();
		}
	}
};
</script>
<style lang="scss" scoped>
.page-content {
	background-color: #fff;
}

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
