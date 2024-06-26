<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				url: ''
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(item) {
			this.url = decodeURIComponent(item.url)
			// 传入需要跳转的链接 使用web-view标签进行跳转
		}
	}
</script>

<style scoped>

</style>