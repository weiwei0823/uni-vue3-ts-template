<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'}">
		<Header :title="title" isFixed></Header>
		<view class="title-box">
			<p class="sub-title">{{ $t('components.common.notice.notice.text0') }}</p>
			<view class="title">{{ content }}</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx - 170rpx - 10rpx)`}"
			class="cnzodiac-body" :enhanced="true" :bounces="false" :show-scrollbar="false">

			<view class="card-box">
				<view class="line-card-box" v-for="(item, index) in card" :key="index">
					<view class="card-item" v-for="(val, key) in item" :key="key" @click="fanpai(val)">
						<image mode="widthFix" :src="val.show ? val.img : defaultImg"></image>
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
	import {
		animalCard
	} from '@/utils/toolbox/index';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	export default {
		name: "cnzodiac",
		components: {
			AlertInjectLayer,
			Header,
			Notice
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.cnzodiac.title'),
				content: this.$t('pages.luntan.toolBox.cnzodiac.content'),
				styleContent: {
					'font-size': '24rpx',
					'margin-top': 0,
					'line-height': '28rpx',
					'text-align': 'left',
					'box-sizing': 'border-box',
					padding: '0 20rpx'
				},
				defaultImg: '@/static/img/toolbox/card.png',
				cardList: [{
						img: '@/static/img/toolbox/turntable/gou.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text0')
					},
					{
						img: '@/static/img/toolbox/turntable/hou.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text1')
					},
					{
						img: '@/static/img/toolbox/turntable/hu.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text2')
					},
					{
						img: '@/static/img/toolbox/turntable/ji.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text3')
					},
					{
						img: '@/static/img/toolbox/turntable/long.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text4')
					},
					{
						img: '@/static/img/toolbox/turntable/ma.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text5')
					},
					{
						img: '@/static/img/toolbox/turntable/niu.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text6')
					},
					{
						img: '@/static/img/toolbox/turntable/she.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text7')
					},
					{
						img: '@/static/img/toolbox/turntable/shu.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text8')
					},
					{
						img: '@/static/img/toolbox/turntable/tu.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text9')
					},
					{
						img: '@/static/img/toolbox/turntable/yang.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text10')
					},
					{
						img: '@/static/img/toolbox/turntable/zhu.png',
						show: 0,
						name: this.$t('pages.luntan.toolBox.cnzodiac.text11')
					},
				],
				card: [],
				animals: [],
				isShow: false,
				winHeight: 0
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad() {
			this.setCard()
		},
		methods: {
			// 返回min和max之间的一个随机数，包括min和max
			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min) // +1是保证可以取到上限值
			},
			// 洗牌函数
			shuffle() {
				let _arr = this.cardList.slice() // 下面会讲到slice的特别之处
				for (let i = 0; i < _arr.length; i++) {
					let j = this.getRandomInt(0, i)
					let t = _arr[i]
					_arr[i] = _arr[j]
					_arr[j] = t
				}
				return _arr
			},
			//打乱数组
			setCard() {
				this.cardList = this.shuffle()
				this.cardList.forEach((item, index) => {
					const page = Math.floor(index / 3)
					if (!this.card[page]) {
						this.card[page] = []
					}
					this.card[page].push(item)
				})
			},
			//翻牌
			fanpai(item) {
				if (this.animals.length == 3) {
					return false
				}
				item.show = true
				this.animals.push(item)
				if (this.animals.length == 3) {
					let prams = {
						jpushId: Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000,
					}
					const animals = []
					this.animals.forEach((item, index) => {
						animals.push(item.name)
					})
					prams.animals = animals.join(",");
					animalCard(prams).then(res => {
						this.card = []
						this.card[0] = this.animals
						this.isShow = true
					}).catch(err => {

					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-tab-container-item {

		.title-box {
			padding: 20rpx 28rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #fff;
			border-radius: 24rpx;
			color: #404040;
			font-size: 28rpx;
			margin-top: 20rpx;

			.title {
				text-align: center;
			}
		}

		.cnzodiac-body {
			// margin-top: 20rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			position: relative;
			box-sizing: border-box;
			height: calc(var(--vh) - 120rpx);
			border-radius: 24rpx;
			overflow: hidden;


			.card-box {
				padding: 0 28rpx;

				.line-card-box {
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;

					.card-item {
						image {
							display: block;
							width: 190rpx;
						}
					}
				}
			}
		}
	}
</style>
