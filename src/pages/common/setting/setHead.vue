<template>
	<view class="setting" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<u-popup v-model="show" mode="bottom" height="97%" :mask-click="false" :mask-close-able="false"
			border-radius="24" z-index="998">
			<view class="content">
				<Header :title="$t('common.setting.setHead.title1')">
					<block slot="left">
						<svg @click="back" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
							fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M1.70711 0.578049C1.31658 0.187525 0.683418 0.187525 0.292893 0.578049C-0.0976311 0.968574 -0.0976311 1.60174 0.292893 1.99226L7.29993 8.9993L0.292924 16.0063C-0.0976004 16.3968 -0.0976008 17.03 0.292924 17.4205C0.683448 17.8111 1.31661 17.8111 1.70714 17.4205L8.71415 10.4135L15.7212 17.4205C16.1117 17.8111 16.7448 17.8111 17.1354 17.4205C17.5259 17.03 17.5259 16.3968 17.1354 16.0063L10.1284 8.9993L17.1354 1.99226C17.5259 1.60174 17.5259 0.968574 17.1354 0.578049C16.7449 0.187525 16.1117 0.187525 15.7212 0.578049L8.71415 7.58509L1.70711 0.578049Z"
								:fill="themeColor.themeColor" />
						</svg>
					</block>
					<block slot="right">
						<view class="btn-box" @click="confirmBtn">{{$t("common.ok")}}</view>
					</block>
				</Header>
				<scroll-view scroll-y class="scroll-view-list">
					<view class="list">
						<view class="list-item" v-for="(item, index) in list" @click="setAvatar(item)">
							<image :class="{ active: imgList[0] === item.imgUrl }" :src="item.imgUrl"></image>
						</view>
					</view>
				</scroll-view>

				<uni-section class="mb-10" :title="$t('common.setting.setHead.title2')" titleFontSize="34"
					:titleColor="themeColor.themeColor">
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>

				<cl-upload v-model="imgList" :fileName="'file'" :fileType="'image'" :action="action" :headers="headers"
					:data="{ addWatermark: false }" :count="1" :max="1" :listStyle="{
            width: '208rpx',
            height: '208rpx',
            radius: '24rpx',
            padding: '0 28rpx'
          }" @onSuccess="onSuccess" @onError="onErrors">
					<block slot="addImg">
						<image style="width: 208rpx; height: 208rpx;" src="@/static/img/add-bg.svg"></image>
					</block>

					<template v-slot:delete>
						<view class="" style="position: absolute; top:0;right:0;">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<circle cx="12" cy="12" r="12" fill="black" fill-opacity="0.5" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M7.30673 15.6915C6.9162 16.082 6.9162 16.7152 7.30673 17.1057C7.69725 17.4962 8.33042 17.4962 8.72094 17.1057L12.0987 13.7279L15.3778 17.007C15.7683 17.3975 16.4015 17.3975 16.792 17.007C17.1825 16.6165 17.1825 15.9833 16.792 15.5928L13.5129 12.3137L17.2062 8.62043C17.5967 8.22991 17.5967 7.59675 17.2062 7.20622C16.8157 6.8157 16.1825 6.8157 15.792 7.20622L12.0987 10.8995L8.30673 7.10749C7.9162 6.71696 7.28304 6.71696 6.89251 7.10749C6.50199 7.49801 6.50199 8.13118 6.89251 8.5217L10.6845 12.3137L7.30673 15.6915Z"
									fill="white" />
							</svg>
						</view>

					</template>
					<!-- <block slot="deleteImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<circle cx="12" cy="12" r="12" fill="black" fill-opacity="0.5" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M7.30673 15.6915C6.9162 16.082 6.9162 16.7152 7.30673 17.1057C7.69725 17.4962 8.33042 17.4962 8.72094 17.1057L12.0987 13.7279L15.3778 17.007C15.7683 17.3975 16.4015 17.3975 16.792 17.007C17.1825 16.6165 17.1825 15.9833 16.792 15.5928L13.5129 12.3137L17.2062 8.62043C17.5967 8.22991 17.5967 7.59675 17.2062 7.20622C16.8157 6.8157 16.1825 6.8157 15.792 7.20622L12.0987 10.8995L8.30673 7.10749C7.9162 6.71696 7.28304 6.71696 6.89251 7.10749C6.50199 7.49801 6.50199 8.13118 6.89251 8.5217L10.6845 12.3137L7.30673 15.6915Z"
								fill="white" />
						</svg>
					</block> -->
				</cl-upload>
			</view>
		</u-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		getBuildInAvatar,
		updateAvatar
	} from "@/utils/user/index";
	import {
		config
	} from '@/config/config'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';

	export default {
		name: "setHead",
		components: {
			Header,
			AlertInjectLayer
		},
		computed: {
			...mapGetters(['userHeadImageUrl', 'themeColor'])
		},
		watch: {
			show(val) {
				if (val) {
					this.$nativeBridge.setStatusBarColor('#666666', true)
				} else {
					this.$nativeBridge.setStatusBarColor('#ffffff')
				}
			}
		},
		mounted() {

			uni.$emit("on_page_mounted", this)

			if (this.userHeadImageUrl) this.imgList = [this.userHeadImageUrl];
			this.headList()
			this.show = true
		},

		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("common.setting.setHead.title"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				action: config.me_base_url[0] + '/api/user/upImg',
				headers: {
					'X-Access-Token': this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_TOKEN)
				},
				list: [],
				imgList: [],

				show: false
			}
		},
		onLoad(option) {

		},
		methods: {
			back() {
				backPage()
			},
			async headList() {
				// getBuildInAvatar().then(res => {
				// 	this.list = res.result
				// 	// this.imgList.length<1&&this.setAvatar(this.list[0])
				// }).catch(err => {
				// 	console.log(err)
				// })
				let that = this;
				const res = await this.$localdb.getDataByApiOrStoreCache("pageSetAvatarBuilds", async function() {
					return new Promise((async resolve => {
						let info = await getBuildInAvatar();
						resolve(that.$localdb.buildSyncFunctionResult(!!info.result,
							info));
					}))
				}, this.$config.configCache.PAGE_AVATAR_SET_CACHE);
				this.list = res.result;

			},
			setAvatar(item) {

				this.imgList = [item.imgUrl]
			},
			onSuccess(reslut) {
				// 把服务端返回的图片地址添加到list中与组件数据同步
				this.imgList = [reslut.result.pictureUrl]
			},
			//上传失败
			onErrors(err) {
				uni.showToast({
					title: this.$t("common.setting.setHead.uploadFaild"),
					duration: 2000,
					icon: 'none'
				})
			},
			confirmBtn() {
				let that = this;
				if (!this.imgList.length) {
					return
				}
				updateAvatar({
					headImgUrl: this.imgList[0]
				}).then(res => {
					if (res.code === 200) {
						that.$store.dispatch("updateUserInfoProperties", {
							headImgUrl: that.imgList[0]
						})
						uni.$emit('setSucc', {
							msg: this.$t("common.setting.setHead.setSuccess")
						})
						backPage()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		background: var(--theme-auxiliary-color-default);
		min-height: var(--vh);
		padding-bottom: 289rpx;
	}

	.content {
		background: #fff;
		border-radius: 24rpx;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.header {
			background: var(--theme-auxiliary-color-default);
		}

		.btn-box {
			text-align: right;
			color: var(--theme-color);
		}
	}

	.mb-10 {
		background: none;
		padding: 0 28rpx;
		flex: 0 0 auto;

		::v-deep .uni-section-header {
			padding: 20rpx 0;
		}

		.decoration {
			width: 6rpx;
			height: 24rpx;
			border-radius: 6rpx;
			margin-right: 20rpx;
			background-color: var(--theme-color);
			// padding: 0 28rpx;
		}
	}

	.scroll-view-list {
		flex: 1 1 auto;
		overflow: hidden;
	}

	.list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20rpx;
		padding: 20rpx 28rpx;

		.list-item {

			image {
				border: 1px solid transparent;
				height: 158rpx;
				width: 158rpx;
			}

			.active {
				border: 1px solid var(--theme-color);
			}
		}
	}
</style>
