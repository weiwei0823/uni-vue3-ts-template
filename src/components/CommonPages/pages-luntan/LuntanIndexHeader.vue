<template>
	<view>
		<Header :title="title" :isBack="false" :isFixed="true" :onlyDownload="true">
			<block slot="left" v-if="$config.station != $config.enumMgr.STATION.LUNTAN">
				<view @click="showDrawer">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<g clip-path="url(#clip0_1853_110044)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M0 3.27279C0 2.6703 0.488417 2.18188 1.09091 2.18188L22.9091 2.18189C23.5116 2.18189 24 2.6703 24 3.2728C24 3.87529 23.5116 4.3637 22.9091 4.3637L1.09091 4.3637C0.488417 4.3637 0 3.87529 0 3.27279ZM0 12.0001C0 11.3976 0.488417 10.9092 1.09091 10.9092L22.9091 10.9092C23.5116 10.9092 24 11.3976 24 12.0001C24 12.6026 23.5116 13.091 22.9091 13.091L1.09091 13.091C0.488417 13.091 0 12.6026 0 12.0001ZM1.09091 19.6364C0.488417 19.6364 0 20.1248 0 20.7273C0 21.3298 0.488417 21.8183 1.09091 21.8183L22.9091 21.8183C23.5116 21.8183 24 21.3298 24 20.7273C24 20.1248 23.5116 19.6364 22.9091 19.6364L1.09091 19.6364Z"
								fill="#404040" />
						</g>
						<defs>
							<clipPath id="clip0_1853_110044">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</view>
			</block>
			<block slot="left" v-else>
				<svg @click="tiaozhuan1('/pages/luntan/liuhePicture/index')" xmlns="http://www.w3.org/2000/svg" width="22"
					height="22" viewBox="0 0 22 22" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M15.6218 15.6218C12.0481 19.1955 6.25396 19.1955 2.68027 15.6218C-0.893423 12.0481 -0.893424 6.25396 2.68027 2.68027C6.25396 -0.893423 12.0481 -0.893423 15.6218 2.68027C19.1955 6.25396 19.1955 12.0481 15.6218 15.6218ZM13.4649 13.4648C11.0824 15.8473 7.21967 15.8473 4.83721 13.4648C2.45475 11.0824 2.45475 7.21964 4.83721 4.83718C7.21967 2.45472 11.0824 2.45472 13.4649 4.83718C15.8473 7.21964 15.8473 11.0824 13.4649 13.4648ZM19.3964 17.2395C18.8007 16.6438 17.8351 16.6438 17.2394 17.2395C16.6438 17.8351 16.6438 18.8008 17.2394 19.3964L19.3964 21.5533C19.992 22.1489 20.9577 22.1489 21.5533 21.5533C22.1489 20.9577 22.1489 19.992 21.5533 19.3964L19.3964 17.2395Z"
						fill="#A1A1A1" />
				</svg>
			</block>
			<block slot="right" v-if="$config.station != $config.enumMgr.STATION.LUNTAN">
				<view style="text-align: right;" @click="handleShowLeftMenu">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M8.20232 13.7587H17.069C17.5774 13.7567 18.0762 13.6197 18.5143 13.3617C18.9524 13.1038 19.3142 12.7341 19.5625 12.2905L23.7867 4.59945C23.9257 4.35342 23.9983 4.07546 23.9973 3.79289C23.9944 3.35389 23.8182 2.9338 23.5072 2.62401C23.1961 2.31423 22.7753 2.13983 22.3363 2.13876H4.17362L3.64867 1H0V3.09569H2.32399L6.65072 12.2249L5.01846 15.1873C4.83911 15.519 4.74515 15.8902 4.74505 16.2673C4.74684 16.8576 4.98196 17.4232 5.39912 17.8409C5.81628 18.2586 6.38166 18.4944 6.97198 18.4969H21.0526V16.4012H7.47642C7.3616 16.4009 7.25158 16.3551 7.17039 16.2739C7.0892 16.1927 7.04342 16.0827 7.04306 15.9679C7.04208 15.8951 7.06048 15.8234 7.09638 15.7601L8.20232 13.7587ZM21.6842 4.18934L17.7635 11.298C17.6933 11.4223 17.5915 11.5258 17.4683 11.5978C17.3451 11.6699 17.2049 11.7079 17.0622 11.7081H8.58647L5.11825 4.18934H21.6842ZM8.50989 19.2707C8.18727 19.2704 7.87182 19.3658 7.60344 19.5448C7.33506 19.7239 7.12581 19.9785 7.00216 20.2765C6.87851 20.5745 6.84602 20.9024 6.9088 21.2189C6.97157 21.5353 7.12679 21.8261 7.35482 22.0543C7.58285 22.2825 7.87345 22.438 8.18985 22.501C8.50625 22.5641 8.83423 22.5318 9.13232 22.4084C9.43041 22.285 9.6852 22.076 9.86446 21.8078C10.0437 21.5395 10.1394 21.2242 10.1394 20.9016C10.1396 20.6874 10.0976 20.4754 10.0158 20.2775C9.93396 20.0797 9.81396 19.8999 9.66262 19.7484C9.51129 19.597 9.33159 19.4768 9.1338 19.3948C8.93601 19.3129 8.724 19.2707 8.50989 19.2707ZM16.3184 19.5448C16.5868 19.3658 16.9022 19.2704 17.2249 19.2707C17.439 19.2707 17.651 19.3129 17.8488 19.3948C18.0466 19.4768 18.2263 19.597 18.3776 19.7484C18.5289 19.8999 18.6489 20.0797 18.7307 20.2775C18.8125 20.4754 18.8546 20.6874 18.8544 20.9016C18.8544 21.2242 18.7587 21.5395 18.5794 21.8078C18.4002 22.076 18.1454 22.285 17.8473 22.4084C17.5492 22.5318 17.2212 22.5641 16.9048 22.501C16.5884 22.438 16.2978 22.2825 16.0698 22.0543C15.8418 21.8261 15.6865 21.5353 15.6238 21.2189C15.561 20.9024 15.5935 20.5745 15.7171 20.2765C15.8408 19.9785 16.05 19.7239 16.3184 19.5448Z"
							fill="#404040" />
					</svg>
				</view>
			</block>
		</Header>
		<uni-drawer ref="showLeft" mode="left" :width="80" v-if="showLeftDrawer">
			<header-drawer @close="closeDrawer" />
		</uni-drawer>
		<LeftMenu ref="LeftMenu" v-if="showLeftMenu"/>
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import headerDrawer from '@/components/CommonPages/pages-liuhe/components/drawer.vue';
import LeftMenu from '@/pages/liuhe/common/LeftMenu.vue';
export default {
	components: {
		Header,
		headerDrawer,
		LeftMenu
	},
	props: {
		title: String,
		lotterytype: String | Number
	},
	data() {
		return {
			isApp: false,
      // 首页刚开始不加载这个组件，点击后调用加载
      showLeftDrawer: false,
      // 首页刚开始不加载这个组件，点击后调用加载
      showLeftMenu: false
		}
	},
	mounted() {
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
	},
	methods: {
		tiaozhuan1: function (item) {
			var lotterytype = this.lotterytype
			uni.navigateTo({
				url: item,
				success: function (res) {
					res.eventChannel.emit('argParams', {
						lotteryType: lotterytype,
					})
				}
			})
		},
		showDrawer() {
      // 第一次需要等组件加载
      if (!this.showLeftDrawer) {
        this.showLeftDrawer = true;
        this.$nextTick(() => {
          this.$refs.showLeft.open();
        });
      } else {
        this.$refs.showLeft.open();
      }
		},

		closeDrawer() {
			this.$refs.showLeft.close();
		},
		handleShowLeftMenu() {
      // 第一次需要等组件加载
      if (!this.showLeftMenu) {
        this.showLeftMenu = true;
        this.$nextTick(() => {
          this.$refs.LeftMenu.open();
        });
      } else {
        this.$refs.LeftMenu.open();
      }
		},
	}
}
</script>

<style lang="scss" scoped>
/deep/ .uni-drawer {
	max-width: 480px;
	margin: auto;
}

/deep/ .uni-drawer__content {
	max-width: 384px;
}

/deep/ .back-title {
	padding-top: 20rpx !important;
}
</style>
