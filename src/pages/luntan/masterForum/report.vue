<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed></Header>
		<scroll-view scroll-y="true" class="content" :enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="form-box">
				<view class="input-box">
					<view class="title">理由:</view>
					<view class="uni-textarea">
						<textarea class="textarea" auto-height v-model="formData.reason"
							placeholder-style="color:#c8c9cc;font-size:28rpx" placeholder="请输入您举报的理由"
							adjust-position="true" />
					</view>
				</view>
				<!--图片上传-->
				<view class="uploader">
					<view style=" margin-top: 30rpx">
						<cl-upload v-model="imgList" :fileName="'file'" :fileType="'image'" :action="action"
							:headers="headers" :listStyle="{
              columns: 3,
              columnGap: '0rpx',
              rowGap: '30rpx',
              margin: '0 8px 8px 0',
              width: '218rpx',
              height: '218rpx',
              radius: '24rpx',
              border: '2rpx dashed #A1A1A1'
            }" @onSuccess="onSuccess" @onError="onError">

							<template v-slot:addImg>
								<image class="newAddImg" src="@/static/img/camera.png">

								</image>
							</template>
						</cl-upload>
					</view>
				</view>
			</view>
			<view class="submit">
				<button :style="{background:themeColor.themeColor}" class="btn primary-btn" @click="report">保存</button>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index.vue";
	import {
		config
	} from '@/config/config'
	import {
		report
	} from '@/utils/user/index'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';

	export default {
		name: "report",
		components: {
			AlertInjectLayer,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "举报",
				isShowRight: false,
				action: config.me_base_url + '/api/user/upImg',
				headers: {
					'X-Access-Token': this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_TOKEN)
				},
				imgList: [],
				imgListId: [],
				formData: {
					relatedId: 0,
					reason: '',
					pictureIds: [],
				}
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor'])
		},
		onLoad(option) {
			this.formData.relatedId = option.relatedId
			this.formData.title = option.title
			this.formData.type = option.type
			this.formData.articleTime = option.articleTime
			uni.setNavigationBarTitle({
				title: this.title
			});
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			/**
			 * 自动上传返回的是一张图片信息
			 * 手动上传返回的是已选中所有图片或者视频信息
			 * */
			onSuccess: function(reslut) {
				// 把服务端返回的图片地址添加到list中与组件数据同步
				this.imgList.push(reslut.result.pictureUrl)
				this.imgListId.push(reslut.result)
			},
			//上传失败
			onError: function(err) {
				uni.showToast({
					title: '上传失败',
					duration: 2000,
					icon: 'none'
				})
			},
			//举报提交
			report: function() {
				let imgId = [];
				for (let i = 0; i < this.imgListId.length; i++) {
					if (this.imgList.indexOf(this.imgListId[i].pictureUrl) != -1) {
						imgId.push(this.imgListId[i].id)
					}
				}
				let prams = this.formData
				prams.pictureIds = imgId
				if (!prams.reason) {
					pop('请输入您的举报理由', 2000)
					return false
				}
				if (prams.pictureIds.length < 1) {
					pop("请上传图片", 2000)
					return false
				}
				report(prams).then(res => {
					let msg = ''
					if (res.code != 200) {
						msg = res.message
						pop(msg, 2000)
					} else {
						msg = "举报成功"
						uni.$emit('emitParams', {
							msg: msg
						})
						uni.navigateBack()
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 0;
		flex: 1;
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
	}


	::v-deep .add-image {
		background-color: rgba(244, 244, 244, 0.27) !important;
	}

	.newAddImg {
		width: 48rpx;
		height: 48rpx;
	}

	.mint-tab-container-item {
		height: var(--vh);
		background: #f8f8f8;
		display: flex;
		flex-direction: column;
	}

	.form-box {
		background: #fff;
		padding-bottom: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
		// margin-top: 20rpx;
		margin-bottom: 40rpx;

		.input-box {
			padding: 0 26rpx;
			background: #fff;
			box-sizing: border-box;

			.title {
				width: 100%;
				color: #404040;
				padding: 20rpx 0;
				box-sizing: border-box;

				font-size: 30rpx;
				font-weight: 500;
			}

			.uni-textarea {
				font-size: 28rpx;
				padding: 20rpx;
				border-radius: 16rpx;
				border: 2rpx solid var(--theme-auxiliary-color-default);

				.textarea {
					width: 100%;
					height: 192rpx;
					font-size: 28rpx;
					color: #323233;
				}
			}
		}

		.uploader {
			padding: 0 30rpx;
		}
	}

	.submit {
		width: 100%;
		padding: 0 28rpx;
		box-sizing: border-box;

		.btn {
			width: 100%;
			height: 88rpx;
			color: #fff;
			border-radius: 16rpx;
			text-align: center;

			font-size: 34rpx;
			font-style: normal;
			font-weight: 400;
		}
	}
</style>
