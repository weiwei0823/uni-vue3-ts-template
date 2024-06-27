<template>
	<web-view id="ifreme-chat-room" v-if="chatRoomUrl" :fullscreen="isFullscreen"
		:style="style" :src="chatRoomUrl"></web-view>
</template>
<script>
	import {
		mapGetters
	} from 'pinia';
  import LotteryStore from "@/store/modules/LotteryStore";

	export default {
		props: {
			style: {
				type: Object,
				default () {
					return {};
				}
			},
			chatRoomUrl: '',
			isFullscreen: {},
		},
		created(){
			console.log("聊天室created");

		},

		mounted() {
			console.log("聊天室mounted");
			this.startWatchWebviewMessage();
		},

		data() {
			return {};
		},

		computed:{
      ...mapState(LotteryStore, ["lotteryMapIdToInfo", "inLotteryId"]),
		},


		methods: {

			startWatchWebviewMessage() {
				let that=this;

				if(window.chatRoomWebViewListenInstance){
					window.removeEventListener("message",window.chatRoomWebViewListenInstance)
				}
				window.addEventListener("message",this.onMessageListen)
				window.chatRoomWebViewListenInstance = this.onMessageListen;

			},

			onMessageListen(a){
					let that=this;
					let data = a.data ? a.data.type : '';
					console.log("on message",a);
					//延时 给界面刷新时间
					if(data=="mk"){
						let btnMsg = null;
						try {
							btnMsg =JSON.parse(a.data.message.content);
						}catch (e) {
						}
						console.log(btnMsg,this.lotteryMapIdToInfo)
						if(!btnMsg||!btnMsg['btnURI']){
							console.error("click game message is null");
							return;
						}
						let betURI = btnMsg.btnURI;
						let lotteryId = betURI.lotteryId;
						let lotteryGameInfo = this.lotteryMapIdToInfo[lotteryId];
						if(!lotteryGameInfo){
							console.error("click game info is null");
							return;
						}
						return this.askToJumpGame(lotteryGameInfo);
					}
					if(data=='on-input-focus'||data=='on-input-blur'){
						setTimeout(function() {
							that.$emit("onInputChange", {
								isOpen: data == 'on-input-focus'
							});
						}, 200)
					}
			},

			/**
			 * 询问用户并且决定是否跳转到对应游戏
			 * @param lotteryGameInfo
			 * @returns {Promise<void>}
			 */
		    async askToJumpGame(lotteryGameInfo){
		    	let that=this;
				//同一个游戏 不做特殊处理
		    	if(this.inLotteryId==lotteryGameInfo.lotteryId){
					uni.$emit('showPop', {
						refName: 'AlertMsg',
						data: {
							title: `温馨提示`, //this.$t("pages.liuhe.shishicai.text22"),
							content: `您当前正处于${lotteryGameInfo.name},切换至下注区即可`//this.$t("pages.liuhe.shishicai.text23")
						},
						confirm: () => {
							that.$emit("backToBet");
						},
					})
					return ;
				}
				uni.$emit('showPop', {
					refName: 'AlertMsg',
					data: {
						title: `温馨提示`, //this.$t("pages.liuhe.shishicai.text22"),
						content: `是否确认${lotteryGameInfo.name}进行跟投?`//this.$t("pages.liuhe.shishicai.text23")
					},
					confirm: () => {
						that.$config.gameRouterMgr.doJumpLotteryGameAndUpdateGameTitle(lotteryGameInfo);
					},
				})

			}

		}
	}
</script>
