<template>
	<!-- :style="{height:isApp?`calc(${uWindowHeight}px - 0rpx)`:'auto'}" -->
	<view class="ptp-sourse" :class="['theme-' + themeColor.name]">
		<image mode="widthFix" :src="imagePath" style="width: 100%;" />
		<view class="video-box" @click="vidows">
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	import {
		courseImage,
		courseVideo
	} from '@/utils/ptp'
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		components: {},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
			imagePath() {
				let course_id = this.$config.enumMgr.CONTANTS_CONFIGS_ID.COURSE_ID;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state.appInfoStore
					.contantsConfigTypeMap[course_id] : null;
				if (!info) return '@/static/img/ptp/course2.png';
				return info.url;

			}
		},
		data() {
			return {
				videoShow: false,
				videoSrc: '',
				isApp: false,
			}
		},
		mounted() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			this.getCourseImage()
			this.getCourseVideo()
		},
		methods: {
			vidows() {

				this.$emit("videoClick", true, )
			},
			top() {
				this.$emit('goScrollTop')
			},
			async getCourseImage() {
				const res = await courseImage()
			},
			async getCourseVideo() {
				const res = await courseVideo()
				this.videoSrc = res.result
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ptp-sourse {
		position: relative;

		.video-box {
			position: absolute;
			width: 204rpx;
			height: 62rpx;
			top: 90rpx;
			left: 190rpx;

			::v-deep .u-drawer {
				position: fixed;
				top: 0;
				left: 0;
			}

			::v-deep .u-mode-center-box {
				background: unset;
			}

			.video {
				width: 600rpx;
				height: 340rpx;
				border-radius: 20rpx;
				overflow: hidden;
			}
		}

		::v-deep .icon {
			border-radius: 10rpx;
		}
	}
</style>
