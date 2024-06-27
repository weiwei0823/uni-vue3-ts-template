<template>
	<Safari ref="safari" :zIndex="zIndex" @open="open" @close="handleClose"></Safari>
</template>

<script>
import {mapState} from 'pinia';
import Safari from './save/safari.vue';
import useAppInfoStore from "@/store/modules/appInfoStore";

export default {
		name: "SaveH5",
		components: {
			Safari
		},
		props: {
			zIndex: {
				type: [Number, String],
				default: () => {
					return 10075
				}
			},
		},
		data() {
			return {
				show: false,
				callback: null,

			}
		},
		computed: {
      ...mapState(useAppInfoStore, ['themeColor', 'contantsConfigTypeMap']),
		},
		methods: {
			broName() {
				const isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)
				if (isMobile && browserPlatform() !== browserPlatform.FLUTTER_App) {
					const userAgent = navigator.userAgent.toLowerCase();
					if (userAgent.indexOf("safari") > -1) {
						return "safari";
					}
				}
				return null;
			},
			open(data, args) {
				if (!args) return;
				const callback = args.callback ?? null
				this.callback = callback
				let browsName = this.broName();
        // 添加config配置控制, is_open_dialog默认为1开启
        if (+this.contantsConfigTypeMap?.is_open_dialog?.url === 0) {
          this.handleClose();
          return;
        }
				if (window.sessionStorage.getItem("bindPopSafari")) {
					this.handleClose();
					return;
				}
				if (window.navigator.standalone) {
					this.handleClose();
					return;
				}
				if (browsName) {
					this.$refs[browsName] && this.$refs[browsName].open(data, callback)
				} else {
					this.handleClose()
				}
			},
			handleClose() {
				this.$emit('close')
				window.sessionStorage.setItem("bindPopSafari", true)
				this.callback && this.callback({
					type: 'close'
				})

			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
