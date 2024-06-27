<template>
	<view class="chat-room" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<ChatRoom class="room" :chatRoomUrl="chatRoomUrl" :style="style" :isFullscreen="false"
			v-on:onInputChange="pageInputChange" />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import ChatRoom from "../../components/common/chatRoom/index.vue";
	import {
		getChatRoomInfoByTab
	} from "@/utils/lottery/betting";
  import {mapGetters, mapState} from 'pinia';
	import defaultTemplate from '@/utils/defaultTemplate'
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		components: {
			Header,
			ChatRoom,
		},
		data() {
			return {
				title: '聊天室',
				style: "width:100%; height: calc(var(--vh) - 100rpx)",
			};
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor", "chatRoomUrl"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			pageInputChange(e) {}
		},
	};
</script>

<style lang="scss" scoped>
	.close {
		color: #404040;
		text-align: center;
		font-family: MiSans;
		font-size: 44rpx;
		font-style: normal;
		font-weight: 400;
		margin-top: 100rpx;
		line-height: normal;
	}

	.chat-room {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--maxWidth);
		height: calc(var(--vh) - 104rpx);

		.room {
			flex: 1;
		}
	}
</style>
