<template>
	<view class="toolbox-warp1 pc-max-width"
		:style="{position: `fixed`,'background-color': '#fff', height:`${uWindowHeight}px`, marginTop: safeHeight,width:'100%'}">
		<Header :title="title" isFixed></Header>
		<scroll-view scroll-y="true" :style="{height:`calc( ${uWindowHeight}px - ${isApp?0:88}rpx)`}" class="content"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="turntable-body" :style="{minHeight:`calc( ${uWindowHeight}px - ${isApp?0:96}rpx)`}">
				<view class="title-box">
				</view>
				<view class="content">
					<view class="num">
						<view class="num-title">{{ titles }}</view>
						<view class="num-item">
							<span v-for="(v, k) in prizeArr">{{ v }}</span>
							<span class="num-color">{{ data.color }}</span>
						</view>
					</view>
					<view class="table-box" @click="startDraw">
						<table border="0">
							<tr v-for="(item, index) in prizeList" :key="index">
								<td v-for="(val, key) in item" :key="key" :colspan="index == 1 && key == 1 ? 2 : 1"
									:rowspan="index == 1 && key == 1 ? 2 : 1">
									<view class="start-btn" v-if="index == 1 && key == 1">
										<!-- <view v-if="isDraw">
										<p><span v-for="(v, k) in prizeArr">{{ v }}</span></p>
										<p>{{ data.color }}</p>
									</view> -->
										<image class="image"
											:src="`/static/img/toolbox/turntable/text${isDraw ? '11' : '22'}.png`">
										</image>
									</view>
									<view class="ani-box" v-else
										:class="{ 'active': actives == val.keys || prizeArr.includes(val.name) }">
										<image mode="aspectFit" :src="val.img"></image>
									</view>
								</td>
							</tr>
						</table>
					</view>
					<view class="footer-text">
						<text class="tit">提示：</text>每期只能进行一次波肖转盘
					</view>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import Notice from "@/components/common/notice/notice";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		animalAndColorWheel
	} from "@/utils/toolbox/index"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "turntable",
		computed: {
			...mapGetters(["uWindowHeight"]),
		},
		components: {
			AlertInjectLayer,
			Header,
			Notice
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: '波肖转盘',
				content: '转转转！转出本期的生肖和波色，激动不如行动，赶紧来转出心目中的生肖和波色！',
				styleContent: {
					'font-size': '24rpx',
					'margin-top': '6rpx',
					'line-height': '28rpx',
					'text-align': 'left',
					'box-sizing': 'border-box',
					padding: '0 20rpx'
				},
				actives: '',
				prizeKeys: ['ma', 'hou', 'niu', 'ji', 'yang', 'tu', 'gou', 'zhu', 'she', 'hu', 'shu', 'long'],
				prizeList: [
					[{
							name: '马',
							keys: 'ma',
							img: '@/static/img/toolbox/turntable/ma.png'
						},
						{
							name: '猴',
							keys: 'hou',
							img: '@/static/img/toolbox/turntable/hou.png'
						},
						{
							name: '牛',
							keys: 'niu',
							img: '@/static/img/toolbox/turntable/niu.png'
						},
						{
							name: '鸡',
							keys: 'ji',
							img: '@/static/img/toolbox/turntable/ji.png'
						},
					],
					[{
							name: '龙',
							keys: 'long',
							img: '@/static/img/toolbox/turntable/long.png'
						},
						{
							name: '龙',
							keys: 'long',
							img: '@/static/img/toolbox/turntable/long.png'
						},
						{
							name: '羊',
							keys: 'yang',
							img: '@/static/img/toolbox/turntable/yang.png'
						},
					],
					[{
							name: '鼠',
							keys: 'shu',
							img: '@/static/img/toolbox/turntable/shu.png'
						},
						{
							name: '兔',
							keys: 'tu',
							img: '@/static/img/toolbox/turntable/tu.png'
						},
					],
					[{
							name: '虎',
							keys: 'hu',
							img: '@/static/img/toolbox/turntable/hu.png'
						},
						{
							name: '蛇',
							keys: 'she',
							img: '@/static/img/toolbox/turntable/she.png'
						},
						{
							name: '猪',
							keys: 'zhu',
							img: '@/static/img/toolbox/turntable/zhu.png'
						},
						{
							name: '狗',
							keys: 'gou',
							img: '@/static/img/toolbox/turntable/gou.png'
						},
					]
				],
				isDraw: false,
				titles: '',
				color: '',
				animals: [],
				prizeArr: [],
				data: {
					color: '',
					title: '',
				},
				winHeight: 0,
				isApp: false
			}
		},
		onShow() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			getAnimalAndColorWheel() {
				let prams = {
					jpushId: Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000,
					create: 1
				}
				animalAndColorWheel(prams).then(res => {
					this.animals = res.result.animals?.split(' ')
					this.titles = res.result.title
					this.color = res.result.color
				}).catch(err => {
					console.log(err)
				})
			},
			startDraw() {
				this.getAnimalAndColorWheel()
				var i = 0;
				var l = 1;
				var pushKey = 0
				this.prizeArr = []
				this.isDraw = true
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					if (i >= this.prizeKeys.length || !this.animals.length) {
						i = 0
						l++
						if (!this.animals.length) {
							l = 1
						}
					}
					this.actives = this.prizeKeys[i]
					if (this.animals.length) {
						if (i === 0 && l % Math.floor(this.prizeKeys.length / this.animals.length) === 0) {
							this.prizeArr.push(this.animals[pushKey])
							pushKey++
						}
						if (pushKey === this.animals.length) {
							clearInterval(this.timer)
							this.actives = ''
							this.data.color = this.color
						}
					}
					i++
				}, 50);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.toolbox-warp1 {
		height: 94vh;
		background: #fff;
	}

	::v-deep .header {
		border-radius: 0;
	}

	.turntable-body {
		position: relative;
		min-height: calc(var(--vh) - 96rpx);
		box-sizing: border-box;
		background-image: url('@/static/img/toolbox/turntable/bg3.png');
		background-size: 100% 100%;
		padding: 28rpx 0;
		border-radius: 24rpx 24rpx 0 0;

		.title-box {
			background: url('@/static/img/toolbox/luck/luck-top-v1.png') no-repeat;
			background-size: 100% 100%;
			margin: 0 28rpx;
			height: 200rpx;
		}

		.content {
			background-image: url('@/static/img/toolbox/turntable/content-bg.png');
			background-size: 100% 100%;
			width: 700rpx;
			height: 1000rpx;
			margin: 20rpx auto;
			position: relative;
		}

		.num {
			text-align: center;
			height: 200rpx;
			padding-top: 44rpx;
			box-sizing: border-box;

			.num-title {
				color: #404040;
				font-size: 28rpx;
			}

			.num-item {
				display: flex;
				align-items: center;
				font-size: 34rpx;
				color: var(--theme-auxiliary-color-remind);
				justify-content: center;

				span+span {
					margin-left: 10rpx;
				}

				.num-color {
					margin-left: 62rpx;
					margin-top: 4rpx;
				}
			}
		}

		.table-box {
			width: 526rpx;
			height: 526rpx;
			margin: 0 auto;

			table {
				border: none;
				width: 100%;
				border-spacing: 0;

				tr {
					width: 134rpx;
					height: 134rpx;
				}

				td {
					width: 124rpx;
					height: 124rpx;
					padding-bottom: 10rpx;
					padding-right: 10rpx;

					&:last-child {
						padding-right: 0;
					}

					.ani-box {
						height: 100%;
						width: 100%;
						box-sizing: border-box;
						background: #fff;

						image {
							display: block;
							height: 100%;
							width: 100%;
						}
					}

					.text-box {
						text-align: center;

						p:first-of-type {
							font-size: 50rpx;
							line-height: 72rpx;
							color: #ffb416;

							span {
								margin-left: 30rpx;
							}

							span:first-of-type {
								margin-left: 0;
							}
						}

						p:nth-of-type(2) {
							color: #fff;
							font-size: 38rpx;
							line-height: 52rpx;
							margin-top: 6rpx;
						}
					}

					.active {
						border: 6rpx solid #ffe007;
					}

					.start-btn {
						height: 258rpx;
						width: 258rpx;
						box-sizing: border-box;
						background: #fff;
						margin: 0 auto;
						display: grid;
						place-content: center;
					}

					.image {
						width: 160rpx;
						height: 180rpx;
					}
				}
			}
		}

		.footer-text {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			line-height: 34rpx;
			bottom: 34rpx;
			color: #fff;
			font-size: 26rpx;
			white-space: nowrap;

			.tit {
				color: var(--theme-auxiliary-color-dot);
			}
		}
	}
</style>
