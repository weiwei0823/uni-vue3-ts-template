<template>
	<view>
		<LuntanMarket ref="LiuheGameHallRef" />
		<!-- <ColorSwitch /> -->
	</view>
</template>

<script>
import ColorSwitch from '@/components/common/colorSwitch/index.vue';
import LuntanMarket from "@/components/CommonPages/pages-luntan/LuntanMarket.vue";
export default {
	components: {
		LuntanMarket,
		ColorSwitch
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	onShow() {
		this.$nextTick(() => {
			this.$refs.LiuheGameHallRef._onShow && this.$refs.LiuheGameHallRef._onShow()
		})
	},
	onLoad() {
		this.$nextTick(() => {
			this.$refs.LiuheGameHallRef._onLoad && this.$refs.LiuheGameHallRef._onLoad({})
		})
	},
}
</script>
<style lang="scss" scoped></style>