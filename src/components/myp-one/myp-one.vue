<template>
	<view class="code-box" :class="['theme-' + themeColor.name]">
		<view class="flex-box">
			<input ref="inputRef" :value="inputValue" type="number" inputmode="numeric" :focus="autoFocus" :maxlength="maxlength"
				class="hide-input" @focus="onFocus" @input="getVal" />
			<block v-for="(item, index) in ranges" :key="index">
				<view :class="['item', getClass(item, index)]">
					<view class="line" v-if="type !== 'middle'"></view>
					<view v-if="type === 'middle' && codeIndex <= item" class="bottom-line"></view>
					<block v-if="isPwd && codeArr.length >= item">
						<text class="dot dot-xin" v-if="type === 'xin'">*</text>
						<text class="dot" v-else>.</text>
					</block>
					<block v-else> {{ codeArr[index] ? codeArr[index] : '' }}</block>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	// 支持使用 v-model
	// 支持使用refs
	// 打个广告：
	// 全新的 UI 组件来袭：mypUI-nvue页面，uni-app模式，一套组件对应mp/h5/app
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: 'mypOneInput',
		props: {
			// 支持外部提供，支持使用v-model
			// 支持通过value来做清空
			value: {
				type: String,
				default: ''
			},
			// 4/6
			maxlength: {
				type: Number,
				default: 4
			},
			autoFocus: {
				type: Boolean,
				default: true
			},
			isPwd: {
				type: Boolean,
				default: false
			},
			// middle-middle line, bottom-bottom line, box-square box
			type: {
				type: String,
				default: "bottom"
			}
		},
		watch: {
			maxlength: {
				immediate: true,
				handler: function(newV) {
					if (newV === 6) {
						this.ranges = [1, 2, 3, 4, 5, 6]
					} else {
						this.ranges = [1, 2, 3, 4]
					}
				}
			},
			value: {
				immediate: true,
				handler: function(newV) {
					if (newV !== this.inputValue) {
						this.inputValue = newV
						this.toMakeAndCheck(newV)
					}
				}
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		data() {
			return {
				inputValue: '',
				codeIndex: 1,
				codeArr: [],
				ranges: [1, 2, 3, 4]
			}
		},

		methods: {
			getClass(item, index) {
				return {
					active: this.codeIndex === item,
					green: this.codeIndex >= item,
					middle: this.type === 'middle',
					bottom: this.type === 'bottom',
					box: this.type === 'box',
					border: !!this.codeArr[index],
				}
			},
			onFocus(){
				const input = this.$refs.inputRef;
				// 触发input元素的focus事件
				if (input) {
					input._focus();
				}
			},
			getVal(e) {
				const val = e.detail.value
				this.inputValue = val
				this.$emit('input', val)
				this.toMakeAndCheck(val)
			},
			toMakeAndCheck(val) {
				const arr = val.split('')
				this.codeIndex = arr.length + 1
				this.codeArr = arr
				if (this.codeIndex > Number(this.maxlength)) {
					this.$emit('finish', this.codeArr.join(''))
				}
			},
			// refs 时不再提供 v-model 支持
			// 支持使用refs来设置value
			// 没有提供数据保护与检测，自己在外面对数据进行检测保护
			set(val) {
				this.inputValue = val
				this.toMakeAndCheck(val)
			},
			// 支持使用refs来清空
			clear() {
				this.inputValue = ''
				this.codeArr = []
				this.codeIndex = 1
			}
		}
	}
</script>

<style scoped>
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.2;
		}
	}

	.code-box {
		text-align: center;
	}

	.flex-box {
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
		position: relative;
	}

	.flex-box .hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 0;
	}

	.flex-box .item {
		position: relative;
		/* flex: 1; */
		height: 86rpx;
		width: 86rpx;
		border-radius: 24rpx;
		border: 2rpx solid #A1A1A1;
		margin-right: 20rpx;
		font-size: 70upx;
		font-weight: bold;
		color: #404040;
		line-height: 100upx;
		background: #fff;
	}

	.flex-box .item:last-child {
		margin-right: 0;
	}

	.flex-box .middle {
		border: none;
	}

	.flex-box .box {
		box-sizing: border-box;
		/* 	border: 2upx solid #cccccc;
		border-radius: 10rpx; */
	}

	.flex-box .bottom {
		box-sizing: border-box;
		border-bottom: 8rpx solid #212121;
	}

	.flex-box .green {
		border-color: var(--theme-color);
	}

	.flex-box .active .line {
		display: block;
	}

	.flex-box .line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2upx;
		height: 40upx;
		background: #404040;
		animation: twinkling 1s infinite ease;
	}

	.flex-box .dot {
		font-size: 80upx;
		line-height: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex-box .dot-xin {
		font-size: 36rpx;
		line-height: 100rpx;
	}

	.flex-box .bottom-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
