<template>
	<!-- v-if="isShowMiPai" -->
	<view class="mi-pai" :class="['theme-' + themeColor.name]" v-if="isShowMiPai">
		<view class="back"></view>
		<view class="mi-pai-content" :style="{marginTop:`calc( ( ${this.uWindowHeight}px -  1006rpx )/2 ) `}">
			<image class="header-img" src="@/static/img/liuhe/mipai/header.png"></image>
			<image class="close-img" src="@/static/img/liuhe/mipai/close.png" @click="closeMiPai"></image>
			<view class="yours">
				<image class="yours-header-img" src="@/static/img/liuhe/mipai/yours-header.png"></image>
				<view class="yours-title">
					<view class="title">你的注单</view>
					<view class="term">
						{{ `${$t("pages.liuhe.common.text1")}${headInfo.shorNo ? headInfo.shorNo : ''}${$t("pages.liuhe.liuhePlaying.text2")}` }}
					</view>
				</view>
				<view class="your-betting">
					<scroll-view scroll-y style="height:300rpx" class="list" v-if="yourBettingList.length > 0">
						<view class="list-item" :key="index" v-for="(item, index) in yourBettingList">
							<view class="play">{{ item.secondPlayName }}@{{ item.betValue }}</view>
							<view class="amount">{{ setAmount(item.betAmount) }}元</view>
						</view>
					</scroll-view>
					<view class="no-betting" v-else>本期未下注</view>
				</view>
			</view>
			<view class="result-content">
				<image class="result-header-img" src="@/static/img/liuhe/mipai/result-header.png"></image>
				<view class="result-title">
					<view class="title">开奖结果</view>
					<view class="term">
						{{ `${$t("pages.liuhe.common.text1")}${headInfo.shorNo ? headInfo.shorNo : ''}${$t("pages.liuhe.liuhePlaying.text2")}` }}
					</view>
				</view>
				<view class="result-box">
					<view class="number-list" :data-lotteryType="this.headInfo.lotteryTypeId" v-show="readyState">
						<view class="list">
							<!-- <view v-for="(item, key) in [34,21,34,65,77,85,32,12,85,32,12,85,32,12,85,32,12,85,32,12]" -->
							<view v-for="(item, key) in this.headInfo.lotteryResult.split(',')"
								:style="{marginTop:key>4?'20rpx':0}" class="item-style"
								style="width:20%;display:flex;align-items: center;justify-content: center;">
								<view class="number-list-item">
									{{ item }}
								</view>
								<image class="plus" v-if="key === 5 && headInfo.lotteryTypeId === 4"
									src="@/static/img/liuhe/mipai/plus+.png"></image>
							</view>
						</view>
					</view>
					<canvas :style="{ 'width': width + 'px', 'height': height + 'px' }" canvas-id="myCanvas"
						id="myCanvas" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove"
						@mousedown="mouseStart" @mouseup="mouseEnd" @mousemove="mouseMove"
						@error="canvasIdErrorCallback"></canvas>

				</view>
			</view>
			<text class="auto-close-label" v-if="autoCloseTime > 0">{{ Math.ceil(stayTime / 1000) }}秒后自动关闭</text>
		</view>
	</view>
</template>
<script>
	import Playing from '@/utils/common/playing';
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import systemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "MiPai",
		props: {
			headInfo: {},
			isShowMiPai: {},
			yourBettingList: {},
			//@mrz 新增参数 如果当前咪牌配置此参数大于0毫秒 则会在 autoClose 毫秒后关闭
			autoCloseTime: {
				type: Number,
				default: 0
			}
		},
		computed: {
			...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(systemInfoStore, ["uWindowHeight"]),
		},
		data() {
			return {
				width: 320,
				height: 117,
				playing: new Playing(),
				disabled: false, // 是否禁止刮卡
				readyState: false, // 是否开始绘制
				endState: false, // 结束刮卡状态

				watermark: '', // 水印文字
				watermarkColor: '#c5c5c5', // 水印文字颜色
				watermarkSize: 14, // 水印文字大小

				titleColor: '#404040', // 提示文字颜色
				titleSize: 24, // 提示文字大小

				startX: 0, // 触摸x轴位置
				startY: 0, // 触摸y轴位置
				touchSize: 20, // 触摸画笔大小
				percentage: 50, // 刮开百分之多少的时候开奖

				stayTime: 0,
				stayTimer: -1,

				canUseTouch: false,
				mouseInDown: false,
				myCanvasBoundData: null,
			}
		},
		methods: {
			setAmount(num) {
				return this.playing.setAmount(num, 2, '.', ',')
			},
			closeMiPai() {
				this.$emit("closeMiPai")
				clearInterval(this.stayTimer);
			},
			init() {
				this.$nextTick(() => {
					let content = uni.createSelectorQuery().select(".result-box");
					content.boundingClientRect((data) => {
						this.width = data.width - 10;
						this.height = data.height - 22;
						this.ctx = uni.createCanvasContext('myCanvas', this);
						setTimeout(e => {
							this.initCanvas();
						}, 20);
					}).exec()
				})
				if (this.autoCloseTime > 0) {
					this.startRunAutoClose();
				}
			},
			initCanvas() {
				this.endState = false;
				this.readyState = false;
				this.ctx.clearRect(0, 0, this.width, this.height); // 清除画布上在该矩形区域内的内容(x,y,宽，高)。
				this.ctx.setFillStyle('#6F777C'); // 填充颜色
				this.ctx.fillRect(0, 0, this.width, this.height); // 填充区域（x,y,宽,高）
				var fillImg = require('@/static/img/liuhe/mipai/Mask.png');
				this.ctx.drawImage(fillImg, 0, 0, this.width, this.height)


				/**
				 * 绘制文字水印
				 */
				let width = this.watermark.length * this.watermarkSize;
				this.ctx.save(); // 保存当前的绘图上下文。
				this.ctx.rotate(-10 * Math.PI / 180); // 以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
				let x = 0;
				let y = 0;
				let i = 0;
				while ((x <= this.width * 5 || y <= this.height * 5) && i < 300) {
					this.ctx.setFillStyle(this.watermarkColor); // 填充颜色
					this.ctx.setFontSize(this.watermarkSize); // 设置字体的字号
					this.ctx.fillText(this.watermark, x, y); // 填充的文本（文字，x，y）
					x += width + width * 1.6;
					if (x > this.width && y <= this.height) {
						x = -Math.random() * 100;
						y += this.watermarkSize * 3;
					}
					i++;
				}
				this.ctx.restore(); // 恢复之前保存的绘图上下文。

				/**
				 * 绘制标题
				 */
				this.ctx.setTextAlign("center"); // 用于设置文字的对齐
				this.ctx.setTextBaseline("middle"); // 用于设置文字的水平对齐
				this.ctx.setFillStyle(this.titleColor); // 填充颜色
				this.ctx.setFontSize(this.titleSize); // 设置字体的字号
				this.ctx.fillText("刮奖区", this.width / 2, this.height / 2); // 填充的文本（文字，x，y）

				this.ctx.draw(); // 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
				this.readyState = true; // 完成绘制
			},
			// 手指触摸动作开始
			touchstart(e, from = "sys") {
				if (from == "sys") {
					this.canUseTouch = true;
				}
				if (this.disabled || this.endState) {
					return;
				}
				this.startX = e.touches[0].x;
				this.startY = e.touches[0].y;
			},
			//兼容mouse事件 如果touch失效 则使用mouse事件
			mouseStart(e) {
				let _this = this;
				if (this.canUseTouch) return;
				this.mouseInDown = true;
				if (this.myCanvasBoundData) {
					this.touchstart({
						touches: [{
							x: e.clientX - this.myCanvasBoundData.left,
							y: e.clientY - this.myCanvasBoundData.top
						}]
					}, "mouse");
				} else {
					let content = uni.createSelectorQuery().select("#myCanvas");
					content.boundingClientRect((data) => {
						if (data) {
							_this.myCanvasBoundData = data;
							_this.touchstart({
								touches: [{
									x: e.clientX - _this.myCanvasBoundData.left,
									y: e.clientY - _this.myCanvasBoundData.top
								}]
							}, "mouse");
						}
					}).exec()
				}
			},


			// 手指触摸后移动
			touchmove(e, from = "sys") {
				if (this.disabled || this.endState) {
					return;
				}
				this.ctx.clearRect(this.startX, this.startY, this.touchSize, this.touchSize); // 清除画布上在该矩形区域内的内容(x,y,宽，高)。
				this.ctx.draw(true); // false:本次绘制是否接着上一次绘制，true:保留当前画布上的内容
				//记录移动点位
				this.startX = e.touches[0].x;
				this.startY = e.touches[0].y;
			},

			//兼容mouse事件 如果touch失效 则使用mouse事件 doMove
			mouseMove(e) {
				let _this = this;
				if (this.canUseTouch) return;
				if (this.mouseInDown != true) return;
				if (this.myCanvasBoundData) {
					this.touchmove({
						touches: [{
							x: e.clientX - this.myCanvasBoundData.left,
							y: e.clientY - this.myCanvasBoundData.top
						}]
					}, "mouse");
				} else {
					let content = uni.createSelectorQuery().select("#myCanvas");
					content.boundingClientRect((data) => {
						if (data) {
							_this.myCanvasBoundData = data;
							_this.touchmove({
								touches: [{
									x: e.clientX - _this.myCanvasBoundData.left,
									y: e.clientY - _this.myCanvasBoundData.top
								}]
							}, "mouse");
						}
					}).exec()
				}

				//this.touchmove({touches:[{x:e.clientX,y:e.clientY}]},"mouse");
			},

			// 手指触摸动作结束
			touchend(e) {
				if (this.disabled || this.endState) {
					return;
				}
				// 返回一个数组，用来描述 canvas 区域隐含的像素数据，在自定义组件下，第二个参数传入自定义组件实例 this，以操作组件内 <canvas> 组件。
				uni.canvasGetImageData({
					canvasId: 'myCanvas',
					x: 0,
					y: 0,
					width: this.width,
					height: this.height,
					success: (res) => {
						let pixels = res.data;
						let transPixels = [];
						for (let i = 0; i < pixels.length; i += 4) {
							if (pixels[i + 3] < 128) {
								transPixels.push(pixels[i + 3]);
							}
						}
						let percent = (transPixels.length / (pixels.length / 4) * 100).toFixed(2);
						if (percent >= this.percentage) {
							this.success();
						}
					},
					fail: (e) => {},
				}, this);
			},

			//兼容mouse事件 如果touch失效 则使用mouse事件 doEnd
			mouseEnd(e) {
				if (this.canUseTouch) return;
				this.mouseInDown = false;
				this.touchend(e);
				//if (this.mouseInDown != true) return;
			},

			// 成功，清除所有图层
			success: function(e) {
				if (this.endState) {
					return;
				}
				this.endState = true;
				this.ctx.moveTo(0, 0); // 把路径移动到画布中的指定点，不创建线条。用 stroke() 方法来画线条。
				this.ctx.clearRect(0, 0, this.width, this.height); // 清除画布上在该矩形区域内的内容(x,y,宽，高)。
				this.ctx.stroke(); // 画出当前路径的边框。默认颜色色为黑色。
				this.ctx.draw(true);
			},

			// 重置
			reset() {
				this.initCanvas();
				if (this.autoCloseTime > 0) {
					this.startRunAutoClose();
				}
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			},
			/**
			 * 自动关闭容器逻辑
			 */
			startRunAutoClose() {
				let _this = this;
				clearInterval(this.stayTimer);
				this.stayTime = this.autoCloseTime;
				this.stayTimer = setInterval(function() {
					_this.stayTime -= 1000;
					if (_this.stayTime <= 0) {
						_this.closeMiPai();
					}
				}, 1000);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mi-pai {
		//background: rgba(0, 0, 0, 0.5);
		position: absolute;
		z-index: 90000;
		height: var(--vh);
		width: 100%;
		display: flex;
		justify-content: center;
		//align-items: center;
		/*padding-top: calc( ( 100vh - 1006rpx ) / 2);*/

		.back {
			backdrop-filter: blur(5px);
			background: rgba(0, 0, 0, 0.5);
			height: var(--vh);
			width: 100%;
			position: absolute;
			top: 0px;
			left: 0px;
		}

		.mi-pai-content {
			width: 600rpx;
			height: 1006rpx;
			background: #fff;
			border-radius: 24rpx;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;

			.header-img {
				width: 572rpx;
				height: 216rpx;
			}

			.close-img {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}

			.yours {
				width: 540rpx;
				height: 412rpx;
				background: url('@/static/img/liuhe/mipai/yours-bg.png') no-repeat;
				background-size: 100% 100%;
				position: relative;
				padding: 20rpx 0;
				box-sizing: border-box;

				.yours-header-img {
					width: 100%;
					height: 20rpx;
					position: absolute;
					top: 0;
				}

				.yours-title {
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 20rpx;

					.title {
						font-size: 30rpx;
						color: #fff;
						display: flex;
						align-items: center;

						&::before {
							content: '';
							width: 6rpx;
							height: 24rpx;
							border-radius: 6rpx;
							background: #fff;
							margin-right: 14rpx;
						}
					}

					.term {
						font-size: 30rpx;
						color: #248ECC;
						;
					}
				}

				.your-betting {
					display: flex;
					justify-content: center;

					.list {

						.list-item {
							background: #fff;
							width: 500rpx;
							height: 58rpx;
							font-size: 28rpx;
							box-sizing: border-box;
							margin: 0 auto 20rpx auto;
							color: #404040;
							border-radius: 16rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 20rpx;
						}
					}



					.no-betting {
						width: 500rpx;
						height: 56rpx;
						border-radius: 16rpx;
						font-size: 28rpx;
						color: #007ABC;
						display: grid;
						place-content: center;
						background: #fff;
					}
				}
			}

			.result-content {
				background: url('@/static/img/liuhe/mipai/result-bg.png') no-repeat;
				background-size: 100% 100%;
				width: 540rpx;
				height: 328rpx;
				margin-top: 20rpx;
				position: relative;
				padding: 20rpx 0;
				box-sizing: border-box;

				.result-header-img {
					width: 100%;
					height: 20rpx;
					position: absolute;
					top: 0;
				}

				.result-title {
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 20rpx;

					.title {
						font-size: 30rpx;
						color: #fff;
						display: flex;
						align-items: center;

						&::before {
							content: '';
							width: 6rpx;
							height: 24rpx;
							border-radius: 6rpx;
							background: #fff;
							margin-right: 14rpx;
						}
					}

					.term {
						font-size: 30rpx;
						color: #248ECC;
						;
					}
				}

				.result-box {
					background: url('@/static/img/liuhe/mipai/Vector.png') no-repeat;
					background-size: 100% 100%;
					//bottom: 78rpx;
					width: 500rpx;
					height: 208rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 0 auto;
					position: relative;

					.item-style {
						position: relative;
					}

					.number-list {
						display: flex;
						justify-content: center;
						position: absolute;
						align-items: center;
						width: 480rpx;
						word-wrap: break-word;

						.list {
							width: 100%;
							display: flex;
							// justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;


							.number-list-item {
								flex-shrink: 0;
								display: grid;
								place-content: center;
								width: 56rpx;
								height: 56rpx;
								border: 1rpx solid var(--theme-auxiliary-color-remind);
								border-radius: 50%;
								font-weight: 600;
								font-size: 34rpx;
								color: var(--theme-auxiliary-color-remind);
							}

							.plus {
								position: absolute;
								right: -20rpx;
								width: 40rpx;
								height: 40rpx;
							}
						}
					}

					.number-list[data-lotteryType="31"] {
						.item-style {
							width: auto !important;

							margin-top: 10rpx !important;
						}

						.number-list-item {
							width: 26px !important;
							height: 26px !important;
							font-size: 18px !important;
						}

						.list {
							flex-wrap: wrap;
							justify-content: space-between;
						}
					}
				}
			}

			.modal-close {
				width: 80rpx;
				height: 80rpx;
				background-image: url("@/static/img/liuhe/modal-close.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				position: absolute;
				bottom: -108rpx;
			}

			.auto-close-label {
				position: absolute;
				bottom: -100rpx;
				color: #fff;
			}
		}
	}
</style>
