<template>
	<view class="tab-container" :style="{ marginLeft: marginWidth }">
		<slot name="content-tabs"> </slot>
	</view>
</template>
<script>
	export default {
		name: "centerTab",
		props: {
			marginWidth: {
				type: String,
				default: "0px"
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {},
	};
</script>