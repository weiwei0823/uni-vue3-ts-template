<template>
	<view style="width: 100%;">
		<view style="position: relative;" v-if="isHide">
			<view class="dt-content" :style="'-webkit-line-clamp:' + line">
				<text class="content">
					<slot>{{ dt ? dt : "" }}</slot>
				</text>
			</view>
			<view class="button-show" @tap="isHide = false" v-if="enableButton && lines > line">
				<text :style="`color: ${customColor || themeColor.themeColor}`">{{ expandText }}</text>
			</view>
		</view>
		<view style="position: relative" v-else>
			<view>
				<text class="content">
					<slot>{{ dt ? dt : "" }}</slot>
				</text>
			</view>
			<view class="fold-hint" v-if="foldHint">
				<view @tap="isHide = true" :style="`color: ${customColor || themeColor.themeColor}`">
					{{ foldHint }}
				</view>
			</view>
		</view>
		<view>
			<text class="placeholder">
				{{ placeholder }}
			</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		data() {
			return {
				// 是否隐藏多余行。初始状态不隐藏
				isHide: true,
				// 全量所占文本高度
				textHeight: 0,
				// 单行文本所占高度
				lineHeight: 1,
				// 占位文本
				placeholder: "占位",
				//截取后的字符
				subDt: "",
			};
		},
		props: {
			// 展示多少行
			line: {
				type: [Number, String],
				default: 1,
			},
			// 文本
			dt: {
				type: [String],
				default: "",
			},
			enableButton: {
				type: Boolean,
				default: true,
			},
			// 自定义展开提示
			expandText: {
				type: String,
				default: "展开",
			},
			// 自定义收起提示
			foldHint: {
				type: String,
				default: "收起",
			},
			customColor: {
				type: String,
				default: ""
			}
		},

		watch: {
			dt() {
				let that = this;
				setTimeout(() => {
					let query = uni.createSelectorQuery().in(that);
					// 获取所有文本在html中的高度
					query
						.select(".content")
						.boundingClientRect((data) => {
							that.textHeight = data.height;
						})
						.exec();
				}, 1000);
			},
		},

		mounted() {
			if (this.enableButton) {
				let query = uni.createSelectorQuery().in(this);
				// 获取所有文本在html中的高度
				query
					.select(".content")
					.boundingClientRect((data) => {
						this.textHeight = data.height;
					})
					.exec();

				// 通过占位元素获取单行文本的高度
				query
					.select(".placeholder")
					.boundingClientRect((data) => {
						this.lineHeight = data.height;
					})
					.exec();
			}
			// 获取单行文本高度后，置空占位元素，使其释放占位
			if (this.dt.length > 0) {
				this.subDt = this.dt.slice(0, 65) + "...";
			} else {
				this.subDt = this.dt;
			}
			this.placeholder = "";
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			// 全文本所占总行数
			lines() {
				if (!this.enableButton) {
					return this.line;
				}
				return Math.floor(
					this.textHeight > 0 && this.lineHeight > 0 ?
					this.textHeight / this.lineHeight :
					0
				);
			},
		},
	};
</script>

<style scoped>
	.dt-content {
		overflow: hidden;
		text-overflow: clip;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		color: #404040;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.button-show {
		width: 60rpx;
		position: absolute;
		right: -40rpx;
		bottom: 0;
		z-index: 0;
		text-align: right;
		background-image: linear-gradient(-180deg,
				rgba(233, 236, 239, 0) 50%,
				#fff 80%);
		padding-top: 2rem;
	}

	.fold-hint {
		position: absolute;
		right: -40rpx;
		bottom: 0;
		color: var(--theme-color);
		text-align: right;
	}
</style>
