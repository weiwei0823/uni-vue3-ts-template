<template>

	<div>
		<div class="scroll-temp">
			<div :class="{'temp-box':true}" :ref="refName">
				<div v-for="(v,i) in list" :key="i + '1'" class="li">
					{{v}}
				</div>
				<div v-for="(v,i) in list" :key="i + '2'" class="li">
					{{v}}
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: "noticeScroll",
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			speed: {
				type: Number,
				default: 40
			},
			refName: {
				type: String,
				default: 'temp'
			}
		},
		data() {
			return {
				tempInterval: undefined,
				x: 0
			}
		},
		watch: {
			list(newO, oldO) {
				// this.content = newO.toString();
				// this.$nextTick(() => {
				// 	this.initScroll();
				// })
			}
		},
		mounted() {
			this.tempInterval = setInterval(this.rollTemp, this.speed);
		},
		destroyed() {
			clearInterval(this.tempInterval);
		},
		methods: {
			rollTemp() {
				let all = 0;
				let count = this.$refs[this.refName].childElementCount;
				for (let i = 0; i < count; i++) {
					all += this.$refs[this.refName].children[i].offsetWidth;
				}
				let half = all >> 1;
				if (this.x < 1 - half) {
					this.x = 0;
				}
				this.x -= 2;
				this.$refs[this.refName].style.transform = "translateX(" + this.x + "px)";
			}
		}

	}
</script>

<style lang="scss" scoped>
	.scroll-temp {
		background: #fff;
		color: #404040;
		font-size: 26rpx;

		width: 100%;
		overflow: hidden;

		.temp-box {
			white-space: nowrap;

			.li {
				display: inline;
				height: 30px;
				padding-right: 20px;
			}
		}
	}
</style>