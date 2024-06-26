<template>
	<view class="input" :class="{ fail: verifyState.fail }">
		<view class="title">
			<text>请在下图依次点击</text>
			<view class="icon-list">
				<image class="img" :src="`/static/img/verify/select/imgs/${item}.svg`" v-for="item in verifyImgs">
				</image>
			</view>
		</view>
		<view class="display-text" id="displayImg" style="margin-top:40rpx;">
			<image class="img" :src="`/static/img/verify/select/img${imgkey}.png`"></image>
			<view class="selected" v-show="item.selected" v-for="(item, index) in checkedImgs" :style="{
                left: `calc(${item.posi.left} +  12rpx)`,
                top: `calc(${item.posi.top} +  12rpx)`
            }">
				{{ index + 1 }}
			</view>
			<image :src="`/static/img/verify/select/imgs/${item.key} copy.svg`" class="text"
				v-for="(item, index) in chooseImgs" :style="{
                    transform: `rotate(${item.rotate}deg)`,
                    left: item.posi.left,
                    top: item.posi.top
                }" @click="handleAddCheckedImgs(item)">
			</image>
			<view class="message" :class="{ success: verifyState.success, fail: verifyState.fail }"
				:style="{ opacity: verifyState.show ? 1 : 0 }">
				{{ verifyState.status }}
			</view>
		</view>
		<view class="btn" style="margin-top:40rpx;" :class="{ dis: checkedImgs.length < verifyImgs.length }">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgkey: Math.floor(Math.random() * 4) + 1,
				chooseImgs: [],
				checkedImgs: [],
				verifyImgs: [],
				verifyState: {
					show: false,
					success: false,
					fail: false,
					status: ''
				},
				startTime: ''
			}
		},
		mounted() {
			this.loadData()
		},
		methods: {
			loadData() {
				const imgs = [
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9],
					[10, 11, 12]
				]
				this.imgkey = Math.floor(Math.random() * 4) + 1
				this.verifyImgs = imgs[this.imgkey - 1]
				const query = uni.createSelectorQuery().in(this);
				query.select('#displayImg').boundingClientRect(data => {
					const {
						width,
						height
					} = data
					this.chooseImgs = this.verifyImgs.map(key => {
						const left = Math.min(230, Math.floor(Math.random() * (width - 48)))
						const top = Math.min(120, Math.floor(Math.random() * (height - 60)))

						return {
							key,
							rotate: Math.floor(Math.random() * 360),
							posi: {
								left: left + 'px',
								top: top + 'px'
							},
							selected: false
						}
					})
					this.checkedImgs = []
				}).exec();
			},
			handleAddCheckedImgs(item) {
				if (this.checkedImgs.length === 0) {
					this.startTime = new Date().getTime()
				}
				item.selected = true
				if (this.checkedImgs.length < this.verifyImgs.length) {
					this.checkedImgs.push(item)
				}
				if (this.checkedImgs.length >= this.verifyImgs.length) {
					this.confirm()
				}
			},
			confirm() {
				setTimeout(() => {
					this.verifyState = {
						show: false,
						success: false,
						fail: false,
						status: ''
					}
				}, 2000);
				// 验证失败
				if (this.checkedImgs.map(item => item.key).toString() !== this.verifyImgs.toString()) {
					pop(this.$t('components.common.alert.alertboxs.verify.Select.IncorrectInput'), 1000)
					this.loadData()
					this.verifyState = {
						show: true,
						success: false,
						fail: true,
						status: '验证失败，请重新尝试'
					}
					return
				}
				const time = ((new Date().getTime() - this.startTime) / 1000).toFixed(1)
				this.verifyState = {
					show: true,
					success: true,
					fail: false,
					status: `${time}秒的速度，超过99%的用户`
				}
				uni.showLoading({
					title: this.$t('components.common.alert.alertboxs.verify.Select.Verifying')
				});
				setTimeout(() => {
					uni.hideLoading();
					this.$emit('success', {
						code: 0,
						message: this.$t('components.common.alert.alertboxs.verify.Select.Success'),
						success: false
					})
				}, 2000);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.input {
		display: flex;
		flex-direction: column;
		// gap: 40rpx;

		.title {
			color: #444;
			text-align: center;
			font-size: 34rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.icon-list {
				display: flex;
				align-items: center;

				.img {
					width: 48rpx;
					height: 48rpx;

					&+.img {
						margin-left: 20rpx;
					}
				}

			}
		}

		.display-text {
			width: 540rpx;
			height: 330rpx;
			position: relative;
			border-radius: 12rpx;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
			}

			.text {
				width: 68rpx;
				height: 68rpx;
				position: absolute;
			}

			.selected {
				position: absolute;
				z-index: 1;
				background: var(--theme-color);
				color: #fff;
				width: 40rpx;
				height: 40rpx;
				border-radius: 40rpx;
				display: grid;
				place-content: center;
				font-size: 20rpx;
				border: 4rpx solid #FFF;
			}

			.message {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 59rpx;
				display: grid;
				place-content: center;
				color: #fff;
				font-size: 28rpx;
				opacity: 0;
				transition: all .3s;
			}

			.success {
				background: var(--theme-color);
			}

			.fail {
				background: var(--theme-auxiliary-color-remind);
			}
		}

		.btn {
			display: grid;
			place-items: center;
			width: 100%;
			height: 86rpx;
			border-radius: 12rpx;
			border: 1px solid #DDD;
			background: var(--theme-color);
			color: #fff;
			font-size: 34rpx;
		}

		.dis {
			background: #A1A1A1;
		}
	}
</style>