<template>
	<view class="maintain-page" :class="['theme-' + themeColor.name]" :style="{minHeight:`calc(${uWindowHeight}px)`}">
		<view class="maintain-content">
			<image src="/static/img/common/maintain/new.png" mode="widthFix"></image>
			<view class="title">
				{{title}}...
			</view>
			<view class="time">
				维护时间：<br v-if="row" />{{date}}
			</view>
			<view class="description" v-html="data?data.content:''">
			</view>
			<view class="btn" @click="contact">
				<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M22.5 18.0675V12.0675C22.5 6.54466 18.0228 2.0675 12.5 2.0675C6.97715 2.0675 2.5 6.54466 2.5 12.0675V18.0675H0.5V12.0675C0.5 5.44009 5.87258 0.0675049 12.5 0.0675049C19.1274 0.0675049 24.5 5.44009 24.5 12.0675V18.0675H22.5Z"
						fill="white" />
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M12.5 5.06747C12.5 5.61975 12.9511 6.05873 13.4958 6.14973C16.3356 6.62408 18.5 9.09301 18.5 12.0675C18.5 12.6198 18.9477 13.0675 19.5 13.0675C20.0523 13.0675 20.5 12.6198 20.5 12.0675C20.5 7.98717 17.4453 4.62033 13.498 4.12911C12.95 4.06091 12.5 4.51518 12.5 5.06747Z"
						fill="white" />
					<rect x="1.5" y="16.0675" width="6" height="7" rx="1" stroke="white" stroke-width="2" />
					<rect x="17.4961" y="16.0675" width="6" height="7" rx="1" stroke="white" stroke-width="2" />
				</svg>
				<view class="btn-text">联系客服</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		configs,
		healthy
	} from "@/utils/common/index";
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {},

		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
			date() {
				let response = this.data || {};
				let startTimeStr = response ? response.upgradeStartTime : null;
				let endTimeStr = response ? response.upgradeEndTime : null;
				// let startTimeStr = '2023-11-08 11:02:00';
				// let endTimeStr = '2023-11-09 11:02:00';
				if (startTimeStr && endTimeStr) {
					let startDate = new Date(startTimeStr);
					let endDate = new Date(endTimeStr);
					this.row = true;
					if (startDate.getFullYear() === endDate.getFullYear() &&
						startDate.getMonth() === endDate.getMonth() &&
						startDate.getDate() === endDate.getDate()) {
						this.row = false;
						startTimeStr = this.getHourString(startDate)
						endTimeStr = this.getHourString(endDate)

					} else if (startDate.getFullYear() === endDate.getFullYear() &&
						startDate.getMonth() !== endDate.getMonth()) {
						this.row = false;
						startTimeStr = this.getMonthString(startDate)
						endTimeStr = this.getMonthString(endDate)

					} else if (startDate.getFullYear() === endDate.getFullYear() &&
						startDate.getMonth() === endDate.getMonth() &&
						startDate.getDate() !== endDate.getDate()
					) {
						this.row = false;
						startTimeStr = this.getMonthString(startDate)
						endTimeStr = this.getMonthString(endDate)

					}
				} else {
					startTimeStr = '--';
					endTimeStr = "--";
				}
				return `${startTimeStr}-${endTimeStr}`;


				// return `${data.upgradeStartTime}至${data.upgradeEndTime}`;
			},
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.$nativeBridge.setStatusBarColor('#F4F4F4')
		},
		data() {
			return {
				title: '请稍后重试',
				data: null,
				redictUrl: '',
				storageKey: "STATION_STAND",
				row: false,
				useContartAddress: ''
			}
		},
		onLoad() {
			const {
				data,
				url,
			} = uni.getStorageSync(this.storageKey);
      let decryptString = decryptResult(data.result);
      try {
        data.result = JSON.parse(decryptString);
      }catch (e){
        console.error(`formart descrypt string faild ${data.result}`);
      }
			this.redictUrl = url;
			this.title = "系统正在维护";
			this.data = data?.result ?? {};
			this.getStatus();
		},
		methods: {
			contact() {
				let customer = this.data.customerAddress;
				const userUrl = this.data.customerAddress.split("&hideHeaderFooter");
				if (userUrl.length) customer = userUrl[0];
				this.$nativeBridge.openUrl(customer)
			},
			getHourString(dateObj) {
				let h = dateObj.getHours();
				let m = dateObj.getMinutes();
				let s = dateObj.getSeconds();
				return h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2,
					'0');
			},
			getDayString(dateObj) {
				let h = dateObj.getHours();
				let m = dateObj.getMinutes();
				let s = dateObj.getSeconds();
				return h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2,
					'0');
			},
			getMonthString(dateObj) {
				const month = dateObj.getMonth() + 1;
				const days = dateObj.getDate();
				return this.fullDay(month) + "-" + this.fullDay(days) + " " + this.getHourString(dateObj)
			},
			fullDay(d) {
				if (d < 10) return "0" + d
				return d
			},
			async getStatus() {
				try {
					const res = await healthy();
					if (res.code && res.code === 200) {

						uni.removeStorageSync(this.storageKey);
						if (this.redictUrl) {
							location.href = this.redictUrl
						} else {
							location.href = location.origin
						}
					} else {
						setTimeout(async () => {
							await this.getStatus();
						}, 5000)
					}

				} catch (err) {
					setTimeout(async () => {
						await this.getStatus();
					}, 5000)

				}
			}
		},
	};
</script>
<style lang="scss" scoped>
	.maintain-page {
		// min-height: 100vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.btn {
			display: flex;
			width: 600rpx;
			height: 88rpx;
			justify-content: center;
			align-items: center;
			// gap: 20rpx;
			margin-top: 40rpx;
			color: #FFF;
			margin-left: auto;
			margin-right: auto;
			font-size: 34rpx;
			font-weight: 500;
			background-color: var(--theme-color);
			border-radius: 16rpx;
		}

		.btn-text {
			font-size: 34rpx;
			font-weight: 500;
			color: #FFF;
			margin-left: 20rpx;
		}

		.maintain-content {
			// margin-top: -100rpx;
			text-align: center;

			.title {
				color: #404040;
				text-align: center;

				font-size: 48rpx;
				font-style: normal;
				font-weight: 500;
				line-height: normal;
				margin-top: 20rpx;
			}

			.time {
				color: var(--theme-auxiliary-color-remind);
				text-align: center;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				margin-top: 20rpx;
				word-break: break-all;
			}

			.description {
				color: #A1A1A1;
				text-align: center;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 40rpx;
				width: 560rpx;
				margin-top: 20rpx;
				/* 133.333% */
				margin-left: auto;
				margin-right: auto;

			}

			image {
				width: 520rpx;
			}
		}
	}
</style>
