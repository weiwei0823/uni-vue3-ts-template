<template>
	<scroll-view scroll-y :style="{height:`calc(${uWindowHeight}px)`}" class="download-page"
		:class="['theme-' + themeColor.name]">
		<view class="header">
			<view class="logo-img">
				<imageSvgUrl :url="logo" :width="530" :height="120" replaceThemeTargetColor="#07C160" />
			</view>
			<!-- <image :src="logoUrl.url" mode="widthFix" class="logo-img"></image> -->
		</view>
		<image src="/static/img/Group 1420068469.png" mode="widthFix" class="logo-img-2"></image>
		<view class="line">
			<view class="title">
				{{ $t("pages.common.userCenter.downloadPage.text2") }}
			</view>
			<uni-link :href="item.url" showUnderLine="false" v-for="(item, index) in list" :key="index">
				<view class="list">
					<view class="text">{{ item.name }}</view>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
						<rect y="0.654297" width="24" height="24" rx="12" :fill="themeColor.themeColor" />
						<path d="M9.25 7.1543L14.75 12.6543L9.25 18.1543" stroke="white" stroke-width="2"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</view>
			</uni-link>
		</view>
		<view class="apps">
			<uni-link v-if="iosUrl" target="_blank" :href="iosUrl" showUnderLine="false">
				<view class="item">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
						<g clip-path="url(#clip0_266_83821)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M23.3022 16.2629C23.265 12.4625 26.3235 10.6397 26.46 10.5481C24.7415 7.97023 22.0638 7.61651 21.1104 7.57667C18.8339 7.33901 16.6655 8.95218 15.51 8.95218C14.3575 8.95218 12.5728 7.61123 10.6848 7.64513C8.20037 7.68328 5.91113 9.12725 4.63263 11.408C2.05306 15.9974 3.97307 22.7995 6.48652 26.5248C7.71563 28.3453 9.18103 30.3943 11.1034 30.3193C12.9566 30.2442 13.6563 29.0896 15.8962 29.0896C18.1361 29.0896 18.7655 30.3193 20.7256 30.2806C22.7182 30.2437 23.9815 28.425 25.2008 26.597C26.6111 24.4818 27.1922 22.4339 27.2265 22.3297C27.1834 22.3094 23.3421 20.7998 23.3022 16.2629ZM19.6189 5.11131C20.6384 3.84176 21.3292 2.07738 21.1418 0.321289C19.67 0.382579 17.8887 1.32469 16.8326 2.59307C15.8862 3.71852 15.0583 5.51028 15.2801 7.23475C16.9213 7.36522 18.5958 6.37851 19.6189 5.11131Z"
								fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_266_83821">
								<rect width="30" height="30" fill="white" transform="translate(0 0.321289)" />
							</clipPath>
						</defs>
					</svg>
					<view class="title" style="margin-left:20rpx;">
						{{ $t("pages.common.userCenter.downloadPage.text4") }}
					</view>
				</view>
			</uni-link>
			<uni-link v-if="androidUrl" target="_blank" :href="androidUrl" showUnderLine="false">
				<view class="item">
					<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
						<g clip-path="url(#clip0_266_83824)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M19.8955 2.34286L19.5761 2.8334C21.9792 3.98101 23.6044 6.15523 23.6044 8.6433H7.7539C7.7539 6.15463 9.37913 3.98041 11.7822 2.8328L11.4628 2.34226L11.148 1.8583L10.4426 0.772385C10.3561 0.638818 10.3912 0.458531 10.5208 0.369885C10.6516 0.281239 10.8274 0.317177 10.9138 0.450745L11.6713 1.61572L11.9895 2.10507L12.3107 2.60101C13.3339 2.19431 14.4744 1.96611 15.678 1.96611C16.8828 1.96611 18.0233 2.19431 19.0464 2.60101L19.3694 2.10507L19.6876 1.61572L20.4439 0.451343C20.5309 0.317177 20.7061 0.281239 20.8375 0.370484C20.9666 0.459729 21.0016 0.639416 20.9152 0.772984L20.2091 1.8589L19.8955 2.34286ZM11.433 5.45025C11.433 5.93122 11.8126 6.32114 12.2827 6.32114C12.7516 6.32114 13.1312 5.93122 13.1312 5.45025C13.1312 4.96929 12.7516 4.57997 12.2827 4.57997C11.8126 4.57997 11.433 4.96929 11.433 5.45025ZM18.2265 5.45025C18.2265 5.93122 18.6061 6.32114 19.075 6.32114C19.5451 6.32114 19.9247 5.93122 19.9247 5.45025C19.9247 4.96929 19.5451 4.57997 19.075 4.57997C18.6061 4.57997 18.2265 4.96929 18.2265 5.45025ZM7.7539 9.80493H7.87596H23.4824H23.6044V11.2532V12.435V22.5789C23.6044 23.593 22.8003 24.4177 21.8116 24.4177H20.5181C20.5613 24.5711 20.5852 24.734 20.5852 24.9011V24.9981V25.5785V28.5793C20.5852 29.5406 19.8243 30.3211 18.887 30.3211C17.9497 30.3211 17.1888 29.5406 17.1888 28.5793V25.5785V24.9981V24.9011C17.1888 24.7334 17.2127 24.5711 17.2559 24.4177H14.1024C14.1445 24.5711 14.1696 24.734 14.1696 24.9011V24.9981V25.5785V28.5793C14.1696 29.5406 13.4092 30.3211 12.4713 30.3211C11.5335 30.3211 10.7725 29.5406 10.7725 28.5793V25.5785V24.9981V24.9011C10.7725 24.7334 10.797 24.5711 10.8403 24.4177H9.54615C8.55747 24.4177 7.7539 23.593 7.7539 22.5789V12.435V11.2532V9.80493ZM4.92089 9.80515C3.98301 9.80515 3.22266 10.5844 3.22266 11.5475V18.998C3.22266 19.9593 3.98301 20.7397 4.92089 20.7397C5.85818 20.7397 6.61911 19.9593 6.61911 18.998V11.5469C6.61911 10.5844 5.85877 9.80515 4.92089 9.80515ZM24.7363 11.5473C24.7363 10.5842 25.4961 9.80493 26.4346 9.80493C27.3718 9.80493 28.1316 10.5842 28.1316 11.5467V18.9978C28.1316 19.9591 27.3718 20.7395 26.4346 20.7395C25.4961 20.7395 24.7363 19.9591 24.7363 18.9978V11.5473Z"
								fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_266_83824">
								<rect width="30" height="30" fill="white" transform="translate(0.5 0.321289)" />
							</clipPath>
						</defs>
					</svg>
					<view class="title" style="margin-left:20rpx;">
						{{ $t("pages.common.userCenter.downloadPage.text3") }}
					</view>
				</view>
			</uni-link>
		</view>
		<view class="footer">
			<view class="title">一个看港澳台新图纸APP</view>
			<view class="text">
				免费高清图纸，更新最快最齐全，<br />
				一手图源：图纸永不上水印；开源共享<br />
				欢迎所有站长前来调用
			</view>
		</view>
		<!-- <view class="tabs">
			<u-tabs-swiper ref="uTabs" :list="tabsList" :is-scroll="false" :show-bar="false" :current="current"
				inactive-color="#A1A1A1" active-color="#404040" bg-color="transparent" @change="tabsChange">
				<template #tab="{ item }">{{ item.name }}</template>
			</u-tabs-swiper>
		</view> -->
		<!-- <view class="swiper-box">
			<swiper class="swiper" :style="{ height: swiperHeight + 'rpx' }" :current="swiperCurrent"
				@transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(child, index) in tabsList" :key="index">
					<view class="items swiper-item-box">
						<uni-link :href="item.url" showUnderLine="false" class="item" v-for="item in child.items">
							<view class="logo">
								<image class="img" :src="item.imgPath" mode="widthFix" />
							</view>
							<view class="title">{{ item.name }}</view>
						</uni-link>
					</view>
				</swiper-item>
			</swiper>
		</view> -->
	</scroll-view>
</template>
<script>
	import {
		aboutUs
	} from "@/utils/user";
	import {
		mapGetters
	} from 'pinia';
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	export default {

		data() {
			return {
				// list: [],
				current: 0,
				swiperCurrent: 0,
				tabsList: [{
					name: this.$t("pages.common.userCenter.downloadPage.text5"),
					items: [{
							imgPath: "/static/img/download/1.png",
							url: "https://www.baidu.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text6")
						},
						{
							imgPath: "/static/img/download/2.png",
							url: "https://www.qq.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text7")
						},
						{
							imgPath: "/static/img/download/3.png",
							url: "https://www.ifeng.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text8")
						},
						{
							imgPath: "/static/img/download/4.png",
							url: "https://www.sohu.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text9")
						},
						{
							imgPath: "/static/img/download/5.png",
							url: "https://www.163.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text10")
						},
						{
							imgPath: "/static/img/download/6.png",
							url: "https://www.youku.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text11")
						},
						{
							imgPath: "/static/img/download/7.png",
							url: "https://www.jd.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text12")
						},
						{
							imgPath: "/static/img/download/8.png",
							url: "https://www.12306.cn/",
							name: this.$t("pages.common.userCenter.downloadPage.text13")
						},
						{
							imgPath: "/static/img/download/9.png",
							url: "https://gz.58.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text14")
						},
						{
							imgPath: "/static/img/download/10.png",
							url: "https://www.ctrip.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text15")
						}
					]
				}, {
					name: this.$t("pages.common.userCenter.downloadPage.text16"),
					items: [{
							imgPath: "/static/img/download/11.png",
							url: "https://www.boc.cn/",
							name: this.$t("pages.common.userCenter.downloadPage.text17")
						},
						{
							imgPath: "/static/img/download/12.png",
							url: "http://www.icbc.com.cn/icbc/",
							name: this.$t("pages.common.userCenter.downloadPage.text18")
						},

						{
							imgPath: "/static/img/download/13.png",
							url: "https://www.ccb.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text19")
						},
						{
							imgPath: "/static/img/download/14.png",
							url: "https://www.abchina.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text20")
						},
						{
							imgPath: "/static/img/download/15.png",
							url: "https://www.psbc.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text21")
						},
						{
							imgPath: "/static/img/download/16.png",
							url: "https://market.cmbchina.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text22")
						},
						{
							imgPath: "/static/img/download/17.png",
							url: "https://www.cebbank.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text23")
						},
						{
							imgPath: "/static/img/download/18.png",
							url: "https://www.cib.com.cn/",
							name: this.$t("pages.common.userCenter.downloadPage.text24")
						},
						{
							imgPath: "/static/img/download/19.png",
							url: "https://www.bankcomm.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text25")
						},
						{
							imgPath: "/static/img/download/20.png",
							url: "https://www.cgbchina.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text26")
						}
					]
				}, {
					name: this.$t("pages.common.userCenter.downloadPage.text27"),
					items: [{
							imgPath: "/static/img/download/21.png",
							url: "https://www.taobao.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text28")

						},
						{
							imgPath: "/static/img/download/22.png",
							url: "https://www.jd.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text29")

						},
						{
							imgPath: "/static/img/download/23.png",
							url: "https://www.tmall.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text30")

						},
						{
							imgPath: "/static/img/download/24.png",
							url: "https://www.suning.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text31")

						},
						{
							imgPath: "/static/img/download/25.png",
							url: "https://www.gome.com.cn/",
							name: this.$t("pages.common.userCenter.downloadPage.text32")

						},
						{
							imgPath: "/static/img/download/26.png",
							url: "http://book.dangdang.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text33")

						},
						{
							imgPath: "/static/img/download/27.png",
							url: "https://ju.taobao.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text34")

						},
						{
							imgPath: "/static/img/download/28.png",
							url: "http://www.meilishuo.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text35")

						},
						{
							imgPath: "/static/img/download/29.png",
							url: "https://www.mogu.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text36")

						},
						{
							imgPath: "/static/img/download/30.png",
							url: "https://www.vip.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text37")

						}
					]
				}, {
					name: this.$t("pages.common.userCenter.downloadPage.text38"),
					items: [{
							imgPath: "/static/img/download/31.png",
							url: "https://news.sina.com.cn/",
							name: this.$t("pages.common.userCenter.downloadPage.text39")

						},
						{
							imgPath: "/static/img/download/32.png",
							url: "https://news.ifeng.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text40")

						},
						{
							imgPath: "/static/img/download/33.png",
							url: "http://www.uzaobao.com",
							name: this.$t("pages.common.userCenter.downloadPage.text41")

						},
						{
							imgPath: "/static/img/download/34.png",
							url: "http://www.people.com.cn/",
							name: this.$t("pages.common.userCenter.downloadPage.text42")

						},
						{
							imgPath: "/static/img/download/35.png",
							url: "https://news.qq.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text43")

						},
						{
							imgPath: "/static/img/download/36.png",
							url: "http://news.sohu.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text44")

						},
						{
							imgPath: "/static/img/download/37.png",
							url: "https://www.huanqiu.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text45")

						},
						{
							imgPath: "/static/img/download/38.png",
							url: "https://news.163.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text46")

						},
						{
							imgPath: "/static/img/download/39.png",
							url: "http://www.xinhuanet.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text47")

						},
						{
							imgPath: "/static/img/download/40.png",
							url: "https://news.baidu.com/",
							name: this.$t("pages.common.userCenter.downloadPage.text48")

						}
					]
				}],
				// androidUrl: '',
				// iosUrl: '',
				logoUrl: this.$store.state.appInfoStore.contantsConfigTypeMap[this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.LOGO_HAD_NAME]
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		components: {
			imageSvgUrl
		},
		computed: {
			logo() {
				return this.$store?.state?.appInfoStore?.contantsConfigs?.filter(item => item.type == '26')[0].url
			},
			...mapGetters(["themeColor", "uWindowHeight"]),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			swiperHeight() {
				return this.tabsList[this.swiperCurrent].items.length * 103 / 2
			},
			androidUrl() {
				let key = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.ANDROID_URL;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[key] : null;
				return info && info.status === 1 ? info.url : "";
			},
			iosUrl() {
				let key = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.IOS_URL;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[key] : null;
				return info && info.status === 1 ? info.url : "";
			},
			list() {
				const arr = [];
				let key1 = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.LINE_ID1;
				let key2 = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.LINE_ID2;
				let key3 = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.LINE_ID3;
				let info1 = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[key1] : null;
				let info2 = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[key2] : null;
				let info3 = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[key3] : null;
				if (info1) arr.push(info1);
				if (info2) arr.push(info2);
				if (info3) arr.push(info3);
				return arr
			}
		},
		onLoad() {
			// this.getConfigData()
		},
		methods: {
			async getConfigData() {
				const res = await aboutUs()
				const list = []
				res.result.constants.forEach(element => {
					switch (element.type) {
						case "1":
							break;
						case "2":
							break;
						case "3":
							break;
						case "4":
							break;
						case "5":
							break;
						case "6":
							this.downloadUrl = element.url
							break;
						case "60":
							list.push({
								name: this.$t("pages.common.userCenter.downloadPage.text49"),
								url: element.url
							})
							break;
						case "61":
							list.push({
								name: this.$t("pages.common.userCenter.downloadPage.text50"),
								url: element.url
							})
							break;
						case "62":
							list.push({
								name: this.$t("pages.common.userCenter.downloadPage.text51"),
								url: element.url
							})
							break;
						case "14":
							this.androidUrl = element.url
							break;
						case "15":
							this.iosUrl = element.url
							break;
					}
				});
				this.list = list
			},
			tabsChange(index) {
				this.current = index
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.download-page {
		.header {
			background: linear-gradient(180deg, var(--gradient-color-bg) 0%, rgba(191, 224, 255, 0.00) 100%);
			height: 330rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.logo-img {

				margin: 40rpx 0 60rpx;

				/*width: 268rpx;*/
				.img {
					width: 530rpx;
					height: 120rpx;
				}
			}
		}

		.logo-img-2 {
			width: 694rpx;
			margin: 0 28rpx;
			margin-top: -60rpx;
		}

		.btn {
			width: 694rpx;
			height: 88rpx;
			display: grid;
			place-content: center;
			color: #fff;
			font-size: 34rpx;
			margin-top: 60rpx;
			border-radius: 24rpx;
			background: var(--theme-color);
		}

		.line {
			padding: 0 28rpx;

			.title {
				color: #404040;
				font-size: 34rpx;
				padding: 20rpx;
				height: 96rpx;
				box-sizing: border-box;
				font-size: 34rpx;
				color: #404040;
				display: flex;
				align-items: center;

				&::before {
					content: '';
					width: 6rpx;
					height: 24rpx;
					border-radius: 6rpx;
					margin-right: 14rpx;
					background: var(--theme-color);
				}
			}

			.list {
				margin-bottom: 20rpx;
				padding: 0 20rpx;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: var(--theme-color);
				font-size: 34rpx;
				background: #fff;
				border-radius: 24rpx;
			}
		}

		.apps {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 40rpx;
			padding: 0 28rpx;

			::v-deep .uni-link {
				flex: 1;
				width: 100%;
			}

			.item {
				background: var(--theme-color);
				border-radius: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 34rpx;
				height: 88rpx;
				margin-bottom: 40rpx;

				.title {
					color: #fff;
				}

				.version {
					color: #404040;
				}
			}
		}

		.footer {
			text-align: center;
			color: #404040;
			padding: 0 28rpx;

			.title {
				font-size: 48rpx;
				font-weight: 600;
			}

			.text {
				font-size: 34rpx;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
			}
		}

		.tabs {
			padding: 0 28rpx;
			height: 96rpx;
			display: flex;
			align-items: center;
		}

		.swiper-box {
			padding: 0 28rpx;
			padding-bottom: 20rpx;

			.swiper {
				background: #fff;
				border-radius: 28rpx;
				padding: 40rpx;
				box-sizing: border-box;

				.items {
					display: grid;
					gap: 20rpx 40rpx;
					grid-template-columns: repeat(4, 1fr);
					padding: 0 29rpx;

					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						height: 130rpx;

						.logo {
							width: 88rpx;
							height: 88rpx;
							border-radius: 24rpx;
							background: var(--theme-auxiliary-color-default);

							.img {
								width: 100%;
								height: 100%;
							}
						}

						.title {
							color: #404040;
							font-size: 24rpx;
							margin-top: 10rpx;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
