<template>
	<view class="mint-tab-container-item">
		<bet-slip></bet-slip>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import BetSlip from ".@/components/common/lottery/BetSlip";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"

	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			BetSlip
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
	}
</script>

<style scoped></style>