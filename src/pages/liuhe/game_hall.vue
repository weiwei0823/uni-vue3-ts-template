<template>
	<LiuheGameHall ref="LiuheGameHallRef" :showTabBar="showTabBar" v-on:onInitDataSuccess="onGameHallInitedSuccess" :optionId="id" />
</template>

<script>
import LiuheGameHall from "@/components/CommonPages/pages-liuhe/LiuheGameHall.vue";
export default {
	data() {
		this.eventChannel=null;
		return {
			id: null
		}
	},
	components: {
		LiuheGameHall
	},
	computed: {
		showTabBar() {
			return this.$config.station !== 'ALL'
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	onShow() {
		this.$nextTick(() => {
			this.$refs.LiuheGameHallRef._onShow && this.$refs.LiuheGameHallRef._onShow()
		})
	},
	onLoad(option) {
		this.eventChannel = this.getOpenerEventChannel();
		this.id = option.id
		this.$nextTick(() => {
			this.$refs.LiuheGameHallRef._onLoad && this.$refs.LiuheGameHallRef._onLoad({})
		})
	},

	methods:{
		onGameHallInitedSuccess(){
			if(!this.eventChannel) console.error("onGameHallInitedSuccess:event channel faild");
			this.eventChannel.emit("onGameHallInitedSuccess")
		}

	}
}
</script>
<style lang="scss" scoped></style>