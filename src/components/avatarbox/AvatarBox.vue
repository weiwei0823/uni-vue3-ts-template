<template>
	<view class="avatar-box">
		<image v-show="status==statusEnum.success" :class="className" :style="caculStyles" @load="onImageLoadSuccess"
			@error="onImageLoadError" :src="avatarUrl"></image>
		<image v-show="status==statusEnum.error" :class="className" :style="caculStyles"
			src="@/static/img/common/userCenter/no-login.png"></image>
	</view>
</template>

<script>
	export default {
		name: "AvatarBox",
		desc: "",
		props: {
			avatarUrl: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: null
			},
			size: {
				type: Number,
				default: 30
			},
			radius: {
				type: Number,
				default: 0
			}
		},
		computed: {
			caculStyles() {
				if (this.className) return {};
				let styles = {
					width: `${this.size}rpx`,
					height: `${this.size}rpx`,
					'border-radius': `${this.radius}rpx`
				};
				return styles;
			}
		},
		mounted() {
		},

		watch: {
			//预留动态切换监听更新状态
			avatarUrl(url) {}
		},

		data() {
			this.statusEnum = {
				success: 1,
				error: -1,
				unloading: -1,
			};
			return {
				status: -1
			}
		},

		methods: {
			init() {
				this.status = this.statusEnum.unloading;
			},

			onImageLoadSuccess() {
				this.status = this.statusEnum.success;
			},
			onImageLoadError() {
				this.status = this.statusEnum.error;
			}
		}
	}
</script>

<style scoped>
</style>
