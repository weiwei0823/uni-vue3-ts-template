<template>
	<view class="betting">
		<view class="left">
			<view class="left-nav">
				<scroll-view scroll-y="true" class="list" :style="setNavLeftStyle()">
					<view :class="item.isDefault === 1 ? 'list-item selected' : 'list-item'"
						v-for="(item, index) in playList" :key="item.id" @click="onSelected(item)">
						<view class="item-left">
							<text :class="item.isDefault === 1 ? 'dots active' : 'dots'"></text>
						</view>
						<view class="type-name">
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="right">
			<!--		 <uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10001">-->
			<tema ref="tema" :missOrMatch="missOrMatch" v-if="playData.id === 10001" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></tema>

			<changlong ref="tema" :missOrMatch="missOrMatch" v-if="playData.id === ''" :play-data="playData"
				@selectedBall="changlongOrder" @onSelectedType="onSelectedType" @open="showRule"></changlong>
			<!--		 </uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10124">-->
			<texiao v-if="playData.id === 10124" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @open="showRule"></texiao>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10138">-->
			<banbo v-if="playData.id === 10138" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></banbo>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10160">-->
			<liuxiao v-if="playData.id === 10160" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></liuxiao>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10187">-->
			<lianma v-if="playData.id === 10187" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></lianma>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10540">-->
			<pingte v-if="playData.id === 10540" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @open="showRule"></pingte>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10554">-->
			<weishu v-if="playData.id === 10554" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></weishu>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10577">-->
			<buzhong v-if="playData.id === 10577" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></buzhong>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10878">-->
			<lianxiao v-if="playData.id === 10878" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></lianxiao>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 10957">-->
			<lianwei v-if="playData.id === 10957" :play-data="playData" @selectedBall="setOrders"
				@onSelectedType="onSelectedType" @open="showRule"></lianwei>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 11013">-->
			<zhengte v-if="playData.id === 11013" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></zhengte>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 11388">-->
			<zhengma v-if="playData.id === 11388" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></zhengma>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 11314">-->
			<zhengma-one-six v-if="playData.id === 11314" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @open="showRule"></zhengma-one-six>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 11571">-->
			<dantuo v-if="playData.id === 11571" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></dantuo>
			<!--		</uni-transition>-->
			<!--		<uni-transition style="height: 100%" ref="ani" :mode-class="modeClass" :show="current === 11685">-->
      <zongxiao  v-if="playData.code === 'lhczongx'" :missOrMatch="missOrMatch" :play-data="playData"
                 @selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></zongxiao>

      <wuxing  v-if="playData.code === 'lhctmwx'" :missOrMatch="missOrMatch" :play-data="playData"
                 @selectedBall="setOrders" @onSelectedType="onSelectedType" @open="showRule"></wuxing>





      <dragon-tiger-one-six v-if="playData.id === 11685" :missOrMatch="missOrMatch" :play-data="playData"
				@selectedBall="setOrders" @open="showRule"></dragon-tiger-one-six>
			<!--		</uni-transition>-->
		</view>
		<view class="miss-match-data-switch" @click="doCutAraeMissAndMatchType">
			{{ missOrMatch == 'miss' ? '遗漏' : '冷热' }}</view>
		<rules-dialog ref="rules" :exampleStr="desc.exampleStr" :helpStr="desc.helpStr" :tipsStr="desc.tipsStr"
			@open="showRule"></rules-dialog>
	</view>
</template>

<script>
	import LeftNav from "./leftNav";
	import Tema from "../playing/tema";
	import Texiao from "../playing/texiao";
	import Banbo from "../playing/banbo";
	import Liuxiao from "../playing/liuxiao";
	import Lianma from "../playing/lianma";
	import Pingte from "../playing/pingte";
	import Weishu from "../playing/weishu";
	import Buzhong from "../playing/buzhong";
	import lianxiao from "../playing/lianxiao";
	import lianwei from "../playing/lianwei";
	import Zhengte from "../playing/zhengte";
	import Zhengma from "../playing/zhengma";
	import ZhengmaOneSix from "../playing/zhengmaOneSix";
	import Dantuo from "../playing/dantuo";
	import DragonTigerOneSix from "../playing/DragonTigerOneSix";
	import Changlong from "../changlong"
  import zongxiao from  '../playing/zongxiao'
  import wuxing from  '../playing/wuxing'
	import RulesDialog from "../common/rulesDialog";
	import Playing from "@/utils/common/playing";
	export default {
		name: "index",
		props: {
			playList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		components: {
			LeftNav,
			Tema,
			Texiao,
			Banbo,
			Liuxiao,
			Lianma,
			Pingte,
			Weishu,
			Buzhong,
			lianxiao,
			lianwei,
			Zhengte,
			Zhengma,
			ZhengmaOneSix,
			Dantuo,
			DragonTigerOneSix,
			RulesDialog,
			Changlong,
      zongxiao,
      wuxing
		},
		watch: {
			playList(newV) {
				newV.length && this.getPlayData(newV)
			}
		},
		data() {
			return {
				current: null,
				playData: {},
				playing: new Playing(),
				contentShow: false,
				modeClass: ['fade', 'slide-bottom'],
				desc: {
					exampleStr: '',
					helpStr: '',
					tipsStr: '',
				},
				missOrMatch: "miss"
				// play: uni.getStorageSync('playList')
			}
		},
		mounted() {

			uni.$emit("on_page_mounted", this)

			this.playList && this.playList.length && this.getPlayData(this.playList)
		},
		methods: {
			showRule(item) {
				this.desc = item;
				this.$refs.rules.open('center');
			},
			setNavLeftStyle() {
				// return this.playing.setCurrentHeight()
			},
			getPlayData(arr) {
				arr.forEach(item => {
					if (item.isDefault === 1) {
						this.onSelected(item)
					}
				})
				// this.play = uni.getStorageSync('playList')
			},
			onSelected(item) {

				this.playList.forEach(i => {
					if (item.code === i.code) {
						i.isDefault = 1
					} else {
						i.isDefault = 0
					}
				})
				this.current = item.id;
				this.playData = item;
				this.$emit('selected', item)
			},
			onSelectedType() {
				this.$emit('onSelectedType')
			},
			setOrders(data) {
				this.$emit("setOrders", data);
			},
			changlongOrder(c, item) {
				this.$emit("changlongOrder", c, item);
			},
			doCutAraeMissAndMatchType() {
				if (this.missOrMatch == "miss") {
					this.missOrMatch = "match";
				} else {
					this.missOrMatch = "miss";
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.betting {
		position: relative;
		height: 100%;

		.left {
			position: absolute;
			left: 0;
			width: 160rpx;
			height: 100%;

			.left-nav {
				width: 160rpx;
				position: relative;
				height: 100%;

				//height: calc(var(--vh) - 320rpx);
				.list {
					height: 100%;

					.list-item {
						display: flex;
						padding-left: 15rpx;

						.type-name {
							text-align: center;
							width: 120rpx;
							height: 100%;
							font-size: 30rpx;
							font-weight: 400;
						}

						.item-left {
							width: 16rpx;
							height: 100%;

							.dots {
								width: 16rpx;
								height: 16rpx;
								background: #81A9C1;
								box-shadow: inset 0px 4rpx 4rpx rgba(0, 0, 0, 0.25);
								border-radius: 100rpx;
								display: inline-block;
								transition: .3s;
								margin: 0 auto;
							}

							.dots.active {
								background: linear-gradient(180deg, #F8F9F9 0%, #FEFD04 100%);
								box-shadow: 0px 1rpx 5rpx rgba(0, 0, 0, 0.25), 0px 4rpx 4rpx rgba(0, 0, 0, 0.25), inset 0px -3rpx 4rpx rgba(0, 0, 0, 0.25);
								border-radius: 100rpx;
								transition: .3s;
							}
						}

						font-size: 30rpx;
						text-align: center;
						letter-spacing: -0.5px;
						color: #16607A;
						height: 104rpx;
						line-height: 104rpx;
						background: #CCDBEE;
						border: 1rpx solid #91B5CB;
						box-shadow: inset 0px 4rpx 3rpx #FFFFFF;
					}

					.list-item.selected {
						background: linear-gradient(180deg, #4E60AE 0%, #318EB9 100%);
						box-shadow: inset 0px 3rpx 2rpx rgba(0, 0, 0, 0.5);
						border: 1rpx solid #91B5CB;
						color: #BAE8FA;
						transition: .3s;

						.type-name {
							font-size: 34rpx;
							transition: .5ms;
						}
					}
				}
			}

		}

		.right {
			position: absolute;
			width: calc(100% - 160rpx);
			height: 100%;
			right: 0;
		}

		.miss-match-data-switch {
			position: absolute;
			z-index: 2;
			width: 78rpx;
			height: 59rpx;
			line-height: 59rpx;
			right: 0px;
			top: -45rpx;
			text-align: center;
			padding: 2px;
			border-radius: 5px 0px 0px 5px;
			background: rgba(9, 121, 158, 0.59);
			opacity: 0.5;
			font-size: 26rpx;
			color: whitesmoke;
		}
	}
</style>