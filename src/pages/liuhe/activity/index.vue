<template>
	<LiuheActivity :class="['theme-' + theme]" ref="LiuheActivityRef" />
</template>

<script>
	import LiuheActivity from "@/components/CommonPages/pages-liuhe/LiuheActivity.vue";
	export default {
		components: {
			LiuheActivity
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.LiuheActivityRef._onLoad && this.$refs.LiuheActivityRef._onLoad({})
			})
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
		},
	}
</script>
<style lang="scss" scoped></style>