<template>
	<component :is="componentId" ref="online" />
</template>

<script>
	import ALL from './liuhe.vue';
	import LIUHE from './liuhe.vue';
	import LUNTAN from './liuhe.vue';
	export default {
		components: {
			ALL,
			LIUHE,
			LUNTAN
		},
		data() {
			return {
				componentId: 'LIUHE',
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onShow() {
			this.$refs.online?._onShow();
			// this.$nativeBridge.setStatusBarColor('#BFE0FF')
		},
		onLoad() {
			this.componentId = this.$config.station
		}
	}
</script>
<style lang="scss" scoped></style>