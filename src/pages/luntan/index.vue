<template>
	<view>
		<component ref="componentRef" :is="componentId" />
		<ColorSwitch />
	</view>
</template>

<script>
import ColorSwitch from '@/components/common/colorSwitch/index.vue';

import LuntanIndex_01 from '@/components/CommonPages/pages-luntan/LuntanIndex_01.vue'
import LuntanIndex_02 from '@/components/CommonPages/pages-luntan/LuntanIndex_02.vue'

import useAppInfoStore from "@/store/modules/appInfoStore";
export default {
	components: {
		LuntanIndex_01,
		LuntanIndex_02,
		ColorSwitch
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	data() {
		return {
			componentIdMap: {
				// 2: 'LuntanIndex_01',
				// 1: 'LuntanIndex_02',
				1: 'LuntanIndex_01',
				2: 'LuntanIndex_02',
			},
			lastStationKey: null,
		}
	},
	computed: {
    ...mapState(useAppInfoStore, ["webSiteConfig"]),
		componentId() {
			const key = this.webSiteConfig.liuhe_setting;
			this.lastStationKey != key && this.$nextTick(() => {
				this.nextShow()
				this.nextLoad()
			})
			this.lastStationKey = key;
			return this.componentIdMap[key]
			// return this.componentIdMap[1]
		}
	},
	onShow() {
		this.nextShow()
	},
	onLoad() {
		this.nextLoad()
	},
	methods: {
		nextShow() {
			this.$refs.componentRef && this.$nextTick(() => {
				this.$refs.componentRef._onShow && this.$refs.componentRef._onShow()
			})
		},
		nextLoad() {
			this.$refs.componentRef && this.$nextTick(() => {
				this.$refs.componentRef._onLoad && this.$refs.componentRef._onLoad({})
			})
		},
	}
}
</script>
<style lang="scss" scoped></style>
