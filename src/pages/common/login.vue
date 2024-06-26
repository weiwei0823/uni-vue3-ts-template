<template>
	<component :is="componentId" />
</template>

<script>
	import {
		config
	} from '@/config/config'
	import ALL from '@/components/pages-all/login.vue';
	import LIUHE from '@/components/pages-all/login.vue';
	import LUNTAN from '@/components/pages-luntan/login.vue';
	export default {
		components: {
			ALL,
			LIUHE,
			LUNTAN,
		},
		data() {
			return {
				componentId: ''
			}
		},
		onShow(){
			console.log("login on show");
		},

		mounted() {

			uni.$emit("on_page_mounted", this)

			this.componentId = config.station
		}
	}
</script>
<style lang="scss" scoped></style>
