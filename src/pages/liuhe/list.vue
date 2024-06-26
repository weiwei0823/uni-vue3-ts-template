<template>
	<LiuheGameHall ref="LiuheGameHallRef" />
</template>

<script>
	import LiuheGameHall from "@/components/CommonPages/pages-liuhe/LiuheGameHall.vue";
	export default {
		components: {
			LiuheGameHall
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