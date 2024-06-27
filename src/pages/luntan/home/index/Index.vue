<template>
	<view>
<!--		<component ref="componentRef" :is="componentId" />-->
		<ColorSwitch />
	</view>
</template>

<script>

import ColorSwitch from '@/components/common/colorSwitch/index.vue';
// import LuntanIndex_01 from '@/components/CommonPages/pages-luntan/LuntanIndex_01.vue'
// import LuntanIndex_02 from '@/components/CommonPages/pages-luntan/LuntanIndex_02.vue'
import {
	mapGetters
} from 'pinia';
import stores from "@/store"
import useAppInfoStore from "@/store/modules/appInfoStore";
import useSystemInfoStore from "@/store/modules/systemInfoStore";
/**
 * 2023-08-16:修改一些调用onshow等逻辑BUG 避免组件载入后重复调用非必要生命周期时间。诱发一些获取数据重复请求未做去重的BUG
 */
export default {
	components: {
		ColorSwitch,
		// LuntanIndex_01,
		// LuntanIndex_02
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	data() {
		return {
			componentIdMap: {
				1: 'LuntanIndex_01',
				2: 'LuntanIndex_02',
				// 2: 'LuntanIndex_01',
				// 1: 'LuntanIndex_02',
			},
			lastComponentKey: null,
		}
	},
	computed: {
    ...mapState(useAppInfoStore, ["webSiteConfig"]),
		componentId() {
			const key = this.webSiteConfig.liuhe_setting;
			this.lastComponentKey != key && this.$nextTick(() => {
				this.nextShow();
				this.nextLoad();
			});
			this.lastComponentKey = key;
			return this.componentIdMap[key]
		}
	},
	onShow() {
    console.log(stores, "1111111")
		this.nextShow()
	},
	onLoad() {
		this.nextLoad()
	},
	methods: {
		nextShow() {
			this.$refs?.componentRef && this.$nextTick(() => {
				this.$refs?.componentRef._onShow && this.$refs?.componentRef._onShow()
			})
		},
		nextLoad() {
			this.$refs?.componentRef && this.$nextTick(() => {
				this.$refs?.componentRef._onLoad && this.$refs?.componentRef._onLoad({})
			})
		},
	},
}
</script>
<style lang="scss" scoped></style>
