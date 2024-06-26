<template>
	<LiuheActivity ref="LuntanActivityRef" />
</template>

<script>
	import LiuheActivity from "@/components/CommonPages/pages-liuhe/LiuheActivity.vue";
	export default {
		components: {
			LiuheActivity
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.LuntanActivityRef._onLoad && this.$refs.LuntanActivityRef._onLoad({})
			})
		},
	}
</script>
<style lang="scss" scoped></style>